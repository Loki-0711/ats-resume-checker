import type { AnalysisResult, RecentScan, SampleProfile, JobPost, JobMatchRanking, ResumeWeakness, MatchVerdict } from '../types';

export const jobPostsCatalog: JobPost[] = [
  {
    id: 'job-swe-stripe',
    title: 'Senior Full Stack Engineer',
    company: 'Stripe',
    companyColor: '#635bff',
    category: 'Software Engineering',
    location: 'Bangalore / San Francisco (Hybrid)',
    region: 'India / US / Remote',
    jobType: 'Full-time',
    experience: '3 - 6 Years',
    salary: '₹28 - 45 LPA / $150,000 - $190,000',
    postedDate: '1 day ago',
    coreSkills: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'PostgreSQL', 'Docker', 'Git'],
    secondarySkills: ['AWS', 'Redis', 'Microservices', 'REST APIs', 'Tailwind CSS', 'GraphQL'],
    description: 'Build world-class financial infrastructure and scalable APIs powering global internet commerce.',
    responsibilities: [
      'Design, build, and maintain high-performance web applications and backend APIs in TypeScript and Python.',
      'Collaborate with product designers and platform engineers to deliver intuitive financial dashboards.',
      'Optimize distributed database queries and caching layers across PostgreSQL and Redis clusters.',
      'Implement CI/CD workflows, automated testing suites, and containerized deployments via Docker.'
    ],
    requirements: [
      '3+ years of professional full-stack software development experience.',
      'Strong command of modern JavaScript/TypeScript, React, and server-side runtimes (Node.js or Python).',
      'Deep understanding of relational databases (PostgreSQL/MySQL) and RESTful API architecture.',
      'Familiarity with cloud hosting (AWS/GCP), Docker containerization, and automated testing.'
    ],
    templateJd: (
      'Stripe is hiring a Senior Full Stack Engineer to scale payment systems and developer dashboards. ' +
      'Required: Strong proficiency in React, TypeScript, Node.js, Python, PostgreSQL, REST APIs, Git, and Docker. ' +
      'Experience in cloud deployments (AWS), Redis caching, and building secure, high-availability microservices is highly desired.'
    ),
    cutoffScore: 75,
  },
  {
    id: 'job-backend-razorpay',
    title: 'Senior Backend Engineer',
    company: 'Razorpay',
    companyColor: '#0c2340',
    category: 'Backend & Cloud',
    location: 'Bangalore, India (Hybrid)',
    region: 'India',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '₹22 - 38 LPA',
    postedDate: 'Just now',
    coreSkills: ['Python', 'FastAPI', 'SQL', 'PostgreSQL', 'Docker', 'Git', 'REST APIs'],
    secondarySkills: ['AWS', 'Redis', 'Kafka', 'Django', 'Microservices', 'Kubernetes', 'MySQL'],
    description: 'Architects scalable payment rails, transaction processing microservices, and high-throughput financial APIs.',
    responsibilities: [
      'Architect and deploy mission-critical microservices handling tens of thousands of requests per second.',
      'Design highly resilient data storage schemes with PostgreSQL, MySQL, and distributed caching in Redis.',
      'Ensure 99.99% uptime and low latency across payment gateway and settlement microservices.',
      'Spearhead code reviews, technical roadmaps, and mentoring junior software engineers.'
    ],
    requirements: [
      'Strong foundation in Python (FastAPI, Django) or Go for building backend systems.',
      'Extensive experience with relational databases (PostgreSQL/MySQL), transaction isolation, and query optimization.',
      'Hands-on experience with Docker, container orchestration, and message queues (Kafka/RabbitMQ).',
      'Demonstrated ability to write clean, unit-tested, and maintainable code in an agile environment.'
    ],
    templateJd: (
      'Razorpay is looking for a Backend Engineer to build robust distributed financial transaction systems. ' +
      'Must have strong hands-on experience with Python (FastAPI/Django), relational databases (PostgreSQL/SQL), ' +
      'Docker containerization, REST APIs, and API performance tuning. Experience with AWS, Redis, and Kafka is a strong plus.'
    ),
    cutoffScore: 72,
  },
  {
    id: 'job-frontend-vercel',
    title: 'Lead Frontend Engineer',
    company: 'Vercel',
    companyColor: '#000000',
    category: 'Web Development',
    location: 'Remote (Global)',
    region: 'Remote',
    jobType: 'Remote',
    experience: '3 - 7 Years',
    salary: '$130,000 - $175,000',
    postedDate: '3 days ago',
    coreSkills: ['React', 'TypeScript', 'Next.js', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS'],
    secondarySkills: ['GraphQL', 'Jest', 'Vite', 'Git', 'Web Vitals', 'Accessibility (a11y)'],
    description: 'Crafts hyper-responsive developer interfaces, lightning-fast rendering components, and modern web applications.',
    responsibilities: [
      'Lead frontend engineering for customer-facing deployment interfaces and telemetry consoles.',
      'Optimize Core Web Vitals, SSR/SSG workflows, and client-side rendering performance.',
      'Build design systems and modular UI component libraries utilizing Tailwind CSS and React.',
      'Collaborate closely with UX researchers and backend engineers to integrate REST/GraphQL endpoints.'
    ],
    requirements: [
      'Advanced expertise in React, Next.js, and TypeScript.',
      'Deep understanding of browser DOM internals, client caching, and modern web performance tuning.',
      'Demonstrated eye for design fidelity, responsiveness, and web accessibility standards.',
      'Experience working with Git-based deployment workflows and continuous integration.'
    ],
    templateJd: (
      'Join Vercel as a Lead Frontend Engineer. You will craft next-generation developer consoles and web experiences. ' +
      'Required: Expert command of React, Next.js, TypeScript, Tailwind CSS, HTML, CSS, and modern JavaScript. ' +
      'Strong focus on web performance, Core Web Vitals, and responsive UI component development.'
    ),
    cutoffScore: 70,
  },
  {
    id: 'job-ds-swiggy',
    title: 'Senior Data Scientist & ML Engineer',
    company: 'Swiggy',
    companyColor: '#fc8019',
    category: 'AI & Machine Learning',
    location: 'Bangalore / Hyderabad, India',
    region: 'India',
    jobType: 'Full-time',
    experience: '2 - 6 Years',
    salary: '₹24 - 40 LPA',
    postedDate: '2 days ago',
    coreSkills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'SQL', 'Machine Learning'],
    secondarySkills: ['PyTorch', 'TensorFlow', 'NLP', 'Matplotlib', 'FastAPI', 'Docker', 'Feature Engineering'],
    description: 'Develops predictive routing models, demand forecasting neural algorithms, and real-time recommendation engines.',
    responsibilities: [
      'Build production-grade machine learning models for dynamic pricing, ETA prediction, and customer personalization.',
      'Perform exploratory data analysis on petabytes of order data using Python, Pandas, and distributed SQL.',
      'Design end-to-end ML pipelines from feature engineering to model serving via RESTful APIs.',
      'Run rigorous A/B experiments to evaluate algorithmic performance against baseline metrics.'
    ],
    requirements: [
      'Degree in Computer Science, Statistics, Mathematics, or equivalent quantitative discipline.',
      'Proven track record with Python, Pandas, NumPy, Scikit-learn, and SQL in production environments.',
      'Solid grasp of supervised/unsupervised machine learning algorithms and statistical evaluation metrics.',
      'Familiarity with deep learning frameworks (PyTorch or TensorFlow) or NLP techniques is a plus.'
    ],
    templateJd: (
      'Swiggy is seeking a Senior Data Scientist / ML Engineer to power predictive intelligence across our logistics network. ' +
      'Required: deep expertise in Python, Pandas, NumPy, Scikit-learn, SQL, machine learning algorithms, and feature engineering. ' +
      'Familiarity with PyTorch/TensorFlow, model deployment, and statistical hypothesis testing is highly valued.'
    ),
    cutoffScore: 72,
  },
  {
    id: 'job-devops-datadog',
    title: 'Cloud & DevOps Infrastructure Engineer',
    company: 'Datadog',
    companyColor: '#632ca6',
    category: 'Infrastructure',
    location: 'San Francisco / Remote US',
    region: 'United States',
    jobType: 'Remote',
    experience: '3 - 6 Years',
    salary: '$135,000 - $185,000',
    postedDate: '4 days ago',
    coreSkills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'Linux', 'CI/CD'],
    secondarySkills: ['Terraform', 'Python', 'Prometheus', 'Azure', 'PostgreSQL', 'Bash', 'Networking'],
    description: 'Automates multi-region Kubernetes clusters, implements GitOps CI/CD pipelines, and manages scalable cloud infrastructure.',
    responsibilities: [
      'Manage multi-tenant Kubernetes clusters running across AWS and GCP environments.',
      'Automate infrastructure provisioning using Infrastructure as Code (Terraform) and GitOps tooling.',
      'Build robust CI/CD pipelines ensuring automated testing, security scanning, and zero-downtime releases.',
      'Monitor system observability, SLAs, and uptime metrics using Prometheus, Grafana, and Datadog.'
    ],
    requirements: [
      '3+ years managing production cloud infrastructure (AWS or GCP).',
      'Deep practical experience with Docker containerization, Kubernetes orchestration, and Linux systems administration.',
      'Proficiency in scripting with Python or Bash to automate repetitive engineering workflows.',
      'Strong understanding of networking protocols, load balancers, and cloud security best practices.'
    ],
    templateJd: (
      'Datadog is hiring a Cloud & DevOps Engineer to scale globally distributed infrastructure. ' +
      'Responsibilities include managing Kubernetes clusters, Docker containerization, AWS cloud architecture, ' +
      'Linux systems, CI/CD automation, and ensuring zero-downtime deployments via GitOps.'
    ),
    cutoffScore: 70,
  },
  {
    id: 'job-ai-openai',
    title: 'Generative AI & LLM Systems Engineer',
    company: 'OpenAI / Scale AI',
    companyColor: '#10a37f',
    category: 'Generative AI',
    location: 'San Francisco, CA / Remote',
    region: 'United States / Remote',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '$160,000 - $220,000',
    postedDate: 'Just now',
    coreSkills: ['Python', 'FastAPI', 'NLP', 'LangChain', 'spaCy', 'Git'],
    secondarySkills: ['PyTorch', 'Docker', 'Vector DBs', 'RAG', 'SQL', 'Prompt Engineering'],
    description: 'Engineers production-grade agentic pipelines, Retrieval-Augmented Generation (RAG) systems, and custom LLM inference APIs.',
    responsibilities: [
      'Architect and deploy low-latency LLM agent pipelines using LangChain, vector databases, and Python.',
      'Build context-aware Retrieval-Augmented Generation (RAG) microservices in FastAPI.',
      'Benchmark and optimize token efficiency, prompt caching, and evaluation harnesses for model outputs.',
      'Collaborate with safety and infrastructure teams to ensure alignment, guardrails, and compliance.'
    ],
    requirements: [
      'Strong software engineering foundation in Python with hands-on experience building asynchronous APIs (FastAPI).',
      'Practical experience building with transformer models, embeddings, LangChain, or vector search systems.',
      'Familiarity with natural language processing (NLP), tokenizers, and text preprocessing.',
      'Comfort with containerization (Docker) and deploying AI microservices into production.'
    ],
    templateJd: (
      'Fast-paced AI lab looking for an AI & LLM Systems Engineer. You will engineer production-grade agents and RAG pipelines ' +
      'using LangChain, vector databases, and Python FastAPI services. Strong foundation in NLP, Python backend engineering, ' +
      'and experience with transformer architectures required.'
    ),
    cutoffScore: 75,
  },
  {
    id: 'job-analytics-uber',
    title: 'Senior Data Analyst & BI Specialist',
    company: 'Uber',
    companyColor: '#000000',
    category: 'Data & Analytics',
    location: 'Bangalore / Amsterdam (Hybrid)',
    region: 'India / Europe',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '₹16 - 28 LPA / €70,000 - €95,000',
    postedDate: '3 days ago',
    coreSkills: ['SQL', 'Python', 'Pandas', 'Power BI', 'Data Analysis', 'Excel'],
    secondarySkills: ['Tableau', 'PostgreSQL', 'Statistics', 'A/B Testing', 'Git'],
    description: 'Transforms high-dimensional ride and delivery telemetry into executive KPI dashboards and data-backed business insights.',
    responsibilities: [
      'Author complex analytical SQL queries to extract, transform, and aggregate petabyte-scale mobility data.',
      'Design, automate, and maintain interactive business intelligence dashboards in Power BI and Tableau.',
      'Partner with city operations and product leads to identify conversion leaks and optimize marketplace efficiency.',
      'Conduct cohort analyses, retention curves, and statistical A/B test readouts.'
    ],
    requirements: [
      '2+ years of professional analytics experience writing high-performance SQL.',
      'Strong command of data wrangling in Python (Pandas) and spreadsheet modeling in Excel.',
      'Demonstrated track record of delivering executive-ready dashboards in Power BI or Tableau.',
      'Excellent communication skills with the ability to translate complex data into actionable recommendations.'
    ],
    templateJd: (
      'Uber is seeking a Data Analyst & BI Specialist. Responsibilities: writing complex SQL queries across massive databases, ' +
      'building executive Power BI/Tableau dashboards, conducting exploratory analysis using Python Pandas, ' +
      'and delivering data-driven strategic insights to operations leadership.'
    ),
    cutoffScore: 70,
  },
  {
    id: 'job-systems-google',
    title: 'Staff Systems Software Engineer',
    company: 'Google',
    companyColor: '#4285f4',
    category: 'Software Engineering',
    location: 'Mountain View, CA / Hyderabad, India',
    region: 'United States / India',
    jobType: 'Full-time',
    experience: '4 - 8 Years',
    salary: '$175,000 - $240,000 / ₹40 - 65 LPA',
    postedDate: '5 days ago',
    coreSkills: ['C++', 'C', 'Python', 'Git', 'Linux', 'SQL'],
    secondarySkills: ['Multi-threading', 'Distributed Systems', 'Docker', 'Algorithms', 'Networking'],
    description: 'Engineers foundational high-throughput distributed file systems, memory-optimized storage kernels, and core network fabrics.',
    responsibilities: [
      'Architect and optimize low-latency system components in modern C++ and C.',
      'Debug complex multi-threaded concurrency issues, race conditions, and memory allocations in Linux environments.',
      'Develop internal distributed RPC protocols and storage tiers serving millions of queries per second.',
      'Contribute to technical design documents and performance benchmarking across planetary-scale infrastructure.'
    ],
    requirements: [
      'BS or MS in Computer Science with 4+ years software development experience in C++ or C.',
      'Deep comprehension of computer architecture, operating system internals, memory management, and POSIX APIs.',
      'Strong grasp of foundational algorithms, data structures, and algorithmic complexity analysis.',
      'Familiarity with distributed systems and performance profiling tools.'
    ],
    templateJd: (
      'Join Google Core Infrastructure team as a Systems Software Engineer. Requires high proficiency in C++ or C, ' +
      'deep understanding of algorithms, multi-threading, memory management, and Linux systems programming. ' +
      'Experience building high-throughput distributed infrastructure is essential.'
    ),
    cutoffScore: 75,
  },
  {
    id: 'job-mobile-flipkart',
    title: 'Senior Mobile Engineer (React Native & Mobile)',
    company: 'Flipkart',
    companyColor: '#2874f0',
    category: 'Mobile Development',
    location: 'Bangalore, India',
    region: 'India',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '₹18 - 32 LPA',
    postedDate: '2 days ago',
    coreSkills: ['React', 'JavaScript', 'TypeScript', 'REST APIs', 'Git', 'HTML', 'CSS'],
    secondarySkills: ['Redux', 'Mobile Architecture', 'iOS', 'Android', 'Performance Optimization'],
    description: 'Develops lightning-fast consumer e-commerce mobile applications powering millions of daily transactions.',
    responsibilities: [
      'Build fluid, responsive cross-platform mobile app features using React Native and TypeScript.',
      'Optimize app launch times, frame rates (60fps), offline caching, and memory consumption.',
      'Integrate third-party SDKs, push notifications, and secure mobile checkout flows.',
      'Work alongside product managers and QA to ensure seamless app store deployments.'
    ],
    requirements: [
      'Strong command of React, JavaScript/TypeScript, and mobile state management (Redux/Zustand).',
      'Experience building and deploying applications to Google Play Store and Apple App Store.',
      'Deep understanding of mobile networking, RESTful API integration, and performance profiling.',
      'Passion for intuitive user experience, micro-interactions, and pixel perfection.'
    ],
    templateJd: (
      'Flipkart is seeking a Senior Mobile Engineer with strong experience in React Native, TypeScript, and modern JavaScript. ' +
      'Responsible for building responsive client interfaces, integrating REST APIs, state management, and optimizing mobile performance.'
    ),
    cutoffScore: 70,
  },
  {
    id: 'job-security-crowdstrike',
    title: 'Cybersecurity & DevSecOps Engineer',
    company: 'CrowdStrike',
    companyColor: '#e01a22',
    category: 'Security & Infrastructure',
    location: 'Remote / Austin, TX',
    region: 'United States / Remote',
    jobType: 'Remote',
    experience: '3 - 6 Years',
    salary: '$140,000 - $190,000',
    postedDate: '4 days ago',
    coreSkills: ['Python', 'Linux', 'Docker', 'Git', 'AWS', 'SQL'],
    secondarySkills: ['OWASP', 'SOC2', 'Kubernetes', 'CI/CD Security', 'Vulnerability Scanning'],
    description: 'Fortifies cloud security perimeters, automates vulnerability mitigation pipelines, and enforces zero-trust architecture.',
    responsibilities: [
      'Embed automated security testing (SAST/DAST) into continuous delivery pipelines.',
      'Audit cloud infrastructure (AWS/GCP) configurations against SOC2 and CIS benchmarks.',
      'Develop custom automated incident response scripts and security telemetry monitors in Python.',
      'Conduct threat modeling and vulnerability assessments across containerized services.'
    ],
    requirements: [
      'Hands-on experience in cloud security, container security (Docker/Kubernetes), and Linux hardening.',
      'Proficiency in scripting security automations using Python or Bash.',
      'Knowledge of OWASP Top 10, cryptographic standards, and authentication protocols (OAuth, JWT).',
      'Strong understanding of CI/CD integration and infrastructure monitoring.'
    ],
    templateJd: (
      'CrowdStrike is looking for a Cybersecurity & DevSecOps Engineer. Must possess hands-on skills in Python, ' +
      'Linux systems, Docker security, AWS cloud environments, and automated CI/CD pipelines. ' +
      'Experience in vulnerability scanning, OWASP standards, and zero-trust security is required.'
    ),
    cutoffScore: 72,
  },
];

