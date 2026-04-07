import { CheckCircle2, Clock, AlertTriangle, LayoutList } from 'lucide-react';

const statItems = [
  { key: 'total', label: 'Total Tasks', icon: LayoutList, color: 'from-violet-500 to-indigo-500', bg: 'bg-violet-50 dark:bg-violet-900/20', text: 'text-violet-600 dark:text-violet-400' },
  { key: 'pending', label: 'Pending', icon: Clock, color: 'from-amber-500 to-orange-500', bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-600 dark:text-amber-400' },
  { key: 'completed', label: 'Completed', icon: CheckCircle2, color: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
  { key: 'high', label: 'High Priority', icon: AlertTriangle, color: 'from-red-500 to-rose-500', bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-600 dark:text-red-400' },
];

export default function StatsBar({ stats }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statItems.map(({ key, label, icon: Icon, bg, text }) => (
        <div key={key} className="card p-5 flex items-center gap-4">
          <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon size={20} className={text} />
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stats[key]}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
