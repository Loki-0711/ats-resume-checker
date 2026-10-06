import re
import spacy


class TextPreprocessor:

    def __init__(self):
        try:
            self.nlp = spacy.load("en_core_web_sm")
        except Exception:
            # Fallback if model not downloaded
            import spacy.cli
            spacy.cli.download("en_core_web_sm")
            self.nlp = spacy.load("en_core_web_sm")

    def clean_text(self, text: str) -> str:
        if not text:
            return ""

        text = text.lower()
        text = re.sub(r"[^a-zA-Z0-9\s+#.]", " ", text)
        text = re.sub(r"\s+", " ", text).strip()

        doc = self.nlp(text)

        cleaned_words = []
        for token in doc:
            if not token.is_stop and not token.is_punct and not token.is_space:
                cleaned_words.append(token.lemma_)

        return " ".join(cleaned_words)

    def preprocess(self, text: str) -> str:
        """Alias for clean_text to support analyzer pipeline calls."""
        return self.clean_text(text)