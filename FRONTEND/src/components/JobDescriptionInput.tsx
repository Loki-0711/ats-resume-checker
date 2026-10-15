import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Sparkles, AlertCircle, Briefcase, ExternalLink } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import type { JobPost } from '../types';

interface JobDescriptionInputProps {
  jobDescription: string;
  onJobDescriptionChange: (val: string) => void;
  onClear: () => void;
  onAnalyze: () => void;
  isReadyToAnalyze: boolean;
}

export const JobDescriptionInput: React.FC<JobDescriptionInputProps> = ({
  jobDescription,
  onJobDescriptionChange,
  onClear,
  onAnalyze,
  isReadyToAnalyze,
}) => {
  const { jobPosts, selectJobPostForAnalysis, selectedJobPost, jobTitle, targetCompany } = useAnalysis();
  const charCount = jobDescription.length;
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  const handleSelectJobPost = (job: JobPost) => {
    selectJobPostForAnalysis(job);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-full border-indigo-500/20 text-left">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-indigo-400 uppercase tracking-wider font-semibold">
              Step 02
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-500" />
            <span className="text-xs text-slate-400">Target Benchmark</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-['Outfit']">
            Job Description
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Paste target requirements or choose from our active industry job postings.
          </p>
        </div>

        {charCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-rose-400 transition-colors px-2 py-1 rounded bg-white/5 hover:bg-rose-950/30"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Quick Select from Curated Job Posts Bar */}
      <div className="mb-4 p-3 rounded-xl bg-slate-900/60 border border-white/5 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-slate-400 flex items-center gap-1.5 font-semibold">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Quick Select Job Benchmark:</span>
          </span>
          <Link
            to="/jobs"
            className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
          >
            <span>View All Jobs ({jobPosts.length})</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {jobPosts.slice(0, 5).map((job: JobPost) => {
            const isSelected = selectedJobPost?.id === job.id;
            return (
              <button
                key={job.id}
                type="button"
                onClick={() => handleSelectJobPost(job)}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-medium whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/5 hover:bg-white/10'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: job.companyColor || '#3b82f6' }}
                />
                <span>{job.company}: {job.title.split(' ')[0]} {job.title.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        {selectedJobPost && (
          <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between pt-1 border-t border-white/5">
            <span>Target: <strong className="text-cyan-300">{jobTitle}</strong> at <strong className="text-slate-200">{targetCompany}</strong></span>
            <span className="text-emerald-400">{selectedJobPost.salary}</span>
          </div>
        )}
      </div>

      {/* Textarea */}
      <div className="relative flex-1 flex flex-col min-h-[200px]">
        <textarea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description you're applying for (e.g. Responsibilities, Required Skills, Tech Stack)..."
          className="w-full flex-1 min-h-[200px] p-4 rounded-2xl bg-[#080d1a]/80 border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 text-slate-200 placeholder-slate-500 text-sm leading-relaxed resize-y focus:outline-none font-sans transition-all"
        />

        {/* Floating Counts */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>{charCount} Characters</span>
            <span>•</span>
            <span>{wordCount} Words</span>
          </div>
          <div className="text-indigo-400">
            {charCount > 60 ? '✓ Ready to analyze' : 'Paste at least 60 characters'}
          </div>
        </div>
      </div>

      {/* Analysis Action Button */}
      <div className="mt-6 pt-5 border-t border-white/5">
        {!isReadyToAnalyze && (
          <div className="flex items-center gap-2 mb-3 text-xs text-amber-400/90 font-mono bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Ensure resume text is loaded and job description is entered to calculate similarity.</span>
          </div>
        )}

        <button
          type="button"
          onClick={onAnalyze}
          disabled={!isReadyToAnalyze}
          className={`w-full py-4 px-6 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-xl ${
            isReadyToAnalyze
              ? 'bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] cursor-pointer'
              : 'bg-slate-800/80 text-slate-500 cursor-not-allowed border border-white/5'
          }`}
        >
          <Sparkles className="w-5 h-5 text-cyan-200 animate-spin-slow" />
          <span>Analyze Resume & Match Job →</span>
        </button>

        <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-mono text-slate-500">
          <span>⚡ TF-IDF Vector Analysis</span>
          <span>•</span>
          <span>🎯 Match Verdict Determination</span>
          <span>•</span>
          <span>🔍 Resume Weakness Diagnostic</span>
        </div>
      </div>

    </div>
  );
};
