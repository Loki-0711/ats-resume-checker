import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowUpRight, 
  Award,
  ChevronRight,
  Building2,
  MapPin
} from 'lucide-react';
import type { JobMatchRanking } from '../types';
import { useAnalysis } from '../context/AnalysisContext';

interface AllJobsMatchMatrixProps {
  rankedJobs?: JobMatchRanking[];
  bestMatch?: JobMatchRanking;
  onSelectRole?: (jobTitle: string, templateJd: string, company: string) => void;
}

export const AllJobsMatchMatrix: React.FC<AllJobsMatchMatrixProps> = ({
  rankedJobs = [],
  bestMatch,
  onSelectRole,
}) => {
  const { startAnalysis, selectSuitableRole, setTargetCompany } = useAnalysis();
  const [filterType, setFilterType] = useState<'all' | 'match' | 'potential' | 'gap'>('all');
  const [switchingJobId, setSwitchingJobId] = useState<string | null>(null);

  const topJob = bestMatch || rankedJobs[0];

  const filtered = rankedJobs.filter((job) => {
    if (filterType === 'match') return job.isMatch;
    if (filterType === 'potential') return job.verdict === 'Potential Match';
    if (filterType === 'gap') return job.verdict === 'Does Not Match';
    return true;
  });

  const handleSwitchTargetJob = async (job: JobMatchRanking) => {
    setSwitchingJobId(job.jobId);
    try {
      selectSuitableRole(job.jobTitle, job.templateJd);
      setTargetCompany(job.company);
      if (onSelectRole) {
        onSelectRole(job.jobTitle, job.templateJd, job.company);
      } else {
        await startAnalysis(job.templateJd, job.jobTitle, job.company);
      }
    } finally {
      setSwitchingJobId(null);
    }
  };

  const getVerdictBadge = (verdict: string, isMatch: boolean) => {
    if (isMatch || verdict === 'Strong Match') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
          <CheckCircle2 className="w-3 h-3" />
          <span>Strong Match</span>
        </span>
      );
    }
    if (verdict === 'Potential Match') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <AlertTriangle className="w-3 h-3" />
          <span>Potential Match</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
        <XCircle className="w-3 h-3" />
        <span>Skill Gap</span>
      </span>
    );
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border-cyan-500/20 text-left space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
              Cross-Job Matching Matrix
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit']">
            Which Jobs Does Your Resume Match Best?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Our neural matching engine scanned your resume across all open roles to rank your highest-probability matches.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-slate-900/80 border border-white/5">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              filterType === 'all'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Roles ({rankedJobs.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('match')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              filterType === 'match'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Matched ({rankedJobs.filter((j) => j.isMatch).length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('potential')}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              filterType === 'potential'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Potential ({rankedJobs.filter((j) => j.verdict === 'Potential Match').length})
          </button>
        </div>
      </div>

      {/* Top Banner: HIGHEST MATCHED JOB FOR THIS RESUME */}
      {topJob && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-cyan-950/60 via-slate-900/80 to-indigo-950/60 border border-cyan-500/40 shadow-xl shadow-cyan-950/30"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black font-['Outfit'] bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 shadow-md uppercase tracking-wider flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>Top Match For Your Profile</span>
                </span>
                <span className="text-xs font-mono text-cyan-300">
                  Cutoff: {topJob.cutoffScore}% • You: {topJob.score}%
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-2xl font-bold text-white font-['Outfit']">
                  {topJob.jobTitle}
                </h3>
                <span className="text-sm font-semibold text-cyan-300 flex items-center gap-1">
                  <Building2 className="w-4 h-4" />
                  {topJob.company}
                </span>
              </div>

              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                {topJob.description}
              </p>

              {/* Matched Skills Preview */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-400 mr-1">Top Alignment:</span>
                {topJob.matchingSkills.slice(0, 5).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Score & Action Button */}
            <div className="flex md:flex-col items-center justify-between md:justify-center gap-4 shrink-0 bg-slate-950/50 p-4 rounded-2xl border border-white/5">
              <div className="text-center">
                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-['Outfit']">
                  {topJob.score}%
                </div>
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  Compatibility
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleSwitchTargetJob(topJob)}
                disabled={switchingJobId === topJob.jobId}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
              >
                <span>{switchingJobId === topJob.jobId ? 'Switching...' : 'Deep-Dive Analyze'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Ranked Jobs List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2">
          <span>Ranked Job Catalog</span>
          <span>Showing {filtered.length} of {rankedJobs.length} roles</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filtered.map((job, idx) => {
            const isSwitching = switchingJobId === job.jobId;

            return (
              <motion.div
                key={job.jobId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-white/5 hover:border-cyan-500/30 transition-all bg-slate-900/50 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Role Info */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-400">
                        #{idx + 1}
                      </span>
                      <h4 className="text-base font-bold text-white font-['Outfit'] group-hover:text-cyan-300 transition-colors">
                        {job.jobTitle}
                      </h4>
                      <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                        at <strong className="text-slate-200">{job.company}</strong>
                      </span>
                      {getVerdictBadge(job.verdict, job.isMatch)}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-cyan-400" />
                        {job.location}
                      </span>
                      <span>•</span>
                      <span className="font-mono text-slate-300">{job.salary}</span>
                      <span>•</span>
                      <span className="font-mono">{job.experience}</span>
                      <span>•</span>
                      <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono">
                        {job.jobType}
                      </span>
                    </div>

                    {/* Skill Alignment Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        Matched ({job.coreMatchedCount}/{job.coreTotalCount}):
                      </span>
                      {job.matchingSkills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                        >
                          {skill}
                        </span>
                      ))}

                      {job.missingSkills.length > 0 && (
                        <>
                          <span className="text-[10px] font-mono text-rose-400 font-semibold ml-2">
                            Missing:
                          </span>
                          {job.missingSkills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-300 border border-rose-500/20"
                            >
                              ✕ {skill}
                            </span>
                          ))}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Right: Score Meter & Switch Action */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 sm:border-l sm:border-white/5 sm:pl-5">
                    <div className="text-left sm:text-right">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-2xl font-black font-['Outfit'] ${
                          job.isMatch ? 'text-emerald-400' : job.score >= 55 ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          {job.score}%
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          (cutoff: {job.cutoffScore}%)
                        </span>
                      </div>
                      <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                        <div
                          className={`h-full rounded-full ${
                            job.isMatch
                              ? 'bg-emerald-400'
                              : job.score >= 55
                              ? 'bg-amber-400'
                              : 'bg-slate-500'
                          }`}
                          style={{ width: `${Math.min(100, job.score)}%` }}
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleSwitchTargetJob(job)}
                      disabled={isSwitching}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>{isSwitching ? '...' : 'Analyze'}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
