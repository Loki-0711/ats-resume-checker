import type { AnalysisResult, ProcessingStep, RecentScan } from '../types';
import { defaultSoftwareEngineerResult, dashboardRecentScans, sampleProfiles } from '../data/mockAnalysis';

export const ANALYSIS_STEPS: ProcessingStep[] = [
  { id: 1, title: 'Parsing Resume', description: 'Extracting text, sections, and candidate metadata', targetPercent: 18 },
  { id: 2, title: 'Processing NLP', description: 'Tokenization, stopword removal, lemmatization & POS tagging', targetPercent: 36 },
  { id: 3, title: 'Generating TF-IDF Vectors', description: 'Building n-gram vocabulary and computing term frequencies', targetPercent: 54 },
  { id: 4, title: 'Calculating Cosine Similarity', description: 'Evaluating directional cosine distance between vectors', targetPercent: 72 },
  { id: 5, title: 'Matching Skills', description: 'Correlating technical skills, tools, and domain requirements', targetPercent: 88 },
  { id: 6, title: 'Generating AI Suggestions', description: 'Synthesizing actionable recommendations to boost shortlist odds', targetPercent: 100 },
];

class ATSService {
  private isProductionBackendAvailable = true;
  private backendBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  /**
   * Main ATS analysis method.
   * Seamlessly falls back to mock intelligence engine when FastAPI is offline.
   */
  async analyzeResume(
    file: File | null,
    resumeText: string,
    jobDescription: string,
    onStepUpdate?: (stepIndex: number, percent: number) => void
  ): Promise<AnalysisResult> {
    // If backend is configured, attempt real FastAPI call
    if (this.isProductionBackendAvailable) {
      try {
        const formData = new FormData();
        if (file) formData.append('resume_file', file);
        formData.append('resume_text', resumeText);
        formData.append('job_description', jobDescription);

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
      // Wait realistic processing increment
      await new Promise((resolve) => setTimeout(resolve, 550));
    }

    // Determine best-fit mock result based on keywords
    const lowerJd = (jobDescription || '').toLowerCase();
    let result: AnalysisResult;

    if (lowerJd.includes('pytorch') || lowerJd.includes('machine learning engineer') || lowerJd.includes('mle')) {
      result = JSON.parse(JSON.stringify(sampleProfiles[1].mockResult));
    } else if (lowerJd.includes('data analyst') || lowerJd.includes('snowflake') || lowerJd.includes('tableau')) {
      result = JSON.parse(JSON.stringify(sampleProfiles[2].mockResult));
    } else {
      result = JSON.parse(JSON.stringify(defaultSoftwareEngineerResult));
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
