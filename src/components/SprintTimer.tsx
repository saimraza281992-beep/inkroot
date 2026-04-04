import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SprintTimerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SprintTimer({ isOpen, onClose }: SprintTimerProps) {
  const [state, setState] = useState<'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED'>('IDLE');
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state === 'RUNNING' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (state === 'RUNNING' && timeLeft === 0) {
      setState('COMPLETED');
      // Play sound
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.start();
        setTimeout(() => osc.stop(), 200);
      } catch (e) {}
    }
    return () => clearInterval(interval);
  }, [state, timeLeft]);

  if (!isOpen) return null;

  const setPreset = (mins: number) => {
    if (state === 'RUNNING') return;
    const secs = mins * 60;
    setTotalTime(secs);
    setTimeLeft(secs);
    setState('IDLE');
  };

  const toggleTimer = () => {
    if (state === 'IDLE' || state === 'PAUSED') {
      if (timeLeft === 0) {
        setTotalTime(25 * 60);
        setTimeLeft(25 * 60);
      }
      setState('RUNNING');
    } else if (state === 'RUNNING') {
      setState('PAUSED');
    }
  };

  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  const offset = totalTime > 0 ? 283 - (timeLeft / totalTime) * 283 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface p-8 rounded-2xl border border-border shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 opacity-50 hover:opacity-100 text-text">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-playfair font-bold text-center mb-6 text-text">Writer's Sprint</h2>
        
        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="4" />
            <circle 
              cx="50" cy="50" r="45" fill="none" 
              stroke="var(--accent)" strokeWidth="4" 
              strokeDasharray="283" strokeDashoffset={offset} 
              className="transition-all duration-1000 linear" 
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-4xl font-mono font-bold text-text">{m}:{s}</span>
            <span className="text-xs uppercase tracking-widest opacity-60 mt-1 text-text">
              {state === 'IDLE' ? 'Ready' : state === 'RUNNING' ? 'Writing...' : state === 'PAUSED' ? 'Paused' : 'Done!'}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {[10, 15, 25, 45].map(mins => (
            <button 
              key={mins}
              onClick={() => setPreset(mins)}
              className="px-3 py-1 rounded bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-sm text-text"
            >
              {mins}m
            </button>
          ))}
        </div>

        {state !== 'COMPLETED' ? (
          <button 
            onClick={toggleTimer}
            className="w-full px-8 py-3 bg-accent text-white rounded-full font-medium shadow-lg hover:opacity-90 transition-all"
          >
            {state === 'RUNNING' ? 'Pause' : 'Start Sprint'}
          </button>
        ) : (
          <div className="mt-6 text-center border-t border-border pt-6">
            <h3 className="font-playfair font-bold text-xl mb-2 text-text">Sprint Complete!</h3>
            <input 
              type="number" 
              placeholder="Words written?" 
              className="w-full bg-transparent border border-border rounded px-4 py-2 mb-4 text-center text-text outline-none focus:border-accent"
            />
            <button 
              onClick={() => {
                setState('IDLE');
                setTimeLeft(0);
                onClose();
              }}
              className="px-6 py-2 bg-accent text-white rounded w-full"
            >
              Log & Claim Points
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
