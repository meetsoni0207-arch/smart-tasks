import { useState, useEffect } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import { X, Sparkles } from 'lucide-react';

const PRIORITY_OPTIONS = [
  { value: 'high', label: '🔴 High', desc: 'Urgent & important' },
  { value: 'medium', label: '🟡 Medium', desc: 'Important, not urgent' },
  { value: 'low', label: '🟢 Low', desc: 'Nice to have' },
];

export default function TaskModal({ task, onClose, onSave }) {
  const [form, setForm] = useState({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) setForm({
      title: task.title || '', description: task.description || '',
      status: task.status || 'pending', priority: task.priority || 'medium',
      dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
    });
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error('Title is required');
    setLoading(true);
    try {
      const payload = { ...form, dueDate: form.dueDate || undefined };
      if (task) {
        const { data } = await api.put(`/tasks/${task._id}`, payload);
        toast.success('Task updated');
        onSave(data, true);
      } else {
        const { data } = await api.post('/tasks', payload);
        toast.success('Task created');
        onSave(data, false);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally { setLoading(false); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-card p-7 animate-scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center">
              <Sparkles size={15} className="text-violet-400" />
            </div>
            <h2 className="text-lg font-bold text-white">{task ? 'Edit Task' : 'New Task'}</h2>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-all">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Title *</label>
            <input className="input text-base font-medium" placeholder="What needs to be done?"
              value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required autoFocus />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea className="input resize-none" rows={3} placeholder="Add context, notes, or links..."
              value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </div>

          {/* Priority selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Priority</label>
            <div className="grid grid-cols-3 gap-2">
              {PRIORITY_OPTIONS.map(({ value, label, desc }) => (
                <button key={value} type="button" onClick={() => setForm({ ...form, priority: value })}
                  className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                    form.priority === value
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-white/5 bg-white/3 hover:bg-white/5'
                  }`}>
                  <div className="text-sm font-semibold text-white mb-0.5">{label}</div>
                  <div className="text-xs text-gray-500">{desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Status + Due date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Status</label>
              <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="pending">⏳ Pending</option>
                <option value="completed">✅ Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Due Date</label>
              <input type="date" className="input" value={form.dueDate}
                onChange={e => setForm({ ...form, dueDate: e.target.value })} />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">Cancel</button>
            <button type="submit" className="btn-primary flex-1 flex items-center justify-center gap-2" disabled={loading}>
              {loading
                ? <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                : <><Sparkles size={14} /> {task ? 'Update Task' : 'Create Task'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