export const defaultMockWeaknesses: ResumeWeakness[] = [
  {
    id: 'weak-exp-metrics',
    section: 'Work Experience & Metrics',
    severity: 'critical',
    title: 'Lack of Measurable Metrics in Bullet Points (Google X-Y-Z Rule)',
    issue: 'Your experience bullet points describe responsibilities rather than quantified business outcomes. ATS systems and hiring managers favor data-backed achievements.',
    recommendation: "Apply Google's X-Y-Z formula to each bullet point: 'Accomplished [X], measured by [Y], by doing [Z]'. Replace generic duties with specific performance metrics.",
    impact: '+10% ATS Score Boost',
    exampleBefore: 'Worked on improving database queries and helped backend performance.',
    exampleAfter: 'Optimized PostgreSQL database queries and added compound indexes, reducing API latency by 42% for over 150,000 monthly active users.',
  },
  {
    id: 'weak-skills-gap',
    section: 'Core Technical Skills',
    severity: 'critical',
    title: 'Missing Core Requisite Keywords (Docker, AWS, Kubernetes)',
    issue: 'The target job post repeatedly emphasizes cloud containerization and AWS, but these exact tokens were absent in your resume text, creating an ATS scoring penalty.',
    recommendation: 'Add Docker and AWS to your Technical Skills section, and cite at least one project, coursework module, or containerized workflow where you applied them.',
    impact: '+12% ATS Score Boost',
    exampleBefore: 'Skills: Python, SQL, REST APIs, Git, JavaScript.',
    exampleAfter: 'Skills: Python, SQL, REST APIs, Docker (Containerization), AWS (EC2/S3), Git, CI/CD.',
  },
  {
    id: 'weak-summary-missing',
    section: 'Professional Summary',
    severity: 'moderate',
    title: 'Summary Lacks Standout Quantifiable Specialization',
    issue: 'While a summary is present, it relies on descriptive adjectives without hard proof of scale or target job title keyword alignment in the top 20% of the document.',
    recommendation: 'Include your target job title, years of experience, primary tech stack, and at least one numerical metric into your opening profile to immediately hook recruiter attention.',
    impact: '+6% ATS Score Boost',
    exampleBefore: 'Passionate developer skilled in backend systems and building web applications.',
    exampleAfter: 'Full Stack Engineer with 3+ years experience mastering Python, FastAPI, and SQL, delivering microservices serving 100k+ active users with 99.9% uptime.',
  },
  {
    id: 'weak-action-verbs',
    section: 'Action Verbs & Phrasing',
    severity: 'moderate',
    title: 'Passive Phrasing Weakening Engineering Authority',
    issue: "Detected passive phrases like 'worked on' and 'helped to'. Passive language signals supportive rather than leadership-level technical execution.",
    recommendation: "Eliminate 'worked on' or 'helped'. Begin every bullet with decisive high-impact verbs: 'Architected', 'Spearheaded', 'Engineered', 'Automated', or 'Benchmarked'.",
    impact: '+5% ATS Score Boost',
    exampleBefore: 'Was responsible for creating REST APIs and fixing bugs in the application.',
    exampleAfter: 'Architected resilient RESTful microservices in Python/FastAPI, eliminating 99.8% of runtime errors and cutting bug turnaround time by 60%.',
  },
  {
    id: 'weak-structure-projects',
    section: 'Structure & ATS Ingestion',
    severity: 'minor',
    title: 'Add Live Repository & Deployment Links to Projects',
    issue: 'Your technical projects lack explicit public repository links (GitHub) or live URLs. Hiring teams heavily prioritize verifiable code quality.',
    recommendation: 'Include a direct GitHub repository link for each key project alongside quantifiable technical scope details.',
    impact: '+4% ATS Score Boost',
    exampleBefore: 'Built distributed caching system in spare time.',
    exampleAfter: 'Distributed Cache Engine | Python, Redis, Docker | GitHub: github.com/user/cache-engine\n• Engineered lock-free cache with LRU eviction handling 25k ops/sec.',
  },
];

