import os
import uuid
from datetime import datetime
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn

from BACKEND.SERVICES.parser import ResumeParser
from BACKEND.SERVICES.preprocess import TextPreprocessor
from BACKEND.SERVICES.matcher import ResumeMatcher
from BACKEND.SERVICES.skills import SkillService
from BACKEND.SERVICES.suggestions import SuggestionService
from BACKEND.SERVICES.job_roles import (
    JobRoleIntelligenceService,
    JOB_ROLES_CATALOG,
    JOB_POSTS_CATALOG,
    REGIONAL_MARKET_DATA,
)
from BACKEND.SERVICES.ai_chat import AIChatService


class ATSAnalyzer:

    def __init__(self):
        self.parser = ResumeParser()
        self.preprocessor = TextPreprocessor()
        self.matcher = ResumeMatcher()
        self.skill_service = SkillService()
        self.suggestion_service = SuggestionService()
        self.role_service = JobRoleIntelligenceService()

    def analyze_resume(
        self,
        resume_source,
        job_description: str,
        job_title: str = "Full Stack Developer",
        region: str = "India (Bangalore, Remote)",
        target_company: str = "Top Tech Companies",
        file_name: str = "Uploaded_Resume.pdf",
        file_size: str = "120 KB",
    ):
        """
        Analyze resume against a target job post, job description, and region.
        resume_source can be a raw text string, file path, or file bytes.
        """
        if isinstance(resume_source, str) and not os.path.exists(resume_source):
            # Already raw text
            resume_text = resume_source
        else:
            # File path or file object
            resume_text = self.parser.extract_text(resume_source)
            if not resume_text and isinstance(resume_source, str):
                resume_text = resume_source

        # Preprocess text
        clean_resume = self.preprocessor.clean_text(resume_text or "")
        clean_job = self.preprocessor.clean_text(job_description or "")

        # Calculate TF-IDF & Cosine Similarity score
        ats_score = self.matcher.calculate_similarity(clean_resume, clean_job)

        # True bidirectional ATS skill matching (JD skills vs Resume skills)
        matching_skills, missing_skills = self.skill_service.match_skills(
            resume_text, job_description
        )

        # Detect all skills in resume for role suitability
        all_known_skills = self.skill_service.get_all_skills()
        detected_resume_skills = [
            s for s in all_known_skills if self.skill_service._skill_in_text(s, resume_text or "")
        ]

        # Explicit Match Verdict & Passing Threshold Evaluation
        match_verdict = self.role_service.evaluate_match_verdict(
            ats_score=ats_score,
            matching_skills=matching_skills,
            missing_skills=missing_skills,
            job_title=job_title or "Target Position",
        )

        # Multi-job matching: evaluate against ALL available job posts
        all_jobs_match_data = self.role_service.match_resume_against_all_jobs(
            resume_text=resume_text or "",
            detected_skills=detected_resume_skills,
        )

        # Deep Section-by-Section Resume Weakness Diagnostic
        weaknesses = self.role_service.analyze_resume_weaknesses(
            resume_text=resume_text or "",
            job_description=job_description or "",
            matching_skills=matching_skills,
            missing_skills=missing_skills,
            ats_score=ats_score,
        )

        # Calculate Role Suitability across all major industry job posts
        role_suitability = self.role_service.calculate_role_suitability(
            resume_text or "", detected_resume_skills
        )

        # Calculate Regional Job Market Data & Opportunities
        regional_jobs, regional_insights = self.role_service.get_regional_market_data(
            region or "India", role_suitability, detected_resume_skills
        )

        # Generate intelligent suggestions
        raw_suggestions = self.suggestion_service.generate_suggestions(
            ats_score, matching_skills, missing_skills
        )

        # Compute match status label
        if ats_score >= 80:
            score_label = "Strong Match"
        elif ats_score >= 65:
            score_label = "Good Match"
        elif ats_score >= 50:
            score_label = "Moderate Match"
        else:
            score_label = "Low Match"

        # Categorize skills for dashboard analytics
        total_matched = len(matching_skills)
        total_missing = len(missing_skills)
        total_skills = total_matched + total_missing or 1
        skill_match_rate = round((total_matched / total_skills) * 100)

        # Build structured AISuggestion objects compatible with React frontend
        formatted_suggestions = []
        for idx, text in enumerate(raw_suggestions):
            priority = "high" if idx < 2 else ("medium" if idx < 4 else "low")
            formatted_suggestions.append(
                {
                    "id": f"sug-{idx + 1}",
                    "title": f"Optimization Recommendation #{idx + 1}",
                    "explanation": text,
                    "priority": priority,
                    "impact": f"+{6 if priority == 'high' else 3}% match boost",
                    "category": "Keywords" if idx % 2 == 0 else "Experience",
                    "exampleBefore": "Worked on various software features and bug fixes.",
                    "exampleAfter": f"Engineered scalable solutions integrating {matching_skills[0] if matching_skills else 'core stack'}, improving latency by 35%.",
                }
            )

        # Build complete AnalysisResult payload matching frontend types
        return {
            "id": f"scan-{uuid.uuid4().hex[:8]}",
            "jobTitle": job_title or "Target Position",
            "company": target_company or "Top Tech Companies",
            "region": region or "India (Bangalore, Remote)",
            "candidateName": "Candidate",
            "fileName": file_name,
            "fileSize": file_size,
            "overallScore": ats_score,
            "scoreLabel": score_label,
            "comparisonVsAverage": round(ats_score - 68),
            "matchVerdict": match_verdict,
            "allJobsMatches": all_jobs_match_data["allJobMatches"],
            "bestMatchedJob": all_jobs_match_data["bestMatchedJob"],
            "weaknesses": weaknesses,
            "breakdown": {
                "skillsMatch": skill_match_rate,
                "experienceRelevance": max(40, round(ats_score * 0.95)),
                "keywordCoverage": round(ats_score),
                "resumeQuality": min(95, round(ats_score * 0.9 + 15)),
            },
            "matchingSkills": matching_skills,
            "missingSkills": missing_skills,
            "whyMissingMatters": (
                f"Missing {len(missing_skills)} key competencies required in the job description: "
                f"{', '.join(missing_skills[:5])}."
                if missing_skills
                else "Your resume contains all key competencies required for this role!"
            ),
            "skillCategories": [
                {
                    "name": "Core Technical Skills",
                    "matchRate": skill_match_rate,
                    "matchedCount": total_matched,
                    "totalCount": total_skills,
                }
            ],
            "roleSuitability": role_suitability,
            "regionalJobs": regional_jobs,
            "regionalInsights": regional_insights,
            "suggestions": formatted_suggestions,
            "donutData": [
                {"name": "Matching", "value": max(1, total_matched), "color": "#06b6d4"},
                {"name": "Missing", "value": max(1, total_missing), "color": "#f43f5e"},
            ],
            "radarData": [
                {"subject": "Skills Match", "score": skill_match_rate, "fullMark": 100},
                {"subject": "Keywords", "score": round(ats_score), "fullMark": 100},
                {"subject": "Experience", "score": max(40, round(ats_score * 0.95)), "fullMark": 100},
                {"subject": "Format Quality", "score": 85, "fullMark": 100},
            ],
            "resumeSnippet": (resume_text[:280] + "...") if len(resume_text or "") > 280 else (resume_text or ""),
            "jobDescriptionSnippet": (job_description[:280] + "...") if len(job_description or "") > 280 else (job_description or ""),
            "analyzedAt": datetime.now().strftime("%b %d, %Y - %I:%M %p"),
        }


