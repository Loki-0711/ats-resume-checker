import type { AnalysisResult, RecentScan, SampleProfile } from '../types';

export const defaultSoftwareEngineerResult: AnalysisResult = {
  id: 'scan-swe-082',
  jobTitle: 'Software Engineer',
  company: 'Stripe / CloudTech Systems',
  candidateName: 'Lokesh',
  fileName: 'Lokesh_Software_Engineer_Resume.pdf',
  fileSize: '248 KB',
  overallScore: 82,
  scoreLabel: 'Strong Match',
  comparisonVsAverage: 12,
  breakdown: {
    skillsMatch: 88,
    experienceRelevance: 79,
    keywordCoverage: 84,
    resumeQuality: 76,
  },
  matchingSkills: [
    'Python',
    'SQL',
    'Machine Learning',
    'Pandas',
    'Data Analysis',
    'NLP',
    'REST APIs',
    'Git',
    'FastAPI',
    'Scikit-Learn',
  ],
  missingSkills: [
    'Docker',
    'AWS',
    'Kubernetes',
    'CI/CD',
  ],
  whyMissingMatters:
    'These skills appear heavily weighted in the job description requirements for production deployment and cloud infrastructure, but were not detected in your resume.',
  skillCategories: [
    { name: 'Technical Skills', matchRate: 92, matchedCount: 8, totalCount: 9 },
    { name: 'Tools & DevOps', matchRate: 50, matchedCount: 3, totalCount: 6 },
    { name: 'Cloud Infrastructure', matchRate: 40, matchedCount: 2, totalCount: 5 },
    { name: 'Soft & Analytical Skills', matchRate: 95, matchedCount: 6, totalCount: 6 },
  ],
  suggestions: [
    {
      id: 'sug-1',
      title: 'Add Docker Experience',
      explanation: 'Consider adding Docker-related containerization projects or experience if applicable. The JD mentions containerized microservices 4 times.',
      priority: 'high',
      impact: '+5% match boost',
      category: 'Cloud/DevOps',
      exampleBefore: 'Built and deployed Python ML prediction microservices.',
      exampleAfter: 'Containerized Python prediction services via multi-stage Docker builds, reducing image footprint by 45%.',
    },
    {
      id: 'sug-2',
      title: 'Highlight AWS Knowledge',
      explanation: 'Your resume could benefit from mentioning relevant AWS experience (e.g. S3, Lambda, EC2) or certifications to satisfy cloud requirements.',
      priority: 'high',
      impact: '+4% match boost',
      category: 'Cloud/DevOps',
      exampleBefore: 'Hosted web dashboard on external cloud server.',
      exampleAfter: 'Architected and provisioned serverless inference pipelines using AWS Lambda, API Gateway, and S3.',
    },
    {
      id: 'sug-3',
      title: 'Quantify Achievements',
      explanation: 'Add measurable outcomes to your project and experience descriptions instead of listing purely operational duties.',
      priority: 'medium',
      impact: '+3% match boost',
      category: 'Metrics',
      exampleBefore: 'Improved database query speed for customer search.',
      exampleAfter: 'Refactored SQL queries with compound indexes, achieving a 3.4x decrease in latency for 100k+ daily users.',
    },
    {
      id: 'sug-4',
      title: 'Improve Project Descriptions',
      explanation: 'Use stronger action verbs (e.g., spearheaded, benchmarked, engineered) and emphasize measurable technical scope.',
      priority: 'medium',
      impact: '+2% match boost',
      category: 'Keywords',
      exampleBefore: 'Worked on natural language processing models for resumes.',
      exampleAfter: 'Engineered end-to-end TF-IDF vectorization and cosine similarity scoring engine for automated resume ranking.',
    },
  ],
  donutData: [
    { name: 'Matching Skills', value: 72, color: '#38bdf8' },
    { name: 'Partial Fit', value: 16, color: '#818cf8' },
    { name: 'Missing Keywords', value: 12, color: '#f43f5e' },
  ],
  radarData: [
    { subject: 'Skills', score: 88, fullMark: 100 },
    { subject: 'Experience', score: 79, fullMark: 100 },
    { subject: 'Projects', score: 92, fullMark: 100 },
    { subject: 'Keywords', score: 84, fullMark: 100 },
    { subject: 'Achievements', score: 76, fullMark: 100 },
  ],
  resumeSnippet: `SUMMARY:
Experienced Software Engineer with a deep foundation in Python, Machine Learning, and backend architectures. Proven record of building high-throughput NLP and Data Analysis pipelines with Pandas, Scikit-Learn, and FastAPI.

EXPERIENCE:
Software Engineer | Predictive AI Labs
- Designed and maintained REST APIs using FastAPI and Python for internal data ingestion.
- Built NLP text processing pipelines utilizing Tokenization, Lemmatization, and TF-IDF vectorization.
- Analyzed and aggregated multi-million record SQL datasets with Pandas and NumPy.
- Collaborated via Git version control across a distributed engineering team.`,
  jobDescriptionSnippet: `ROLE OVERVIEW:
We are looking for a Software Engineer to join our core intelligence team. You will build and scale backend services, data pipelines, and machine learning models.

REQUIREMENTS:
- 3+ years experience with Python, SQL, and Machine Learning libraries (Pandas, Scikit-Learn).
- Solid grasp of NLP concepts, text processing, and TF-IDF / vector search.
- Hands-on experience with Docker containerization and Kubernetes cluster management.
- Demonstrated background with AWS cloud services (S3, EC2, ECS) and CI/CD automated deployment pipelines.
- Bachelor's in Computer Science or equivalent.`,
  analyzedAt: 'Just now',
};

