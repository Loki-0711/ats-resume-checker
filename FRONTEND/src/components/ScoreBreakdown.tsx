import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Briefcase, KeyRound, Sparkles } from 'lucide-react';
import type { ScoreBreakdown as BreakdownType } from '../types';

interface ScoreBreakdownProps {
  breakdown: BreakdownType;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ breakdown }) => {
  const items = [
    {
      label: 'Skills Match',
      score: breakdown.skillsMatch,
      icon: Layers,
      color: 'from-cyan-500 to-blue-500',
      barColor: 'bg-cyan-400',
      description: 'Correlation of core programming languages, frameworks & libraries.',
    },
    {
      label: 'Experience Relevance',
      score: breakdown.experienceRelevance,
      icon: Briefcase,
      color: 'from-indigo-500 to-violet-500',
      barColor: 'bg-indigo-400',
      description: 'Alignment of historical job titles, responsibilities & years of practice.',
    },
    {
      label: 'Keyword Coverage',
      score: breakdown.keywordCoverage,
      icon: KeyRound,
      color: 'from-sky-500 to-teal-500',
      barColor: 'bg-sky-400',
      description: 'Density of high-weight domain terminology found in target job description.',
    },
    {
      label: 'Resume Quality',
      score: breakdown.resumeQuality,
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-500',
      barColor: 'bg-emerald-400',
      description: 'Formatting readability, quantified metric density & actionable verb use.',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="glass-panel rounded-2xl p-5 border-white/10 flex flex-col justify-between"
          >
            {/* Header */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-semibold text-white">
                    {item.label}
                  </span>
                </div>
                <div className="text-lg font-bold font-mono text-white">
                  {item.score}%
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Animated Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2 bg-slate-900/90 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.0, delay: idx * 0.15, ease: 'easeOut' }}
                  className={`h-full rounded-full ${item.barColor}`}
                />
              </div>
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>0%</span>
                <span>Threshold: 75%</span>
                <span>100%</span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
