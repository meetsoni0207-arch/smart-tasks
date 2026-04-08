import { CheckCircle2, Clock, Flame, TrendingUp } from 'lucide-react';

export default function StatsBar({ stats }) {
  const score = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const items = [
    {
      label: 'Total Tasks', value: stats.total, icon: TrendingUp,
      color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20',
      sub: 'all time',
    },
    {
      label: 'Pending', value: stats.pending, icon: Clock,
      color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20',
      sub: 'to do',
    },
    {
      label: 'Completed', value: stats.completed, icon: CheckCircle2,
      color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20',
      sub: 'done',
    },
    {
      label: 'Focus Score', value: `${score}%`, icon: Flame,
      color: score >= 70 ? 'text-emerald-400' : score >= 40 ? 'text-amber-400' : 'text-red-400',
      bg: score >= 70 ? 'bg-emerald-500/10' : score >= 40 ? 'bg-amber-500/10' : 'bg-red-500/10',
      border: score >= 70 ? 'border-emerald-500/20' : score >= 40 ? 'border-amber-500/20' : 'border-red-500/20',
      sub: 'completion rate',
      isScore: true,
      score,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon, color, bg, border, sub, isScore, score }) => (
        <div key={label} className={`glass-card p-5 border ${border} relative overflow-hidden group hover:bg-white/8 transition-all duration-300`}>
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
              <Icon size={17} className={color} />
            </div>
            {isScore && (
              <div className="w-8 h-8 relative">
                <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90">
                  <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                  <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor"
                    strokeWidth="3" strokeLinecap="round"
                    strokeDasharray={`${score * 0.88} 88`}
                    className={color} />
                </svg>
              </div>
            )}
          </div>
          <div className={`text-3xl font-black ${color} mb-0.5`}>{value}</div>
          <div className="text-xs font-semibold text-white">{label}</div>
          <div className="text-xs text-gray-600">{sub}</div>
        </div>
      ))}
    </div>
  );
}
