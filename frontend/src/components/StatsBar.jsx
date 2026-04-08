import { CheckCircle2, Clock, Flame, PlayCircle } from 'lucide-react';

export default function StatsBar({ stats }) {
  const score = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  const items = [
    {
      label: 'Pending', value: stats.pending, icon: Clock,
      color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-100 dark:border-amber-500/20',
      sub: 'not started',
    },
    {
      label: 'In Progress', value: stats.inProgress, icon: PlayCircle,
      color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-100 dark:border-blue-500/20',
      sub: 'working on it',
    },
    {
      label: 'Completed', value: stats.completed, icon: CheckCircle2,
      color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-100 dark:border-emerald-500/20',
      sub: 'done',
    },
    {
      label: 'Focus Score', value: `${score}%`, icon: Flame,
      color: score >= 70 ? 'text-emerald-500' : score >= 40 ? 'text-amber-500' : 'text-red-500',
      bg: score >= 70 ? 'bg-emerald-50 dark:bg-emerald-500/10' : score >= 40 ? 'bg-amber-50 dark:bg-amber-500/10' : 'bg-red-50 dark:bg-red-500/10',
      border: score >= 70 ? 'border-emerald-100 dark:border-emerald-500/20' : score >= 40 ? 'border-amber-100 dark:border-amber-500/20' : 'border-red-100 dark:border-red-500/20',
      sub: 'completion rate',
      isScore: true, score,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {items.map(({ label, value, icon: Icon, color, bg, border, sub, isScore, score }) => (
        <div key={label} className={`glass-card p-5 border ${border} relative overflow-hidden group hover:scale-[1.02] transition-all duration-300`}>
          <div className="flex items-start justify-between mb-3">
            <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center`}>
              <Icon size={17} className={color} />
            </div>
            {isScore && (
              <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
                <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3" className="text-black/5 dark:text-white/5" />
                <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor"
                  strokeWidth="3" strokeLinecap="round"
                  strokeDasharray={`${score * 0.88} 88`}
                  className={color} style={{ transition: 'stroke-dasharray 0.8s ease' }} />
              </svg>
            )}
          </div>
          <div className={`text-3xl font-black ${color} mb-0.5`}>{value}</div>
          <div className="text-xs font-bold text-gray-800 dark:text-white">{label}</div>
          <div className="text-xs text-gray-400">{sub}</div>
        </div>
      ))}
    </div>
  );
}
