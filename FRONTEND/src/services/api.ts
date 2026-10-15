import type { AnalysisResult, ProcessingStep, RecentScan, JobPost } from '../types';
import {
  defaultSoftwareEngineerResult,
  dashboardRecentScans,
  sampleProfiles,
  jobPostsCatalog,
  defaultMockWeaknesses,
  defaultMockVerdict,
  defaultMockAllJobsMatches,
} from '../data/mockAnalysis';

export const ANALYSIS_STEPS: ProcessingStep[] = [
  { id: 1, title: 'Parsing Resume', description: 'Extracting text, sections, and candidate metadata', targetPercent: 18 },
  { id: 2, title: 'Processing NLP', description: 'Tokenization, stopword removal, lemmatization & POS tagging', targetPercent: 36 },
  { id: 3, title: 'Generating TF-IDF Vectors', description: 'Building n-gram vocabulary and computing term frequencies', targetPercent: 54 },
  { id: 4, title: 'Calculating Cosine Similarity', description: 'Evaluating directional cosine distance between vectors', targetPercent: 72 },
  { id: 5, title: 'Matching Skills & Suitability', description: 'Matching post requirements, regional demand & role tiers', targetPercent: 88 },
  { id: 6, title: 'Generating AI Insights', description: 'Synthesizing actionable recommendations to boost shortlist odds', targetPercent: 100 },
];

class ATSService {
  private isProductionBackendAvailable = true;
  private backendBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  private inMemoryJobPosts: JobPost[] = [...jobPostsCatalog];

  /**
   * Fetch active job postings from FastAPI or fallback catalog.
   */
  async getJobPosts(): Promise<JobPost[]> {
    if (this.isProductionBackendAvailable) {
      try {
        const response = await fetch(`${this.backendBaseUrl}/jobs`);
        if (response.ok) {
          const data = await response.json();
          if (data.jobs && Array.isArray(data.jobs)) {
            this.inMemoryJobPosts = data.jobs;
            return data.jobs as JobPost[];
          }
        }
      } catch (err) {
        console.warn('FastAPI /jobs not reached. Using curated catalog.', err);
      }
    }
    return this.inMemoryJobPosts;
  }

