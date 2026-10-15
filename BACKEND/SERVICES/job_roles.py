import re
from typing import Any, Dict, List, Optional, Tuple

# Comprehensive catalog of active standard industry job postings
JOB_POSTS_CATALOG: List[Dict[str, Any]] = [
    {
        "id": "job-swe-stripe",
        "title": "Senior Full Stack Engineer",
        "company": "Stripe",
        "companyColor": "#635bff",
        "category": "Software Engineering",
        "location": "Bangalore / San Francisco (Hybrid)",
        "region": "India / US / Remote",
        "jobType": "Full-time",
        "experience": "3 - 6 Years",
        "salary": "₹28 - 45 LPA / $150,000 - $190,000",
        "postedDate": "1 day ago",
        "coreSkills": ["React", "TypeScript", "Node.js", "Python", "SQL", "PostgreSQL", "Docker", "Git"],
        "secondarySkills": ["AWS", "Redis", "Microservices", "REST APIs", "Tailwind CSS", "GraphQL"],
        "description": "Build world-class financial infrastructure and scalable APIs powering global internet commerce.",
        "responsibilities": [
            "Design, build, and maintain high-performance web applications and backend APIs in TypeScript and Python.",
            "Collaborate with product designers and platform engineers to deliver intuitive financial dashboards.",
            "Optimize distributed database queries and caching layers across PostgreSQL and Redis clusters.",
            "Implement CI/CD workflows, automated testing suites, and containerized deployments via Docker."
        ],
        "requirements": [
            "3+ years of professional full-stack software development experience.",
            "Strong command of modern JavaScript/TypeScript, React, and server-side runtimes (Node.js or Python).",
            "Deep understanding of relational databases (PostgreSQL/MySQL) and RESTful API architecture.",
            "Familiarity with cloud hosting (AWS/GCP), Docker containerization, and automated testing."
        ],
        "templateJd": (
            "Stripe is hiring a Senior Full Stack Engineer to scale payment systems and developer dashboards. "
            "Required: Strong proficiency in React, TypeScript, Node.js, Python, PostgreSQL, REST APIs, Git, and Docker. "
            "Experience in cloud deployments (AWS), Redis caching, and building secure, high-availability microservices is highly desired."
        ),
        "cutoffScore": 75,
    },
    {
        "id": "job-backend-razorpay",
        "title": "Senior Backend Engineer",
        "company": "Razorpay",
        "companyColor": "#0c2340",
        "category": "Backend & Cloud",
        "location": "Bangalore, India (Hybrid)",
        "region": "India",
        "jobType": "Full-time",
        "experience": "2 - 5 Years",
        "salary": "₹22 - 38 LPA",
        "postedDate": "Just now",
        "coreSkills": ["Python", "FastAPI", "SQL", "PostgreSQL", "Docker", "Git", "REST APIs"],
        "secondarySkills": ["AWS", "Redis", "Kafka", "Django", "Microservices", "Kubernetes", "MySQL"],
        "description": "Architects scalable payment rails, transaction processing microservices, and high-throughput financial APIs.",
        "responsibilities": [
            "Architect and deploy mission-critical microservices handling tens of thousands of requests per second.",
            "Design highly resilient data storage schemes with PostgreSQL, MySQL, and distributed caching in Redis.",
            "Ensure 99.99% uptime and low latency across payment gateway and settlement microservices.",
            "Spearhead code reviews, technical roadmaps, and mentoring junior software engineers."
        ],
        "requirements": [
            "Strong foundation in Python (FastAPI, Django) or Go for building backend systems.",
            "Extensive experience with relational databases (PostgreSQL/MySQL), transaction isolation, and query optimization.",
            "Hands-on experience with Docker, container orchestration, and message queues (Kafka/RabbitMQ).",
            "Demonstrated ability to write clean, unit-tested, and maintainable code in an agile environment."
        ],
        "templateJd": (
            "Razorpay is looking for a Backend Engineer to build robust distributed financial transaction systems. "
            "Must have strong hands-on experience with Python (FastAPI/Django), relational databases (PostgreSQL/SQL), "
            "Docker containerization, REST APIs, and API performance tuning. Experience with AWS, Redis, and Kafka is a strong plus."
        ),
        "cutoffScore": 72,
    },
    {
        "id": "job-frontend-vercel",
        "title": "Lead Frontend Engineer",
        "company": "Vercel",
        "companyColor": "#000000",
        "category": "Web Development",
        "location": "Remote (Global)",
        "region": "Remote",
        "jobType": "Remote",
        "experience": "3 - 7 Years",
        "salary": "$130,000 - $175,000",
        "postedDate": "3 days ago",
        "coreSkills": ["React", "TypeScript", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
        "secondarySkills": ["GraphQL", "Jest", "Vite", "Git", "Web Vitals", "Accessibility (a11y)"],
        "description": "Crafts hyper-responsive developer interfaces, lightning-fast rendering components, and modern web applications.",
        "responsibilities": [
            "Lead frontend engineering for customer-facing deployment interfaces and telemetry consoles.",
            "Optimize Core Web Vitals, SSR/SSG workflows, and client-side rendering performance.",
            "Build design systems and modular UI component libraries utilizing Tailwind CSS and React.",
            "Collaborate closely with UX researchers and backend engineers to integrate REST/GraphQL endpoints."
        ],
        "requirements": [
            "Advanced expertise in React, Next.js, and TypeScript.",
            "Deep understanding of browser DOM internals, client caching, and modern web performance tuning.",
            "Demonstrated eye for design fidelity, responsiveness, and web accessibility standards.",
            "Experience working with Git-based deployment workflows and continuous integration."
        ],
        "templateJd": (
            "Join Vercel as a Lead Frontend Engineer. You will craft next-generation developer consoles and web experiences. "
            "Required: Expert command of React, Next.js, TypeScript, Tailwind CSS, HTML, CSS, and modern JavaScript. "
            "Strong focus on web performance, Core Web Vitals, and responsive UI component development."
        ),
        "cutoffScore": 70,
    },
    {
        "id": "job-ds-swiggy",
        "title": "Senior Data Scientist & ML Engineer",
        "company": "Swiggy",
        "companyColor": "#fc8019",
        "category": "AI & Machine Learning",
        "location": "Bangalore / Hyderabad, India",
        "region": "India",
        "jobType": "Full-time",
        "experience": "2 - 6 Years",
        "salary": "₹24 - 40 LPA",
        "postedDate": "2 days ago",
        "coreSkills": ["Python", "Pandas", "NumPy", "Scikit-learn", "SQL", "Machine Learning"],
        "secondarySkills": ["PyTorch", "TensorFlow", "NLP", "Matplotlib", "FastAPI", "Docker", "Feature Engineering"],
        "description": "Develops predictive routing models, demand forecasting neural algorithms, and real-time recommendation engines.",
        "responsibilities": [
            "Build production-grade machine learning models for dynamic pricing, ETA prediction, and customer personalization.",
            "Perform exploratory data analysis on petabytes of order data using Python, Pandas, and distributed SQL.",
            "Design end-to-end ML pipelines from feature engineering to model serving via RESTful APIs.",
            "Run rigorous A/B experiments to evaluate algorithmic performance against baseline metrics."
        ],
        "requirements": [
            "Degree in Computer Science, Statistics, Mathematics, or equivalent quantitative discipline.",
            "Proven track record with Python, Pandas, NumPy, Scikit-learn, and SQL in production environments.",
            "Solid grasp of supervised/unsupervised machine learning algorithms and statistical evaluation metrics.",
            "Familiarity with deep learning frameworks (PyTorch or TensorFlow) or NLP techniques is a plus."
        ],
        "templateJd": (
            "Swiggy is seeking a Senior Data Scientist / ML Engineer to power predictive intelligence across our logistics network. "
            "Required: deep expertise in Python, Pandas, NumPy, Scikit-learn, SQL, machine learning algorithms, and feature engineering. "
            "Familiarity with PyTorch/TensorFlow, model deployment, and statistical hypothesis testing is highly valued."
        ),
        "cutoffScore": 72,
    },
    {
        "id": "job-devops-datadog",
        "title": "Cloud & DevOps Infrastructure Engineer",
        "company": "Datadog",
        "companyColor": "#632ca6",
        "category": "Infrastructure",
        "location": "San Francisco / Remote US",
        "region": "United States",
        "jobType": "Remote",
        "experience": "3 - 6 Years",
        "salary": "$135,000 - $185,000",
        "postedDate": "4 days ago",
        "coreSkills": ["Docker", "Kubernetes", "AWS", "Git", "Linux", "CI/CD"],
        "secondarySkills": ["Terraform", "Python", "Prometheus", "Azure", "PostgreSQL", "Bash", "Networking"],
        "description": "Automates multi-region Kubernetes clusters, implements GitOps CI/CD pipelines, and manages scalable cloud infrastructure.",
        "responsibilities": [
            "Manage multi-tenant Kubernetes clusters running across AWS and GCP environments.",
            "Automate infrastructure provisioning using Infrastructure as Code (Terraform) and GitOps tooling.",
            "Build robust CI/CD pipelines ensuring automated testing, security scanning, and zero-downtime releases.",
            "Monitor system observability, SLAs, and uptime metrics using Prometheus, Grafana, and Datadog."
        ],
        "requirements": [
            "3+ years managing production cloud infrastructure (AWS or GCP).",
            "Deep practical experience with Docker containerization, Kubernetes orchestration, and Linux systems administration.",
            "Proficiency in scripting with Python or Bash to automate repetitive engineering workflows.",
            "Strong understanding of networking protocols, load balancers, and cloud security best practices."
        ],
        "templateJd": (
            "Datadog is hiring a Cloud & DevOps Engineer to scale globally distributed infrastructure. "
            "Responsibilities include managing Kubernetes clusters, Docker containerization, AWS cloud architecture, "
            "Linux systems, CI/CD automation, and ensuring zero-downtime deployments via GitOps."
        ),
        "cutoffScore": 70,
    },
    {
        "id": "job-ai-openai",
        "title": "Generative AI & LLM Systems Engineer",
        "company": "OpenAI / Scale AI",
        "companyColor": "#10a37f",
        "category": "Generative AI",
        "location": "San Francisco, CA / Remote",
        "region": "United States / Remote",
        "jobType": "Full-time",
        "experience": "2 - 5 Years",
        "salary": "$160,000 - $220,000",
        "postedDate": "Just now",
        "coreSkills": ["Python", "FastAPI", "NLP", "LangChain", "spaCy", "Git"],
        "secondarySkills": ["PyTorch", "Docker", "Vector DBs", "RAG", "SQL", "Prompt Engineering"],
        "description": "Engineers production-grade agentic pipelines, Retrieval-Augmented Generation (RAG) systems, and custom LLM inference APIs.",
        "responsibilities": [
            "Architect and deploy low-latency LLM agent pipelines using LangChain, vector databases, and Python.",
            "Build context-aware Retrieval-Augmented Generation (RAG) microservices in FastAPI.",
            "Benchmark and optimize token efficiency, prompt caching, and evaluation harnesses for model outputs.",
            "Collaborate with safety and infrastructure teams to ensure alignment, guardrails, and compliance."
        ],
        "requirements": [
            "Strong software engineering foundation in Python with hands-on experience building asynchronous APIs (FastAPI).",
            "Practical experience building with transformer models, embeddings, LangChain, or vector search systems.",
            "Familiarity with natural language processing (NLP), tokenizers, and text preprocessing.",
            "Comfort with containerization (Docker) and deploying AI microservices into production."
        ],
        "templateJd": (
            "Fast-paced AI lab looking for an AI & LLM Systems Engineer. You will engineer production-grade agents and RAG pipelines "
            "using LangChain, vector databases, and Python FastAPI services. Strong foundation in NLP, Python backend engineering, "
            "and experience with transformer architectures required."
        ),
        "cutoffScore": 75,
    },
    {
        "id": "job-analytics-uber",
        "title": "Senior Data Analyst & BI Specialist",
        "company": "Uber",
        "companyColor": "#000000",
        "category": "Data & Analytics",
        "location": "Bangalore / Amsterdam (Hybrid)",
        "region": "India / Europe",
        "jobType": "Full-time",
        "experience": "2 - 5 Years",
        "salary": "₹16 - 28 LPA / €70,000 - €95,000",
        "postedDate": "3 days ago",
        "coreSkills": ["SQL", "Python", "Pandas", "Power BI", "Data Analysis", "Excel"],
        "secondarySkills": ["Tableau", "PostgreSQL", "Statistics", "A/B Testing", "Git"],
        "description": "Transforms high-dimensional ride and delivery telemetry into executive KPI dashboards and data-backed business insights.",
        "responsibilities": [
            "Author complex analytical SQL queries to extract, transform, and aggregate petabyte-scale mobility data.",
            "Design, automate, and maintain interactive business intelligence dashboards in Power BI and Tableau.",
            "Partner with city operations and product leads to identify conversion leaks and optimize marketplace efficiency.",
            "Conduct cohort analyses, retention curves, and statistical A/B test readouts."
        ],
        "requirements": [
            "2+ years of professional analytics experience writing high-performance SQL.",
            "Strong command of data wrangling in Python (Pandas) and spreadsheet modeling in Excel.",
            "Demonstrated track record of delivering executive-ready dashboards in Power BI or Tableau.",
            "Excellent communication skills with the ability to translate complex data into actionable recommendations."
        ],
        "templateJd": (
            "Uber is seeking a Data Analyst & BI Specialist. Responsibilities: writing complex SQL queries across massive databases, "
            "building executive Power BI/Tableau dashboards, conducting exploratory analysis using Python Pandas, "
            "and delivering data-driven strategic insights to operations leadership."
        ),
        "cutoffScore": 70,
    },
    {
        "id": "job-systems-google",
        "title": "Staff Systems Software Engineer",
        "company": "Google",
        "companyColor": "#4285f4",
        "category": "Software Engineering",
        "location": "Mountain View, CA / Hyderabad, India",
        "region": "United States / India",
        "jobType": "Full-time",
        "experience": "4 - 8 Years",
        "salary": "$175,000 - $240,000 / ₹40 - 65 LPA",
        "postedDate": "5 days ago",
        "coreSkills": ["C++", "C", "Python", "Git", "Linux", "SQL"],
        "secondarySkills": ["Multi-threading", "Distributed Systems", "Docker", "Algorithms", "Networking"],
        "description": "Engineers foundational high-throughput distributed file systems, memory-optimized storage kernels, and core network fabrics.",
        "responsibilities": [
            "Architect and optimize low-latency system components in modern C++ and C.",
            "Debug complex multi-threaded concurrency issues, race conditions, and memory allocations in Linux environments.",
            "Develop internal distributed RPC protocols and storage tiers serving millions of queries per second.",
            "Contribute to technical design documents and performance benchmarking across planetary-scale infrastructure."
        ],
        "requirements": [
            "BS or MS in Computer Science with 4+ years software development experience in C++ or C.",
            "Deep comprehension of computer architecture, operating system internals, memory management, and POSIX APIs.",
            "Strong grasp of foundational algorithms, data structures, and algorithmic complexity analysis.",
            "Familiarity with distributed systems and performance profiling tools."
        ],
        "templateJd": (
            "Join Google's Core Infrastructure team as a Systems Software Engineer. Requires high proficiency in C++ or C, "
            "deep understanding of algorithms, multi-threading, memory management, and Linux systems programming. "
            "Experience building high-throughput distributed infrastructure is essential."
        ),
        "cutoffScore": 75,
    },
    {
        "id": "job-mobile-flipkart",
        "title": "Senior Mobile Engineer (React Native & Mobile)",
        "company": "Flipkart",
        "companyColor": "#2874f0",
        "category": "Mobile Development",
        "location": "Bangalore, India",
        "region": "India",
        "jobType": "Full-time",
        "experience": "2 - 5 Years",
        "salary": "₹18 - 32 LPA",
        "postedDate": "2 days ago",
        "coreSkills": ["React", "JavaScript", "TypeScript", "REST APIs", "Git", "HTML", "CSS"],
        "secondarySkills": ["Redux", "Mobile Architecture", "iOS", "Android", "Performance Optimization"],
        "description": "Develops lightning-fast consumer e-commerce mobile applications powering millions of daily transactions.",
        "responsibilities": [
            "Build fluid, responsive cross-platform mobile app features using React Native and TypeScript.",
            "Optimize app launch times, frame rates (60fps), offline caching, and memory consumption.",
            "Integrate third-party SDKs, push notifications, and secure mobile checkout flows.",
            "Work alongside product managers and QA to ensure seamless app store deployments."
        ],
        "requirements": [
            "Strong command of React, JavaScript/TypeScript, and mobile state management (Redux/Zustand).",
            "Experience building and deploying applications to Google Play Store and Apple App Store.",
            "Deep understanding of mobile networking, RESTful API integration, and performance profiling.",
            "Passion for intuitive user experience, micro-interactions, and pixel perfection."
        ],
        "templateJd": (
            "Flipkart is seeking a Senior Mobile Engineer with strong experience in React Native, TypeScript, and modern JavaScript. "
            "Responsible for building responsive client interfaces, integrating REST APIs, state management, and optimizing mobile performance."
        ),
        "cutoffScore": 70,
    },
    {
        "id": "job-security-crowdstrike",
        "title": "Cybersecurity & DevSecOps Engineer",
        "company": "CrowdStrike",
        "companyColor": "#e01a22",
        "category": "Security & Infrastructure",
        "location": "Remote / Austin, TX",
        "region": "United States / Remote",
        "jobType": "Remote",
        "experience": "3 - 6 Years",
        "salary": "$140,000 - $190,000",
        "postedDate": "4 days ago",
        "coreSkills": ["Python", "Linux", "Docker", "Git", "AWS", "SQL"],
        "secondarySkills": ["OWASP", "SOC2", "Kubernetes", "CI/CD Security", "Vulnerability Scanning"],
        "description": "Fortifies cloud security perimeters, automates vulnerability mitigation pipelines, and enforces zero-trust architecture.",
        "responsibilities": [
            "Embed automated security testing (SAST/DAST) into continuous delivery pipelines.",
            "Audit cloud infrastructure (AWS/GCP) configurations against SOC2 and CIS benchmarks.",
            "Develop custom automated incident response scripts and security telemetry monitors in Python.",
            "Conduct threat modeling and vulnerability assessments across containerized services."
        ],
        "requirements": [
            "Hands-on experience in cloud security, container security (Docker/Kubernetes), and Linux hardening.",
            "Proficiency in scripting security automations using Python or Bash.",
            "Knowledge of OWASP Top 10, cryptographic standards, and authentication protocols (OAuth, JWT).",
            "Strong understanding of CI/CD integration and infrastructure monitoring."
        ],
        "templateJd": (
            "CrowdStrike is looking for a Cybersecurity & DevSecOps Engineer. Must possess hands-on skills in Python, "
            "Linux systems, Docker security, AWS cloud environments, and automated CI/CD pipelines. "
            "Experience in vulnerability scanning, OWASP standards, and zero-trust security is required."
        ),
        "cutoffScore": 72,
    },
]

# Backwards compatibility catalog mapping for existing role endpoints
JOB_ROLES_CATALOG = [
    {
        "id": p["id"],
        "title": p["title"],
        "category": p["category"],
        "core_skills": p["coreSkills"],
        "secondary_skills": p["secondarySkills"],
        "description": p["description"],
        "salary_in": p["salary"].split(" / ")[0] if "₹" in p["salary"] else "₹12 - 25 LPA",
        "salary_us": p["salary"].split(" / ")[1] if " / " in p["salary"] else ("$120,000 - $175,000" if "$" in p["salary"] else "$110,000 - $160,000"),
        "salary_eu": "€65,000 - €95,000",
        "salary_remote": "$95,000 - $165,000",
        "template_jd": p["templateJd"],
    }
    for p in JOB_POSTS_CATALOG
]

# Comprehensive regional market profiles
REGIONAL_MARKET_DATA = {
    "India": {
        "region_name": "India (Bangalore, Hyderabad, Pune, Remote)",
        "currency": "INR (₹)",
        "demand_index": 92,
        "hiring_velocity": "High (Over 42,000+ active tech vacancies)",
        "avg_salary": "₹12.5 - 24.0 LPA",
        "top_cities": ["Bangalore (52%)", "Hyderabad (21%)", "Pune (14%)", "Delhi NCR (13%)"],
        "ats_tips": [
            "Indian recruiters prioritize explicit tech stack tags at the top of the resume.",
            "Include your notice period (e.g., 'Immediate / 30 Days') and current location preference.",
            "Clearly distinguish between primary languages (e.g. Python, SQL) and auxiliary tools.",
            "Quantify product scale: mention monthly active users, database rows, or RPS handled."
        ],
        "companies": ["Infosys", "TCS", "Flipkart", "Swiggy", "PhonePe", "Razorpay", "Amazon India", "Microsoft IDC", "Zomato", "Accenture"]
    },
    "United States": {
        "region_name": "United States (SF Bay Area, NY, Austin, Remote US)",
        "currency": "USD ($)",
        "demand_index": 89,
        "hiring_velocity": "Moderate-High (Over 65,000+ tech positions open)",
        "avg_salary": "$125,000 - $175,000 / yr",
        "top_cities": ["San Francisco / Silicon Valley", "New York City", "Austin", "Seattle"],
        "ats_tips": [
            "Strict single-page limit for under 5 years experience; clean single-column format only.",
            "Every bullet MUST follow the Google X-Y-Z formula: Accomplished [X], measured by [Y], by doing [Z].",
            "Do not include personal photos, marital status, or age (US anti-discrimination compliance).",
            "Specify work authorization clearly (e.g., 'US Citizen', 'Green Card', or 'Requires Visa Sponsorship')."
        ],
        "companies": ["Google", "Meta", "Amazon", "Stripe", "Netflix", "Datadog", "Snowflake", "Apple", "Uber", "Salesforce"]
    },
    "Europe & UK": {
        "region_name": "Europe & UK (London, Berlin, Amsterdam, Remote EU)",
        "currency": "EUR (€) / GBP (£)",
        "demand_index": 85,
        "hiring_velocity": "Steady (Over 34,000+ tech opportunities)",
        "avg_salary": "€65,000 - €105,000 / yr",
        "top_cities": ["London (UK)", "Berlin (Germany)", "Amsterdam (Netherlands)", "Dublin (Ireland)"],
        "ats_tips": [
            "2-page CVs are standard and accepted across the UK, Germany, and the Netherlands.",
            "Emphasize collaborative workflows, GDPR/data compliance knowledge, and agile methodologies.",
            "Include language proficiencies (e.g., 'English: Fluent / C2').",
            "Highlight experience working in international, cross-border distributed teams."
        ],
        "companies": ["Spotify", "Revolut", "Adyen", "Klarna", "Delivery Hero", "SAP", "Booking.com", "ASML", "Monzo"]
    },
    "Remote": {
        "region_name": "Remote (Worldwide / Global Opportunities)",
        "currency": "USD ($)",
        "demand_index": 95,
        "hiring_velocity": "Very High (Over 80,000+ globally distributed jobs)",
        "avg_salary": "$90,000 - $160,000 / yr",
        "top_cities": ["100% Async / Work from Anywhere", "US Timezone", "EU Timezone", "APAC Flexible"],
        "ats_tips": [
            "Emphasize asynchronous communication tools (Slack, Notion, Loom, Jira, GitHub PR reviews).",
            "Highlight self-directed project ownership and proven track record of autonomous delivery.",
            "List your primary working timezone (e.g., 'UTC+5:30 with 4h US overlap').",
            "Provide live portfolio URLs, deployed project demos, and active GitHub repositories."
        ],
        "companies": ["GitLab", "Automattic", "Buffer", "Doist", "Zapier", "Remote.com", "Canonical", "Vercel", "Supabase"]
    },
}


class JobRoleIntelligenceService:

    @staticmethod
    def get_all_job_posts() -> List[Dict[str, Any]]:
        """Returns the full collection of curated industry job posts."""
        return JOB_POSTS_CATALOG

    @staticmethod
    def add_custom_job_post(job_data: Dict[str, Any]) -> Dict[str, Any]:
        """Allows dynamically adding a custom job posting."""
        new_id = job_data.get("id") or f"job-custom-{len(JOB_POSTS_CATALOG) + 1}"
        new_job = {
            "id": new_id,
            "title": job_data.get("title", "Custom Software Role"),
            "company": job_data.get("company", "Custom Organization"),
            "companyColor": job_data.get("companyColor", "#3b82f6"),
            "category": job_data.get("category", "Software Engineering"),
            "location": job_data.get("location", "Remote"),
            "region": job_data.get("region", "Global"),
            "jobType": job_data.get("jobType", "Full-time"),
            "experience": job_data.get("experience", "1 - 4 Years"),
            "salary": job_data.get("salary", "Competitive"),
            "postedDate": "Just now",
            "coreSkills": job_data.get("coreSkills", ["Python", "SQL", "Git"]),
            "secondarySkills": job_data.get("secondarySkills", ["Docker", "REST APIs"]),
            "description": job_data.get("description", "Custom opportunity description."),
            "responsibilities": job_data.get("responsibilities", ["Contribute to core feature development."]),
            "requirements": job_data.get("requirements", ["Experience in relevant technical domain."]),
            "templateJd": job_data.get("templateJd") or job_data.get("description", ""),
            "cutoffScore": job_data.get("cutoffScore", 70),
        }
        JOB_POSTS_CATALOG.append(new_job)
        return new_job

    @staticmethod
    def evaluate_match_verdict(
        ats_score: float,
        matching_skills: List[str],
        missing_skills: List[str],
        job_title: str,
        cutoff_score: int = 70,
    ) -> Dict[str, Any]:
        """
        Determines explicitly whether the resume matches the target job or not,
        complete with threshold comparison, shortlist odds, and clear justifications.
        """
        matched_count = len(matching_skills)
        missing_count = len(missing_skills)
        total_req = matched_count + missing_count or 1
        skill_coverage = round((matched_count / total_req) * 100)

        # Clear match classification
        if ats_score >= 75:
            is_match = True
            verdict = "Strong Match"
            verdict_badge = "MATCH"
            badge_color = "emerald"
            shortlist_odds = "High (85%+ Shortlist Probability)"
            summary = (
                f"Your resume matches the core requirements for {job_title}! "
                f"With an ATS score of {ats_score}% (exceeding the {cutoff_score}% cutoff), "
                f"your profile demonstrates high relevance for recruiter screening."
            )
        elif ats_score >= 55:
            is_match = False  # Conditional / borderline
            verdict = "Potential Match"
            verdict_badge = "POTENTIAL MATCH"
            badge_color = "amber"
            shortlist_odds = "Moderate (45-60% Shortlist Probability)"
            summary = (
                f"Your resume partially matches {job_title}, but is borderline against the {cutoff_score}% ATS threshold. "
                f"You demonstrate foundational capability, but missing key technical keywords creates a risk of ATS filtering."
            )
        else:
            is_match = False
            verdict = "Does Not Match"
            verdict_badge = "NO MATCH"
            badge_color = "rose"
            shortlist_odds = "Low (<25% Shortlist Probability)"
            summary = (
                f"Your resume does not currently match the requirements for {job_title}. "
                f"Your score of {ats_score}% is below the {cutoff_score}% passing threshold, "
                f"indicating significant technical keyword and experience gaps."
            )

        # Build specific analytical reasons
        reasons = []
        if ats_score >= cutoff_score:
            reasons.append(f"Score ({ats_score}%) exceeds the recruiter cutoff threshold of {cutoff_score}%.")
        else:
            reasons.append(f"Score ({ats_score}%) is below the {cutoff_score}% minimum passing cutoff.")

        reasons.append(f"Matched {matched_count} out of {total_req} key technical competencies ({skill_coverage}% coverage).")

        if missing_skills:
            reasons.append(f"Missing high-impact keywords required by the post: {', '.join(missing_skills[:4])}.")
        else:
            reasons.append("Resume contains all primary technical skills specified in the job posting.")

        if ats_score >= 75:
            reasons.append("High contextual similarity in responsibilities and tech stack alignment.")
        elif ats_score >= 55:
            reasons.append("Needs inclusion of measurable project metrics and targeted frameworks to guarantee ATS clearance.")
        else:
            reasons.append("Resume appears tailored for a different specialization or tech stack.")

        return {
            "isMatch": is_match,
            "verdict": verdict,
            "verdictBadge": verdict_badge,
            "badgeColor": badge_color,
            "score": round(ats_score),
            "threshold": cutoff_score,
            "shortlistOdds": shortlist_odds,
            "summary": summary,
            "skillCoverage": skill_coverage,
            "reasons": reasons,
            "matchedCount": matched_count,
            "missingCount": missing_count,
        }

    @staticmethod
    def match_resume_against_all_jobs(
        resume_text: str, detected_skills: List[str]
    ) -> Dict[str, Any]:
        """
        Evaluates the uploaded resume against ALL available job posts in the catalog simultaneously.
        Returns a sorted list of matches and identifies the best matched job.
        """
        resume_lower = (resume_text or "").lower()
        detected_set = {s.lower() for s in detected_skills}

        ranked_jobs = []

        for job in JOB_POSTS_CATALOG:
            core_skills = job["coreSkills"]
            secondary_skills = job["secondarySkills"]

            matched_core = [
                s for s in core_skills
                if s.lower() in detected_set or re.search(r"\b" + re.escape(s.lower()) + r"\b", resume_lower)
            ]
            missing_core = [s for s in core_skills if s not in matched_core]

            matched_sec = [
                s for s in secondary_skills
                if s.lower() in detected_set or re.search(r"\b" + re.escape(s.lower()) + r"\b", resume_lower)
            ]
            missing_sec = [s for s in secondary_skills if s not in matched_sec]

            core_ratio = len(matched_core) / len(core_skills) if core_skills else 0
            sec_ratio = len(matched_sec) / len(secondary_skills) if secondary_skills else 0

            # Base score from skill coverage
            raw_score = round((core_ratio * 70) + (sec_ratio * 30))

            # Bonus for role title words in resume
            title_words = [w for w in job["title"].lower().split() if len(w) > 4 and w not in ["senior", "staff", "lead"]]
            if any(w in resume_lower for w in title_words):
                raw_score = min(98, raw_score + 8)

            final_score = max(18, min(99, raw_score))

            # Determine match verdict
            cutoff = job.get("cutoffScore", 70)
            if final_score >= 75:
                verdict = "Strong Match"
                is_match = True
            elif final_score >= 55:
                verdict = "Potential Match"
                is_match = False
            else:
                verdict = "Does Not Match"
                is_match = False

            all_matched = matched_core + matched_sec
            all_missing = missing_core + missing_sec

            ranked_jobs.append({
                "jobId": job["id"],
                "jobTitle": job["title"],
                "company": job["company"],
                "companyColor": job.get("companyColor", "#3b82f6"),
                "category": job["category"],
                "location": job["location"],
                "region": job["region"],
                "jobType": job["jobType"],
                "experience": job["experience"],
                "salary": job["salary"],
                "score": final_score,
                "isMatch": is_match,
                "verdict": verdict,
                "cutoffScore": cutoff,
                "matchingSkills": all_matched,
                "missingSkills": all_missing,
                "coreMatchedCount": len(matched_core),
                "coreTotalCount": len(core_skills),
                "description": job["description"],
                "templateJd": job["templateJd"],
            })

        # Sort descending by compatibility score
        ranked_jobs.sort(key=lambda x: x["score"], reverse=True)

        best_match = ranked_jobs[0] if ranked_jobs else None

        return {
            "allJobMatches": ranked_jobs,
            "bestMatchedJob": best_match,
            "totalJobsEvaluated": len(ranked_jobs),
            "matchingJobsCount": sum(1 for j in ranked_jobs if j["isMatch"]),
            "potentialJobsCount": sum(1 for j in ranked_jobs if j["verdict"] == "Potential Match"),
        }

    @staticmethod
    def analyze_resume_weaknesses(
        resume_text: str,
        job_description: str,
        matching_skills: List[str],
        missing_skills: List[str],
        ats_score: float,
    ) -> List[Dict[str, Any]]:
        """
        Deep AI diagnostic: analyzes which sections of the resume are weak
        and provides specific, actionable improvement recommendations with before/after rewrites.
        """
        text = resume_text or ""
        lower_text = text.lower()
        weaknesses: List[Dict[str, Any]] = []

        # 1. Professional Summary / Headline Weakness
        has_summary_header = any(
            h in lower_text
            for h in ["summary", "professional summary", "about me", "profile", "objective"]
        )
        if not has_summary_header or len(text.split()) < 40:
            weaknesses.append({
                "id": "weak-summary-missing",
                "section": "Professional Summary",
                "severity": "critical" if ats_score < 70 else "moderate",
                "title": "Missing or Underspecified Executive Summary",
                "issue": (
                    "Your resume does not contain a dedicated, keyword-optimized Professional Summary at the top. "
                    "ATS parsers assign high initial weight to the top 20% of the document to index your primary role identity."
                ),
                "recommendation": (
                    "Add a 3 to 4 line Professional Summary directly under your contact info. Include your target job title, "
                    "years of technical experience, core stack competencies, and one standout quantitative achievement."
                ),
                "impact": "+8% ATS Score Boost",
                "exampleBefore": "Seeking a challenging role in software development where I can utilize my abilities.",
                "exampleAfter": (
                    f"Results-oriented Software Engineer with proven hands-on expertise in {', '.join(matching_skills[:3]) if matching_skills else 'Python, SQL & APIs'}. "
                    "Track record of architecting scalable microservices, optimizing query throughput by 35%, and deploying production features."
                ),
            })
        else:
            # Check if summary has quantifiable impact
            summary_part = text[:400]
            if not re.search(r"\b\d+%\b|\b\d+x\b|\b\d+\s*(?:users|clients|projects|years)\b", summary_part, re.I):
                weaknesses.append({
                    "id": "weak-summary-metrics",
                    "section": "Professional Summary",
                    "severity": "moderate",
                    "title": "Summary Lacks Standout Quantifiable Metrics",
                    "issue": (
                        "While a summary is present, it relies on descriptive adjectives without hard proof of scale or business impact."
                    ),
                    "recommendation": (
                        "Integrate at least one numerical metric (e.g., 'scaled system to 250k daily queries', 'reduced latency by 40%') "
                        "into your opening profile to immediately hook recruiter attention."
                    ),
                    "impact": "+5% ATS Score Boost",
                    "exampleBefore": "Passionate developer skilled in backend systems and building web applications.",
                    "exampleAfter": (
                        f"Full-stack engineer with hands-on mastery in {matching_skills[0] if matching_skills else 'core stack'}, "
                        "delivering microservices serving 100k+ active users with 99.9% uptime."
                    ),
                })

        # 2. Work Experience & Quantifiable Impact (STAR / XYZ Framework)
        metric_matches = re.findall(
            r"\b\d+%\b|\b\$\d+|\b\d+x\b|\b\d+\s*(?:users|clients|ms|seconds|minutes|k|lpa|lakh|million|req)\b",
            lower_text,
        )
        if len(metric_matches) < 3:
            weaknesses.append({
                "id": "weak-exp-metrics",
                "section": "Work Experience & Metrics",
                "severity": "critical",
                "title": "Lack of Measurable Metrics in Bullet Points (Google X-Y-Z Rule)",
                "issue": (
                    f"Found only {len(metric_matches)} quantifiable metric(s) across your work history. "
                    "Modern ATS algorithms and top tech recruiters heavily penalize duty-based resumes that don't quantify impact."
                ),
                "recommendation": (
                    "Apply Google's X-Y-Z formula to every experience bullet: 'Accomplished [X], measured by [Y], by doing [Z]'. "
                    "Replace vague descriptions with concrete numbers (latency drops, user volume, cost savings, test coverage)."
                ),
                "impact": "+10% ATS Score Boost",
                "exampleBefore": "Worked on improving database queries and helped backend performance.",
                "exampleAfter": (
                    "Optimized PostgreSQL database queries and added indexing, reducing API response latency by 42% for over 150,000 monthly active users."
                ),
            })

        # 3. Action Verbs & Passive Phrasing
        passive_matches = re.findall(
            r"\b(responsible for|assisted with|helped to|worked on|involved in|tasked with)\b",
            lower_text,
        )
        if len(passive_matches) >= 1:
            weaknesses.append({
                "id": "weak-action-verbs",
                "section": "Action Verbs & Phrasing",
                "severity": "moderate",
                "title": "Passive Phrasing Weakening Professional Authority",
                "issue": (
                    f"Detected {len(passive_matches)} passive phrase(s) such as '{passive_matches[0]}'. "
                    "Passive language signals supportive rather than leadership-level technical execution."
                ),
                "recommendation": (
                    "Eliminate 'responsible for' or 'worked on'. Begin every bullet with decisive high-impact verbs: "
                    "'Architected', 'Spearheaded', 'Engineered', 'Automated', or 'Benchmarked'."
                ),
                "impact": "+6% ATS Score Boost",
                "exampleBefore": "Was responsible for creating REST APIs and fixing bugs in the application.",
                "exampleAfter": (
                    "Architected resilient RESTful microservices in Python/FastAPI, eliminating 99.8% of runtime errors and cutting bug turnaround time."
                ),
            })

        # 4. Critical Technical Skill Gaps
        if missing_skills:
            top_missing = missing_skills[:4]
            weaknesses.append({
                "id": "weak-skills-gap",
                "section": "Core Technical Skills",
                "severity": "critical" if len(missing_skills) >= 3 else "moderate",
                "title": f"Missing Core Requisite Keywords ({', '.join(top_missing)})",
                "issue": (
                    f"The target job post repeatedly emphasizes {', '.join(top_missing)}, but these exact keyword strings "
                    "were not found in your resume text. ATS filters reject resumes lacking mandatory tech stack tags."
                ),
                "recommendation": (
                    f"Add {', '.join(top_missing[:3])} to your Technical Skills section, and cite at least one project, "
                    "coursework module, or tool integration where you applied them."
                ),
                "impact": f"+{min(15, len(top_missing) * 4)}% ATS Score Boost",
                "exampleBefore": f"Skills: {', '.join(matching_skills[:3]) if matching_skills else 'Programming, Web Dev'}",
                "exampleAfter": (
                    f"Skills: {', '.join(matching_skills[:3]) if matching_skills else 'Python, SQL'}, {', '.join(top_missing[:2])} (Containerization & Deployment)."
                ),
            })

        # 5. ATS Structure & Section Readability
        has_projects_header = any(h in lower_text for h in ["projects", "personal projects", "academic projects"])
        if not has_projects_header:
            weaknesses.append({
                "id": "weak-structure-projects",
                "section": "Structure & ATS Ingestion",
                "severity": "moderate",
                "title": "Missing Dedicated Technical Projects Section",
                "issue": (
                    "Your resume does not explicitly highlight standalone technical projects with GitHub links or live demos. "
                    "Projects are essential for proving hands-on proficiency in technologies not yet reflected in previous job titles."
                ),
                "recommendation": (
                    "Add a 'Technical Projects' section with 2-3 deep-dive projects. Include the tech stack tag, problem solved, "
                    "and a link to your public repository or hosted application."
                ),
                "impact": "+7% ATS Score Boost",
                "exampleBefore": "Built several apps during university and in spare time.",
                "exampleAfter": (
                    "Distributed Cache Engine | Python, Redis, Docker | GitHub: github.com/user/project\n"
                    "• Implemented LRU cache with lock-free concurrency, handling 25k ops/sec."
                ),
            })

        # 6. Formatting & Keyword Density (fallback if < 3 weaknesses)
        if len(weaknesses) < 4:
            weaknesses.append({
                "id": "weak-format-density",
                "section": "Formatting & Keyword Density",
                "severity": "minor",
                "title": "Keyword Repetition & Clean ATS Formatting",
                "issue": (
                    "To ensure maximum ATS compatibility score, primary technologies should appear both in the Skills table "
                    "and within contextual bullet points describing how you used them."
                ),
                "recommendation": (
                    "Cross-reference your skills section with work bullets so every key tool has contextual evidence of usage."
                ),
                "impact": "+4% ATS Score Boost",
                "exampleBefore": "Listed tools once in footer without context in work history.",
                "exampleAfter": "Integrated tools directly into project bullets showing real-world implementation context.",
            })

        return weaknesses

    @staticmethod
    def calculate_role_suitability(
        resume_text: str, detected_skills: List[str]
    ) -> List[Dict]:
        """
        Evaluate candidate's resume and detected skills against all major job posts.
        Returns a sorted list of suitable roles with match percentages and skill breakdowns.
        """
        resume_lower = (resume_text or "").lower()
        detected_set = {s.lower() for s in detected_skills}

        results = []

        for role in JOB_ROLES_CATALOG:
            core_skills = role["core_skills"]
            secondary_skills = role["secondary_skills"]

            # Count core skill matches
            matched_core = [
                s for s in core_skills
                if s.lower() in detected_set or re.search(r"\b" + re.escape(s.lower()) + r"\b", resume_lower)
            ]
            missing_core = [s for s in core_skills if s not in matched_core]

            # Count secondary skill matches
            matched_secondary = [
                s for s in secondary_skills
                if s.lower() in detected_set or re.search(r"\b" + re.escape(s.lower()) + r"\b", resume_lower)
            ]
            missing_secondary = [s for s in secondary_skills if s not in matched_secondary]

            # Calculate weighted suitability score (Core = 70%, Secondary = 30%)
            core_ratio = len(matched_core) / len(core_skills) if core_skills else 0
            secondary_ratio = len(matched_secondary) / len(secondary_skills) if secondary_skills else 0
            score = round((core_ratio * 70) + (secondary_ratio * 30))

            # Bonus for role title mentioned in resume
            role_title_words = role["title"].lower().split()
            if any(word in resume_lower for word in role_title_words if len(word) > 4):
                score = min(98, score + 6)

            all_matched = matched_core + matched_secondary
            all_missing = missing_core + missing_secondary

            # Match tier
            if score >= 75:
                tier = "Highly Suitable"
            elif score >= 55:
                tier = "Good Match"
            else:
                tier = "Skill Gap"

            # Create actionable advice for this role
            if missing_core:
                action_plan = f"To become a top contender for {role['title']}, add projects demonstrating {', '.join(missing_core[:3])}."
            elif missing_secondary:
                action_plan = f"Strong profile! Boost to 95%+ by incorporating {', '.join(missing_secondary[:2])}."
            else:
                action_plan = f"Your resume is exceptional for {role['title']}. Ready to submit to Tier-1 companies."

            results.append({
                "roleId": role["id"],
                "roleTitle": role["title"],
                "category": role["category"],
                "suitabilityScore": max(15, score),
                "tier": tier,
                "matchingSkills": all_matched,
                "missingSkills": all_missing,
                "missingCoreSkills": missing_core,
                "description": role["description"],
                "salaryRange": role["salary_in"],
                "salaryUs": role["salary_us"],
                "actionPlan": action_plan,
                "templateJd": role["template_jd"],
            })

        # Sort descending by suitability score
        results.sort(key=lambda x: x["suitabilityScore"], reverse=True)
        return results

    @staticmethod
    def get_regional_market_data(
        region_query: str, top_roles: List[Dict], detected_skills: List[str]
    ) -> Tuple[List[Dict], Dict]:
        """
        Generate active job opportunities and market intelligence for the selected region.
        """
        query_lower = (region_query or "India").lower()

        # Identify key region
        if "us" in query_lower or "united states" in query_lower or "america" in query_lower:
            region_key = "United States"
        elif "europe" in query_lower or "uk" in query_lower or "london" in query_lower or "berlin" in query_lower:
            region_key = "Europe & UK"
        elif "remote" in query_lower or "global" in query_lower or "worldwide" in query_lower:
            region_key = "Remote"
        else:
            region_key = "India"

        market = REGIONAL_MARKET_DATA[region_key]

        # Pick top suitable role
        primary_role = top_roles[0] if top_roles else {
            "roleTitle": "Full Stack Developer",
            "suitabilityScore": 85,
            "matchingSkills": ["Python", "React", "SQL"]
        }
        secondary_role = top_roles[1] if len(top_roles) > 1 else primary_role

        # Generate realistic active job vacancies matching candidate profile
        companies = market["companies"]
        cities = [c.split(" (")[0] for c in market["top_cities"]]

        active_jobs = [
            {
                "id": f"job-{region_key.lower()[:2]}-1",
                "title": f"Senior {primary_role['roleTitle']}",
                "company": companies[0],
                "region": region_key,
                "location": cities[0] if cities else region_key,
                "salary": market["avg_salary"],
                "experience": "2 - 5 Years",
                "matchScore": primary_role["suitabilityScore"],
                "tags": primary_role["matchingSkills"][:4],
                "postedDate": "1 day ago",
                "type": "Full-time",
            },
            {
                "id": f"job-{region_key.lower()[:2]}-2",
                "title": f"{primary_role['roleTitle']}",
                "company": companies[1],
                "region": region_key,
                "location": cities[1] if len(cities) > 1 else "Hybrid / Remote",
                "salary": market["avg_salary"],
                "experience": "1 - 4 Years",
                "matchScore": max(65, primary_role["suitabilityScore"] - 4),
                "tags": (primary_role["matchingSkills"] + ["Git", "REST APIs"])[:4],
                "postedDate": "3 days ago",
                "type": "Hybrid",
            },
            {
                "id": f"job-{region_key.lower()[:2]}-3",
                "title": f"Lead {secondary_role['roleTitle']}",
                "company": companies[2],
                "region": region_key,
                "location": cities[2] if len(cities) > 2 else "Remote",
                "salary": market["avg_salary"],
                "experience": "3 - 6 Years",
                "matchScore": secondary_role["suitabilityScore"],
                "tags": secondary_role["matchingSkills"][:4],
                "postedDate": "Just now",
                "type": "Full-time",
            },
            {
                "id": f"job-{region_key.lower()[:2]}-4",
                "title": f"{secondary_role['roleTitle']} (High-Growth Team)",
                "company": companies[3],
                "region": region_key,
                "location": "Remote / Flexible",
                "salary": market["avg_salary"],
                "experience": "2 - 5 Years",
                "matchScore": max(60, secondary_role["suitabilityScore"] - 3),
                "tags": detected_skills[:4] if detected_skills else ["Python", "FastAPI"],
                "postedDate": "4 days ago",
                "type": "Remote",
            },
        ]

        insights = {
            "region": market["region_name"],
            "demandIndex": market["demand_index"],
            "hiringVelocity": market["hiring_velocity"],
            "avgSalary": market["avg_salary"],
            "topCities": market["top_cities"],
            "regionalAtsTips": market["ats_tips"],
        }

        return active_jobs, insights