# ================= Pydantic Request Models =================
class ChatRequest(BaseModel):
    message: str
    history: Optional[List[Dict[str, Any]]] = []
    context: Optional[Dict[str, Any]] = None
    gemini_api_key: Optional[str] = None


class JobPostCreate(BaseModel):
    title: str
    company: str
    category: Optional[str] = "Software Engineering"
    location: Optional[str] = "Remote"
    region: Optional[str] = "Global"
    jobType: Optional[str] = "Full-time"
    experience: Optional[str] = "2 - 5 Years"
    salary: Optional[str] = "Competitive"
    coreSkills: Optional[List[str]] = ["Python", "SQL", "Git"]
    secondarySkills: Optional[List[str]] = ["Docker", "REST APIs"]
    description: str
    responsibilities: Optional[List[str]] = []
    requirements: Optional[List[str]] = []
    templateJd: Optional[str] = None
    cutoffScore: Optional[int] = 70


# ================= FastAPI Application =================
app = FastAPI(
    title="AI-Powered ATS Resume Ranking API",
    description="Backend intelligence engine for ATS Resume Scoring, Role Suitability, Multi-Job Matching & Weakness Diagnostics",
    version="2.5.0",
)

# Enable CORS for Vite frontend (localhost:5173, etc.)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

analyzer = ATSAnalyzer()
chat_service = AIChatService()


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ATS Resume Intelligence Engine",
        "timestamp": datetime.now().isoformat(),
    }


