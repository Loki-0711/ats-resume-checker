export type PriorityLevel = 'high' | 'medium' | 'low';
export type MatchStatus = 'Strong Match' | 'Good Match' | 'Moderate Match' | 'Low Match';
export type SuitabilityTier = 'Highly Suitable' | 'Good Match' | 'Skill Gap';
export type WeaknessSeverity = 'critical' | 'moderate' | 'minor';

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

export interface JobRoleSuitability {
  roleId: string;
  roleTitle: string;
  category?: string;
  suitabilityScore: number;
  tier: SuitabilityTier;
  matchingSkills: string[];
  missingSkills: string[];
  missingCoreSkills?: string[];
  description: string;
  salaryRange?: string;
  salaryUs?: string;
  actionPlan: string;
  templateJd?: string;
}

export interface JobPost {
  id: string;
  title: string;
  company: string;
  companyColor?: string;
  category: string;
  location: string;
  region: string;
  jobType: 'Full-time' | 'Hybrid' | 'Remote' | 'Contract';
  experience: string;
  salary: string;
  postedDate: string;
  coreSkills: string[];
  secondarySkills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  templateJd: string;
  cutoffScore?: number;
}

export interface MatchVerdict {
  isMatch: boolean;
  verdict: 'Strong Match' | 'Potential Match' | 'Does Not Match';
  verdictBadge: 'MATCH' | 'POTENTIAL MATCH' | 'NO MATCH';
  badgeColor: 'emerald' | 'amber' | 'rose';
  score: number;
  threshold: number;
  shortlistOdds: string;
  summary: string;
  skillCoverage: number;
  reasons: string[];
  matchedCount: number;
  missingCount: number;
}

export interface JobMatchRanking {
  jobId: string;
  jobTitle: string;
  company: string;
  companyColor?: string;
  category: string;
  location: string;
  region: string;
  jobType: string;
  experience: string;
  salary: string;
  score: number;
  isMatch: boolean;
  verdict: string;
  cutoffScore: number;
  matchingSkills: string[];
  missingSkills: string[];
  coreMatchedCount: number;
  coreTotalCount: number;
  description: string;
  templateJd: string;
}

export interface ResumeWeakness {
  id: string;
  section: string;
  severity: WeaknessSeverity;
  title: string;
  issue: string;
  recommendation: string;
  impact: string;
  exampleBefore: string;
  exampleAfter: string;
}

export interface RegionalJobPost {
  id: string;
  title: string;
  company: string;
  region: string;
  location: string;
  salary: string;
  experience: string;
  matchScore: number;
  tags: string[];
  postedDate: string;
  type: 'Full-time' | 'Hybrid' | 'Remote' | 'Contract';
}

export interface RegionalMarketInsight {
  region: string;
  demandIndex: number;
  hiringVelocity: string;
  avgSalary: string;
  topCities: string[];
  regionalAtsTips: string[];
}

export interface AnalysisResult {
  id: string;
  jobTitle: string;
  company: string;
  region?: string;
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
  matchVerdict?: MatchVerdict;
  allJobsMatches?: JobMatchRanking[];
  bestMatchedJob?: JobMatchRanking;
  weaknesses?: ResumeWeakness[];
  roleSuitability?: JobRoleSuitability[];
  regionalJobs?: RegionalJobPost[];
  regionalInsights?: RegionalMarketInsight;
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
  region?: string;
}

export interface SampleProfile {
  id: string;
  label: string;
  role: string;
  company: string;
  region?: string;
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
