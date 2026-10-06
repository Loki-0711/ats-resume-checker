import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import type { MatchStatus } from '../types';

interface ATSScoreProps {
  score: number;
  label: MatchStatus;
  comparisonVsAverage: number;
}

export const ATSScore: React.FC<ATSScoreProps> = ({
  score,
  label,
  comparisonVsAverage,
}) => {
  const [displayScore, setDisplayScore] = useState(0);

  // Trigger celebration confetti for high scores (> 80)
  useEffect(() => {
    if (score >= 80) {
      const timer = setTimeout(() => {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#38bdf8', '#818cf8', '#34d399'],
            disableForReducedMotion: true,
          });
        } catch {
          // ignore if canvas not supported
        }
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [score]);

  // Smooth counter animation from 0 to target score
  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 16;
    const totalSteps = duration / stepTime;
    const increment = score / totalSteps;

    const interval = setInterval(() => {
      start += increment;
      if (start >= score) {
        setDisplayScore(score);
        clearInterval(interval);
      } else {
        setDisplayScore(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [score]);

  // SVG Circle calculation
  const size = 260;
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progressOffset = circumference - (score / 100) * circumference;

  return (
    <div className="glass-panel rounded-3xl p-8 flex flex-col items-center justify-center text-center relative overflow-hidden border-cyan-500/30 glow-cyan">
      
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-6">
        <Award className="w-3.5 h-3.5 text-cyan-400" />
        <span>NLP Match Calculation</span>
      </div>

      {/* Animated Circular Score Gauge */}
      <div className="relative w-[260px] h-[260px] flex items-center justify-center mb-6">
        <svg className="w-full h-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth={strokeWidth}
          />
          {/* Animated Gradient Progress */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="60%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="url(#scoreGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: progressOffset }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute flex flex-col items-center justify-center">
          <div className="text-6xl sm:text-7xl font-black text-white font-['Outfit'] tracking-tight flex items-baseline">
            <span>{displayScore}</span>
            <span className="text-3xl sm:text-4xl text-cyan-400 font-extrabold">%</span>
          </div>
          <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mt-1 font-semibold">
            ATS Compatibility
          </div>
        </div>
      </div>

      {/* Match Rating Status Pill */}
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{label}</span>
        </div>

        {/* Above Average Comparison Text */}
        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-cyan-300 font-bold">+{comparisonVsAverage}%</span>
          <span>above target candidate benchmark</span>
        </div>
      </div>

    </div>
  );
};