export const defaultMockVerdict: MatchVerdict = {
  isMatch: true,
  verdict: 'Strong Match',
  verdictBadge: 'MATCH',
  badgeColor: 'emerald',
  score: 82,
  threshold: 70,
  shortlistOdds: 'High (85%+ Shortlist Probability)',
  summary: 'Your resume matches the core requirements for Software Engineer! With an ATS score of 82% (exceeding the 70% cutoff), your profile demonstrates strong technical relevance for recruiter screening.',
  skillCoverage: 71,
  reasons: [
    'Score (82%) exceeds the recruiter cutoff threshold of 70%.',
    'Matched 10 out of 14 key technical competencies (71% coverage).',
    'Strong contextual alignment in Python, SQL, REST APIs, and microservice architecture.',
    'Missing cloud containerization keywords (Docker, AWS) is the primary gap to reach 95%+.',
  ],
  matchedCount: 10,
  missingCount: 4,
};

export const defaultMockAllJobsMatches: JobMatchRanking[] = [
  {
    jobId: 'job-backend-razorpay',
    jobTitle: 'Senior Backend Engineer',
    company: 'Razorpay',
    companyColor: '#0c2340',
    category: 'Backend & Cloud',
    location: 'Bangalore, India (Hybrid)',
    region: 'India',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '₹22 - 38 LPA',
    score: 94,
    isMatch: true,
    verdict: 'Strong Match',
    cutoffScore: 72,
    matchingSkills: ['Python', 'SQL', 'FastAPI', 'REST APIs', 'Git', 'PostgreSQL'],
    missingSkills: ['Docker', 'AWS'],
    coreMatchedCount: 6,
    coreTotalCount: 7,
    description: 'Architects scalable payment rails, transaction processing microservices, and high-throughput financial APIs.',
    templateJd: 'Razorpay is looking for a Backend Engineer with Python, FastAPI, SQL, PostgreSQL, and REST APIs.',
  },
  {
    jobId: 'job-swe-stripe',
    jobTitle: 'Senior Full Stack Engineer',
    company: 'Stripe',
    companyColor: '#635bff',
    category: 'Software Engineering',
    location: 'Bangalore / San Francisco (Hybrid)',
    region: 'India / US / Remote',
    jobType: 'Full-time',
    experience: '3 - 6 Years',
    salary: '₹28 - 45 LPA / $150,000 - $190,000',
    score: 82,
    isMatch: true,
    verdict: 'Strong Match',
    cutoffScore: 75,
    matchingSkills: ['Python', 'SQL', 'Git', 'REST APIs', 'PostgreSQL'],
    missingSkills: ['React', 'TypeScript', 'Docker', 'AWS'],
    coreMatchedCount: 5,
    coreTotalCount: 8,
    description: 'Build world-class financial infrastructure and scalable APIs powering global internet commerce.',
    templateJd: 'Stripe is hiring a Senior Full Stack Engineer proficient in TypeScript, Python, and SQL.',
  },
  {
    jobId: 'job-ds-swiggy',
    jobTitle: 'Senior Data Scientist & ML Engineer',
    company: 'Swiggy',
    companyColor: '#fc8019',
    category: 'AI & Machine Learning',
    location: 'Bangalore / Hyderabad, India',
    region: 'India',
    jobType: 'Full-time',
    experience: '2 - 6 Years',
    salary: '₹24 - 40 LPA',
    score: 85,
    isMatch: true,
    verdict: 'Strong Match',
    cutoffScore: 72,
    matchingSkills: ['Python', 'Pandas', 'Scikit-learn', 'SQL', 'Machine Learning', 'NLP'],
    missingSkills: ['PyTorch', 'TensorFlow'],
    coreMatchedCount: 5,
    coreTotalCount: 6,
    description: 'Develops predictive routing models, demand forecasting neural algorithms, and real-time recommendation engines.',
    templateJd: 'Swiggy seeks Data Scientist / ML Engineer with Python, Pandas, Scikit-learn, and SQL.',
  },
  {
    jobId: 'job-ai-openai',
    jobTitle: 'Generative AI & LLM Systems Engineer',
    company: 'OpenAI / Scale AI',
    companyColor: '#10a37f',
    category: 'Generative AI',
    location: 'San Francisco, CA / Remote',
    region: 'United States / Remote',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '$160,000 - $220,000',
    score: 81,
    isMatch: true,
    verdict: 'Strong Match',
    cutoffScore: 75,
    matchingSkills: ['Python', 'FastAPI', 'NLP', 'Git'],
    missingSkills: ['LangChain', 'Docker', 'Vector DBs'],
    coreMatchedCount: 4,
    coreTotalCount: 6,
    description: 'Engineers production-grade agentic pipelines, Retrieval-Augmented Generation (RAG) systems, and custom LLM inference APIs.',
    templateJd: 'Seeking Generative AI & LLM Engineer with Python, FastAPI, and NLP experience.',
  },
  {
    jobId: 'job-analytics-uber',
    jobTitle: 'Senior Data Analyst & BI Specialist',
    company: 'Uber',
    companyColor: '#000000',
    category: 'Data & Analytics',
    location: 'Bangalore / Amsterdam (Hybrid)',
    region: 'India / Europe',
    jobType: 'Full-time',
    experience: '2 - 5 Years',
    salary: '₹16 - 28 LPA',
    score: 76,
    isMatch: true,
    verdict: 'Strong Match',
    cutoffScore: 70,
    matchingSkills: ['SQL', 'Python', 'Pandas', 'Data Analysis'],
    missingSkills: ['Power BI', 'Excel', 'Tableau'],
    coreMatchedCount: 4,
    coreTotalCount: 6,
    description: 'Transforms high-dimensional ride and delivery telemetry into executive KPI dashboards.',
    templateJd: 'Uber is hiring Data Analyst with advanced SQL and Python Pandas.',
  },
  {
    jobId: 'job-frontend-vercel',
    jobTitle: 'Lead Frontend Engineer',
    company: 'Vercel',
    companyColor: '#000000',
    category: 'Web Development',
    location: 'Remote (Global)',
    region: 'Remote',
    jobType: 'Remote',
    experience: '3 - 7 Years',
    salary: '$130,000 - $175,000',
    score: 62,
    isMatch: false,
    verdict: 'Potential Match',
    cutoffScore: 70,
    matchingSkills: ['JavaScript', 'HTML', 'CSS', 'Git'],
    missingSkills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    coreMatchedCount: 3,
    coreTotalCount: 7,
    description: 'Crafts hyper-responsive developer interfaces and modern web applications.',
    templateJd: 'Vercel Lead Frontend Engineer with React, TypeScript, and Next.js.',
  },
  {
    jobId: 'job-devops-datadog',
    jobTitle: 'Cloud & DevOps Infrastructure Engineer',
    company: 'Datadog',
    companyColor: '#632ca6',
    category: 'Infrastructure',
    location: 'San Francisco / Remote US',
    region: 'United States',
    jobType: 'Remote',
    experience: '3 - 6 Years',
    salary: '$135,000 - $185,000',
    score: 54,
    isMatch: false,
    verdict: 'Does Not Match',
    cutoffScore: 70,
    matchingSkills: ['Git', 'Python'],
    missingSkills: ['Docker', 'Kubernetes', 'AWS', 'Linux', 'CI/CD'],
    coreMatchedCount: 2,
    coreTotalCount: 6,
    description: 'Automates multi-region Kubernetes clusters and scalable cloud infrastructure.',
    templateJd: 'Cloud & DevOps Engineer managing Kubernetes and AWS.',
  },
  {
    jobId: 'job-security-crowdstrike',
    jobTitle: 'Cybersecurity & DevSecOps Engineer',
    company: 'CrowdStrike',
    companyColor: '#e01a22',
    category: 'Security & Infrastructure',
    location: 'Remote / Austin, TX',
    region: 'United States / Remote',
    jobType: 'Remote',
    experience: '3 - 6 Years',
    salary: '$140,000 - $190,000',
    score: 52,
    isMatch: false,
    verdict: 'Does Not Match',
    cutoffScore: 72,
    matchingSkills: ['Python', 'SQL', 'Git'],
    missingSkills: ['Linux', 'Docker', 'AWS', 'SOC2', 'OWASP'],
    coreMatchedCount: 2,
    coreTotalCount: 6,
    description: 'Fortifies cloud security perimeters and enforces zero-trust architecture.',
    templateJd: 'CrowdStrike Cybersecurity Engineer with Python, Linux, and Cloud Security.',
  },
];

