import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, PenTool, Map, Users, Lightbulb, Trophy, User, Settings, Shield, Timer, Moon, Sun, Coffee, Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  onOpenSprint: () => void;
}

export function Sidebar({ onOpenSprint }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'classic' | 'midnight' | 'coffeehouse'>('classic');

  useEffect(() => {
    const savedTheme = localStorage.getItem('inkroot_theme') as any || 'classic';
    setTheme(savedTheme);
    document.documentElement.className = savedTheme === 'classic' ? '' : `theme-${savedTheme}`;
  }, []);

  const cycleTheme = () => {
    const themes: ('classic' | 'midnight' | 'coffeehouse')[] = ['classic', 'midnight', 'coffeehouse'];
    const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
    const nextTheme = themes[nextIndex];
    setTheme(nextTheme);
    localStorage.setItem('inkroot_theme', nextTheme);
    document.documentElement.className = nextTheme === 'classic' ? '' : `theme-${nextTheme}`;
  };

  const navItems = [
    { to: '/', icon: BookOpen, label: 'Feed' },
    { to: '/write', icon: PenTool, label: "Writer's Desk" },
    { to: '/map', icon: Map, label: 'Literary Map' },
    { to: '/editors', icon: Users, label: 'Editors' },
    { to: '/spark', icon: Lightbulb, label: 'Spark Box' },
    { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { to: '/profile', icon: User, label: 'My Profile' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-surface border border-border rounded-md text-text"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-40 w-64 h-full bg-accent text-white flex flex-col transition-transform duration-300 shadow-xl",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-6 border-b border-white/10">
          <h1 className="text-3xl font-playfair font-bold tracking-wider">Inkroot</h1>
          <p className="text-xs mt-2 opacity-80 font-playfair italic">Where local voices take root.</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 flex flex-col">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => cn(
                "px-6 py-3 flex items-center gap-3 border-b border-white/10 border-l-4 transition-colors",
                isActive ? "border-l-accent-secondary bg-white/5" : "border-l-transparent hover:border-l-accent-secondary hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <button 
            onClick={() => { onOpenSprint(); setIsOpen(false); }}
            className="mt-6 mx-4 py-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
          >
            <Timer size={18} />
            <span>Start Sprint</span>
          </button>
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={cycleTheme}
            className="w-full py-2 text-sm bg-white/10 rounded hover:bg-white/20 transition-colors mb-4 flex items-center justify-center gap-2"
          >
            {theme === 'classic' && <Sun size={16} />}
            {theme === 'midnight' && <Moon size={16} />}
            {theme === 'coffeehouse' && <Coffee size={16} />}
            Toggle Theme
          </button>
          <button className="w-full py-2 bg-white text-accent font-medium rounded hover:bg-gray-100 transition-colors">
            Log In / Sign Up
          </button>
        </div>
      </aside>
      
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
