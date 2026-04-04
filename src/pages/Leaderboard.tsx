import React, { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';

const MOCK_LEADERBOARD = [
  { id: 1, name: 'Aria Montgomery', points: 12450, tier: 'Lighthouse Keeper', trend: 'up', avatar: 'AM' },
  { id: 2, name: 'Julian Vance', points: 11200, tier: 'Lighthouse Keeper', trend: 'same', avatar: 'JV' },
  { id: 3, name: 'Clara Oswald', points: 9850, tier: 'Navigator', trend: 'up', avatar: 'CO' },
  { id: 4, name: 'Elias Thorne', points: 8400, tier: 'Navigator', trend: 'down', avatar: 'ET' },
  { id: 5, name: 'Maya Lin', points: 7900, tier: 'Navigator', trend: 'up', avatar: 'ML' },
  { id: 6, name: 'Samuel Black', points: 6500, tier: 'Explorer', trend: 'up', avatar: 'SB' },
  { id: 7, name: 'Nadia Rostova', points: 5200, tier: 'Explorer', trend: 'same', avatar: 'NR' },
  { id: 8, name: 'Leo Fitz', points: 4800, tier: 'Explorer', trend: 'down', avatar: 'LF' },
  { id: 9, name: 'Jemma Simmons', points: 3100, tier: 'Seeker', trend: 'up', avatar: 'JS' },
  { id: 10, name: 'Grant Ward', points: 2900, tier: 'Seeker', trend: 'same', avatar: 'GW' },
];

export function Leaderboard() {
  const [timeframe, setTimeframe] = useState<'weekly' | 'monthly' | 'all-time'>('weekly');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-text mb-4 flex items-center gap-3">
            <Trophy className="text-accent" size={36} />
            Lighthouse Leaderboard
          </h1>
          <p className="text-text opacity-80 text-lg max-w-2xl">
            Recognizing the most active and supportive voices in the Inkroot community. Earn points by writing, reviewing, and participating.
          </p>
        </div>
        
        <div className="flex bg-surface border border-border rounded-lg p-1 shrink-0">
          {(['weekly', 'monthly', 'all-time'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                timeframe === t 
                  ? 'bg-accent text-white shadow-sm' 
                  : 'text-text opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border bg-black/5 dark:bg-white/5 text-sm font-bold text-text opacity-70 uppercase tracking-wider">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-6 md:col-span-5">Writer</div>
          <div className="col-span-4 md:col-span-3 text-right md:text-left">Points</div>
          <div className="hidden md:block col-span-3 text-right">Tier</div>
        </div>

        <div className="divide-y divide-border">
          {MOCK_LEADERBOARD.map((user, index) => (
            <div 
              key={user.id} 
              className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-black/5 dark:hover:bg-white/5 ${
                index < 3 ? 'bg-accent/5' : ''
              }`}
            >
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {index === 0 ? <Medal className="text-yellow-500" size={24} /> :
                 index === 1 ? <Medal className="text-gray-400" size={24} /> :
                 index === 2 ? <Medal className="text-amber-700" size={24} /> :
                 <span className="font-bold text-text opacity-50">{index + 1}</span>}
              </div>
              
              <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {user.avatar}
                </div>
                <div>
                  <div className="font-bold text-text">{user.name}</div>
                  <div className="text-xs text-text opacity-60 md:hidden">{user.tier}</div>
                </div>
              </div>
              
              <div className="col-span-4 md:col-span-3 flex items-center justify-end md:justify-start gap-2">
                <span className="font-bold text-accent">{user.points.toLocaleString()}</span>
                {user.trend === 'up' && <TrendingUp size={14} className="text-green-500" />}
                {user.trend === 'down' && <TrendingUp size={14} className="text-red-500 rotate-180" />}
              </div>
              
              <div className="hidden md:flex col-span-3 justify-end items-center gap-2">
                <Award size={16} className="text-text opacity-50" />
                <span className="text-sm font-medium text-text opacity-80">{user.tier}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
