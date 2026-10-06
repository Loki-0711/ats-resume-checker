import re
import spacy

nlp = spacy.load("en_core_web_sm")

def clean_text(text):
    text = text.lower()
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)

    doc = nlp(text)

    cleaned_words = []
    for token in doc:
        if not token.is_stop and not token.is_punct:
            cleaned_words.append(token.lemma_)

    return " ".join(cleaned_words)        