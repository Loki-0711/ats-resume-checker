import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { ResumeUploader } from '../components/ResumeUploader';
import { JobDescriptionInput } from '../components/JobDescriptionInput';
import { AnalysisLoader } from '../components/AnalysisLoader';
import type { SampleProfile } from '../types';

export const Analyze: React.FC = () => {
  const navigate = useNavigate();
  const {
    uploadedFile,
    resumeText,
    jobDescription,
    isAnalyzing,
    currentStepIndex,
    progressPercent,
    selectedPresetId,
    setUploadedFile,
    setResumeText,
    setJobDescription,
    loadPreset,
    clearInputs,
    startAnalysis,
  } = useAnalysis();

  const handleSelectSample = (sample: SampleProfile) => {
    loadPreset(sample);
  };

  const isReadyToAnalyze = (resumeText.trim().length > 30 || uploadedFile !== null) && jobDescription.trim().length > 30;

  const handleRunAnalysis = async () => {
    if (!isReadyToAnalyze) return;
    try {
      await startAnalysis();
      // Smoothly navigate to results page
      navigate('/results');
    } catch (err) {
      console.error('Analysis execution failed:', err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[#060813] py-10 px-4 sm:px-6 lg:px-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6 text-left">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Neural Matching Engine
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-emerald-400">TF-IDF Vector Space</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              ATS Resume Analysis Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Upload your resume and target job requirements to generate a granular compatibility score and skill analysis.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={clearInputs}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 text-xs font-medium transition-colors"
            >
              Reset Inputs
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FastAPI Ready</span>
            </div>
          </div>
        </div>

        {/* Two-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Left: Resume Uploader */}
          <ResumeUploader
            uploadedFile={uploadedFile}
            resumeText={resumeText}
            onFileUpload={setUploadedFile}
            onResumeTextChange={setResumeText}
            onSelectSample={handleSelectSample}
            selectedSampleId={selectedPresetId}
          />

          {/* Right: Job Description Input */}
          <JobDescriptionInput
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            onClear={() => setJobDescription('')}
            onAnalyze={handleRunAnalysis}
            isReadyToAnalyze={isReadyToAnalyze}
          />

        </div>

        {/* Feature telemetry badges */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono text-slate-400">
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>N-Gram Tokenization & Lemmatization</span>
          </div>
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>High-Dimensional Cosine Similarity</span>
          </div>
          <div className="glass-card p-3 rounded-xl flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Actionable Resume Improvement Plan</span>
          </div>
        </div>

      </div>

      {/* Fullscreen AI Processing Animation Loader */}
      <AnimatePresence>
        {isAnalyzing && (
          <AnalysisLoader
            currentStepIndex={currentStepIndex}
            progressPercent={progressPercent}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