export const defaultSoftwareEngineerResult: AnalysisResult = {
  id: 'scan-swe-082',
  jobTitle: 'Senior Full Stack Engineer',
  company: 'Stripe',
  region: 'India (Bangalore, Remote)',
  candidateName: 'Lokesh',
  fileName: 'Lokesh_Software_Engineer_Resume.pdf',
  fileSize: '248 KB',
  overallScore: 82,
  scoreLabel: 'Strong Match',
  comparisonVsAverage: 12,
  matchVerdict: defaultMockVerdict,
  allJobsMatches: defaultMockAllJobsMatches,
  bestMatchedJob: defaultMockAllJobsMatches[0],
  weaknesses: defaultMockWeaknesses,
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
SKILLS: Python, SQL, FastAPI, Pandas, Scikit-Learn, NLP, Git, REST APIs`,
  jobDescriptionSnippet: `We are looking for a Software Engineer to design, build, and maintain mission-critical backend microservices.
Required: Strong proficiency in Python, SQL, REST APIs, Git. Familiarity with Docker and AWS container deployment pipelines.`,
  analyzedAt: 'Just now',
};

export const sampleProfiles: SampleProfile[] = [
  {
    id: 'sample-swe',
    label: 'Software Engineer (82%)',
    role: 'Senior Full Stack Engineer',
    company: 'Stripe',
    region: 'India (Bangalore, Remote)',
    resumeFileName: 'Lokesh_Software_Engineer_Resume.pdf',
    resumeText: `LOKESH — SOFTWARE ENGINEER
Bangalore, India • lokesh.dev@example.com • github.com/lokesh • linkedin.com/in/lokesh

PROFESSIONAL SUMMARY:
Results-oriented Software Engineer with hands-on experience developing distributed backend APIs, NLP architectures, and data engineering pipelines. Proficient in Python, SQL, and FastAPI.

TECHNICAL SKILLS:
Languages: Python, SQL, JavaScript
Frameworks: FastAPI, Flask, Pandas, Scikit-Learn, PyTorch, React
Databases & Tools: PostgreSQL, MySQL, Git, GitHub, Docker (Basic)`,
    jobDescription: `Job Title: Senior Full Stack Engineer
Company: Stripe
Location: Bangalore, India / Remote

Responsibilities:
- Architect and maintain high-throughput REST APIs handling thousands of transactions.
- Optimize complex database queries in PostgreSQL and SQL databases.
- Integrate automated containerized testing with Docker, Kubernetes, and AWS pipelines.
- Collaborate with frontend teams to deliver end-to-end features.`,
    mockResult: defaultSoftwareEngineerResult,
  },
  {
    id: 'sample-mle',
    label: 'Machine Learning Engineer (91%)',
    role: 'Senior Data Scientist & ML Engineer',
    company: 'Swiggy',
    region: 'Remote (Worldwide)',
    resumeFileName: 'Lokesh_ML_Engineer.pdf',
    resumeText: `LOKESH — MACHINE LEARNING ENGINEER
Remote • lokesh.ai@example.com

SUMMARY:
Machine Learning Engineer specializing in NLP, transformers, PyTorch, Scikit-Learn, and vector search. 3+ years experience designing TF-IDF recommendation systems and generative AI agents.

SKILLS:
Python, PyTorch, TensorFlow, Scikit-Learn, Pandas, NumPy, HuggingFace, FastAPI, Docker, SQL, Git`,
    jobDescription: `Job Title: Senior Data Scientist & ML Engineer
Company: Swiggy
Location: Remote

Key Requirements:
- Deep expertise in PyTorch, Python, Scikit-Learn, and numerical computing (NumPy, Pandas).
- Experience building production inference pipelines with FastAPI and Docker.
- Strong knowledge of NLP, cosine similarity, TF-IDF vectorizers, and semantic search.`,
    mockResult: {
      ...defaultSoftwareEngineerResult,
      id: 'scan-mle-091',
      jobTitle: 'Senior Data Scientist & ML Engineer',
      company: 'Swiggy',
      region: 'Remote (Worldwide)',
      overallScore: 91,
      scoreLabel: 'Strong Match',
      comparisonVsAverage: 23,
      matchVerdict: {
        isMatch: true,
        verdict: 'Strong Match',
        verdictBadge: 'MATCH',
        badgeColor: 'emerald',
        score: 91,
        threshold: 72,
        shortlistOdds: 'Very High (92%+ Shortlist Probability)',
        summary: 'Exceptional match for Swiggy Data Scientist & ML Engineer! Your score of 91% exceeds the 72% cutoff comfortably.',
        skillCoverage: 88,
        reasons: [
          'Exceeds 72% minimum passing cutoff by 19 points.',
          'Matched 9 out of 11 required ML competencies.',
          'Strong practical portfolio in Scikit-learn, PyTorch, and NLP.',
        ],
        matchedCount: 9,
        missingCount: 2,
      },
      breakdown: {
        skillsMatch: 95,
        experienceRelevance: 89,
        keywordCoverage: 91,
        resumeQuality: 88,
      },
      matchingSkills: ['Python', 'PyTorch', 'Scikit-Learn', 'Pandas', 'NumPy', 'FastAPI', 'Docker', 'NLP', 'SQL', 'Git'],
      missingSkills: ['Kubernetes', 'Feature Store'],
      suggestions: [
        {
          id: 'sug-mle-1',
          title: 'Highlight Model Inference Latency',
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
    role: 'Senior Data Analyst & BI Specialist',
    company: 'Uber',
    region: 'United States',
    resumeFileName: 'Lokesh_Data_Analyst.pdf',
    resumeText: `LOKESH — DATA ANALYST
Expertise in SQL, Tableau, Power BI, Python Pandas, and statistical forecasting. Experience creating executive dashboards and financial cohort analysis.`,
    jobDescription: `Senior Data Analyst with advanced SQL, Python, Snowflake, dbt, and business intelligence storytelling.`,
    mockResult: {
      ...defaultSoftwareEngineerResult,
      id: 'scan-data-076',
      jobTitle: 'Senior Data Analyst & BI Specialist',
      company: 'Uber',
      region: 'United States (SF Bay Area, Remote)',
      overallScore: 76,
      scoreLabel: 'Good Match',
      comparisonVsAverage: 6,
      matchVerdict: {
        isMatch: true,
        verdict: 'Strong Match',
        verdictBadge: 'MATCH',
        badgeColor: 'emerald',
        score: 76,
        threshold: 70,
        shortlistOdds: 'Moderate-High (75% Shortlist Probability)',
        summary: 'Solid match for Uber Data Analyst role! Exceeds the 70% threshold with strong SQL and Pandas coverage.',
        skillCoverage: 75,
        reasons: [
          'Score of 76% clears the 70% cutoff.',
          'Matched 6 out of 8 required analytical skills.',
        ],
        matchedCount: 6,
        missingCount: 2,
      },
      breakdown: {
        skillsMatch: 81,
        experienceRelevance: 74,
        keywordCoverage: 78,
        resumeQuality: 71,
      },
      matchingSkills: ['SQL', 'Python', 'Pandas', 'Data Analysis', 'Power BI'],
      missingSkills: ['Tableau', 'Excel'],
    },
  },
];

export const dashboardRecentScans: RecentScan[] = [
  {
    id: 'scan-swe-082',
    jobTitle: 'Senior Full Stack Engineer',
    company: 'Stripe',
    score: 82,
    date: 'Today, 2:45 PM',
    status: 'Strong Match',
    matchingCount: 10,
    missingCount: 4,
    region: 'India (Bangalore)',
  },
  {
    id: 'scan-mle-091',
    jobTitle: 'Senior Data Scientist & ML Engineer',
    company: 'Swiggy',
    score: 91,
    date: 'Yesterday',
    status: 'Strong Match',
    matchingCount: 9,
    missingCount: 2,
    region: 'Remote',
  },
  {
    id: 'scan-data-076',
    jobTitle: 'Senior Data Analyst',
    company: 'Uber',
    score: 76,
    date: 'Oct 3, 2026',
    status: 'Good Match',
    matchingCount: 6,
    missingCount: 2,
    region: 'United States',
  },
];
