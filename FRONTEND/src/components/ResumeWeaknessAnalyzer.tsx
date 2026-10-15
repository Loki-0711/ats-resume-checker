import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertOctagon,
  AlertTriangle,
  Lightbulb,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  FileEdit,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import type { ResumeWeakness, WeaknessSeverity } from '../types';

interface ResumeWeaknessAnalyzerProps {
  weaknesses?: ResumeWeakness[];
}

export const ResumeWeaknessAnalyzer: React.FC<ResumeWeaknessAnalyzerProps> = ({
  weaknesses = [],
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(weaknesses[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'moderate'>('all');

  const filteredWeaknesses = weaknesses.filter((w) => {
    if (activeTab === 'critical') return w.severity === 'critical';
    if (activeTab === 'moderate') return w.severity === 'moderate';
    return true;
  });

  const handleCopy = (id: string, text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getSeverityBadge = (severity: WeaknessSeverity) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <AlertOctagon className="w-3 h-3" />
            <span>Critical Weakness</span>
          </span>
        );
      case 'moderate':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3 h-3" />
            <span>Moderate Weakness</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
            <Lightbulb className="w-3 h-3" />
            <span>Optimization Opportunity</span>
          </span>
        );
    }
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-rose-500/20 text-left space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span className="text-xs font-mono text-rose-400 uppercase tracking-wider font-semibold">
              Deep Section-by-Section Diagnostics
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Where is Your Resume Weak?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Algorithmic breakdown identifying exact sections dragging down your ATS score and step-by-step guidance to fix them.
          </p>
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-2xl border border-white/5">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'all'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Weaknesses ({weaknesses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('critical')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              activeTab === 'critical'
                ? 'bg-rose-500/30 text-rose-200 border border-rose-500/50'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Critical ({weaknesses.filter((w) => w.severity === 'critical').length})
          </button>
        </div>
      </div>

      {/* Weakness Cards */}
      <div className="space-y-4">
        {filteredWeaknesses.map((item, idx) => {
          const isExpanded = expandedId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                item.severity === 'critical'
                  ? isExpanded
                    ? 'bg-rose-950/20 border-rose-500/50 shadow-lg shadow-rose-950/30'
                    : 'bg-slate-900/40 border-rose-500/20 hover:border-rose-500/40'
                  : isExpanded
                  ? 'bg-amber-950/20 border-amber-500/50 shadow-lg shadow-amber-950/30'
                  : 'bg-slate-900/40 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Header Row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-white/5 text-slate-300 border border-white/10">
                      {item.section}
                    </span>
                    {getSeverityBadge(item.severity)}
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.impact}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                    {item.issue}
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Actionable Improvement Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-white/10 p-5 bg-slate-950/50 space-y-4"
                  >
                    {/* Recommendation Section */}
                    <div className="bg-cyan-500/10 border border-cyan-500/25 p-4 rounded-xl space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Actionable Improvement Step:</span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        {item.recommendation}
                      </p>
                    </div>

                    {/* Side-by-Side Before vs After Rewrite */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Before: Weak Version */}
                      <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-rose-300 font-bold uppercase">
                          <span>❌ Weak Original Formulation</span>
                          <span className="text-[10px] text-rose-400/80">Low ATS Weight</span>
                        </div>
                        <p className="text-xs font-mono text-slate-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-rose-500/10">
                          "{item.exampleBefore}"
                        </p>
                      </div>

                      {/* After: AI Optimized Version */}
                      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono text-emerald-300 font-bold uppercase">
                          <span>✨ AI-Optimized Revision</span>
                          <button
                            type="button"
                            onClick={(e) => handleCopy(item.id, item.exampleAfter, e)}
                            className="flex items-center gap-1 text-[10px] font-mono text-cyan-300 hover:text-cyan-200 px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/30 transition-colors"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Text</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs font-mono text-slate-200 leading-relaxed bg-black/30 p-3 rounded-lg border border-emerald-500/10">
                          "{item.exampleAfter}"
                        </p>
                      </div>

                    </div>

                    {/* Quick CTA to Resume Builder */}
                    <div className="flex items-center justify-between pt-2 text-xs">
                      <span className="text-slate-400 font-mono">
                        Ready to integrate this revision?
                      </span>
                      <Link
                        to="/builder"
                        className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
                      >
                        <FileEdit className="w-3.5 h-3.5" />
                        <span>Apply in Resume Builder</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
