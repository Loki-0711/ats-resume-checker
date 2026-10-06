import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';
import type { SkillCategoryStat, DonutSegment, RadarMetric } from '../types';

interface AnalyticsChartsProps {
  categories: SkillCategoryStat[];
  donutData: DonutSegment[];
  radarData: RadarMetric[];
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = ({
  categories,
  donutData,
  radarData,
}) => {
  const barColors = ['#38bdf8', '#818cf8', '#34d399', '#f59e0b'];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0b0f19] border border-cyan-500/30 p-2.5 rounded-xl shadow-xl font-mono text-xs text-white">
          <p className="font-semibold text-cyan-300">{label || payload[0].name}</p>
          <p className="text-slate-300">
            Score: <span className="font-bold text-emerald-400">{payload[0].value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6 text-left">
      
      {/* Title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
            Vector Analytics
          </span>
        </div>
        <h3 className="text-2xl font-bold text-white font-['Outfit']">
          Deep Algorithmic Analytics
        </h3>
        <p className="text-xs sm:text-sm text-slate-400">
          Visualizing match distribution, categorical gaps, and multi-dimensional resume strength.
        </p>
      </div>

      {/* 3 Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Skill Match Distribution (Bar) */}
        <div className="glass-panel rounded-3xl p-6 border-white/10 flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Skill Match Distribution
            </h4>
            <span className="text-xs text-slate-400">
              Categorical competency coverage
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#94a3b8', fontSize: 10 }} 
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="matchRate" radius={[6, 6, 0, 0]}>
                  {categories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Highest: Soft & Technical</span>
            <span className="text-cyan-400">92%</span>
          </div>
        </div>

        {/* Chart 2: Match Analysis (Donut) */}
        <div className="glass-panel rounded-3xl p-6 border-white/10 flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Match Analysis
            </h4>
            <span className="text-xs text-slate-400">
              Correlated vs Missing vectors
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`donut-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  formatter={(value) => <span className="text-[11px] text-slate-300 font-mono">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Core Alignment</span>
            <span className="text-emerald-400">72% Exact Match</span>
          </div>
        </div>

        {/* Chart 3: Resume Strength (Radar) */}
        <div className="glass-panel rounded-3xl p-6 border-white/10 flex flex-col justify-between">
          <div className="mb-4">
            <h4 className="text-base font-bold text-white font-['Outfit']">
              Resume Strength
            </h4>
            <span className="text-xs text-slate-400">
              5-dimensional competency radar
            </span>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="transparent" />
                <Radar
                  name="Candidate"
                  dataKey="score"
                  stroke="#38bdf8"
                  fill="#38bdf8"
                  fillOpacity={0.4}
                />
                <Tooltip content={<CustomTooltip />} />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Strongest Pillar</span>
            <span className="text-cyan-400">Projects (92%)</span>
          </div>
        </div>

      </div>

    </div>
  );
};
