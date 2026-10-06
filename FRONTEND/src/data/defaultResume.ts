import type { ResumeData } from '../types/resume';

export const defaultResumeData: ResumeData = {
  personal: {
    fullName: 'Lokesh Kumar',
    jobTitle: 'Full-Stack Software Engineer & AI Enthusiast',
    email: 'lokesh.developer@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/lokesh-dev',
    github: 'github.com/lokesh-code',
    portfolio: 'lokesh.dev',
  },
  summary:
    'Passionate Full-Stack Engineer and BCA graduate specializing in building scalable web architectures and AI-powered intelligence systems. Proficient in Python, React, TypeScript, FastAPI, and NLP vector algorithms with strong foundation in database modeling and RESTful API design.',
  experience: [
    {
      id: 'exp-1',
      company: 'TechCorp Solutions',
      role: 'Full Stack Developer Intern',
      location: 'Bangalore, India',
      startDate: 'Jan 2024',
      endDate: 'Present',
      current: true,
      bullets: [
        'Architected and deployed responsive React 19 and TypeScript dashboards serving 15,000+ monthly active users.',
        'Engineered high-throughput FastAPI microservices, reducing API response times by 38% through query caching.',
        'Implemented automated CI/CD deployment pipelines using Docker containers and GitHub Actions.',
      ],
    },
    {
      id: 'exp-2',
      company: 'Innovate AI Labs',
      role: 'NLP & Software Engineering Apprentice',
      location: 'Remote',
      startDate: 'Jun 2023',
      endDate: 'Dec 2023',
      current: false,
      bullets: [
        'Built automated text extraction and vector similarity ranking pipelines using SpaCy, TF-IDF, and Cosine Similarity.',
        'Extracted unstructured text from 2,000+ complex PDF documents with 99.4% parsing fidelity using pdfplumber.',
        'Integrated PostgreSQL and SQLite relational databases with optimized index structures for keyword queries.',
      ],
    },
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Bangalore City University',
      degree: 'Bachelor of Computer Applications (BCA)',
      fieldOfStudy: 'Computer Science & Software Systems',
      graduationYear: '2024',
      gpa: '8.8 / 10.0',
    },
  ],
  skills: {
    technical: [
      'Python',
      'TypeScript',
      'JavaScript',
      'React',
      'FastAPI',
      'SQL',
      'Pandas',
      'NumPy',
      'Scikit-learn',
      'NLP (SpaCy)',
    ],
    tools: ['Git', 'Docker', 'PostgreSQL', 'SQLite', 'Tailwind CSS', 'Vite', 'Postman', 'Linux'],
    soft: ['Analytical Thinking', 'Problem Solving', 'Team Collaboration', 'Agile / Scrum'],
  },
  projects: [
    {
      id: 'proj-1',
      name: 'AI-Powered ATS Resume Ranking System',
      technologies: 'Python, FastAPI, React, TypeScript, SpaCy, TF-IDF, SQLite',
      link: 'github.com/lokesh/ats-resume-ranking',
      bullets: [
        'Engineered an intelligent applicant tracking system calculating semantic match scores between resumes and job descriptions.',
        'Built interactive React + Tailwind CSS dashboard with radar charts, score breakdowns, and personalized improvement suggestions.',
        'Processed natural language tokens with stopword filtering and lemmatization to rank candidate qualifications.',
      ],
    },
    {
      id: 'proj-2',
      name: 'Real-Time Cloud Inventory Management System',
      technologies: 'React, Node.js, Express, PostgreSQL, Tailwind CSS',
      link: 'github.com/lokesh/inventory-app',
      bullets: [
        'Developed end-to-end inventory tracking portal featuring real-time stock alert webhooks and role-based access control.',
        'Optimized relational database queries to handle 50,000+ product SKUs with sub-100ms response time.',
      ],
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Applied Machine Learning & Natural Language Processing',
      issuer: 'DeepLearning.AI / Coursera',
      year: '2023',
    },
    {
      id: 'cert-2',
      name: 'Modern Full-Stack React & TypeScript Development',
      issuer: 'Meta Professional Certifications',
      year: '2024',
    },
  ],
  templateStyle: 'modern',
};
