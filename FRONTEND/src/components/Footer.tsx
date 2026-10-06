import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/5 bg-[#04060c] text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-[#0b0f19] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white font-['Outfit']">ATS.AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Autonomous ATS Resume Ranking & Intelligent Job Matching Engine using Natural Language Processing and Vector Mathematics.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>TF-IDF + Cosine Similarity Core</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition-colors">Landing Experience</Link>
              </li>
              <li>
                <Link to="/analyze" className="hover:text-cyan-400 transition-colors">Resume Analysis Studio</Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-cyan-400 transition-colors">ATS Scorecard</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">Candidate Dashboard</Link>
              </li>
            </ul>
          </div>

          {/* Algorithmic Engine */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Intelligence Spec
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span>TF-IDF Vector Space Model</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Directional Cosine Similarity</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Heuristic Missing Skill Extraction</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                <span>Targeted Resume Feedback</span>
              </li>
            </ul>
          </div>

          {/* Privacy & Fast API */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 font-mono">
              Architecture
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed with a decoupled API layer. Ready for direct connection to high-performance Python FastAPI backends.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900/60 border border-white/5 font-mono text-[11px] text-cyan-300">
              POST /api/analyze
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ATS.AI Systems. Built for modern job seekers and talent intelligence teams.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Guarantee</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Zero Storage Parsing</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Deterministic NLP</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
