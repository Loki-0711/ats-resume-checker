import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, HelpCircle, ArrowUpRight } from 'lucide-react';

interface MissingSkillsProps {
  skills: string[];
  whyMissingMatters: string;
}

export const MissingSkills: React.FC<MissingSkillsProps> = ({
  skills,
  whyMissingMatters,
}) => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border-rose-500/20 text-left h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Missing Skills
              </h3>
              <p className="text-xs text-slate-400">
                Key terms required by the JD that were not found in your resume.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 font-semibold">
            {skills.length} Critical Gaps
          </span>
        </div>

        {/* Missing Skill Badges */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.85, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
                ease: 'easeOut',
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-rose-500/30 text-rose-200 text-xs font-medium hover:border-rose-400 hover:bg-rose-950/30 transition-all duration-200 shadow-sm shadow-rose-950/30 group"
            >
              <div className="w-4 h-4 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300 text-[10px] font-bold">
                !
              </div>
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>

        {/* Why this matters container */}
        <div className="mt-5 p-4 rounded-2xl bg-[#090e1c] border border-white/5 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Why this matters</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {whyMissingMatters}
          </p>
        </div>
      </div>

      {/* Impact Tag */}
      <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
        <span className="text-slate-400">Estimated Match Potential:</span>
        <span className="text-emerald-400 font-semibold flex items-center gap-1">
          <span>+9% if resolved</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
