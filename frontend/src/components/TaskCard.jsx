import { useState } from 'react';
import { Pencil, Trash2, Calendar, CheckCircle2, Circle, Timer, Flag, MoreVertical } from 'lucide-react';

const priorityConfig = {
  high: { label: 'High', cls: 'priority-high', bar: 'bg-red-500', glow: 'rgba(239,68,68,0.15)' },
  medium: { label: 'Medium', cls: 'priority-medium', bar: 'bg-amber-500', glow: 'rgba(245,158,11,0.15)' },
  low: { label: 'Low', cls: 'priority-low', bar: 'bg-emerald-500', glow: 'rgba(16,185,129,0.15)' },
};

export default function TaskCard({ task, viewMode, onEdit, onDelete, onToggle, onPomodoro }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const p = priorityConfig[task.priority] || priorityConfig.medium;
  const isCompleted = task.status === 'completed';
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !isCompleted;
  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (viewMode === 'list') {
    return (
      <div className={`glass-card px-5 py-4 flex items-center gap-4 hover:bg-white/8 transition-all duration-200 animate-slide-up ${isCompleted ? 'opacity-50' : 'task-card-pending'}`}>
        <button onClick={() => onToggle(task)} className="flex-shrink-0 transition-transform hover:scale-110">
          {isCompleted
            ? <CheckCircle2 size={22} className="text-emerald-400" />
            : <Circle size={22} className="text-gray-600 hover:text-violet-400 transition-colors" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`font-semibold text-white truncate ${isCompleted ? 'line-through text-gray-600' : ''}`}>{task.title}</span>
            <span className={p.cls}>{p.label}</span>
          </div>
          {task.description && <p className="text-sm text-gray-500 truncate mt-0.5">{task.description}</p>}
        </div>
        {task.dueDate && (
          <div className={`hidden sm:flex items-center gap-1.5 text-xs font-medium flex-shrink-0 ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
            <Calendar size={12} /> {formatDate(task.dueDate)} {isOverdue && '· Overdue'}
          </div>
        )}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button onClick={() => onPomodoro(task)} className="w-8 h-8 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 flex items-center justify-center text-violet-400 transition-colors" title="Start Pomodoro">
            <Timer size={14} />
          </button>
          <button onClick={() => onEdit(task)} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
            <Pencil size={14} />
          </button>
          <button onClick={() => onDelete(task._id)} className="w-8 h-8 rounded-lg hover:bg-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`glass-card p-5 flex flex-col gap-3 transition-all duration-300 animate-slide-up group cursor-default relative overflow-hidden ${isCompleted ? 'opacity-50 task-card-completed' : 'task-card-pending hover:bg-white/8'}`}
      style={{ '--glow': p.glow }}
    >
      {/* Priority bar */}
      <div className={`absolute top-0 left-0 right-0 h-0.5 ${p.bar} opacity-60`} />

      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={p.cls}><Flag size={10} /> {p.label}</span>
          {isCompleted && <span className="status-completed">Done</span>}
          {isOverdue && <span className="badge bg-red-500/15 text-red-400 border border-red-500/20">Overdue</span>}
        </div>
        <div className="relative">
          <button onClick={() => setMenuOpen(m => !m)} className="w-7 h-7 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all">
            <MoreVertical size={14} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-8 glass-card py-1 w-36 z-20 animate-scale-in" onMouseLeave={() => setMenuOpen(false)}>
              <button onClick={() => { onPomodoro(task); setMenuOpen(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                <Timer size={13} className="text-violet-400" /> Pomodoro
              </button>
              <button onClick={() => { onEdit(task); setMenuOpen(false); }} className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-white/5 flex items-center gap-2 transition-colors">
                <Pencil size={13} className="text-blue-400" /> Edit
              </button>
              <button onClick={() => { onDelete(task._id); setMenuOpen(false); }} className="w-full px-3 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/5 flex items-center gap-2 transition-colors">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className={`font-bold text-white leading-snug mb-1 ${isCompleted ? 'line-through text-gray-600' : ''}`}>{task.title}</h3>
        {task.description && <p className="text-sm text-gray-500 line-clamp-2">{task.description}</p>}
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-auto">
        {task.dueDate ? (
          <div className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-red-400' : 'text-gray-500'}`}>
            <Calendar size={11} /> {formatDate(task.dueDate)}
          </div>
        ) : <span />}
        <button onClick={() => onToggle(task)} className="flex items-center gap-1.5 text-xs font-semibold transition-all hover:scale-105">
          {isCompleted
            ? <><CheckCircle2 size={14} className="text-emerald-400" /><span className="text-emerald-400">Completed</span></>
            : <><Circle size={14} className="text-gray-600" /><span className="text-gray-500 hover:text-violet-400">Mark done</span></>}
        </button>
      </div>
    </div>
  );
}
