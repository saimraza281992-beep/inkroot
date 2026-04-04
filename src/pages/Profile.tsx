import React, { useState } from 'react';
import { User, Settings, MapPin, Calendar, BookOpen, Award, Edit3, PenTool } from 'lucide-react';

export function Profile() {
  const [activeTab, setActiveTab] = useState<'works' | 'saved' | 'stats'>('works');

  return (
    <div className="max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-surface border border-border rounded-2xl p-8 mb-8 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-accent/20 to-accent-secondary/20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-end mt-12">
          <div className="w-32 h-32 rounded-full bg-accent text-white flex items-center justify-center text-4xl font-bold border-4 border-surface shadow-md shrink-0">
            FA
          </div>
          
          <div className="flex-1">
            <h1 className="text-4xl font-playfair font-bold text-text mb-2">Faez Ahmad</h1>
            <p className="text-text opacity-80 text-lg mb-4 max-w-2xl">
              Exploring the intersection of memory and place. Writing mostly fiction and occasional essays.
            </p>
            
            <div className="flex flex-wrap gap-4 text-sm text-text opacity-70">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>Joined April 2026</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors flex items-center justify-center gap-2">
              <Edit3 size={18} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-1">12</div>
          <div className="text-sm text-text opacity-70 uppercase tracking-wider font-bold">Published</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-1">4.8k</div>
          <div className="text-sm text-text opacity-70 uppercase tracking-wider font-bold">Words Written</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-1">340</div>
          <div className="text-sm text-text opacity-70 uppercase tracking-wider font-bold">Lighthouse Pts</div>
        </div>
        <div className="bg-surface border border-border rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-accent mb-1">Seeker</div>
          <div className="text-sm text-text opacity-70 uppercase tracking-wider font-bold">Current Tier</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border mb-8">
        {(['works', 'saved', 'stats'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 font-medium capitalize transition-colors border-b-2 ${
              activeTab === tab 
                ? 'border-accent text-accent' 
                : 'border-transparent text-text opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[40vh]">
        {activeTab === 'works' && (
          <div className="text-center py-12 bg-surface border border-border rounded-xl border-dashed">
            <BookOpen size={48} className="mx-auto text-text opacity-20 mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">No works published yet</h3>
            <p className="text-text opacity-60 mb-6">Your published stories and essays will appear here.</p>
            <button className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors inline-flex items-center gap-2">
              <PenTool size={18} />
              Start Writing
            </button>
          </div>
        )}
        
        {activeTab === 'saved' && (
          <div className="text-center py-12 bg-surface border border-border rounded-xl border-dashed">
            <h3 className="text-xl font-bold text-text mb-2">No saved works</h3>
            <p className="text-text opacity-60">Works you bookmark will be saved here for later reading.</p>
          </div>
        )}
        
        {activeTab === 'stats' && (
          <div className="text-center py-12 bg-surface border border-border rounded-xl border-dashed">
            <Award size={48} className="mx-auto text-text opacity-20 mb-4" />
            <h3 className="text-xl font-bold text-text mb-2">Detailed statistics coming soon</h3>
            <p className="text-text opacity-60">Track your writing habits, popular genres, and reader engagement.</p>
          </div>
        )}
      </div>
    </div>
  );
}
