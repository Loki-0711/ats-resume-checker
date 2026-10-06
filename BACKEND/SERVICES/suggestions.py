from typing import Dict, List, Optional
from BACKEND.DATABASE.database import get_connection


class SuggestionService:

    def __init__(self):
        self._curated_suggestions: Optional[Dict[str, str]] = None

    def _load_curated_suggestions(self) -> Dict[str, str]:
        if self._curated_suggestions is not None:
            return self._curated_suggestions

        suggestions_map = {}
        try:
            connection = get_connection()
            cursor = connection.cursor()
            cursor.execute("SELECT skill_name, suggestion FROM skills")
            rows = cursor.fetchall()
            connection.close()
            suggestions_map = {row[0].lower(): row[1] for row in rows if row[1]}
        except Exception as e:
            print(f"[SuggestionService] DB load error: {e}")

        self._curated_suggestions = suggestions_map
        return suggestions_map

    def generate_suggestions(
        self, ats_score: float, matching_skills: List[str], missing_skills: List[str]
    ) -> List[str]:
        suggestions: List[str] = []
        curated_map = self._load_curated_suggestions()

        # Score-based macro feedback
        if ats_score < 50:
            suggestions.append(
                "Your ATS compatibility score is low (<50%). Tailor your resume summary and work experience directly to the key technologies listed in the job description."
            )
        elif ats_score < 75:
            suggestions.append(
                "Your resume has moderate compatibility (50-75%). Add quantifiable metrics (e.g., % improvement, scale of users) to highlight your business impact."
            )
        else:
            suggestions.append(
                "Great match! Your resume aligns well with core requirements. Ensure your formatting remains simple and single-column for smooth ATS ingestion."
            )

        # Actionable missing skill feedback using curated suggestions from database
        for skill in missing_skills:
            key = skill.lower()
            if key in curated_map and curated_map[key]:
                suggestions.append(f"[{skill}]: {curated_map[key]}")
            else:
                suggestions.append(
                    f"Consider adding practical experience or personal projects demonstrating proficiency with {skill}."
                )

        # General structural ATS recommendations
        suggestions.append(
            "Use clear action verbs (Engineered, Architected, Optimized) at the start of each bullet point rather than passive descriptions."
        )

        return suggestions


if __name__ == "__main__":
    service = SuggestionService()
    res = service.generate_suggestions(65, ["Python", "SQL"], ["Docker", "AWS"])
    for s in res:
        print("-", s)