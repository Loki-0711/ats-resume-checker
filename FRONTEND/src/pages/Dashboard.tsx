import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gauge, 
  FileText, 
  TrendingUp, 
  Award, 
  Search, 
  Plus, 
  Calendar, 
  Building2,
  ChevronRight
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { recentScans, viewSavedScan } = useAnalysis();
  const [searchTerm, setSearchTerm] = useState('');

  const metrics = [
    {
      title: 'Average ATS Score',
      value: '82%',
      change: '+4.2% this month',
      isPositive: true,
      icon: Gauge,
      color: 'from-cyan-500 to-blue-600',
      badge: 'Strong',
    },
    {
      title: 'Resumes Analyzed',
      value: '12',
      change: '4 target companies',
      isPositive: true,
      icon: FileText,
      color: 'from-indigo-500 to-purple-600',
      badge: 'Active',
    },
    {
      title: 'Skills Improved',
      value: '18',
      change: '+6 new competencies',
      isPositive: true,
      icon: TrendingUp,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Accelerating',
    },
    {
      title: 'Best Match',
      value: '94%',
      change: 'ML Platform Lead',
      isPositive: true,
      icon: Award,
      color: 'from-amber-500 to-orange-600',
      badge: 'Top 2%',
    },
  ];

  const filteredScans = recentScans.filter((scan) =>
    scan.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scan.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenScan = async (scanId: string) => {
    await viewSavedScan(scanId);
    navigate('/results');
  };

  return (
    <div className="min-h-screen bg-[#060813] py-10 px-4 sm:px-6 lg:px-8 relative text-left">
      {/* Background ambient glow */}
      <div className="absolute top-10 right-1/3 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* User Greeting & Quick Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                Candidate Intelligence Center
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span className="text-xs font-mono text-emerald-400">All Systems Synced</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
              Good morning, Lokesh
            </h1>

            <p className="text-sm text-slate-400 mt-1">
              Track your resume performance, discover target company compatibility, and improve your job match.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/analyze"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Analyze New Resume</span>
            </Link>
          </div>
        </div>

        {/* 4 Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="glass-panel rounded-2xl p-6 border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-semibold uppercase">
                    {metric.badge}
                  </span>
                </div>

                <div className="text-3xl font-black text-white font-['Outfit'] mb-1 tracking-tight">
                  {metric.value}
                </div>

                <div className="text-xs font-medium text-slate-300 mb-2 font-sans">
                  {metric.title}
                </div>

                <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">{metric.change}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Analyses Section */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border-white/10 space-y-6">
          
          {/* Section Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Recent Analyses
              </h2>
              <p className="text-xs text-slate-400">
                Detailed record of past semantic evaluations and compatibility rankings.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter by title or company..."
                className="w-full pl-9 pr-4 py-2 bg-[#090e1c] border border-white/10 focus:border-cyan-500/40 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Table / Cards List */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead>
                <tr className="border-b border-white/5 text-slate-400 font-mono uppercase text-[10px] tracking-wider">
                  <th className="pb-3 px-3">Role & Company</th>
                  <th className="pb-3 px-3">ATS Compatibility</th>
                  <th className="pb-3 px-3">Skill Metrics</th>
                  <th className="pb-3 px-3">Scan Date</th>
                  <th className="pb-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredScans.map((scan) => (
                  <tr
                    key={scan.id}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                    onClick={() => handleOpenScan(scan.id)}
                  >
                    {/* Role & Company */}
                    <td className="py-4 px-3">
                      <div className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors font-['Outfit']">
                        {scan.jobTitle}
                      </div>
                      <div className="text-slate-400 text-xs flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-500" />
                        <span>{scan.company}</span>
                      </div>
                    </td>

                    {/* Score */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-black font-['Outfit'] ${
                          scan.score >= 85
                            ? 'text-cyan-400'
                            : scan.score >= 75
                            ? 'text-emerald-400'
                            : 'text-amber-400'
                        }`}>
                          {scan.score}%
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                          {scan.status}
                        </span>
                      </div>
                    </td>

                    {/* Skill count */}
                    <td className="py-4 px-3 font-mono text-slate-400">
                      <span className="text-emerald-400 font-semibold">{scan.matchingCount} matched</span>
                      <span className="mx-1.5">•</span>
                      <span className="text-rose-400 font-semibold">{scan.missingCount} gaps</span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-3 font-mono text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{scan.date}</span>
                      </div>
                    </td>

                    {/* View Button */}
                    <td className="py-4 px-3 text-right">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenScan(scan.id);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-500 group-hover:text-black border border-cyan-500/30 text-cyan-300 text-xs font-semibold inline-flex items-center gap-1.5 transition-all"
                      >
                        <span>View Analysis</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
};
