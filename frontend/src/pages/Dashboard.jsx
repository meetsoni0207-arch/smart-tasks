import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import PomodoroTimer from '../components/PomodoroTimer';
import {
  LogOut, Plus, Search, Zap, LayoutGrid, List,
  Columns, ChevronDown, Keyboard, X
} from 'lucide-react';

const FILTERS = ['all', 'pending', 'completed'];
const PRIORITIES = ['all', 'high', 'medium', 'low'];
const VIEWS = [
  { id: 'grid', icon: LayoutGrid, label: 'Grid' },
  { id: 'list', icon: List, label: 'List' },
  { id: 'kanban', icon: Columns, label: 'Board' },
];

const greet = () => {
  const h = new Date().getHours();
  if (h < 5) return 'Working late';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Good night';
};

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [pomodoroTask, setPomodoroTask] = useState(null);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const fetchTasks = useCallback(async () => {
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (priorityFilter !== 'all') params.priority = priorityFilter;
      if (search) params.search = search;
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch { toast.error('Failed to load tasks'); }
    finally { setLoading(false); }
  }, [statusFilter, priorityFilter, search]);

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'n') { setEditTask(null); setModalOpen(true); }
      if (e.key === '?') setShowShortcuts(s => !s);
      if (e.key === 'Escape') { setModalOpen(false); setShowShortcuts(false); setPomodoroTask(null); }
      if (e.key === '1') setViewMode('grid');
      if (e.key === '2') setViewMode('list');
      if (e.key === '3') setViewMode('kanban');
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(t => t.filter(task => task._id !== id));
      toast.success('Task deleted');
    } catch { toast.error('Failed to delete'); }
  };

  const handleToggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending';
      const { data } = await api.put(`/tasks/${task._id}`, { status: newStatus });
      setTasks(t => t.map(tk => tk._id === task._id ? data : tk));
      if (newStatus === 'completed') {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#8b5cf6', '#6366f1', '#a78bfa', '#c4b5fd'] });
        toast.success('Task completed! 🎉');
      }
    } catch { toast.error('Failed to update'); }
  };

  const handleSave = (task, isEdit) => {
    if (isEdit) setTasks(t => t.map(tk => tk._id === task._id ? task : tk));
    else setTasks(t => [task, ...t]);
    setModalOpen(false);
    setEditTask(null);
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'priority') {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.priority] - order[b.priority];
    }
    if (sortBy === 'due') return new Date(a.dueDate || '9999') - new Date(b.dueDate || '9999');
    return 0;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    high: tasks.filter(t => t.priority === 'high').length,
  };

  const cardProps = (task) => ({
    task, viewMode,
    onEdit: (t) => { setEditTask(t); setModalOpen(true); },
    onDelete: handleDelete,
    onToggle: handleToggleStatus,
    onPomodoro: (t) => setPomodoroTask(t),
  });

  // Kanban columns
  const kanbanCols = [
    { id: 'pending', label: '⏳ Pending', color: 'border-amber-500/30', tasks: sortedTasks.filter(t => t.status === 'pending' && t.priority === 'high') },
    { id: 'medium', label: '🔵 In Progress', color: 'border-blue-500/30', tasks: sortedTasks.filter(t => t.status === 'pending' && t.priority !== 'high') },
    { id: 'completed', label: '✅ Done', color: 'border-emerald-500/30', tasks: sortedTasks.filter(t => t.status === 'completed') },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f]" style={{ backgroundImage: 'radial-gradient(ellipse 100% 40% at 50% 0%, rgba(120,80,255,0.12), transparent)' }}>

      {/* Navbar */}
      <nav className="sticky top-0 z-30 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap size={15} className="text-white" />
            </div>
            <span className="font-black text-white tracking-tight">TaskFlow</span>
            <span className="hidden sm:block text-xs bg-violet-500/15 text-violet-400 border border-violet-500/20 px-2 py-0.5 rounded-full font-semibold">PRO</span>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => setShowShortcuts(true)} className="hidden sm:flex w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 items-center justify-center text-gray-500 hover:text-white transition-colors" title="Keyboard shortcuts (?)">
              <Keyboard size={15} />
            </button>
            <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/5">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-black">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="hidden sm:block text-sm font-medium text-gray-300">{user?.name?.split(' ')[0]}</span>
            </div>
            <button onClick={logout} className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/10 flex items-center justify-center text-gray-500 hover:text-red-400 transition-all" title="Logout">
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Hero header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            <h1 className="text-3xl font-black text-white">
              {greet()}, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              {stats.pending === 0 ? "You're all caught up! 🎉" : `You have ${stats.pending} task${stats.pending > 1 ? 's' : ''} remaining`}
            </p>
          </div>
          <button onClick={() => { setEditTask(null); setModalOpen(true); }} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
            <Plus size={17} /> New Task
            <kbd className="hidden sm:block text-xs bg-white/10 px-1.5 py-0.5 rounded font-mono">N</kbd>
          </button>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input className="input pl-10 h-10 text-sm" placeholder="Search tasks... (type to filter)"
              value={search} onChange={e => setSearch(e.target.value)} />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* Status filter */}
            <div className="flex bg-white/5 border border-white/8 rounded-xl overflow-hidden">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className={`px-3 py-2 text-xs font-semibold capitalize transition-all ${statusFilter === f ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {f}
                </button>
              ))}
            </div>

            {/* Priority filter */}
            <div className="flex bg-white/5 border border-white/8 rounded-xl overflow-hidden">
              {PRIORITIES.map(p => (
                <button key={p} onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-2 text-xs font-semibold capitalize transition-all ${priorityFilter === p ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {p}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="appearance-none bg-white/5 border border-white/8 rounded-xl px-3 pr-7 py-2 text-xs font-semibold text-gray-400 focus:outline-none focus:ring-1 focus:ring-violet-500/50 cursor-pointer">
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="priority">Priority</option>
                <option value="due">Due Date</option>
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>

            {/* View toggle */}
            <div className="flex bg-white/5 border border-white/8 rounded-xl overflow-hidden">
              {VIEWS.map(({ id, icon: Icon, label }) => (
                <button key={id} onClick={() => setViewMode(id)} title={`${label} (${VIEWS.findIndex(v => v.id === id) + 1})`}
                  className={`px-3 py-2 transition-all ${viewMode === id ? 'bg-violet-600 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  <Icon size={15} />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Task count */}
        {!loading && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium">{sortedTasks.length} task{sortedTasks.length !== 1 ? 's' : ''}</span>
            {(search || statusFilter !== 'all' || priorityFilter !== 'all') && (
              <button onClick={() => { setSearch(''); setStatusFilter('all'); setPriorityFilter('all'); }}
                className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                Clear filters
              </button>
            )}
          </div>
        )}

        {/* Tasks */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card h-40 shimmer" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
          </div>
        ) : sortedTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center animate-fade-in">
            <div className="w-20 h-20 bg-violet-500/10 rounded-2xl flex items-center justify-center mb-5 animate-float">
              <Zap size={32} className="text-violet-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              {search ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">
              {search ? `No results for "${search}"` : 'Create your first task and start building momentum'}
            </p>
            {!search && (
              <button onClick={() => { setEditTask(null); setModalOpen(true); }} className="btn-primary flex items-center gap-2">
                <Plus size={16} /> Create First Task
              </button>
            )}
          </div>
        ) : viewMode === 'kanban' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
            {kanbanCols.map(col => (
              <div key={col.id} className={`glass-card p-4 border ${col.color} kanban-col`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">{col.label}</h3>
                  <span className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">{col.tasks.length}</span>
                </div>
                <div className="space-y-3">
                  {col.tasks.map(task => (
                    <TaskCard key={task._id} {...cardProps(task)} viewMode="list" />
                  ))}
                  {col.tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-600 text-sm">Empty</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in'
            : 'flex flex-col gap-3 animate-fade-in'}>
            {sortedTasks.map(task => <TaskCard key={task._id} {...cardProps(task)} />)}
          </div>
        )}
      </div>

      {/* Modals */}
      {modalOpen && <TaskModal task={editTask} onClose={() => { setModalOpen(false); setEditTask(null); }} onSave={handleSave} />}
      {pomodoroTask !== null && <PomodoroTimer taskTitle={pomodoroTask?.title} onClose={() => setPomodoroTask(null)} />}

      {/* Keyboard shortcuts modal */}
      {showShortcuts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={() => setShowShortcuts(false)}>
          <div className="glass-card p-6 w-full max-w-sm animate-scale-in" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-white flex items-center gap-2"><Keyboard size={16} className="text-violet-400" /> Shortcuts</h3>
              <button onClick={() => setShowShortcuts(false)} className="text-gray-500 hover:text-white"><X size={16} /></button>
            </div>
            <div className="space-y-2">
              {[['N', 'New task'], ['1', 'Grid view'], ['2', 'List view'], ['3', 'Board view'], ['?', 'Show shortcuts'], ['Esc', 'Close modal']].map(([key, desc]) => (
                <div key={key} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-gray-400">{desc}</span>
                  <kbd className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-lg font-mono border border-white/10">{key}</kbd>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
