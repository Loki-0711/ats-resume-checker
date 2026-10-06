export type PriorityLevel = 'high' | 'medium' | 'low';
export type MatchStatus = 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Low Match';

export interface AISuggestion {
  id: string;
  title: string;
  explanation: string;
  priority: PriorityLevel;
  impact: string;
  category: 'Experience' | 'Cloud/DevOps' | 'Metrics' | 'Keywords';
  exampleBefore?: string;
  exampleAfter?: string;
}

export interface ScoreBreakdown {
  skillsMatch: number;          // e.g. 88
  experienceRelevance: number;  // e.g. 79
  keywordCoverage: number;      // e.g. 84
  resumeQuality: number;        // e.g. 76
}

export interface SkillCategoryStat {
  name: string;
  matchRate: number;
  matchedCount: number;
  totalCount: number;
}

export interface DonutSegment {
  name: string;
  value: number;
  color: string;
}

export interface RadarMetric {
  subject: string;
  score: number;
  fullMark: number;
}

export interface HighlightTerm {
  text: string;
  type: 'match' | 'missing' | 'keyword' | 'neutral';
}

export interface AnalysisResult {
  id: string;
  jobTitle: string;
  company: string;
  candidateName: string;
  fileName: string;
  fileSize?: string;
  overallScore: number;
  scoreLabel: MatchStatus;
  comparisonVsAverage: number; // e.g. +12
  breakdown: ScoreBreakdown;
  matchingSkills: string[];
  missingSkills: string[];
  whyMissingMatters: string;
  skillCategories: SkillCategoryStat[];
  suggestions: AISuggestion[];
  donutData: DonutSegment[];
  radarData: RadarMetric[];
  resumeSnippet: string;
  jobDescriptionSnippet: string;
  analyzedAt: string;
}

export interface RecentScan {
  id: string;
  jobTitle: string;
  company: string;
  score: number;
  date: string;
  status: MatchStatus;
  matchingCount: number;
  missingCount: number;
}

export interface SampleProfile {
  id: string;
  label: string;
  role: string;
  company: string;
  resumeFileName: string;
  resumeText: string;
  jobDescription: string;
  mockResult: AnalysisResult;
}

export interface ProcessingStep {
  id: number;
  title: string;
  description: string;
  targetPercent: number;
}
