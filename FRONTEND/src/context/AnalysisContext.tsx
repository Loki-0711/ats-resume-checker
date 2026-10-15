import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { AnalysisResult, RecentScan, SampleProfile, JobPost } from '../types';
import { atsService } from '../services/api';
import { defaultSoftwareEngineerResult, dashboardRecentScans, sampleProfiles, jobPostsCatalog } from '../data/mockAnalysis';

interface AnalysisContextType {
  currentResult: AnalysisResult;
  isAnalyzing: boolean;
  currentStepIndex: number;
  progressPercent: number;
  uploadedFile: File | null;
  resumeText: string;
  jobDescription: string;
  jobTitle: string;
  region: string;
  targetCompany: string;
  jobPosts: JobPost[];
  selectedJobPost: JobPost | null;
  recentScans: RecentScan[];
  selectedPresetId: string | null;
  setUploadedFile: (file: File | null) => void;
  setResumeText: (text: string) => void;
  setJobDescription: (jd: string) => void;
  setJobTitle: (title: string) => void;
  setRegion: (region: string) => void;
  setTargetCompany: (company: string) => void;
  selectJobPostForAnalysis: (job: JobPost) => void;
  loadPreset: (preset: SampleProfile) => void;
  selectSuitableRole: (roleTitle: string, templateJd?: string) => void;
  clearInputs: () => void;
  startAnalysis: (overrideJd?: string, overrideTitle?: string, overrideCompany?: string) => Promise<AnalysisResult>;
  viewSavedScan: (scanId: string) => Promise<void>;
  addNewJobPost: (job: Partial<JobPost>) => Promise<JobPost>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentResult, setCurrentResult] = useState<AnalysisResult>(defaultSoftwareEngineerResult);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string>(sampleProfiles[0].resumeText);
  const [jobDescription, setJobDescription] = useState<string>(sampleProfiles[0].jobDescription);
  const [jobTitle, setJobTitle] = useState<string>(sampleProfiles[0].role);
  const [targetCompany, setTargetCompany] = useState<string>(sampleProfiles[0].company || 'Stripe');
  const [region, setRegion] = useState<string>('India (Bangalore, Remote)');
  const [jobPosts, setJobPosts] = useState<JobPost[]>(jobPostsCatalog);
  const [selectedJobPost, setSelectedJobPost] = useState<JobPost | null>(jobPostsCatalog[0]);
  const [recentScans, setRecentScans] = useState<RecentScan[]>(dashboardRecentScans);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>('sample-swe');

  // Load active jobs from API on startup
  useEffect(() => {
    atsService.getJobPosts().then((posts) => {
      if (posts && posts.length > 0) {
        setJobPosts(posts);
      }
    });
  }, []);

  const selectJobPostForAnalysis = (job: JobPost) => {
    setSelectedJobPost(job);
    setJobTitle(job.title);
    setTargetCompany(job.company);
    setJobDescription(job.templateJd || job.description);
    if (job.location) setRegion(job.location);
  };

  const addNewJobPost = async (job: Partial<JobPost>): Promise<JobPost> => {
    const created = await atsService.createJobPost(job);
    setJobPosts((prev) => [created, ...prev]);
    return created;
  };

  const loadPreset = (preset: SampleProfile) => {
    setSelectedPresetId(preset.id);
    setResumeText(preset.resumeText);
    setJobDescription(preset.jobDescription);
    setJobTitle(preset.role);
    setTargetCompany(preset.company);
    if (preset.region) setRegion(preset.region);
    setUploadedFile(null);
  };

  const selectSuitableRole = (newRoleTitle: string, templateJd?: string) => {
    setJobTitle(newRoleTitle);
    if (templateJd && templateJd.trim()) {
      setJobDescription(templateJd);
    }
  };

  const clearInputs = () => {
    setSelectedPresetId(null);
    setUploadedFile(null);
    setResumeText('');
    setJobDescription('');
    setJobTitle('Full Stack Developer');
    setTargetCompany('Top Tech Companies');
    setRegion('India (Bangalore, Remote)');
    setSelectedJobPost(null);
  };

  const startAnalysis = async (
    overrideJd?: string,
    overrideTitle?: string,
    overrideCompany?: string
  ): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setProgressPercent(5);

    const jdToUse = overrideJd || jobDescription;
    const titleToUse = overrideTitle || jobTitle;
    const companyToUse = overrideCompany || targetCompany;

    try {
      const result = await atsService.analyzeResume(
        uploadedFile,
        resumeText,
        jdToUse,
        titleToUse,
        region,
        companyToUse,
        (stepIndex, percent) => {
          setCurrentStepIndex(stepIndex);
          setProgressPercent(percent);
        }
      );

      setCurrentResult(result);

      // Update recent scans
      const newScan: RecentScan = {
        id: `scan-${Date.now()}`,
        jobTitle: result.jobTitle,
        company: result.company,
        score: result.overallScore,
        date: 'Just now',
        status: result.scoreLabel,
        matchingCount: result.matchingSkills.length,
        missingCount: result.missingSkills.length,
        region: result.region,
      };
      setRecentScans((prev) => [newScan, ...prev]);

      return result;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const viewSavedScan = async (scanId: string) => {
    const res = await atsService.getResultById(scanId);
    if (res) {
      setCurrentResult(res);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        currentResult,
        isAnalyzing,
        currentStepIndex,
        progressPercent,
        uploadedFile,
        resumeText,
        jobDescription,
        jobTitle,
        region,
        targetCompany,
        jobPosts,
        selectedJobPost,
        recentScans,
        selectedPresetId,
        setUploadedFile,
        setResumeText,
        setJobDescription,
        setJobTitle,
        setRegion,
        setTargetCompany,
        selectJobPostForAnalysis,
        loadPreset,
        selectSuitableRole,
        clearInputs,
        startAnalysis,
        viewSavedScan,
        addNewJobPost,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};
