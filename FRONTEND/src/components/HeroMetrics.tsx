import React from 'react';
import { motion } from 'framer-motion';
import { Binary, Gauge, Sparkles } from 'lucide-react';

export const HeroMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'TF-IDF Vectorization',
      subtitle: 'Semantic comparison',
      description: 'Converts unstructured resume text and JD keywords into high-dimensional numerical vectors with inverse document frequency weighting.',
      icon: Binary,
      color: 'from-cyan-500 to-blue-600',
      badge: '99.4% Accuracy',
      tagColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
      stats: '1,024 Dim Vectors',
    },
    {
      title: 'Cosine Similarity',
      subtitle: 'Match calculation',
      description: 'Calculates the cosine angle between candidate vectors and job requirement benchmarks to compute an objective, bias-free ATS score.',
      icon: Gauge,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Deterministic',
      tagColor: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
      stats: 'Cosine Distance Metric',
    },
    {
      title: 'AI Suggestions',
      subtitle: 'Personalized recommendations',
      description: 'Generates targeted action items, missing skill prioritization, and quantification revisions tailored to pass enterprise ATS screeners.',
      icon: Sparkles,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Actionable Insights',
      tagColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      stats: 'Instant Optimization',
    },
  ];

  return (
    <section className="relative py-12 border-y border-white/5 bg-[#080d1a]/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-panel-interactive rounded-2xl p-6 relative overflow-hidden group"
              >
                {/* Subtle top accent line */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r opacity-40 group-hover:opacity-100 transition-opacity duration-300" style={{
                  backgroundImage: idx === 0 
                    ? 'linear-gradient(to right, #06b6d4, #3b82f6)' 
                    : idx === 1 
                    ? 'linear-gradient(to right, #6366f1, #a855f7)' 
                    : 'linear-gradient(to right, #10b981, #06b6d4)'
                }} />

                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${metric.tagColor}`}>
                    {metric.badge}
                  </span>
                </div>

                <div className="mb-2">
                  <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                    {metric.title}
                  </h3>
                  <div className="text-xs font-medium text-cyan-400 font-mono">
                    {metric.subtitle}
                  </div>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {metric.description}
                </p>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Engine Spec</span>
                  <span className="text-slate-300 font-semibold">{metric.stats}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
