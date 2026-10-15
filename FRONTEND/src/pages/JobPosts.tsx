import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Briefcase,
  Building2,
  MapPin,
  Sparkles,
  X,
  DollarSign,
  Clock,
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import type { JobPost } from '../types';

export const JobPosts: React.FC = () => {
  const navigate = useNavigate();
  const {
    jobPosts,
    selectJobPostForAnalysis,
    startAnalysis,
    addNewJobPost,
    currentResult,
    resumeText,
  } = useAnalysis();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState<string>('All');
  const [activeJobModal, setActiveJobModal] = useState<JobPost | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [analyzingJobId, setAnalyzingJobId] = useState<string | null>(null);

  // New Custom Job Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCategory, setNewCategory] = useState('Software Engineering');
  const [newLocation, setNewLocation] = useState('Remote');
  const [newSalary, setNewSalary] = useState('Competitive');
  const [newExperience, setNewExperience] = useState('2 - 5 Years');
  const [newSkills, setNewSkills] = useState('Python, SQL, REST APIs, Git');
  const [newJdText, setNewJdText] = useState('');

  // Extract distinct categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    jobPosts.forEach((j) => set.add(j.category));
    return ['All', ...Array.from(set)];
  }, [jobPosts]);

  // Filter jobs based on search term, category, and work mode
  const filteredJobs = useMemo(() => {
    return jobPosts.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.coreSkills.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || job.category === selectedCategory;

      const matchesWorkMode =
        selectedWorkMode === 'All' ||
        job.jobType.toLowerCase().includes(selectedWorkMode.toLowerCase()) ||
        job.location.toLowerCase().includes(selectedWorkMode.toLowerCase());

      return matchesSearch && matchesCategory && matchesWorkMode;
    });
  }, [jobPosts, searchTerm, selectedCategory, selectedWorkMode]);

  // Quick helper to check match score against current analysis if available
  const getJobMatchRating = (job: JobPost) => {
    if (!currentResult || !currentResult.allJobsMatches) return null;
    const match = currentResult.allJobsMatches.find(
      (m) => m.jobId === job.id || m.jobTitle.toLowerCase() === job.title.toLowerCase()
    );
    return match || null;
  };

  const handleAnalyzeForJob = async (job: JobPost) => {
    setAnalyzingJobId(job.id);
    try {
      selectJobPostForAnalysis(job);
      await startAnalysis(job.templateJd || job.description, job.title, job.company);
      navigate('/results');
    } catch (err) {
      console.error('Failed to analyze for job:', err);
    } finally {
      setAnalyzingJobId(null);
    }
  };

  const handleCreateCustomJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newJdText.trim()) return;

    const parsedSkills = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const created = await addNewJobPost({
      title: newTitle,
      company: newCompany || 'Target Employer',
      category: newCategory,
      location: newLocation,
      salary: newSalary,
      experience: newExperience,
      coreSkills: parsedSkills,
      secondarySkills: ['Git', 'Problem Solving'],
      description: newJdText,
      templateJd: newJdText,
      cutoffScore: 70,
    });

    setIsAddModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewCompany('');
    setNewJdText('');
    setNewSkills('Python, SQL, REST APIs, Git');

    // Automatically trigger analysis against this newly posted job
    handleAnalyzeForJob(created);
  };

  return (
    <div className="min-h-screen bg-[#060813] py-10 px-4 sm:px-6 lg:px-8 relative text-left">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Opportunity Center
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-emerald-400">
                {jobPosts.length} Active Benchmarks
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Explore Job Posts & Target Matching
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Browse curated industry job postings. Select any role to analyze your uploaded resume,
              calculate compatibility scores, verify if it matches, and discover weakness improvements.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Post / Test Custom JD</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="glass-panel rounded-2xl p-4 sm:p-5 border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search job title, company (e.g. Stripe, Razorpay), or skill (e.g. React, Python)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 focus:border-cyan-500/50 text-slate-200 placeholder-slate-500 text-xs focus:outline-none transition-all font-sans"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Work Mode Filter */}
            <div className="flex items-center gap-1.5 shrink-0">
              {['All', 'Remote', 'Hybrid'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSelectedWorkMode(mode)}
                  className={`px-3 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedWorkMode === mode
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-slate-900/60 text-slate-400 border border-white/5 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-mono">
            <span className="text-slate-500 shrink-0 flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" />
              <span>Category:</span>
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-500/25 text-indigo-300 border border-indigo-500/40 font-semibold'
                    : 'bg-white/5 text-slate-400 border border-white/5 hover:text-slate-200 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
          <span>Found {filteredJobs.length} matching job opportunities</span>
          {resumeText && (
            <span className="text-cyan-400">
              ⚡ Live Resume Compatibility Active
            </span>
          )}
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job, idx) => {
            const matchInfo = getJobMatchRating(job);
            const isAnalyzing = analyzingJobId === job.id;

            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
                className="glass-panel rounded-2xl p-6 border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between group bg-slate-900/40 relative overflow-hidden"
              >
                {/* Top Company Badge & Match Status */}
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white border border-white/10 shadow-sm"
                        style={{ backgroundColor: job.companyColor || '#3b82f6' }}
                      >
                        {job.company.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          {job.company}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          Posted {job.postedDate}
                        </span>
                      </div>
                    </div>

                    {/* Dynamic Resume Match Badge if evaluated */}
                    {matchInfo ? (
                      <div className="text-right">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold ${
                          matchInfo.isMatch
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : matchInfo.score >= 55
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}>
                          {matchInfo.score}% {matchInfo.isMatch ? 'Match' : 'Gap'}
                        </span>
                      </div>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {job.jobType}
                      </span>
                    )}
                  </div>

                  {/* Job Title & Category */}
                  <div>
                    <h3 className="text-lg font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                      {job.title}
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">
                      {job.category}
                    </span>
                  </div>

                  {/* Details Pill Row */}
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="font-mono text-slate-200">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="font-mono text-slate-400">{job.experience}</span>
                    </div>
                  </div>

                  {/* Core Required Skills */}
                  <div>
                    <div className="text-[10px] font-mono uppercase text-slate-500 font-semibold mb-1.5">
                      Key Competencies Required:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.coreSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-slate-300 border border-white/10"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.coreSkills.length > 4 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-500">
                          +{job.coreSkills.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveJobModal(job)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold border border-white/5 transition-colors"
                  >
                    View Specs
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAnalyzeForJob(job)}
                    disabled={isAnalyzing}
                    className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3 text-cyan-200" />
                    <span>{isAnalyzing ? 'Analyzing...' : 'Analyze Fit'}</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredJobs.length === 0 && (
          <div className="glass-panel rounded-3xl p-12 text-center border-white/10 space-y-3">
            <Briefcase className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white font-['Outfit']">
              No matching job posts found
            </h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or clear filters to view available postings.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedWorkMode('All');
              }}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Modal: Job Details Spec */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border-cyan-500/30 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 bg-[#090d1c] text-left relative"
            >
              <button
                type="button"
                onClick={() => setActiveJobModal(null)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  {activeJobModal.category} • {activeJobModal.jobType}
                </span>
                <h2 className="text-2xl font-bold text-white font-['Outfit']">
                  {activeJobModal.title}
                </h2>
                <p className="text-sm text-slate-300 font-semibold flex items-center gap-2">
                  <span>{activeJobModal.company}</span>
                  <span>•</span>
                  <span>{activeJobModal.location}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-mono">{activeJobModal.salary}</span>
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Overview & Scope:
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                  {activeJobModal.description}
                </p>
              </div>

              {/* Responsibilities */}
              {activeJobModal.responsibilities && activeJobModal.responsibilities.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                    Key Responsibilities:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {activeJobModal.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {activeJobModal.requirements && activeJobModal.requirements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                    Candidate Requirements:
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                    {activeJobModal.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
                  Required Competencies:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeJobModal.coreSkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                  {activeJobModal.secondarySkills.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 text-slate-400 border border-white/10"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveJobModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveJobModal(null);
                    handleAnalyzeForJob(activeJobModal);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-cyan-500/25"
                >
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Analyze My Resume For This Role →</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Modal: Post / Add Custom Job */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel rounded-3xl p-6 sm:p-8 border-indigo-500/30 max-w-xl w-full max-h-[88vh] overflow-y-auto space-y-5 bg-[#090d1c] text-left relative"
            >
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-semibold">
                  Custom Opportunity Benchmark
                </span>
                <h2 className="text-2xl font-bold text-white font-['Outfit']">
                  Add Target Job Posting
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Paste any job description from LinkedIn, Indeed, or your dream company to test your resume.
                </p>
              </div>

              <form onSubmit={handleCreateCustomJob} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Backend Engineer"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={newCompany}
                      onChange={(e) => setNewCompany(e.target.value)}
                      placeholder="e.g. Microsoft / Startup"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Backend & Cloud">Backend & Cloud</option>
                      <option value="Web Development">Web Development</option>
                      <option value="AI & Machine Learning">AI & Machine Learning</option>
                      <option value="Data & Analytics">Data & Analytics</option>
                      <option value="Infrastructure">Infrastructure</option>
                      <option value="Mobile Development">Mobile Development</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Location / Mode
                    </label>
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="e.g. Bangalore / Remote"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                      Salary / Comp
                    </label>
                    <input
                      type="text"
                      value={newSalary}
                      onChange={(e) => setNewSalary(e.target.value)}
                      placeholder="e.g. ₹18 - 30 LPA"
                      className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Experience Level
                  </label>
                  <input
                    type="text"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    placeholder="e.g. 2 - 5 Years"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Key Required Skills (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newSkills}
                    onChange={(e) => setNewSkills(e.target.value)}
                    placeholder="Python, FastAPI, SQL, Docker, AWS"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 uppercase mb-1">
                    Job Description & Responsibilities *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={newJdText}
                    onChange={(e) => setNewJdText(e.target.value)}
                    placeholder="Paste the full job description text here..."
                    className="w-full p-3.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans resize-y"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/25 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save & Analyze Resume</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
