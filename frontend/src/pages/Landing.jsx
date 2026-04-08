import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  Zap, CheckCircle2, Timer, BarChart3, Moon, Sun,
  ArrowRight, Kanban, Search, Bell, Shield, Star,
  Github, Twitter, Sparkles
} from 'lucide-react';

const features = [
  { icon: CheckCircle2, title: 'Smart Task Management', desc: 'Create, organize and track tasks with priority levels, due dates and status tracking — pending, in-progress, or done.', color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-500/10' },
  { icon: Timer, title: 'Built-in Pomodoro Timer', desc: 'Stay in deep focus with a per-task Pomodoro timer. Track your sessions and build a sustainable work rhythm.', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-500/10' },
  { icon: Kanban, title: 'Kanban Board View', desc: 'Visualize your workflow with a beautiful board view. Drag tasks across columns and see your progress at a glance.', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
  { icon: BarChart3, title: 'Productivity Score', desc: 'Get a real-time focus score based on your completion rate. Stay motivated and hit your daily goals.', color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  { icon: Search, title: 'Instant Search & Filter', desc: 'Find any task instantly. Filter by status, priority, or search by keyword — results update as you type.', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-500/10' },
  { icon: Shield, title: 'Secure & Private', desc: 'Your data is protected with JWT authentication and bcrypt password hashing. Only you can see your tasks.', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-500/10' },
];

const steps = [
  { step: '01', title: 'Create your account', desc: 'Sign up in seconds — no credit card, no setup.' },
  { step: '02', title: 'Add your tasks', desc: 'Create tasks with priority, due date and description.' },
  { step: '03', title: 'Focus & complete', desc: 'Use the Pomodoro timer and track your progress.' },
];

const testimonials = [
  { name: 'Priya S.', role: 'CS Student', text: 'TaskFlow completely changed how I manage my assignments. The Pomodoro timer is a game changer!', stars: 5 },
  { name: 'Rahul M.', role: 'Freelancer', text: 'The kanban board and dark mode make this feel like a real professional tool. Love it.', stars: 5 },
  { name: 'Aisha K.', role: 'Product Manager', text: 'Clean, fast, and actually useful. The productivity score keeps me accountable every day.', stars: 5 },
];

export default function Landing() {
  const { dark, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f] text-gray-900 dark:text-white overflow-x-hidden">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-gray-100 dark:border-white/5 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-black text-lg tracking-tight">TaskFlow</span>
            <span className="text-xs bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 border border-violet-200 dark:border-violet-500/30 px-2 py-0.5 rounded-full font-bold">PRO</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500 dark:text-gray-400">
            <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-gray-900 dark:hover:text-white transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-gray-900 dark:hover:text-white transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggle} className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link to="/login" className="text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm py-2 px-4">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-20 px-6 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-radial from-violet-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none animate-float" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl pointer-events-none animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-4xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-bold px-4 py-2 rounded-full mb-8">
            <Sparkles size={12} /> The smartest task manager for students & professionals
          </div>

          <h1 className="text-5xl sm:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
            Get more done,<br />
            <span className="gradient-text">stress less.</span>
          </h1>

          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            TaskFlow combines task management, Pomodoro focus timers, and productivity analytics into one beautiful app. Built for people who want to do their best work.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5">
              Start for free <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-ghost flex items-center gap-2 text-base px-8 py-3.5">
              Sign in to your account
            </Link>
          </div>

          <p className="text-xs text-gray-400 mt-4">No credit card required · Free forever</p>
        </div>

        {/* App preview mockup */}
        <div className="relative max-w-5xl mx-auto mt-20 animate-fade-in">
          <div className="glass-card p-6 shadow-2xl shadow-violet-500/10">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100 dark:border-white/5">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <div className="flex-1 bg-gray-100 dark:bg-white/5 rounded-lg h-6 mx-4 flex items-center px-3">
                <span className="text-xs text-gray-400">taskflow.app/dashboard</span>
              </div>
            </div>
            {/* Fake dashboard */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {[['Pending','3','text-amber-500','bg-amber-50 dark:bg-amber-500/10'],['In Progress','2','text-blue-500','bg-blue-50 dark:bg-blue-500/10'],['Completed','8','text-emerald-500','bg-emerald-50 dark:bg-emerald-500/10'],['Focus Score','73%','text-violet-500','bg-violet-50 dark:bg-violet-500/10']].map(([l,v,c,b]) => (
                <div key={l} className={`${b} rounded-xl p-3 border border-gray-100 dark:border-white/5`}>
                  <div className={`text-2xl font-black ${c}`}>{v}</div>
                  <div className="text-xs text-gray-500 font-medium">{l}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { title: 'Design landing page', p: 'High', s: 'In Progress', pc: 'priority-high' },
                { title: 'Write unit tests', p: 'Medium', s: 'Pending', pc: 'priority-medium' },
                { title: 'Deploy to Render', p: 'High', s: 'Completed', pc: 'priority-high' },
              ].map(({ title, p, s, pc }) => (
                <div key={title} className="glass-card p-4 text-left">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${pc === 'priority-high' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400' : 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400'}`}>{p}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-white mb-2">{title}</p>
                  <p className="text-xs text-gray-400">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Everything you need to <span className="gradient-text">stay focused</span></h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg max-w-xl mx-auto">Powerful features designed for real productivity — not just task lists.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="glass-card p-6 hover:scale-[1.02] transition-all duration-300 group">
                <div className={`w-12 h-12 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 px-6 bg-gray-50 dark:bg-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black mb-4">Up and running in <span className="gradient-text">3 steps</span></h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-16">No complicated setup. Just sign up and start being productive.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc }) => (
              <div key={step} className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-violet-500/30">
                  <span className="text-white font-black text-lg">{step}</span>
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Loved by <span className="gradient-text">productive people</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(({ name, role, text, stars }) => (
              <div key={name} className="glass-card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(stars)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">"{text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-sm font-black">
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{name}</div>
                    <div className="text-xs text-gray-400">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 pointer-events-none" />
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30 animate-float">
                <Zap size={28} className="text-white" />
              </div>
              <h2 className="text-4xl font-black mb-4">Ready to get <span className="gradient-text">focused?</span></h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Join and start managing your tasks like a pro. Free forever.</p>
              <Link to="/register" className="btn-primary inline-flex items-center gap-2 text-base px-10 py-4">
                Create free account <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 dark:border-white/5 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-black text-gray-900 dark:text-white">TaskFlow</span>
          </div>
          <p className="text-sm text-gray-400">Built with ❤️ using MERN Stack</p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <Link to="/login" className="hover:text-gray-900 dark:hover:text-white transition-colors">Login</Link>
            <Link to="/register" className="hover:text-gray-900 dark:hover:text-white transition-colors">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
