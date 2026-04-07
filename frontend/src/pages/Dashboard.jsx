import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import TaskModal from '../components/TaskModal';
import TaskCard from '../components/TaskCard';
import StatsBar from '../components/StatsBar';
import {
  LogOut, Plus, Sun, Moon, Search, CheckSquare,
  SlidersHorizontal, LayoutGrid, List
} from 'lucide-react';

const FILTERS = ['all', 'pending', 'completed'];
const PRIORITIES = ['all', 'high', 'medium', 'low'];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const { dark, toggle } = useTheme();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const fetchTasks = async () => {
    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (priorityFilter !== 'all') params.priority = priorityFilter;
      if (search) params.search = search;
      const { data } = await api.get('/tasks', { params });
      setTasks(data);
    } catch {
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, [statusFilter, priorityFilter, search]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(t => t.filter(task => task._id !== id));
      toast.success('Task deleted');
    } catch {
      toast.error('Failed to delete task');
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updated = await api.put(`/tasks/${task._id}`, {
        status: task.status === 'pending' ? 'completed' : 'pending',
      });
      setTasks(t => t.map(tk => tk._id === task._id ? updated.data : tk));
    } catch {
      toast.error('Failed to update task');
    }
  };

  const handleSave = (task, isEdit) => {
    if (isEdit) {
      setTasks(t => t.map(tk => tk._id === task._id ? task : tk));
    } else {
      setTasks(t => [task, ...t]);
    }
    setModalOpen(false);
    setEditTask(null);
  };

  const openEdit = (task) => { setEditTask(task); setModalOpen(true); };
  const openCreate = () => { setEditTask(null); setModalOpen(true); };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    high: tasks.filter(t => t.priority === 'high').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <CheckSquare size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg text-gray-900 dark:text-white">TaskFlow</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1.5">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.name}</span>
            </div>
            <button onClick={toggle} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={logout} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 transition-colors">
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Here's what's on your plate today</p>
          </div>
          <button onClick={openCreate} className="btn-primary flex items-center gap-2 self-start sm:self-auto">
            <Plus size={18} /> New Task
          </button>
        </div>

        {/* Stats */}
        <StatsBar stats={stats} />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 mt-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input className="input pl-10 h-10" placeholder="Search tasks..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="flex gap-2 flex-wrap">
            <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setStatusFilter(f)}
                  className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${statusFilter === f ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              {PRIORITIES.map(p => (
                <button key={p} onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-2 text-sm font-medium capitalize transition-colors ${priorityFilter === p ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                  {p}
                </button>
              ))}
            </div>
            <div className="flex bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <LayoutGrid size={16} />
              </button>
              <button onClick={() => setViewMode('list')} className={`px-3 py-2 transition-colors ${viewMode === 'list' ? 'bg-violet-600 text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tasks */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-10 h-10 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="w-20 h-20 bg-violet-50 dark:bg-violet-900/20 rounded-2xl flex items-center justify-center mb-4">
              <CheckSquare size={36} className="text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks yet</h3>
            <p className="text-gray-400 text-sm mb-6">Create your first task to get started</p>
            <button onClick={openCreate} className="btn-primary flex items-center gap-2">
              <Plus size={16} /> Create Task
            </button>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in'
            : 'flex flex-col gap-3 animate-fade-in'}>
            {tasks.map(task => (
              <TaskCard key={task._id} task={task} viewMode={viewMode}
                onEdit={openEdit} onDelete={handleDelete} onToggle={handleToggleStatus} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <TaskModal task={editTask} onClose={() => { setModalOpen(false); setEditTask(null); }} onSave={handleSave} />
      )}
    </div>
  );
}