export const sampleProfiles: SampleProfile[] = [
  {
    id: 'sample-swe',
    label: 'Software Engineer (82%)',
    role: 'Software Engineer',
    company: 'Stripe / CloudTech',
    resumeFileName: 'Lokesh_SWE_Resume.pdf',
    resumeText: `LOKESH — SOFTWARE ENGINEER
Email: lokesh@example.com | GitHub: github.com/lokesh-dev

PROFESSIONAL SUMMARY
Dynamic Software Engineer specializing in Python, Machine Learning, and NLP architectures. Passionate about building scalable algorithmic scoring systems, RESTful microservices, and high-performance data processing pipelines.

CORE COMPETENCIES
- Programming: Python, SQL, TypeScript, Bash
- Frameworks & Libraries: FastAPI, Flask, Scikit-Learn, Pandas, NumPy, NLP tools
- Architecture: REST APIs, Microservices, Relational DBs, Git Version Control

EXPERIENCE
Software Engineer — AI Systems (2023 – Present)
- Developed and deployed TF-IDF and Cosine Similarity algorithmic scoring modules for document matching.
- Implemented asynchronous FastAPI microservices serving over 50k requests daily.
- Optimized complex SQL queries and analytics pipelines, reducing ETL latency by 35%.`,
    jobDescription: `Job Title: Software Engineer — Core Systems
Company: CloudTech Systems
Location: San Francisco, CA (Remote eligible)

About the Role:
We are seeking an ambitious Software Engineer to join our Core AI Systems team. You will lead development of document parsing, semantic analysis pipelines, and production backend services.

Key Responsibilities:
- Design robust services using Python, FastAPI, and relational SQL databases.
- Implement NLP and Machine Learning workflows including TF-IDF vectorization and cosine similarity scoring.
- Package and deploy applications using Docker containers and orchestrate deployments via Kubernetes.
- Leverage AWS cloud services (ECS, S3, RDS) and automate CI/CD delivery pipelines.
- Collaborate with product and data science teams to deliver enterprise-grade performance.`,
    mockResult: defaultSoftwareEngineerResult,
  },
  {
    id: 'sample-mle',
    label: 'ML Engineer (91%)',
    role: 'Machine Learning Engineer',
    company: 'OpenTech AI',
    resumeFileName: 'Lokesh_MLE_Resume.pdf',
    resumeText: `LOKESH — MACHINE LEARNING ENGINEER
SUMMARY
Machine Learning Engineer with 4+ years of experience designing deep learning models, transformer fine-tuning, vector databases, and production inference systems.

SKILLS: Python, PyTorch, HuggingFace, Docker, AWS, Vector DBs, Kubernetes, MLOps, CI/CD, SQL.`,
    jobDescription: `Machine Learning Engineer needed for AI agents platform. Deep knowledge of Python, PyTorch, Docker, Kubernetes, AWS, and modern NLP architectures required.`,
    mockResult: {
      ...defaultSoftwareEngineerResult,
      id: 'scan-mle-091',
      jobTitle: 'Machine Learning Engineer',
      company: 'OpenTech AI',
      overallScore: 91,
      scoreLabel: 'Strong Match',
      comparisonVsAverage: 21,
      breakdown: {
        skillsMatch: 95,
        experienceRelevance: 89,
        keywordCoverage: 92,
        resumeQuality: 88,
      },
      matchingSkills: [
        'Python',
        'Machine Learning',
        'PyTorch',
        'NLP',
        'Docker',
        'AWS',
        'Vector DBs',
        'SQL',
        'FastAPI',
      ],
      missingSkills: ['Kubernetes Helm Charts', 'Triton Inference Server'],
      suggestions: [
        {
          id: 'sug-mle-1',
          title: 'Highlight Triton Serving',
          explanation: 'Adding Triton or vLLM deployment benchmarks will push your resume into the 98th percentile.',
          priority: 'medium',
          impact: '+4% boost',
          category: 'Experience',
        },
      ],
    },
  },
  {
    id: 'sample-data',
    label: 'Data Analyst (76%)',
    role: 'Data Analyst',
    company: 'FinTech Corp',
    resumeFileName: 'Lokesh_Data_Analyst.pdf',
    resumeText: `LOKESH — DATA ANALYST
Expertise in SQL, Tableau, Power BI, Python Pandas, and statistical forecasting. Experience creating executive dashboards and financial cohort analysis.`,
    jobDescription: `Senior Data Analyst with advanced SQL, Python, Snowflake, dbt, and business intelligence storytelling.`,
    mockResult: {
      ...defaultSoftwareEngineerResult,
      id: 'scan-data-076',
      jobTitle: 'Data Analyst',
      company: 'FinTech Corp',
      overallScore: 76,
      scoreLabel: 'Good Match',
      comparisonVsAverage: 6,
      breakdown: {
        skillsMatch: 81,
        experienceRelevance: 74,
        keywordCoverage: 78,
        resumeQuality: 71,
      },
      matchingSkills: ['SQL', 'Python', 'Pandas', 'Data Analysis', 'Tableau', 'Statistics'],
      missingSkills: ['Snowflake', 'dbt', 'Data Modeling', 'Looker'],
      suggestions: [
        {
          id: 'sug-data-1',
          title: 'Incorporate dbt or Warehouse Experience',
          explanation: 'Mention modern data stack tools like Snowflake or dbt if you have collaborated on analytics engineering.',
          priority: 'high',
          impact: '+7% boost',
          category: 'Keywords',
        },
      ],
    },
  },
];

export const dashboardRecentScans: RecentScan[] = [
  {
    id: 'scan-swe-082',
    jobTitle: 'Software Engineer',
    company: 'Stripe / CloudTech',
    score: 82,
    date: 'Today, 2:45 PM',
    status: 'Strong Match',
    matchingCount: 10,
    missingCount: 4,
  },
  {
    id: 'scan-mle-091',
    jobTitle: 'Machine Learning Engineer',
    company: 'OpenTech AI',
    score: 91,
    date: 'Yesterday, 6:10 PM',
    status: 'Strong Match',
    matchingCount: 12,
    missingCount: 2,
  },
  {
    id: 'scan-py-087',
    jobTitle: 'Python Backend Developer',
    company: 'CloudScale Tech',
    score: 87,
    date: 'Sep 02, 2026',
    status: 'Strong Match',
    matchingCount: 9,
    missingCount: 3,
  },
  {
    id: 'scan-data-076',
    jobTitle: 'Data Analyst',
    company: 'FinTech Corp',
    score: 76,
    date: 'Aug 29, 2026',
    status: 'Good Match',
    matchingCount: 8,
    missingCount: 5,
  },
];
