import os
import uuid
from datetime import datetime
from typing import Optional
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from BACKEND.SERVICES.parser import ResumeParser
from BACKEND.SERVICES.preprocess import TextPreprocessor
from BACKEND.SERVICES.matcher import ResumeMatcher
from BACKEND.SERVICES.skills import SkillService
from BACKEND.SERVICES.suggestions import SuggestionService


class ATSAnalyzer:

    def __init__(self):
        self.parser = ResumeParser()
        self.preprocessor = TextPreprocessor()
        self.matcher = ResumeMatcher()
        self.skill_service = SkillService()
        self.suggestion_service = SuggestionService()

    def analyze_resume(
        self,
        resume_source,
        job_description: str,
        file_name: str = "Uploaded_Resume.pdf",
        file_size: str = "120 KB",
    ):
        """
        Analyze resume against a job description.
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
                    "impact": f"+{5 if priority == 'high' else 3}% match boost",
                    "category": "Keywords" if idx % 2 == 0 else "Experience",
                    "exampleBefore": "Worked on various software features and bug fixes.",
                    "exampleAfter": f"Engineered scalable solutions integrating {matching_skills[0] if matching_skills else 'core stack'}, improving latency by 35%.",
                }
            )

        # Build complete AnalysisResult payload matching frontend types
        return {
            "id": f"scan-{uuid.uuid4().hex[:8]}",
            "jobTitle": "Target Position",
            "company": "Prospective Employer",
            "candidateName": "Candidate",
            "fileName": file_name,
            "fileSize": file_size,
            "overallScore": ats_score,
            "scoreLabel": score_label,
            "comparisonVsAverage": round(ats_score - 68),
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
            "resumeSnippet": (resume_text[:280] + "...") if len(resume_text) > 280 else resume_text,
            "jobDescriptionSnippet": (job_description[:280] + "...") if len(job_description) > 280 else job_description,
            "analyzedAt": datetime.now().strftime("%b %d, %Y - %I:%M %p"),
        }


# ================= FastAPI Application =================
app = FastAPI(
    title="AI-Powered ATS Resume Ranking API",
    description="Backend intelligence engine for ATS Resume Scoring & Matching",
    version="2.0.0",
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


@app.post("/api/analyze")
async def analyze_endpoint(
    resume_file: Optional[UploadFile] = File(None),
    resume_text: Optional[str] = Form(""),
    job_description: str = Form(...),
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
        file_name=file_name,
        file_size=file_size,
    )
    return result


if __name__ == "__main__":
    print("Starting ATS FastAPI server on http://localhost:8000...")
    uvicorn.run("BACKEND.main:app", host="0.0.0.0", port=8000, reload=True)