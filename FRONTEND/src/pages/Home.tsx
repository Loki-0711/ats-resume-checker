import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { Hero } from '../components/Hero';
import { HeroMetrics } from '../components/HeroMetrics';
import { Workflow } from '../components/Workflow';
import { sampleProfiles } from '../data/mockAnalysis';
import { useAnalysis } from '../context/AnalysisContext';

export const Home: React.FC = () => {
  const { loadPreset } = useAnalysis();

  return (
    <div className="min-h-screen flex flex-col bg-[#060813]">
      {/* 3D Hero Section */}
      <Hero />

      {/* Hero Metrics (TF-IDF, Cosine Similarity, AI Suggestions) */}
      <HeroMetrics />

      {/* How It Works Pipeline (6 Stages) */}
      <Workflow />

      {/* Pre-Loaded Quick Benchmark Showcase */}
      <section className="py-20 border-b border-white/5 bg-[#080c16]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
                <Zap className="w-3.5 h-3.5" />
                <span>Instant Sandbox</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
                Benchmark Roles & Real-Time Match Profiles
              </h2>
              <p className="text-sm text-slate-400 max-w-xl mt-1">
                Explore pre-calculated ATS scoring models across diverse technical domains.
              </p>
            </div>

            <Link
              to="/analyze"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 font-mono group"
            >
              <span>Custom Analysis Studio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleProfiles.map((sample, idx) => (
              <motion.div
                key={sample.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel-interactive rounded-2xl p-6 border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {sample.company}
                    </span>
                    <span className="text-xl font-black font-['Outfit'] text-cyan-400">
                      {sample.mockResult.overallScore}%
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-['Outfit'] mb-1">
                    {sample.role}
                  </h3>
                  <div className="text-xs font-mono text-emerald-400 mb-4 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{sample.mockResult.scoreLabel}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-3 mb-6">
                    {sample.jobDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    {sample.mockResult.matchingSkills.length} Skills Matched
                  </span>

                  <Link
                    to="/analyze"
                    onClick={() => loadPreset(sample)}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center gap-1.5 transition-all"
                  >
                    <span>Load & Test</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-vignette opacity-50" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 mx-auto flex items-center justify-center mb-6">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] mb-4">
            Ready to Shortlist Your Next Career Move?
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto mb-8">
            Upload your resume, paste the target job description, and receive deterministic ATS telemetry in under 4 seconds.
          </p>

          <Link
            to="/analyze"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all"
          >
            <span>Launch Analysis Studio</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};
