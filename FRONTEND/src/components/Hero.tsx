import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, FileText, CheckCircle2, ChevronRight, Binary, ShieldCheck } from 'lucide-react';
import { AIOrbCanvas } from './3d/AIOrbCanvas';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pt-6 pb-16 lg:py-20">
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 bg-grid-cyber opacity-60 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Engine Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-medium backdrop-blur-md mb-6 shadow-inner shadow-cyan-500/10">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-mono uppercase tracking-wider text-[11px]">AI Analysis Engine Online</span>
              <span className="text-cyan-500/50">|</span>
              <span className="text-slate-400 flex items-center gap-1 font-mono text-[11px]">
                <Binary className="w-3.5 h-3.5 text-cyan-400" />
                TF-IDF v4.2
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Your Resume.{' '}
              <span className="text-gradient-cyan block mt-1">
                Understood by AI.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8 font-normal">
              Analyze your resume against any job description, discover missing skills, 
              and get intelligent recommendations to improve your chances of getting shortlisted.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link
                to="/analyze"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2.5 group"
              >
                <span>Analyze My Resume</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#how-it-works"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-white/10 hover:border-white/20 text-slate-200 font-medium text-base backdrop-blur-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>See How It Works</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-10 pt-8 border-t border-white/5 w-full flex flex-wrap items-center gap-6 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Cosine Similarity</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero Hallucination Parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Actionable ATS Shortlist Score</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D AI Core Canvas + Orbiting Floating Badges */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* 3D R3F Canvas Container */}
            <div className="relative w-full aspect-square max-w-[500px] h-[450px] sm:h-[520px]">
              <AIOrbCanvas className="w-full h-full" />

              {/* Floating Element 1: Resume */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute top-6 left-2 sm:-left-4 glass-card p-3 rounded-2xl shadow-xl flex items-center gap-3 border-cyan-500/30 animate-float"
                style={{ animationDuration: '6s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase">Input Node</div>
                  <div className="text-xs font-semibold text-white">Candidate_Resume.pdf</div>
                </div>
              </motion.div>

              {/* Floating Element 2: Job Description Match */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute top-1/4 right-0 sm:-right-4 glass-card p-3 rounded-2xl shadow-xl flex items-center gap-3 border-indigo-500/30 animate-float"
                style={{ animationDuration: '7s', animationDelay: '1s' }}
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-300">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-mono text-indigo-400 uppercase">Target Role</div>
                  <div className="text-xs font-semibold text-white">Software Engineer</div>
                </div>
              </motion.div>

              {/* Floating Element 3: Match Result (82% Match) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 glass-panel px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-4 border-cyan-500/40 glow-cyan"
              >
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-black text-white font-['Outfit'] tracking-tight">82%</span>
                  <span className="text-[9px] uppercase font-mono tracking-widest text-cyan-400">Match</span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Strong Match
                  </span>
                  <span className="text-[11px] text-slate-400">+12% vs Applicant Pool</span>
                </div>
              </motion.div>

              {/* Visual Pipeline flow labels */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                <span>Resume</span>
                <span>→</span>
                <span className="text-cyan-400">AI Core</span>
                <span>→</span>
                <span>Job Match</span>
                <span>→</span>
                <span className="text-emerald-400">82% Match</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
