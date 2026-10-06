import io
import pdfplumber
from pathlib import Path


class ResumeParser:

    def extract_text(self, uploaded_file) -> str:
        """
        Extract text from a PDF file path, Path object, or binary file buffer.
        """
        if not uploaded_file:
            return ""

        text = ""
        try:
            # Handle bytes / file-like buffer or filepath
            if isinstance(uploaded_file, (str, Path)):
                with pdfplumber.open(uploaded_file) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
            elif hasattr(uploaded_file, "read"):
                # File-like object (e.g. SpooledTemporaryFile or BytesIO)
                uploaded_file.seek(0)
                with pdfplumber.open(uploaded_file) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
            elif isinstance(uploaded_file, bytes):
                with pdfplumber.open(io.BytesIO(uploaded_file)) as pdf:
                    for page in pdf.pages:
                        page_text = page.extract_text()
                        if page_text:
                            text += page_text + "\n"
        except Exception as e:
            print(f"[ResumeParser] Error reading PDF: {e}")

        return text.strip()

    def extract_pdf_text(self, uploaded_file) -> str:
        """Alias for backward compatibility."""
        return self.extract_text(uploaded_file)