  /**
   * Create a new custom job posting.
   */
  async createJobPost(newJob: Partial<JobPost>): Promise<JobPost> {
    if (this.isProductionBackendAvailable) {
      try {
        const response = await fetch(`${this.backendBaseUrl}/jobs`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newJob),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.job) {
            this.inMemoryJobPosts.unshift(data.job);
            return data.job as JobPost;
          }
        }
      } catch (err) {
        console.warn('FastAPI create job failed, falling back locally.', err);
      }
    }

    const created: JobPost = {
      id: `job-custom-${Date.now()}`,
      title: newJob.title || 'Custom Position',
      company: newJob.company || 'Direct Employer',
      companyColor: newJob.companyColor || '#38bdf8',
      category: newJob.category || 'Software Engineering',
      location: newJob.location || 'Remote',
      region: newJob.region || 'Global',
      jobType: (newJob.jobType as any) || 'Full-time',
      experience: newJob.experience || '2 - 5 Years',
      salary: newJob.salary || 'Competitive',
      postedDate: 'Just now',
      coreSkills: newJob.coreSkills || ['Python', 'SQL', 'Git'],
      secondarySkills: newJob.secondarySkills || ['Docker', 'REST APIs'],
      description: newJob.description || '',
      responsibilities: newJob.responsibilities || ['Contribute to product architecture and development.'],
      requirements: newJob.requirements || ['Solid software engineering background.'],
      templateJd: newJob.templateJd || newJob.description || '',
      cutoffScore: newJob.cutoffScore || 70,
    };

    this.inMemoryJobPosts.unshift(created);
    return created;
  }

  /**
   * Multi-job match evaluation against all jobs in catalog.
   */
  async matchAllJobs(file: File | null, resumeText: string): Promise<any> {
    if (this.isProductionBackendAvailable) {
      try {
        const formData = new FormData();
        if (file) formData.append('resume_file', file);
        formData.append('resume_text', resumeText);

        const response = await fetch(`${this.backendBaseUrl}/match-all-jobs`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          return await response.json();
        }
      } catch (err) {
        console.warn('FastAPI /match-all-jobs not reached.', err);
      }
    }

    // Client-side simulation fallback
    return {
      allJobMatches: defaultMockAllJobsMatches,
      bestMatchedJob: defaultMockAllJobsMatches[0],
      totalJobsEvaluated: defaultMockAllJobsMatches.length,
      matchingJobsCount: defaultMockAllJobsMatches.filter((j) => j.isMatch).length,
    };
  }

  /**
   * Main ATS analysis method.
   * Seamlessly falls back to mock intelligence engine when FastAPI is offline.
   */
  async analyzeResume(
    file: File | null,
    resumeText: string,
    jobDescription: string,
    jobTitle?: string,
    region?: string,
    targetCompany?: string,
    onStepUpdate?: (stepIndex: number, percent: number) => void
  ): Promise<AnalysisResult> {
    // If backend is configured, attempt real FastAPI call
    if (this.isProductionBackendAvailable) {
      try {
        const formData = new FormData();
        if (file) formData.append('resume_file', file);
        formData.append('resume_text', resumeText);
        formData.append('job_description', jobDescription);
        if (jobTitle) formData.append('job_title', jobTitle);
        if (region) formData.append('region', region);
        if (targetCompany) formData.append('target_company', targetCompany);

        const response = await fetch(`${this.backendBaseUrl}/analyze`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          return data as AnalysisResult;
        }
      } catch (err) {
        console.warn('FastAPI backend not reached. Falling back to frontend mock engine.', err);
      }
    }

    // High-fidelity Mock AI Processing simulation
    for (let i = 0; i < ANALYSIS_STEPS.length; i++) {
      const step = ANALYSIS_STEPS[i];
      if (onStepUpdate) {
        onStepUpdate(i, step.targetPercent);
      }
      // Realistic processing delay
      await new Promise((resolve) => setTimeout(resolve, 350));
    }

    // Determine best-fit mock result based on keywords
    const lowerJd = (jobDescription || '').toLowerCase();
    const lowerTitle = (jobTitle || '').toLowerCase();
    let result: AnalysisResult;

    if (lowerJd.includes('pytorch') || lowerTitle.includes('machine learning') || lowerTitle.includes('mle')) {
      result = JSON.parse(JSON.stringify(sampleProfiles[1].mockResult));
    } else if (lowerJd.includes('data analyst') || lowerTitle.includes('analyst') || lowerJd.includes('snowflake')) {
      result = JSON.parse(JSON.stringify(sampleProfiles[2].mockResult));
    } else {
      result = JSON.parse(JSON.stringify(defaultSoftwareEngineerResult));
    }

    if (jobTitle) result.jobTitle = jobTitle;
    if (region) result.region = region;
    if (targetCompany) result.company = targetCompany;

    if (!result.matchVerdict) {
      result.matchVerdict = defaultMockVerdict;
    }
    if (!result.allJobsMatches) {
      result.allJobsMatches = defaultMockAllJobsMatches;
    }
    if (!result.bestMatchedJob) {
      result.bestMatchedJob = defaultMockAllJobsMatches[0];
    }
    if (!result.weaknesses) {
      result.weaknesses = defaultMockWeaknesses;
    }

    if (file) {
      result.fileName = file.name;
      result.fileSize = `${(file.size / 1024).toFixed(0)} KB`;
    }

    return result;
  }

  async getRecentScans(): Promise<RecentScan[]> {
    return dashboardRecentScans;
  }

  async getResultById(id: string): Promise<AnalysisResult | null> {
    if (id === 'scan-mle-091') return sampleProfiles[1].mockResult;
    if (id === 'scan-data-076') return sampleProfiles[2].mockResult;
    return defaultSoftwareEngineerResult;
  }
}

export const atsService = new ATSService();
