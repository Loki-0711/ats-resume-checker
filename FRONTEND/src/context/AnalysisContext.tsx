import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AnalysisResult, RecentScan, SampleProfile } from '../types';
import { atsService } from '../services/api';
import { defaultSoftwareEngineerResult, dashboardRecentScans, sampleProfiles } from '../data/mockAnalysis';

interface AnalysisContextType {
  currentResult: AnalysisResult;
  isAnalyzing: boolean;
  currentStepIndex: number;
  progressPercent: number;
  uploadedFile: File | null;
  resumeText: string;
  jobDescription: string;
  recentScans: RecentScan[];
  selectedPresetId: string | null;
  setUploadedFile: (file: File | null) => void;
  setResumeText: (text: string) => void;
  setJobDescription: (jd: string) => void;
  loadPreset: (preset: SampleProfile) => void;
  clearInputs: () => void;
  startAnalysis: () => Promise<AnalysisResult>;
  viewSavedScan: (scanId: string) => Promise<void>;
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
  const [recentScans, setRecentScans] = useState<RecentScan[]>(dashboardRecentScans);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>('sample-swe');

  const loadPreset = (preset: SampleProfile) => {
    setSelectedPresetId(preset.id);
    setResumeText(preset.resumeText);
    setJobDescription(preset.jobDescription);
    setUploadedFile(null);
  };

  const clearInputs = () => {
    setSelectedPresetId(null);
    setUploadedFile(null);
    setResumeText('');
    setJobDescription('');
  };

  const startAnalysis = async (): Promise<AnalysisResult> => {
    setIsAnalyzing(true);
    setCurrentStepIndex(0);
    setProgressPercent(5);

    try {
      const result = await atsService.analyzeResume(
        uploadedFile,
        resumeText,
        jobDescription,
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
        recentScans,
        selectedPresetId,
        setUploadedFile,
        setResumeText,
        setJobDescription,
        loadPreset,
        clearInputs,
        startAnalysis,
        viewSavedScan,
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
