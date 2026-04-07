import { Pencil, Trash2, Calendar, CheckCircle2, Circle } from 'lucide-react';

const priorityConfig = {
  high: { label: 'High', class: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', dot: 'bg-red-500' },
  medium: { label: 'Medium', class: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400', dot: 'bg-amber-500' },
  low: { label: 'Low', class: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400', dot: 'bg-emerald-500' },
};

export default function TaskCard({ task, viewMode, onEdit, onDelete, onToggle }) {
  const p = priorityConfig[task.priority] || priorityConfig.medium;
  const isCompleted = task.status === 'completed';
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (viewMode === 'list') {
    return (
      <div className={`card px-5 py-4 flex items-center gap-4 hover:shadow-md transition-all duration-200 animate-slide-up ${isCompleted ? 'opacity-70' : ''}`}>
        <button onClick={() => onToggle(task)} className="flex-shrink-0 text-gray-400 hover:text-violet-600 transition-colors">
          {isCompleted ? <CheckCircle2 size={22} className="text-emerald-500" /> : <Circle size={22} />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold text-gray-900 dark:text-white truncate ${isCompleted ? 'line-through text-gray-400' : ''}`}>{task.title}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${p.class}`}>{p.label}</span>
          </div>
          {task.description && <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">{task.description}</p>}
        </div>
        {task.dueDate && (
          <div className={`hidden sm:flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
            <Calendar size={13} /> {formatDate(task.dueDate)}
          </div>
        )}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={() => onEdit(task)} className="w-8 h-8 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 flex items-center justify-center text-gray-400 hover:text-violet-600 transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={() => onDelete(task._id)} className="w-8 h-8 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`card p-5 hover:shadow-lg transition-all duration-200 animate-slide-up group ${isCompleted ? 'opacity-75' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-medium ${p.class}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${p.dot}`} />
            {p.label}
          </span>
          {isCompleted && (
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">Done</span>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="w-7 h-7 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 flex items-center justify-center text-gray-400 hover:text-violet-600 transition-colors">
            <Pencil size={13} />
          </button>
          <button onClick={() => onDelete(task._id)} className="w-7 h-7 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <h3 className={`font-semibold text-gray-900 dark:text-white mb-1.5 leading-snug ${isCompleted ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
        {task.title}
      </h3>
      {task.description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{task.description}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
        {task.dueDate ? (
          <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-500' : 'text-gray-400'}`}>
            <Calendar size={12} /> {formatDate(task.dueDate)} {isOverdue && '· Overdue'}
          </div>
        ) : <span />}
        <button onClick={() => onToggle(task)} className="flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
          {isCompleted
            ? <><CheckCircle2 size={15} className="text-emerald-500" /> Completed</>
            : <><Circle size={15} /> Mark done</>}
        </button>
      </div>
    </div>
  );
}
