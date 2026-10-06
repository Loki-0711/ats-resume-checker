import React, { useState } from 'react';
import {
  FileText,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Plus,
  Trash2,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Award,
  Layers,
  Mail,
  Zap,
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { defaultResumeData } from '../data/defaultResume';
import type { ResumeData, WorkExperience, Education, ProjectItem, CertificationItem } from '../types/resume';

export const ResumeBuilder: React.FC = () => {
  const { currentResult } = useAnalysis();
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeTab, setActiveTab] = useState<
    'personal' | 'summary' | 'experience' | 'skills' | 'projects' | 'education' | 'certifications'
  >('personal');
  const [skillInput, setSkillInput] = useState({ technical: '', tools: '', soft: '' });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  // Add 1-click missing skill from ATS Scan
  const handleAddMissingSkill = (skill: string) => {
    if (!resumeData.skills.technical.includes(skill)) {
      setResumeData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          technical: [...prev.skills.technical, skill],
        },
      }));
      showToast(`Added "${skill}" to your resume skills!`);
    } else {
      showToast(`"${skill}" is already in your skills list.`);
    }
  };

  // Quick AI Bullet point enhancement generator
  const handleEnhanceSummary = () => {
    const role = resumeData.personal.jobTitle || 'Software Engineer';
    const skillsSample = resumeData.skills.technical.slice(0, 4).join(', ') || 'modern technologies';
    const enhanced = `Results-oriented ${role} with extensive hands-on expertise in ${skillsSample}. Proven track record of architecting scalable web applications, optimizing backend microservices, and collaborating across agile teams to deliver high-performance software solutions.`;
    setResumeData((prev) => ({ ...prev, summary: enhanced }));
    showToast('AI polished professional summary generated!');
  };

  // Add new experience entry
  const handleAddExperience = () => {
    const newExp: WorkExperience = {
      id: `exp-${Date.now()}`,
      company: 'Company Name',
      role: 'Job Title',
      location: 'City, Country',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      bullets: ['Spearheaded development of core software features, improving performance by 25%.'],
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience],
    }));
  };

  // Remove experience
  const handleRemoveExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  // Update experience field
  const handleUpdateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)),
    }));
  };

  // Bullet manipulation
  const handleAddExpBullet = (expId: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === expId ? { ...e, bullets: [...e.bullets, 'Achieved measurable business impact by optimizing workflows.'] } : e
      ),
    }));
  };

  const handleUpdateExpBullet = (expId: string, bIndex: number, text: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e;
        const newBullets = [...e.bullets];
        newBullets[bIndex] = text;
        return { ...e, bullets: newBullets };
      }),
    }));
  };

  const handleRemoveExpBullet = (expId: string, bIndex: number) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e;
        return { ...e, bullets: e.bullets.filter((_, i) => i !== bIndex) };
      }),
    }));
  };

  // Projects
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      name: 'New Project Title',
      technologies: 'React, TypeScript, Node.js',
      link: 'github.com/project',
      bullets: ['Built full-stack application with real-time responsive interface and database integration.'],
    };
    setResumeData((prev) => ({ ...prev, projects: [...prev.projects, newProj] }));
  };

  const handleRemoveProject = (id: string) => {
    setResumeData((prev) => ({ ...prev, projects: prev.projects.filter((p) => p.id !== id) }));
  };

  // Education
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      institution: 'University Name',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      graduationYear: '2024',
    };
    setResumeData((prev) => ({ ...prev, education: [...prev.education, newEdu] }));
  };

  const handleRemoveEducation = (id: string) => {
    setResumeData((prev) => ({ ...prev, education: prev.education.filter((ed) => ed.id !== id) }));
  };

  // Add / remove skill tags
  const handleAddSkillTag = (category: 'technical' | 'tools' | 'soft') => {
    const val = skillInput[category].trim();
    if (!val) return;
    if (!resumeData.skills[category].includes(val)) {
      setResumeData((prev) => ({
        ...prev,
        skills: {
          ...prev.skills,
          [category]: [...prev.skills[category], val],
        },
      }));
    }
    setSkillInput((prev) => ({ ...prev, [category]: '' }));
  };

  const handleRemoveSkillTag = (category: 'technical' | 'tools' | 'soft', skillName: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [category]: prev.skills[category].filter((s) => s !== skillName),
      },
    }));
  };

  // Export JSON
  const handleExportJSON = () => {
    const blob = new Blob([JSON.stringify(resumeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personal.fullName.replace(/\s+/g, '_')}_Resume.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Resume JSON exported successfully!');
  };

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.personal && parsed.experience) {
          setResumeData(parsed);
          showToast('Resume successfully loaded from JSON!');
        } else {
          showToast('Invalid resume format.');
        }
      } catch (err) {
        showToast('Error reading resume JSON.');
      }
    };
    reader.readAsText(file);
  };

  // Print PDF Trigger
  const handlePrintPDF = () => {
    window.print();
  };

  // Missing skills from current scan
  const missingSkills = currentResult?.missingSkills || [];

  return (
    <div className="min-h-screen bg-[#060813] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-24 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl bg-cyan-500/90 text-slate-950 font-semibold shadow-2xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-5 h-5" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight font-['Outfit'] text-white">
              ATS-Optimized Resume Builder
            </h1>
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
              100% Parser Compliant
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Craft high-impact, single-column resumes specifically formatted to pass ATS scanners with zero parsing errors.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Template Style Selector */}
          <div className="flex items-center bg-slate-900 border border-white/10 rounded-xl p-1 text-xs">
            {(['modern', 'classic', 'minimal'] as const).map((style) => (
              <button
                key={style}
                onClick={() => setResumeData((p) => ({ ...p, templateStyle: style }))}
                className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-all ${
                  resumeData.templateStyle === style
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {style}
              </button>
            ))}
          </div>

          <label className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium cursor-pointer transition-all">
            <Upload className="w-3.5 h-3.5" />
            <span>Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:bg-slate-800 text-xs font-medium transition-all"
            title="Save JSON backup"
          >
            <span>JSON</span>
          </button>

          <button
            onClick={() => setResumeData(defaultResumeData)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-slate-400 hover:text-rose-400 text-xs transition-all"
            title="Reset to template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handlePrintPDF}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Controls (Left) vs Real-Time ATS Paper Preview (Right) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ================= LEFT CONTROLS: TABS & INPUT FORMS ================= */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Missing Skills Recommendation Card from ATS Scan */}
          {missingSkills.length > 0 && (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-slate-900/60 border border-cyan-500/30 backdrop-blur-md shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>Add Missing Skills from Target Job</span>
              </div>
              <p className="text-xs text-slate-400 mb-3">
                Detected from your last scan. 1-click inject them directly into your resume:
              </p>
              <div className="flex flex-wrap gap-2">
                {missingSkills.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => handleAddMissingSkill(skill)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-cyan-500/15 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-all hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-3 h-3" />
                    <span>{skill}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Section Navigation Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/60 border border-white/5 scrollbar-none">
            {[
              { id: 'personal', label: 'Contact', icon: Mail },
              { id: 'summary', label: 'Summary', icon: FileText },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'skills', label: 'Skills', icon: Layers },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'certifications', label: 'Certs', icon: Award },
            ].map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Panel Container */}
          <div className="p-6 rounded-2xl bg-[#0b0f19]/90 border border-white/10 shadow-2xl backdrop-blur-xl">
            
            {/* 1. PERSONAL INFO TAB */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-400" />
                  Personal & Contact Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.personal.fullName}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, fullName: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Target Job Title</label>
                    <input
                      type="text"
                      value={resumeData.personal.jobTitle}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, jobTitle: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Email Address</label>
                    <input
                      type="email"
                      value={resumeData.personal.email}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, email: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Phone Number</label>
                    <input
                      type="text"
                      value={resumeData.personal.phone}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, phone: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Location (City, Country)</label>
                    <input
                      type="text"
                      value={resumeData.personal.location}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, location: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">LinkedIn URL / Handle</label>
                    <input
                      type="text"
                      value={resumeData.personal.linkedin}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, linkedin: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">GitHub URL / Handle</label>
                    <input
                      type="text"
                      value={resumeData.personal.github}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, github: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-medium">Portfolio / Website</label>
                    <input
                      type="text"
                      value={resumeData.personal.portfolio}
                      onChange={(e) =>
                        setResumeData((p) => ({ ...p, personal: { ...p.personal, portfolio: e.target.value } }))
                      }
                      className="w-full px-3 py-2 rounded-xl bg-slate-900/80 border border-white/10 text-white focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 2. SUMMARY TAB */}
            {activeTab === 'summary' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    Professional Summary
                  </h3>
                  <button
                    onClick={handleEnhanceSummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-semibold hover:bg-cyan-500/30 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Polish</span>
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  A strong 2-4 sentence executive summary containing your target role and top competencies.
                </p>
                <textarea
                  rows={6}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData((p) => ({ ...p, summary: e.target.value }))}
                  className="w-full px-3.5 py-3 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 text-xs leading-relaxed focus:border-cyan-500 focus:outline-none"
                  placeholder="Write a concise overview of your technical background and achievements..."
                />
              </div>
            )}

            {/* 3. WORK EXPERIENCE TAB */}
            {activeTab === 'experience' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    Work Experience
                  </h3>
                  <button
                    onClick={handleAddExperience}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Role</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {resumeData.experience.map((exp, expIdx) => (
                    <div
                      key={exp.id}
                      className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-cyan-400">Role #{expIdx + 1}</span>
                        <button
                          onClick={() => handleRemoveExperience(exp.id)}
                          className="text-slate-500 hover:text-rose-400 transition-colors"
                          title="Delete role"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.role}
                          onChange={(e) => handleUpdateExperience(exp.id, 'role', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => handleUpdateExperience(exp.id, 'company', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Start Date (e.g. Jan 2023)"
                          value={exp.startDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'startDate', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                        <input
                          type="text"
                          placeholder="End Date (e.g. Present)"
                          value={exp.endDate}
                          onChange={(e) => handleUpdateExperience(exp.id, 'endDate', e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                      </div>

                      {/* Bullets */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>Action & Achievement Bullets:</span>
                          <button
                            onClick={() => handleAddExpBullet(exp.id)}
                            className="text-cyan-400 hover:underline flex items-center gap-0.5"
                          >
                            <Plus className="w-3 h-3" /> Add Bullet
                          </button>
                        </div>
                        {exp.bullets.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={bullet}
                              onChange={(e) => handleUpdateExpBullet(exp.id, bIdx, e.target.value)}
                              className="flex-1 px-2.5 py-1.5 rounded-lg bg-slate-800/90 border border-white/10 text-xs text-slate-200"
                            />
                            <button
                              onClick={() => handleRemoveExpBullet(exp.id, bIdx)}
                              className="text-slate-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SKILLS TAB */}
            {activeTab === 'skills' && (
              <div className="space-y-5">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Skills & Core Competencies
                </h3>

                {/* Technical Skills */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-cyan-300">Technical Skills / Languages</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add technical skill (e.g. Python, React)..."
                      value={skillInput.technical}
                      onChange={(e) => setSkillInput((p) => ({ ...p, technical: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkillTag('technical')}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                    />
                    <button
                      onClick={() => handleAddSkillTag('technical')}
                      className="px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {resumeData.skills.technical.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-800 border border-white/10 text-slate-200"
                      >
                        {skill}
                        <button
                          onClick={() => handleRemoveSkillTag('technical', skill)}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tools & DevOps */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-indigo-300">Tools, Cloud & Frameworks</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tool (e.g. Docker, Git, AWS)..."
                      value={skillInput.tools}
                      onChange={(e) => setSkillInput((p) => ({ ...p, tools: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddSkillTag('tools')}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs text-white"
                    />
                    <button
                      onClick={() => handleAddSkillTag('tools')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-500 text-white font-bold text-xs"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {resumeData.skills.tools.map((tool) => (
                      <span
                        key={tool}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-slate-800 border border-white/10 text-slate-200"
                      >
                        {tool}
                        <button
                          onClick={() => handleRemoveSkillTag('tools', tool)}
                          className="hover:text-rose-400"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-cyan-400" />
                    Key Projects
                  </h3>
                  <button
                    onClick={handleAddProject}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  {resumeData.projects.map((proj, pIdx) => (
                    <div key={proj.id} className="p-4 rounded-xl bg-slate-900/70 border border-white/10 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-semibold text-cyan-400">Project #{pIdx + 1}</span>
                        <button onClick={() => handleRemoveProject(proj.id)} className="text-slate-500 hover:text-rose-400">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <input
                          type="text"
                          placeholder="Project Name"
                          value={proj.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setResumeData((p) => ({
                              ...p,
                              projects: p.projects.map((item) => (item.id === proj.id ? { ...item, name: val } : item)),
                            }));
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                        <input
                          type="text"
                          placeholder="Technologies Used"
                          value={proj.technologies}
                          onChange={(e) => {
                            const val = e.target.value;
                            setResumeData((p) => ({
                              ...p,
                              projects: p.projects.map((item) => (item.id === proj.id ? { ...item, technologies: val } : item)),
                            }));
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Link / Repository"
                        value={proj.link || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((p) => ({
                            ...p,
                            projects: p.projects.map((item) => (item.id === proj.id ? { ...item, link: val } : item)),
                          }));
                        }}
                        className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. EDUCATION TAB */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    Education History
                  </h3>
                  <button
                    onClick={handleAddEducation}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Degree</span>
                  </button>
                </div>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="p-3.5 rounded-xl bg-slate-900/70 border border-white/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <input
                        type="text"
                        placeholder="Institution / College"
                        value={edu.institution}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((p) => ({
                            ...p,
                            education: p.education.map((item) => (item.id === edu.id ? { ...item, institution: val } : item)),
                          }));
                        }}
                        className="w-3/4 px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white font-semibold"
                      />
                      <button onClick={() => handleRemoveEducation(edu.id)} className="text-slate-500 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Degree & Major"
                        value={edu.degree}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((p) => ({
                            ...p,
                            education: p.education.map((item) => (item.id === edu.id ? { ...item, degree: val } : item)),
                          }));
                        }}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                      />
                      <input
                        type="text"
                        placeholder="Graduation Year"
                        value={edu.graduationYear}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((p) => ({
                            ...p,
                            education: p.education.map((item) => (item.id === edu.id ? { ...item, graduationYear: val } : item)),
                          }));
                        }}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 7. CERTIFICATIONS TAB */}
            {activeTab === 'certifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-cyan-400" />
                    Certifications & Awards
                  </h3>
                  <button
                    onClick={() => {
                      const newCert: CertificationItem = {
                        id: `cert-${Date.now()}`,
                        name: 'Certificate Name',
                        issuer: 'Issuing Organization',
                        year: '2024',
                      };
                      setResumeData((p) => ({ ...p, certifications: [...p.certifications, newCert] }));
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Cert</span>
                  </button>
                </div>
                {resumeData.certifications.map((cert) => (
                  <div key={cert.id} className="p-3 rounded-xl bg-slate-900/70 border border-white/10 grid grid-cols-3 gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Certification"
                      value={cert.name}
                      onChange={(e) => {
                        const val = e.target.value;
                        setResumeData((p) => ({
                          ...p,
                          certifications: p.certifications.map((c) => (c.id === cert.id ? { ...c, name: val } : c)),
                        }));
                      }}
                      className="col-span-2 px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white"
                    />
                    <div className="flex items-center gap-1">
                      <input
                        type="text"
                        placeholder="Issuer / Year"
                        value={`${cert.issuer} (${cert.year})`}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData((p) => ({
                            ...p,
                            certifications: p.certifications.map((c) => (c.id === cert.id ? { ...c, issuer: val } : c)),
                          }));
                        }}
                        className="px-2 py-1.5 rounded-lg bg-slate-800 border border-white/10 text-white flex-1"
                      />
                      <button
                        onClick={() =>
                          setResumeData((p) => ({
                            ...p,
                            certifications: p.certifications.filter((c) => c.id !== cert.id),
                          }))
                        }
                        className="text-slate-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ATS Compliance Checklist Info */}
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 space-y-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Built for ATS Parsing Success
            </span>
            <ul className="text-[11px] text-slate-400 space-y-1">
              <li>✓ Single-column sequential hierarchy (no side-by-side parsing collisions).</li>
              <li>✓ Standard standard headings recognized by Workday, Greenhouse & Lever.</li>
              <li>✓ Zero tables, graphics, or nested text boxes.</li>
            </ul>
          </div>
        </div>

        {/* ================= RIGHT PREVIEW: LIVE ATS-OPTIMIZED PAPER ================= */}
        <div className="lg:col-span-7 sticky top-24">
          <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Paper Preview (Standard Letter / A4)
            </span>
            <span className="font-mono text-cyan-400 uppercase tracking-wider text-[11px]">
              Template: {resumeData.templateStyle}
            </span>
          </div>

          {/* Paper Canvas (Target for CSS Print) */}
          <div
            id="ats-resume-paper"
            className="w-full bg-white text-slate-900 p-8 sm:p-10 rounded-2xl shadow-2xl transition-all border border-slate-200 min-h-[920px] font-sans text-left"
            style={{
              fontFamily:
                resumeData.templateStyle === 'classic'
                  ? 'Georgia, serif'
                  : '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {/* Header: Name & Contact info */}
            <div
              className={`text-center pb-5 mb-5 ${
                resumeData.templateStyle === 'classic'
                  ? 'border-b-2 border-slate-900'
                  : resumeData.templateStyle === 'modern'
                  ? 'border-b border-cyan-700/30'
                  : 'border-b border-slate-300'
              }`}
            >
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950 uppercase mb-1">
                {resumeData.personal.fullName || 'Candidate Name'}
              </h1>
              <div className="text-xs font-semibold text-slate-700 uppercase tracking-widest mb-2">
                {resumeData.personal.jobTitle}
              </div>

              {/* Contact metadata line */}
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-slate-600 font-medium">
                {resumeData.personal.location && <span>{resumeData.personal.location}</span>}
                {resumeData.personal.phone && (
                  <>
                    <span>•</span>
                    <span>{resumeData.personal.phone}</span>
                  </>
                )}
                {resumeData.personal.email && (
                  <>
                    <span>•</span>
                    <span>{resumeData.personal.email}</span>
                  </>
                )}
                {resumeData.personal.linkedin && (
                  <>
                    <span>•</span>
                    <span>{resumeData.personal.linkedin}</span>
                  </>
                )}
                {resumeData.personal.github && (
                  <>
                    <span>•</span>
                    <span>{resumeData.personal.github}</span>
                  </>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            {resumeData.summary && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Professional Summary
                </h2>
                <p className="text-[12px] leading-relaxed text-slate-700 text-justify">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Core Competencies & Skills */}
            {(resumeData.skills.technical.length > 0 || resumeData.skills.tools.length > 0) && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Technical Skills & Competencies
                </h2>
                <div className="text-[12px] space-y-1 text-slate-800">
                  {resumeData.skills.technical.length > 0 && (
                    <p>
                      <strong className="font-semibold text-slate-900">Technical & Languages: </strong>
                      {resumeData.skills.technical.join(', ')}
                    </p>
                  )}
                  {resumeData.skills.tools.length > 0 && (
                    <p>
                      <strong className="font-semibold text-slate-900">Frameworks & Tools: </strong>
                      {resumeData.skills.tools.join(', ')}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Work Experience */}
            {resumeData.experience.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {resumeData.experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-center justify-between text-[12px]">
                        <div>
                          <span className="font-bold text-slate-950">{exp.role}</span>
                          <span className="text-slate-600"> — {exp.company}</span>
                        </div>
                        <span className="text-slate-600 font-medium text-[11px]">
                          {exp.startDate} – {exp.endDate}
                        </span>
                      </div>
                      <ul className="list-disc list-inside mt-1.5 space-y-1 text-[11.5px] leading-normal text-slate-700">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx} className="text-justify">
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Key Projects */}
            {resumeData.projects.length > 0 && (
              <div className="mb-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Technical Projects
                </h2>
                <div className="space-y-3">
                  {resumeData.projects.map((proj) => (
                    <div key={proj.id} className="text-[12px]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-950">{proj.name}</span>
                        {proj.link && <span className="text-slate-500 text-[11px]">{proj.link}</span>}
                      </div>
                      {proj.technologies && (
                        <div className="text-[11px] text-slate-600 italic mb-1">
                          Stack: {proj.technologies}
                        </div>
                      )}
                      <ul className="list-disc list-inside space-y-1 text-[11.5px] text-slate-700">
                        {proj.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {resumeData.education.length > 0 && (
              <div className="mb-4">
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Education
                </h2>
                <div className="space-y-2">
                  {resumeData.education.map((edu) => (
                    <div key={edu.id} className="flex items-center justify-between text-[12px]">
                      <div>
                        <span className="font-bold text-slate-950">{edu.degree}</span>
                        <span className="text-slate-700">, {edu.institution}</span>
                      </div>
                      <span className="text-slate-600 font-medium text-[11px]">
                        {edu.graduationYear}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {resumeData.certifications.length > 0 && (
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  Certifications
                </h2>
                <ul className="list-disc list-inside text-[11.5px] text-slate-700 space-y-0.5">
                  {resumeData.certifications.map((c) => (
                    <li key={c.id}>
                      <span className="font-medium text-slate-900">{c.name}</span> — {c.issuer} ({c.year})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
