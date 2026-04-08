import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Mail, Lock, ArrowRight, Zap, Shield, BarChart3, CheckCircle } from 'lucide-react';

const features = [
  { icon: Zap, label: 'Pomodoro Timer', desc: 'Built-in focus timer per task' },
  { icon: BarChart3, label: 'Productivity Score', desc: 'Track your daily progress' },
  { icon: Shield, label: 'Secure & Private', desc: 'JWT auth, your data is safe' },
  { icon: CheckCircle, label: 'Smart Streaks', desc: 'Stay consistent every day' },
];

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0f]" style={{ backgroundImage: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(120,80,255,0.2), transparent)' }}>
      {/* Left */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-14 relative overflow-hidden">
        {/* Animated orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap size={20} className="text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">TaskFlow</span>
            <span className="text-xs bg-violet-500/20 text-violet-300 border border-violet-500/30 px-2 py-0.5 rounded-full font-medium">PRO</span>
          </div>

          <h1 className="text-5xl font-black text-white leading-[1.1] mb-5">
            Your tasks,<br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">supercharged.</span>
          </h1>
          <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
            The only task manager built for deep work. Focus timers, streaks, and smart insights — all in one place.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-3">
          {features.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass p-4 rounded-xl group hover:bg-white/8 transition-all duration-300">
              <div className="w-8 h-8 bg-violet-500/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-violet-500/30 transition-colors">
                <Icon size={16} className="text-violet-400" />
              </div>
              <div className="text-white text-sm font-semibold mb-0.5">{label}</div>
              <div className="text-gray-500 text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="text-white font-bold text-lg">TaskFlow</span>
          </div>

          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back</h2>
            <p className="text-gray-500 text-sm mb-8">Sign in to continue your flow</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="email" className="input pl-10" placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input type="password" className="input pl-10" placeholder="••••••••"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2 mt-2" disabled={loading}>
                {loading
                  ? <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  : <> Sign In <ArrowRight size={16} /></>}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-500 text-sm">
                No account?{' '}
                <Link to="/register" className="text-violet-400 font-semibold hover:text-violet-300 transition-colors">Create one free</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
