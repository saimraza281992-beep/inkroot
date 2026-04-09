/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, Feather, Home, Users, Settings } from 'lucide-react';

export default function App() {
  return (
    <div className="flex h-screen w-full bg-bg text-text overflow-hidden">
      {/* Left Book Spine Nav */}
      <nav className="w-[240px] h-full bg-surface border-r border-border flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="w-8 h-8 rounded bg-accent flex items-center justify-center text-bg">
            <Feather size={18} />
          </div>
          <h1 className="text-2xl font-serif font-bold text-accent">Inkroot</h1>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <NavItem icon={<Home size={20} />} label="Home" active />
          <NavItem icon={<BookOpen size={20} />} label="Library" />
          <NavItem icon={<Users size={20} />} label="Community" />
        </div>

        <div className="p-4 border-t border-border">
          <NavItem icon={<Settings size={20} />} label="Settings" />
        </div>
      </nav>

      {/* Main Content Area */}
      <main id="app-content" className="flex-1 h-full overflow-y-auto relative">
        <div className="max-w-4xl mx-auto p-8 lg:p-12">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-text mb-4">Welcome to Inkroot</h2>
            <p className="text-lg text-text/80">
              The literary community platform for local writers. I've set up the app shell with your design tokens.
              What module would you like to build first?
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-surface border border-border">
              <h3 className="text-xl font-serif font-semibold mb-2">Ready for Modules</h3>
              <p className="text-text/70">
                The shell is ready with the 240px left nav and the main content area.
              </p>
            </div>
            <div className="p-6 rounded-lg bg-surface border border-border">
              <h3 className="text-xl font-serif font-semibold mb-2">Design Tokens Applied</h3>
              <p className="text-text/70">
                Colors and fonts (Playfair Display & Inter) are configured and active.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  const hash = label === "Home" ? "#/" : `#/${label.toLowerCase()}`;
  return (
    <button 
      onClick={() => window.location.hash = hash}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-left w-full
        ${active 
          ? 'bg-accent/10 text-accent font-medium' 
          : 'text-text/70 hover:bg-black/5 hover:text-text'
        }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
