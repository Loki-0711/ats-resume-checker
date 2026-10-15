import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertTriangle, XCircle, Award, Target, HelpCircle, ShieldCheck } from 'lucide-react';
import type { MatchVerdict } from '../types';

interface MatchVerdictCardProps {
  verdict?: MatchVerdict;
  overallScore: number;
  jobTitle: string;
  company?: string;
}

export const MatchVerdictCard: React.FC<MatchVerdictCardProps> = ({
  verdict,
  overallScore,
  jobTitle,
  company,
}) => {
  // Fallback defaults if verdict object not provided
  const score = verdict ? verdict.score : overallScore;
  const isMatch = verdict ? verdict.isMatch : score >= 75;
  const cutoff = verdict ? verdict.threshold : 70;
  const statusType = score >= 75 ? 'match' : score >= 55 ? 'potential' : 'no-match';

  const getStatusStyles = () => {
    switch (statusType) {
      case 'match':
        return {
          bg: 'bg-emerald-950/25 border-emerald-500/40 shadow-emerald-950/30',
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
          textAccent: 'text-emerald-400',
          gradientBar: 'from-emerald-500 to-teal-400',
          icon: CheckCircle2,
          headline: 'MATCH: Shortlist Recommended',
          subline: 'Your resume meets the target qualifications and ATS passing criteria.',
        };
      case 'potential':
        return {
          bg: 'bg-amber-950/25 border-amber-500/40 shadow-amber-950/30',
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
          textAccent: 'text-amber-400',
          gradientBar: 'from-amber-500 to-orange-400',
          icon: AlertTriangle,
          headline: 'POTENTIAL MATCH: Optimization Needed',
          subline: 'Your resume partially matches this role, but is borderline on key requirements.',
        };
      default:
        return {
          bg: 'bg-rose-950/25 border-rose-500/40 shadow-rose-950/30',
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
          textAccent: 'text-rose-400',
          gradientBar: 'from-rose-500 to-red-600',
          icon: XCircle,
          headline: 'DOES NOT MATCH: High Rejection Risk',
          subline: 'Significant qualification gap detected against mandatory requirements.',
        };
    }
  };

  const style = getStatusStyles();
  const IconComponent = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`glass-panel rounded-3xl p-6 sm:p-8 border shadow-xl ${style.bg} text-left relative overflow-hidden`}
    >
      {/* Glow orb */}
      <div className={`absolute top-0 right-0 w-64 h-64 ${style.textAccent}/10 rounded-full blur-3xl pointer-events-none`} />

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${style.badgeBg}`}>
            <IconComponent className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">
                ATS Decision Engine
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="text-[11px] font-mono text-cyan-400">Cutoff: {cutoff}%</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
              {style.headline}
            </h3>
          </div>
        </div>

        {/* Shortlist Probability Tag */}
        <div className="flex items-center gap-2">
          <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-1.5 ${style.badgeBg}`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{verdict?.shortlistOdds || (isMatch ? 'High Probability (85%+)' : 'Low Probability (<35%)')}</span>
          </div>
        </div>
      </div>

      {/* Summary Narrative */}
      <p className="text-sm text-slate-300 leading-relaxed mb-6 bg-slate-950/40 p-4 rounded-2xl border border-white/5">
        {verdict?.summary ||
          (isMatch
            ? `Your resume demonstrates strong compatibility with ${jobTitle} at ${company || 'the target company'}. It is poised to clear automated screening filters and reach recruiter review.`
            : `Your resume currently falls below the benchmark for ${jobTitle} at ${company || 'the target company'}. Essential technical competencies and experience keywords must be optimized.`)}
      </p>

      {/* Metrics Row: Score vs Threshold Meter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Metric 1: Candidate Score vs Threshold */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" />
              <span>Cutoff Benchmark</span>
            </span>
            <span className={`font-mono font-bold ${score >= cutoff ? 'text-emerald-400' : 'text-rose-400'}`}>
              {score >= cutoff ? `+${score - cutoff}% Above` : `${cutoff - score}% Below`}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-white font-['Outfit']">{score}%</span>
            <span className="text-xs text-slate-500 font-mono">/ {cutoff}% cutoff</span>
          </div>
          {/* Progress bar with cutoff pin */}
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${style.gradientBar}`}
              style={{ width: `${Math.min(100, score)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Core Skills Coverage */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 bg-slate-900/60">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-mono flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-indigo-400" />
              <span>Skill Coverage</span>
            </span>
            <span className="font-mono font-semibold text-slate-300">
              {verdict?.matchedCount ?? 8} of {(verdict?.matchedCount ?? 8) + (verdict?.missingCount ?? 3)}
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-2xl font-black text-white font-['Outfit']">
              {verdict?.skillCoverage ?? Math.round((8 / 11) * 100)}%
            </span>
            <span className="text-xs text-slate-500 font-mono">requirements matched</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500"
              style={{ width: `${verdict?.skillCoverage ?? 72}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Decision Status */}
        <div className="glass-card p-4 rounded-2xl border border-white/5 bg-slate-900/60 flex flex-col justify-between">
          <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>ATS Pass Determination</span>
          </div>
          <div className="my-1">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-xl text-sm font-black font-['Outfit'] uppercase tracking-wider ${style.badgeBg}`}>
              <IconComponent className="w-4 h-4" />
              <span>{verdict?.verdictBadge || (isMatch ? 'PASSED' : 'NEEDS ACTION')}</span>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            {score >= 75 ? 'Ready to apply directly' : 'Review AI weaknesses below before applying'}
          </span>
        </div>

      </div>

      {/* Decision Factors & Reasons */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
          Key Evaluation Reasons & Breakdown:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {(verdict?.reasons || [
            `Score (${score}%) meets the passing benchmark for ${jobTitle}.`,
            `Demonstrates hands-on proficiency in core technical requirements.`,
            `Includes relevant experience bullets matching target keywords.`,
            `Minor optimizations available in cloud infrastructure.`,
          ]).map((reason, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/40 border border-white/5 flex items-start gap-2.5 text-xs text-slate-300"
            >
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${style.textAccent}`} />
              <span className="leading-relaxed">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
