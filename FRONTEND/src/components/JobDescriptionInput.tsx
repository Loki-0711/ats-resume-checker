import React from 'react';
import { Trash2, Sparkles, AlertCircle } from 'lucide-react';

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
  const charCount = jobDescription.length;
  const wordCount = jobDescription.trim() ? jobDescription.trim().split(/\s+/).length : 0;

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col h-full border-indigo-500/20 text-left">
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
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
            Paste the job posting to vectorize keywords, requirements, and skill weights.
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

      {/* Textarea */}
      <div className="relative flex-1 flex flex-col min-h-[220px]">
        <textarea
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
          placeholder="Paste the job description you're applying for (e.g. Responsibilities, Required Skills, Tech Stack)..."
          className="w-full flex-1 min-h-[220px] p-4 rounded-2xl bg-[#080d1a]/80 border border-white/10 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 text-slate-200 placeholder-slate-500 text-sm leading-relaxed resize-y focus:outline-none font-sans transition-all"
        />

        {/* Floating Counts */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-3">
            <span>{charCount} Characters</span>
            <span>•</span>
            <span>{wordCount} Words</span>
          </div>
          <div className="text-indigo-400">
            {charCount > 100 ? '✓ Minimum length satisfied' : 'Paste at least 100 characters'}
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
          <span>Analyze Resume →</span>
        </button>

        <div className="flex items-center justify-center gap-4 mt-3 text-[11px] font-mono text-slate-500">
          <span>⚡ TF-IDF Vector Analysis</span>
          <span>•</span>
          <span>🎯 Cosine Similarity Score</span>
          <span>•</span>
          <span>🔍 Skill Gap Detection</span>
        </div>
      </div>

    </div>
  );
};
