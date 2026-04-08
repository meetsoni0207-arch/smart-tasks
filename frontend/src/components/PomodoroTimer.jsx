import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, X, Timer } from 'lucide-react';

const MODES = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
const MODE_LABELS = { work: 'Focus', short: 'Short Break', long: 'Long Break' };

export default function PomodoroTimer({ taskTitle, onClose }) {
  const [mode, setMode] = useState('work');
  const [seconds, setSeconds] = useState(MODES.work);
  const [running, setRunning] = useState(false);
  const [sessions, setSessions] = useState(0);
  const intervalRef = useRef(null);
  const total = MODES[mode];
  const progress = ((total - seconds) / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDash = circumference - (progress / 100) * circumference;

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            if (mode === 'work') setSessions(n => n + 1);
            new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3').play().catch(() => {});
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, mode]);

  const switchMode = (m) => { setMode(m); setSeconds(MODES[m]); setRunning(false); };
  const reset = () => { setSeconds(MODES[mode]); setRunning(false); };
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const modeColors = { work: '#8b5cf6', short: '#10b981', long: '#3b82f6' };
  const color = modeColors[mode];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="glass-card p-8 w-full max-w-sm animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Timer size={18} className="text-violet-400" />
            <span className="text-white font-bold">Pomodoro</span>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
            <X size={15} />
          </button>
        </div>

        {taskTitle && (
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Working on</p>
            <p className="text-white font-semibold text-sm truncate">{taskTitle}</p>
          </div>
        )}

        {/* Mode tabs */}
        <div className="flex bg-white/5 rounded-xl p-1 mb-8 gap-1">
          {Object.keys(MODES).map(m => (
            <button key={m} onClick={() => switchMode(m)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${mode === m ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
              {MODE_LABELS[m]}
            </button>
          ))}
        </div>

        {/* Ring timer */}
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <svg width="140" height="140" className="progress-ring">
              <circle cx="70" cy="70" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
              <circle cx="70" cy="70" r="45" fill="none" stroke={color} strokeWidth="6"
                strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDash}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white tabular-nums">{fmt(seconds)}</span>
              <span className="text-xs text-gray-500 mt-1">{MODE_LABELS[mode]}</span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button onClick={reset} className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all">
            <RotateCcw size={16} />
          </button>
          <button onClick={() => setRunning(r => !r)}
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold transition-all duration-200 shadow-lg active:scale-95"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}99)`, boxShadow: `0 8px 24px ${color}40` }}>
            {running ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
          </button>
          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-400">{sessions}🍅</span>
          </div>
        </div>

        <p className="text-center text-xs text-gray-600">
          {sessions > 0 ? `${sessions} session${sessions > 1 ? 's' : ''} completed today` : 'Start your first focus session'}
        </p>
      </div>
    </div>
  );
}