@app.get("/api/skills")
def get_skills():
    return {"skills": analyzer.skill_service.get_all_skills_details()}


@app.get("/api/roles")
def get_roles():
    return {"roles": JOB_ROLES_CATALOG}


@app.get("/api/jobs")
def get_job_posts():
    """Returns the list of active curated industry job postings."""
    return {"jobs": analyzer.role_service.get_all_job_posts()}


@app.post("/api/jobs")
def create_job_post(job: JobPostCreate):
    """Allows user to post a custom job listing."""
    new_job = analyzer.role_service.add_custom_job_post(job.model_dump())
    return {"message": "Job post created successfully", "job": new_job}


@app.get("/api/regions")
def get_regions():
    return {"regions": list(REGIONAL_MARKET_DATA.keys())}


@app.post("/api/match-all-jobs")
async def match_all_jobs_endpoint(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(""),
):
    """Matches uploaded resume against all jobs in the catalog."""
    resume_content = resume_text or ""
    if resume_file:
        file_bytes = await resume_file.read()
        extracted = analyzer.parser.extract_text(file_bytes)
        if extracted.strip():
            resume_content = extracted

    all_known_skills = analyzer.skill_service.get_all_skills()
    detected_resume_skills = [
        s for s in all_known_skills if analyzer.skill_service._skill_in_text(s, resume_content or "")
    ]

    result = analyzer.role_service.match_resume_against_all_jobs(
        resume_text=resume_content or "",
        detected_skills=detected_resume_skills,
    )
    return result


@app.post("/api/analyze")
async def analyze_endpoint(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(""),
    job_description: str = Form(...),
    job_title: Optional[str] = Form("Full Stack Developer"),
    region: Optional[str] = Form("India (Bangalore, Remote)"),
    target_company: Optional[str] = Form("Top Tech Companies"),
):
    file_name = "Uploaded_Resume.pdf"
    file_size = "150 KB"
    resume_content = resume_text or ""

    if resume_file:
        file_name = resume_file.filename or "Uploaded_Resume.pdf"
        file_bytes = await resume_file.read()
        file_size = f"{round(len(file_bytes) / 1024)} KB"
        # Extract text from uploaded PDF bytes
        extracted = analyzer.parser.extract_text(file_bytes)
        if extracted.strip():
            resume_content = extracted

    result = analyzer.analyze_resume(
        resume_source=resume_content,
        job_description=job_description,
        job_title=job_title or "Full Stack Developer",
        region=region or "India (Bangalore, Remote)",
        target_company=target_company or "Top Tech Companies",
        file_name=file_name,
        file_size=file_size,
    )
    return result


@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    reply = chat_service.generate_response(
        user_message=request.message,
        history=request.history or [],
        context=request.context or {},
        client_gemini_key=request.gemini_api_key,
    )
    return {"response": reply}


if __name__ == "__main__":
    print("Starting ATS FastAPI server on http://localhost:8000...")
    uvicorn.run("BACKEND.main:app", host="0.0.0.0", port=8000, reload=True)