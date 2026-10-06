import re
from typing import Dict, List, Tuple
from BACKEND.DATABASE.database import get_connection


class SkillService:

    def __init__(self):
        self._cache_skills = None

    def get_all_skills_details(self) -> List[Dict[str, str]]:
        """Fetch all skills with their categories and curated suggestions from SQLite."""
        if self._cache_skills is not None:
            return self._cache_skills

        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT skill_name, category, suggestion FROM skills")
            rows = cursor.fetchall()
            connection.close()

            self._cache_skills = [
                {"name": row[0], "category": row[1], "suggestion": row[2]}
                for row in rows
            ]
            return self._cache_skills
        except Exception as e:
            print(f"[SkillService] Database query error: {e}")
            return []

    def get_all_skills(self) -> List[str]:
        details = self.get_all_skills_details()
        return [item["name"] for item in details]

    def _skill_in_text(self, skill_name: str, text: str) -> bool:
        """Regex word-boundary check so 'C' doesn't match 'Cloud' or 'CSS'."""
        pattern = r"\b" + re.escape(skill_name.lower()) + r"\b"
        return bool(re.search(pattern, text.lower()))

    def match_skills(
        self, resume_text: str, job_description: str = ""
    ) -> Tuple[List[str], List[str]]:
        """
        True ATS Skill Matching:
        - If job_description is provided:
          1. Extracts skills required by the Job Description.
          2. Checks which of those are present in the Resume (Matching Skills).
          3. Identifies required skills missing from the Resume (Missing Skills).
        - If no job description is provided, falls back to detecting present skills vs database.
        """
        all_skills = self.get_all_skills()
        if not all_skills:
            return [], []

        resume_text_clean = resume_text or ""
        jd_text_clean = job_description or ""

        # Find skills present in resume
        resume_skills = [
            skill for skill in all_skills if self._skill_in_text(skill, resume_text_clean)
        ]

        if jd_text_clean.strip():
            # Extract skills required by job description
            jd_required_skills = [
                skill for skill in all_skills if self._skill_in_text(skill, jd_text_clean)
            ]

            # If job description mentions skills, match against them
            if jd_required_skills:
                matching_skills = [s for s in jd_required_skills if s in resume_skills]
                missing_skills = [s for s in jd_required_skills if s not in resume_skills]
                return matching_skills, missing_skills

        # Fallback if no specific skills detected in job description
        matching_skills = resume_skills
        missing_skills = [s for s in all_skills if s not in resume_skills][:8]
        return matching_skills, missing_skills


if __name__ == "__main__":
    skills_service = SkillService()

    resume = "Experienced in Python, SQL, React, and Pandas."
    jd = "Looking for a Python developer with SQL, Docker, AWS, and React experience."

    matching, missing = skills_service.match_skills(resume, jd)
    print("Matching Skills:", matching)
    print("Missing Skills:", missing)