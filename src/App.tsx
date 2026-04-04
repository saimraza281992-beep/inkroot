import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { SprintTimer } from './components/SprintTimer';
import { Feed } from './pages/Feed';
import { Write } from './pages/Write';
import { LiteraryMap } from './pages/Map';
import { Editors } from './pages/Editors';
import { SparkBox } from './pages/SparkBox';
import { Leaderboard } from './pages/Leaderboard';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { Bell } from 'lucide-react';

export default function App() {
  const [isSprintOpen, setIsSprintOpen] = useState(false);

  return (
    <HashRouter>
      <div className="flex h-screen overflow-hidden bg-bg text-text transition-colors duration-300">
        <Sidebar onOpenSprint={() => setIsSprintOpen(true)} />
        
        <main className="flex-1 flex flex-col h-full overflow-hidden relative">
          {/* Header */}
          <header className="h-16 border-b border-border flex items-center justify-end px-6 bg-surface/80 backdrop-blur-sm z-10 shrink-0">
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors text-text">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-accent">0 pts</span>
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                  ?
                </div>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/write" element={<Write />} />
              <Route path="/map" element={<LiteraryMap />} />
              <Route path="/editors" element={<Editors />} />
              <Route path="/spark" element={<SparkBox />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Footer */}
          <footer className="py-4 text-center text-sm opacity-60 border-t border-border shrink-0">
            Curated by Faez Ahmad
          </footer>
        </main>

        <SprintTimer isOpen={isSprintOpen} onClose={() => setIsSprintOpen(false)} />
      </div>
    </HashRouter>
  );
}

