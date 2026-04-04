import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

// Mock data for preview when Supabase isn't connected
const MOCK_WORKS = [
  {
    id: '1',
    title: 'The Coffeehouse at the End of the World',
    content: 'The espresso machine hissed, a sound that usually brought comfort. Today, it sounded like a warning. Maria wiped down the counter, her eyes fixed on the red sky outside...',
    genre: 'Fiction',
    word_count: 1250,
    feedback_mode: 'cheer',
    users: { display_name: 'Elena Rostova', city: 'Seattle' }
  },
  {
    id: '2',
    title: 'Ode to the Concrete Jungle',
    content: 'Steel veins pulse with electric light,\nA million souls in the velvet night.\nWe walk alone, yet side by side,\nIn this grand, chaotic ride.',
    genre: 'Poetry',
    word_count: 45,
    feedback_mode: 'critique',
    users: { display_name: 'Marcus Chen', city: 'New York' }
  },
  {
    id: '3',
    title: 'Why Local Bookstores Matter',
    content: 'In an age of one-click delivery, the local bookstore remains a sanctuary. It is not just a place to buy paper and ink, but a community hub where ideas are exchanged...',
    genre: 'Essay',
    word_count: 850,
    feedback_mode: 'any',
    users: { display_name: 'Sarah Jenkins', city: 'Austin' }
  }
];

export function Feed() {
  const [works, setWorks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'global' | 'local'>('global');

  useEffect(() => {
    async function fetchWorks() {
      if (!isSupabaseConfigured) {
        setWorks(MOCK_WORKS);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('works')
          .select('*, users(display_name, city)')
          .eq('status', 'published')
          .order('created_at', { ascending: false })
          .limit(10);
          
        if (error) throw error;
        setWorks(data || []);
      } catch (error) {
        console.error('Error fetching works:', error);
        setWorks(MOCK_WORKS); // Fallback to mock data on error
      } finally {
        setLoading(false);
      }
    }

    fetchWorks();
  }, []);

  const generateQuoteCard = (work: any) => {
    alert(`Generating quote card for "${work.title}" by ${work.users?.display_name}... (Canvas generation logic runs here)`);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-playfair font-bold text-text">The Feed</h2>
        <div className="bg-surface rounded-full p-1 border border-border flex text-sm">
          <button 
            onClick={() => setFilter('global')}
            className={`px-4 py-1 rounded-full transition-colors ${filter === 'global' ? 'bg-accent text-white' : 'hover:bg-black/5 text-text'}`}
          >
            🌍 Global
          </button>
          <button 
            onClick={() => setFilter('local')}
            className={`px-4 py-1 rounded-full transition-colors ${filter === 'local' ? 'bg-accent text-white' : 'hover:bg-black/5 text-text'}`}
          >
            📍 Local
          </button>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="mb-6 p-4 bg-amber-100 text-amber-900 rounded-lg border border-amber-200 text-sm">
          <strong>Note:</strong> Supabase is not connected. Showing sample data. To connect your database, add your Supabase URL and Anon Key to the environment variables.
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {works.map((work) => (
            <div key={work.id} className="bg-surface p-6 rounded-xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col">
              <div className="absolute top-0 left-0 w-full h-1 bg-accent"></div>
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-medium px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-accent">
                  {work.genre || 'Story'}
                </span>
                <span className="text-xs opacity-60 text-text">{work.word_count || 0} words</span>
              </div>
              <h3 className="text-xl font-playfair font-bold mb-1 text-text">{work.title}</h3>
              <p className="text-sm opacity-70 mb-4 text-text">
                By {work.users?.display_name || 'Anonymous'} • {work.users?.city || 'Unknown'}
              </p>
              <p className="text-sm mb-6 line-clamp-4 text-text flex-1">
                {work.content}
              </p>
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  work.feedback_mode === 'cheer' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                  work.feedback_mode === 'critique' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' :
                  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                }`}>
                  {work.feedback_mode === 'cheer' ? '🎉 Cheer Me On' : 
                   work.feedback_mode === 'critique' ? '🔍 Critique Requested' : '✋ Any Feedback'}
                </span>
                <button 
                  onClick={() => generateQuoteCard(work)}
                  className="text-accent hover:underline text-sm font-medium"
                >
                  Share Quote
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
