import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  UploadCloud, 
  FileSearch, 
  Cpu, 
  Binary, 
  CheckSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const Workflow: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const stages = [
    {
      step: '01',
      title: 'Resume Upload',
      subtitle: 'PDF Ingestion',
      description: 'PDF resume is uploaded securely. Text layers, font encodings, and layout coordinates are ingested.',
      icon: UploadCloud,
      color: 'from-blue-500 to-cyan-500',
      tag: 'Raw PDF File',
      details: 'Supports native PDF vector parsing, multi-column format de-structuring, and clean section demarcation.',
      samplePreview: 'Input: candidate_resume.pdf (248 KB) -> Decoded Binary Stream',
    },
    {
      step: '02',
      title: 'Resume Parsing',
      subtitle: 'Text Extraction',
      description: 'Extract resume text automatically, segmenting work history, educational credentials, certifications, and technical skills.',
      icon: FileSearch,
      color: 'from-cyan-500 to-teal-500',
      tag: 'Structured Text',
      details: 'Converts unstructured PDFs into normalized JSON entities, eliminating formatting discrepancies across ATS tools.',
      samplePreview: 'Extracted: [Contact, Experience(3 roles), Education(BS CS), Skills(14 items)]',
    },
    {
      step: '03',
      title: 'NLP Processing',
      subtitle: 'Linguistic Cleaning',
      description: 'Tokenization, stopword filtering, lemmatization, and technical entity recognition normalize terms to canonical forms.',
      icon: Cpu,
      color: 'from-teal-500 to-emerald-500',
      tag: 'NLP Pipeline',
      details: 'Maps synonyms (e.g. "ReactJS" -> "React", "K8s" -> "Kubernetes") to prevent false negative exclusions.',
      samplePreview: 'Tokens: ["develop", "nlp", "pipeline", "fastapi", "docker", "scalabl"]',
    },
    {
      step: '04',
      title: 'Similarity Analysis',
      subtitle: 'Vector Mathematics',
      description: 'TF-IDF vectorizer constructs high-dimensional term frequency vectors, then computes exact Cosine Similarity metric against target JD.',
      icon: Binary,
      color: 'from-emerald-500 to-indigo-500',
      tag: 'TF-IDF & Cosine',
      details: 'Calculates the cosine angle between vectors: cos(θ) = (A · B) / (||A|| ||B||) to establish mathematical alignment.',
      samplePreview: 'Vector Cosine Similarity = 0.824 -> Base ATS Compatibility: 82.4%',
    },
    {
      step: '05',
      title: 'Skill Matching',
      subtitle: 'Gap Identification',
      description: 'Cross-correlates extracted hard skills, soft competencies, and tools against required qualifications to isolate exact matches & gaps.',
      icon: CheckSquare,
      color: 'from-indigo-500 to-violet-500',
      tag: 'Skills Matrix',
      details: 'Sorts detected competencies into matching vs missing skills with weighted criticality indices.',
      samplePreview: 'Matched: Python, SQL, ML (88%) | Missing: Docker, AWS, Kubernetes',
    },
    {
      step: '06',
      title: 'AI Recommendations',
      subtitle: 'Intelligent Guidance',
      description: 'Personalized resume improvement suggestions formulated to elevate candidate ranking and pass ATS algorithmic thresholds.',
      icon: Sparkles,
      color: 'from-violet-500 to-pink-500',
      tag: 'Smart Action Items',
      details: 'Generates quantified impact statements, keyword optimization prompts, and structural recommendations.',
      samplePreview: 'Recommendation: "Include measurable latency metrics for your SQL query optimizations."',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 border-b border-white/5 bg-[#060813] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4 uppercase tracking-wider">
            Architecture Pipeline
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Outfit'] tracking-tight mb-4">
            From Resume to <span className="text-gradient-cyan">Recruitment Intelligence</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A transparent 6-stage algorithmic engine that parses, vectorizes, and benchmarks your resume 
            with zero black-box obscurity.
          </p>
        </div>

        {/* 6-Stage Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isSelected = activeStep === index;

            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveStep(index)}
                className={`cursor-pointer text-left rounded-2xl p-6 transition-all duration-300 relative group ${
                  isSelected 
                    ? 'glass-panel border-cyan-500/40 glow-cyan scale-[1.02]' 
                    : 'glass-panel-interactive'
                }`}
              >
                {/* Stage Counter & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-extrabold font-['Outfit'] text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {stage.step}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300">
                      {stage.tag}
                    </span>
                  </div>

                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isSelected
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800/60 text-slate-300 group-hover:text-cyan-400 group-hover:bg-slate-850'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors font-['Outfit']">
                  {stage.title}
                </h3>
                <div className="text-xs font-mono text-cyan-400 mb-3">
                  {stage.subtitle}
                </div>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {stage.description}
                </p>

                {/* Micro Animated Down / Next Indicator */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-500">
                    {isSelected ? 'Active Inspection' : 'Click to inspect'}
                  </span>
                  <span className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Active Stage Deep Dive */}
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 glass-panel rounded-2xl p-6 sm:p-8 border-cyan-500/30 text-left"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Stage {stages[activeStep].step} Deep Dive</span>
                <span>•</span>
                <span>{stages[activeStep].title}</span>
              </div>
              <h4 className="text-xl font-bold text-white font-['Outfit']">
                {stages[activeStep].details}
              </h4>
            </div>

            <div className="bg-[#0b0f19] border border-cyan-500/20 rounded-xl p-4 font-mono text-xs text-slate-300 lg:min-w-[420px] shadow-inner">
              <div className="text-[10px] uppercase tracking-wider text-cyan-400 mb-1 flex items-center justify-between">
                <span>Pipeline Telemetry Preview</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-slate-200">
                {stages[activeStep].samplePreview}
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
