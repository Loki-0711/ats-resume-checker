# 🤖 AI-Powered ATS Resume Ranking, Intelligent Job Matching & Resume Builder System

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6.0+-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![SpaCy](https://img.shields.io/badge/SpaCy-3.8+-09A3D5?style=for-the-badge&logo=spacy&logoColor=white)](https://spacy.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

An end-to-end, AI-powered Applicant Tracking System (ATS) platform that analyzes resumes against target job descriptions using Natural Language Processing (NLP). The system calculates an ATS compatibility score, identifies matched and missing technical competencies, provides intelligent resume optimization advice, features a **built-in AI Career Assistant chatbot**, and includes an **interactive ATS-Optimized Resume Builder with 1-click PDF export**.

---

## 📌 Key System Components

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                               ATS RESUME INTELLIGENCE PLATFORM                         │
└────────────────────────────────────────────────────────────────────────────────────────┘
          │                                 │                                 │
          ▼                                 ▼                                 ▼
┌───────────────────┐             ┌───────────────────┐             ┌───────────────────┐
│   ATS ANALYZER    │             │ AI CHAT ASSISTANT │             │  RESUME BUILDER   │
├───────────────────┤             ├───────────────────┤             ├───────────────────┤
│ • TF-IDF Vector   │             │ • Context-aware   │             │ • Single-column   │
│ • Cosine Match    │ ──────────► │ • STAR rewriter   │ ──────────► │ • 1-Click Missing │
│ • Skill Gap Audit │             │ • Interview prep  │             │   Skills Injector │
│ • Radar Analytics │             │ • Gemini API link │             │ • Clean PDF Print │
└───────────────────┘             └───────────────────┘             └───────────────────┘
```

---

## ✨ Features

### 1. 📊 ATS Resume Scoring & Job Matching
* **PDF Text Extraction:** Parses PDF resumes automatically using `pdfplumber` with binary buffer support.
* **NLP Preprocessing Pipeline:** Tokenization, lowercasing, punctuation stripping, stopword filtering, and lemmatization via SpaCy (`en_core_web_sm`).
* **Semantic Vector Similarity:** Computes directional cosine similarity between resume and job description TF-IDF feature matrices.
* **Bidirectional Skill Matching:** Identifies competencies required by the job description and separates them into **Matching Skills** and **Missing Skills**.
* **Visual Analytics:** Interactive Radar performance charts, Donut skill distribution charts, and four-pillar score breakdowns (Skills Match, Keyword Coverage, Experience Relevance, Format Quality).

### 2. 🤖 AI Chat Career Assistant (New)
* **Context-Aware Coaching:** Synced with the active ATS scan results, candidate profile, and target role.
* **STAR Method Bullet Rewriter:** Instantly transforms passive bullet points into high-impact, metric-driven achievements.
* **Missing Skill Advisory:** Explains why detected missing keywords matter for the specific position and how to acquire or showcase them.
* **Interview Preparation:** Generates role-specific behavioral and technical interview questions targeting identified resume strengths and gaps.
* **Hybrid Engine:** Works out-of-the-box using the local ATS knowledge base; also supports plugging in a **Google Gemini API Key** for live generative responses.

### 3. 📝 Interactive ATS-Optimized Resume Builder (New)
* **100% Parser Compliant:** Pure single-column layout, standard section hierarchies, and clean typography that prevents ATS parsing collisions.
* **1-Click Missing Skills Injector:** Dynamically displays missing skills identified in your latest ATS scan—click any skill to immediately inject it into your resume.
* **Tabbed Editor:** Dedicated controls for Personal Details, Professional Summary, Work Experience, Education, Technical Skills, Projects, and Certifications.
* **Live Side-by-Side Paper Preview:** Real-time rendering with three ATS-tested templates: **Modern**, **Classic**, and **Minimal**.
* **1-Click PDF Export:** Clean print media formatting (`@media print`) that saves standard US Letter / A4 PDFs directly from the browser without third-party watermarks.
* **JSON State Persistence:** Export your resume data to a `.json` backup and restore it anytime with one click.

---

## 🛠️ Tech Stack

### Frontend
* **Framework:** React 19 + TypeScript
* **Build Tool:** Vite 6
* **Styling:** Tailwind CSS v4 + Framer Motion
* **Visualizations:** Recharts (Radar charts, Donut charts) + Lucide React Icons
* **3D Canvas:** Three.js / React Three Fiber

### Backend
* **Language:** Python 3.11+
* **API Framework:** FastAPI + Uvicorn (ASGI)
* **NLP & ML:** SpaCy (`en_core_web_sm`), scikit-learn (`TfidfVectorizer`, `cosine_similarity`)
* **PDF Parser:** `pdfplumber`
* **Database:** SQLite 3 (Curated skills database & tailored suggestions)

---

## 📂 Project Directory Structure

```text
ats_resume_ranking/
├── BACKEND/
│   ├── DATA/
│   │   └── skills.csv                # Curated dataset of 40+ skills with tailored advice
│   ├── DATABASE/
│   │   ├── ats.db                    # SQLite database containing seeded skills
│   │   ├── database.py               # Database connection manager
│   │   └── init_db.py                # Database initialization script
│   ├── SERVICES/
│   │   ├── matcher.py                # TF-IDF vectorizer & Cosine Similarity calculator
│   │   ├── parser.py                 # Multi-format PDF text extraction
│   │   ├── preprocess.py             # SpaCy NLP preprocessing & lemmatization
│   │   ├── skills.py                 # Bidirectional skill matching engine
│   │   └── suggestions.py            # Curated database suggestion generator
│   ├── main.py                       # FastAPI server & ATSAnalyzer core pipeline
│   └── requirements.txt              # Backend dependencies
├── FRONTEND/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatAssistantWidget.tsx # Floating AI Career Assistant drawer
│   │   │   ├── ATSScore.tsx          # Circular score visualizer
│   │   │   ├── AnalyticsCharts.tsx   # Recharts radar & donut charts
│   │   │   ├── AISuggestions.tsx     # Actionable recommendation cards
│   │   │   ├── MissingSkills.tsx     # Skill gap badges & explanations
│   │   │   ├── Navbar.tsx            # Navigation header with Builder & Assistant links
│   │   │   ├── ResumeUploader.tsx    # Drag-and-drop resume uploader
│   │   │   └── ...                   # Supporting UI components
│   │   ├── pages/
│   │   │   ├── Home.tsx              # Landing showcase
│   │   │   ├── Analyze.tsx           # Resume upload & JD analyzer studio
│   │   │   ├── Results.tsx           # Full ATS audit report & analytics
│   │   │   ├── ResumeBuilder.tsx     # ATS-compliant interactive resume builder
│   │   │   └── Dashboard.tsx         # Scan history & performance metrics
│   │   ├── services/
│   │   │   ├── api.ts                # Backend communication & mock fallback
│   │   │   └── aiChatService.ts      # AI assistant engine with Gemini support
│   │   ├── types/                    # TypeScript interfaces for ATS & Resume data
│   │   └── data/                     # Sample profiles & default resume templates
│   ├── package.json
│   └── vite.config.ts
├── requirements.txt                  # Root Python requirements
├── .gitignore                        # Git exclusion rules
└── README.md                         # Project documentation
```

---

## 🚀 Getting Started

Follow these steps to run the complete full-stack system locally:

### 1. Prerequisites
* **Python 3.11+** installed
* **Node.js 18+** & **npm** installed
* **Git** installed

---

### 2. Backend Setup (FastAPI & NLP Engine)

```bash
# 1. Clone repository
git clone https://github.com/your-username/ats_resume_ranking.git
cd ats_resume_ranking

# 2. Create and activate a Python virtual environment
python -m venv venv

# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS/Linux:
source venv/bin/activate

# 3. Install Python dependencies
pip install -r requirements.txt

# 4. Download SpaCy English NLP model
python -m spacy download en_core_web_sm

# 5. Initialize the SQLite Skills Database
python -m BACKEND.DATABASE.init_db

# 6. Start the FastAPI server
python -m BACKEND.main
```
The FastAPI backend will start at: `http://localhost:8000` (API documentation available at `http://localhost:8000/docs`).

---

### 3. Frontend Setup (React & Vite Dashboard)

Open a **second terminal window**:

```bash
# 1. Navigate to FRONTEND directory
cd ats_resume_ranking/FRONTEND

# 2. Install dependencies
npm install

# 3. Launch the Vite development server
npm run dev
```

Open your browser at: **`http://localhost:5173`**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check and engine uptime status |
| `GET` | `/api/skills` | Returns list of all known skills, categories & suggestions |
| `POST` | `/api/analyze` | Accepts `resume_file` (PDF) or `resume_text` + `job_description` and returns complete `AnalysisResult` |

---

## 💡 How to Use the System

1. **Analyze a Resume:**
   * Navigate to `/analyze`.
   * Upload a PDF resume or paste raw resume text.
   * Paste the target Job Description (or click one of the pre-loaded industry presets).
   * Click **"Run Intelligent Analysis"**.
2. **Review ATS Results:**
   * View your **ATS Match Percentage**, **Matching Skills**, and **Missing Skills**.
   * Explore the interactive **Skill Radar Chart** and **Category Breakdown**.
   * Review tailored suggestions on how to improve your score.
3. **Chat with the AI Assistant:**
   * Click the **"AI ATS Assistant"** button at the bottom-right of any screen.
   * Ask questions like: *"How can I improve my score?"*, *"Rewrite my experience bullets with metrics"*, or *"Generate interview questions"*.
   * (Optional) Click the Key icon to provide a Google Gemini API Key for live LLM responses.
4. **Build & Optimize Your Resume:**
   * Click **"Resume Builder"** in the top navigation or **"Fix in Resume Builder"** from the Results page.
   * Review missing skills flagged from your job description and click **"+"** to inject them directly into your resume.
   * Choose your preferred template (**Modern**, **Classic**, or **Minimal**).
   * Click **"Download PDF"** to save a clean, parser-ready single-column ATS resume!

---

## 👨‍💻 Author

**Lokesh**  
*Bachelor of Computer Applications (BCA)*  
Passionate about Full-Stack Engineering, Python, Natural Language Processing, and Artificial Intelligence.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
