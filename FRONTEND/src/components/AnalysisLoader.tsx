import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { ANALYSIS_STEPS } from '../services/api';
import { AIOrbCanvas } from './3d/AIOrbCanvas';

interface AnalysisLoaderProps {
  currentStepIndex: number;
  progressPercent: number;
}

export const AnalysisLoader: React.FC<AnalysisLoaderProps> = ({
  currentStepIndex,
  progressPercent,
}) => {
  // Generate ASCII block progress bar: e.g. ████████████░░░ 82%
  const totalBlocks = 20;
  const filledBlocks = Math.min(totalBlocks, Math.round((progressPercent / 100) * totalBlocks));
  const emptyBlocks = Math.max(0, totalBlocks - filledBlocks);
  const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[#060813]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-xl w-full flex flex-col items-center text-center z-10 my-auto">
        
        {/* 3D AI Core in Center */}
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 mb-4">
          <AIOrbCanvas className="w-full h-full" />
          <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-ping opacity-20 pointer-events-none" />
        </div>

        {/* Title */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>Neural Parsing Pipeline Running</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Outfit'] mb-2">
          AI is analyzing your resume...
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
          Calculating TF-IDF term frequency vectors and computing cosine similarity against target job requirements.
        </p>

        {/* ASCII & Graphical Progress Bar */}
        <div className="w-full max-w-md bg-[#080d1a] border border-cyan-500/30 rounded-2xl p-4 shadow-xl mb-8">
          <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2">
            <span>PIPELINE PROGRESS</span>
            <span className="text-emerald-400 font-bold">{progressPercent}%</span>
          </div>

          {/* Graphic Bar */}
          <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden mb-3 border border-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Monospace ASCII Bar */}
          <div className="font-mono text-xs text-cyan-300 tracking-wider text-center select-none overflow-x-auto py-0.5">
            {asciiBar} <span className="text-white font-bold ml-1">{progressPercent}%</span>
          </div>
        </div>

        {/* Sequential Stages List */}
        <div className="w-full max-w-md space-y-2 text-left">
          {ANALYSIS_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs transition-all duration-300 ${
                  isCurrent
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-white shadow-md shadow-cyan-500/10'
                    : isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/30 text-slate-300'
                    : 'bg-slate-950/40 border-white/5 text-slate-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                  ) : (
                    <span className="w-4 h-4 rounded-full border border-slate-700 flex items-center justify-center text-[9px] font-mono text-slate-500">
                      {step.id}
                    </span>
                  )}
                  <span className={`font-medium ${isCurrent ? 'text-cyan-300 font-semibold' : ''}`}>
                    {step.title}
                  </span>
                </div>

                <span className="text-[10px] font-mono text-slate-400">
                  {isCompleted ? 'Done' : isCurrent ? 'Computing...' : 'Pending'}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </motion.div>
  );
};
