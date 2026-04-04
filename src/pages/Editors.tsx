import React, { useState } from 'react';
import { Search, Star, MessageSquare } from 'lucide-react';

const MOCK_EDITORS = [
  { id: 1, name: 'Elena Rostova', role: 'Senior Editor', rating: 4.9, reviews: 124, specialties: ['Fiction', 'Fantasy', 'Romance'], bio: '10+ years of experience helping authors find their voice. I specialize in world-building and character arcs.' },
  { id: 2, name: 'Marcus Chen', role: 'Copy Editor', rating: 4.8, reviews: 89, specialties: ['Non-fiction', 'Memoir', 'Sci-Fi'], bio: 'Meticulous attention to detail. I will polish your prose until it shines without losing your unique style.' },
  { id: 3, name: 'Sarah Jenkins', role: 'Developmental Editor', rating: 5.0, reviews: 42, specialties: ['Mystery', 'Thriller', 'Historical'], bio: "Plot holes? Pacing issues? I am your structural mechanic. Let's build a story that keeps readers up all night." },
  { id: 4, name: 'David Okafor', role: 'Proofreader', rating: 4.7, reviews: 215, specialties: ['All Genres', 'Academic', 'Poetry'], bio: 'The final set of eyes before you publish. I catch the typos that everyone else misses.' }
];

export function Editors() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEditors = MOCK_EDITORS.filter(editor => 
    editor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    editor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-text mb-4">Editor Directory</h1>
        <p className="text-text opacity-80 text-lg max-w-2xl">
          Find the perfect collaborator to elevate your writing. Our community of editors offers developmental editing, copy editing, and proofreading services.
        </p>
      </div>

      <div className="mb-8 relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-text opacity-50" />
        </div>
        <input
          type="text"
          placeholder="Search by name or specialty (e.g., 'Fiction', 'Fantasy')..."
          className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text focus:outline-none focus:ring-2 focus:ring-accent/50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEditors.map((editor) => (
          <div key={editor.id} className="bg-surface border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-text">{editor.name}</h3>
                <p className="text-accent font-medium">{editor.role}</p>
              </div>
              <div className="flex items-center gap-1 bg-accent/10 px-2 py-1 rounded text-accent">
                <Star size={16} className="fill-accent" />
                <span className="font-bold">{editor.rating}</span>
                <span className="text-xs opacity-70">({editor.reviews})</span>
              </div>
            </div>
            
            <p className="text-text opacity-80 mb-4 line-clamp-2">{editor.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {editor.specialties.map((specialty, idx) => (
                <span key={idx} className="px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-xs text-text opacity-80">
                  {specialty}
                </span>
              ))}
            </div>
            
            <button className="w-full py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent-secondary transition-colors flex items-center justify-center gap-2">
              <MessageSquare size={18} />
              Request Collaboration
            </button>
          </div>
        ))}
      </div>
      
      {filteredEditors.length === 0 && (
        <div className="text-center py-12">
          <p className="text-text opacity-60 text-lg">No editors found matching your search.</p>
        </div>
      )}
    </div>
  );
}
