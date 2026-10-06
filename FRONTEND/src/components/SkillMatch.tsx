import React from 'react';
import { motion } from 'framer-motion';
import { Check, CheckCircle2, Sparkles } from 'lucide-react';

interface SkillMatchProps {
  skills: string[];
}

export const SkillMatch: React.FC<SkillMatchProps> = ({ skills }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-7 border-cyan-500/20 text-left h-full flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Matching Skills
              </h3>
              <p className="text-xs text-slate-400">
                Verified competencies detected in both resume and job description.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 font-semibold">
            {skills.length} Detected
          </span>
        </div>

        {/* Staggered Skill Chips */}
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
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-cyan-200 text-xs font-medium hover:border-cyan-400 hover:bg-cyan-950/40 transition-all duration-200 shadow-sm shadow-cyan-950/30 group"
            >
              <div className="w-4 h-4 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-300 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span>{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Footer */}
      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span className="flex items-center gap-1.5 text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>High TF-IDF Keyword Salience</span>
        </span>
        <span className="text-emerald-400 font-semibold">Strong Alignment</span>
      </div>
    </div>
  );
};
