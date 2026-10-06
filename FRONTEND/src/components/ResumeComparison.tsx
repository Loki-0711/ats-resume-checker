import React, { useState } from 'react';
import { FileText, Briefcase } from 'lucide-react';

interface ResumeComparisonProps {
  resumeSnippet: string;
  jobDescriptionSnippet: string;
  matchingSkills: string[];
  missingSkills: string[];
}

export const ResumeComparison: React.FC<ResumeComparisonProps> = ({
  resumeSnippet,
  jobDescriptionSnippet,
  matchingSkills,
  missingSkills,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'match' | 'missing'>('all');

  // Helper function to render formatted text with highlighted tokens
  const renderHighlightedText = (text: string, isResume: boolean) => {
    // Break into lines and tokens
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Check if line contains matching or missing skills
      const words = line.split(/(\s+)/);

      return (
        <div key={lineIdx} className="min-h-[1.4em] leading-relaxed">
          {words.map((word, wordIdx) => {
            const cleanWord = word.replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();

            const isMatchedSkill = matchingSkills.some(
              (s) => s.toLowerCase() === cleanWord || cleanWord.includes(s.toLowerCase())
            );

            const isMissingSkill = !isResume && missingSkills.some(
              (s) => s.toLowerCase() === cleanWord || cleanWord.includes(s.toLowerCase())
            );

            if (isMatchedSkill && (filterMode === 'all' || filterMode === 'match')) {
              return (
                <mark
                  key={wordIdx}
                  className="bg-cyan-500/25 text-cyan-200 border-b border-cyan-400 font-semibold px-0.5 rounded-sm"
                >
                  {word}
                </mark>
              );
            }

            if (isMissingSkill && (filterMode === 'all' || filterMode === 'missing')) {
              return (
                <mark
                  key={wordIdx}
                  className="bg-rose-500/25 text-rose-200 border-b border-rose-400 font-semibold px-0.5 rounded-sm"
                >
                  {word}
                </mark>
              );
            }

            return <span key={wordIdx}>{word}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/10 text-left">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Semantic Diff
            </span>
          </div>
          <h3 className="text-2xl font-bold text-white font-['Outfit']">
            Resume vs Job Description
          </h3>
          <p className="text-xs sm:text-sm text-slate-400">
            Side-by-side alignment highlighting matching qualifications and missing target requirements.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/5 rounded-xl font-mono text-xs">
          <button
            type="button"
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterMode === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Highlighted
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('match')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterMode === 'match'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Matches Only
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('missing')}
            className={`px-3 py-1 rounded-lg transition-all ${
              filterMode === 'missing'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 font-semibold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Missing Gaps
          </button>
        </div>
      </div>

      {/* Side-by-side Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Resume */}
        <div className="rounded-2xl border border-white/5 bg-[#090d18] p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Parsed Resume Snippet</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Candidate Vector
            </span>
          </div>

          <div className="font-mono text-xs text-slate-300 overflow-y-auto max-h-[360px] pr-2 space-y-1">
            {renderHighlightedText(resumeSnippet, true)}
          </div>
        </div>

        {/* Right: Job Description */}
        <div className="rounded-2xl border border-white/5 bg-[#090d18] p-5 flex flex-col">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Briefcase className="w-4 h-4 text-indigo-400" />
              <span>Job Description Requirements</span>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Target Benchmark
            </span>
          </div>

          <div className="font-mono text-xs text-slate-300 overflow-y-auto max-h-[360px] pr-2 space-y-1">
            {renderHighlightedText(jobDescriptionSnippet, false)}
          </div>
        </div>

      </div>

      {/* Legend Footer */}
      <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cyan-500/30 border border-cyan-400" />
            <span>Matching Keywords</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-rose-500/30 border border-rose-400" />
            <span>Missing Job Requirements</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-500">
          Evaluated against 1,024 TF-IDF vocabulary weights
        </div>
      </div>

    </div>
  );
};
