import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  RotateCcw, 
  Download, 
  Share2, 
  ChevronRight,
  FileEdit
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { ATSScore } from '../components/ATSScore';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { SkillMatch } from '../components/SkillMatch';
import { MissingSkills } from '../components/MissingSkills';
import { AISuggestions } from '../components/AISuggestions';
import { ResumeComparison } from '../components/ResumeComparison';
import { AnalyticsCharts } from '../components/AnalyticsCharts';

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { currentResult } = useAnalysis();
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#060813] py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Top Header & Action Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6 text-left">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Link
                to="/analyze"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Analysis Studio</span>
              </Link>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-mono text-slate-400">
                Generated {currentResult.analyzedAt}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Resume Analysis
            </h1>

            <p className="text-sm text-slate-400 font-mono flex items-center gap-2">
              <span className="text-cyan-400 font-semibold">{currentResult.jobTitle}</span>
              <span>•</span>
              <span>AI Resume Analysis</span>
              <span>•</span>
              <span className="text-slate-500">{currentResult.fileName}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              to="/builder"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:scale-[1.02] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <FileEdit className="w-3.5 h-3.5" />
              <span>Fix in Resume Builder</span>
            </Link>

            <button
              type="button"
              onClick={() => navigate('/analyze')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Re-analyze</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export PDF Report</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Top Hero Score Section: ATS Centerpiece + Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Large Circular ATS Score (Left Col) */}
          <div className="lg:col-span-5 flex flex-col">
            <ATSScore
              score={currentResult.overallScore}
              label={currentResult.scoreLabel}
              comparisonVsAverage={currentResult.comparisonVsAverage}
            />
          </div>

          {/* Score Breakdown for Skills, Experience, Keywords, Quality (Right Col) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <ScoreBreakdown breakdown={currentResult.breakdown} />
          </div>

        </div>

        {/* Skills Section: Matching Skills & Missing Skills side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          <SkillMatch skills={currentResult.matchingSkills} />
          <MissingSkills
            skills={currentResult.missingSkills}
            whyMissingMatters={currentResult.whyMissingMatters}
          />
        </div>

        {/* AI Recommendations Section */}
        <AISuggestions suggestions={currentResult.suggestions} />

        {/* Resume vs Job Description Visual Comparison */}
        <ResumeComparison
          resumeSnippet={currentResult.resumeSnippet}
          jobDescriptionSnippet={currentResult.jobDescriptionSnippet}
          matchingSkills={currentResult.matchingSkills}
          missingSkills={currentResult.missingSkills}
        />

        {/* Interactive Analytics Charts (Recharts) */}
        <AnalyticsCharts
          categories={currentResult.skillCategories}
          donutData={currentResult.donutData}
          radarData={currentResult.radarData}
        />

        {/* Bottom Navigation CTA */}
        <div className="glass-panel rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-cyan-500/20 text-left">
          <div>
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Ready to verify another role or track overall progress?
            </h4>
            <p className="text-xs text-slate-400">
              Visit your candidate dashboard to review past scores and improvement trajectory.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
            >
              <span>View Dashboard</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
