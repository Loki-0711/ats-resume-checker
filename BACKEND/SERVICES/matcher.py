from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


class ResumeMatcher:

    def calculate_similarity(self, resume_text, job_text):

        documents = [resume_text, job_text]

        vectorizer = TfidfVectorizer()

        tfidf_matrix = vectorizer.fit_transform(documents)

        similarity = cosine_similarity(
            tfidf_matrix[0:1],
            tfidf_matrix[1:2]
        )[0][0]

        return round(similarity * 100, 2)