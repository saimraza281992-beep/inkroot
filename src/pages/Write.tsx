import React, { useState, useEffect } from 'react';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';

export function Write() {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [genre, setGenre] = useState('Fiction');
  const [feedbackMode, setFeedbackMode] = useState('cheer');
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.prompt) {
      setContent(`[Prompt: ${location.state.prompt}]\n\n`);
    }
  }, [location.state]);

  const wordCount = content.trim().split(/\\s+/).filter(w => w.length > 0).length;

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Please provide a title and content.");
      return;
    }

    if (!isSupabaseConfigured) {
      alert("Supabase is not connected. In a real app, this would save to the database and award Lighthouse Points.");
      navigate('/');
      return;
    }

    setIsPublishing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert("You must be logged in to publish.");
        return;
      }

      const { error } = await supabase.from('works').insert([{
        author_id: user.id,
        title,
        content,
        genre,
        word_count: wordCount,
        status: 'published',
        feedback_mode: feedbackMode
      }]);

      if (error) throw error;
      
      // Navigate to feed on success
      navigate('/');
    } catch (error: any) {
      alert(`Error publishing: ${error.message}`);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-surface p-8 rounded-xl border border-border shadow-sm min-h-[75vh] flex flex-col">
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title" 
        className="w-full bg-transparent text-text text-4xl font-playfair font-bold border-none outline-none mb-6 placeholder-text/30"
      />
      
      <div className="flex gap-4 mb-6 border-b border-border pb-4">
        <select 
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="bg-transparent text-text border border-border rounded px-3 py-1 text-sm outline-none focus:border-accent"
        >
          <option value="Fiction">Fiction</option>
          <option value="Poetry">Poetry</option>
          <option value="Essay">Essay</option>
          <option value="Blog">Blog Post</option>
        </select>
        
        <select 
          value={feedbackMode}
          onChange={(e) => setFeedbackMode(e.target.value)}
          className="bg-transparent text-text border border-border rounded px-3 py-1 text-sm outline-none focus:border-accent"
        >
          <option value="cheer">🎉 Cheer Me On</option>
          <option value="critique">🔍 Critique Requested</option>
          <option value="any">✋ Any Feedback</option>
        </select>
      </div>
      
      <textarea 
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing..." 
        className="w-full flex-1 bg-transparent text-text border-none outline-none resize-none font-inter leading-relaxed placeholder-text/30"
      />
      
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
        <span className="text-sm opacity-60 text-text">{wordCount} words</span>
        <button 
          onClick={handlePublish}
          disabled={isPublishing}
          className="px-6 py-2 bg-accent text-white rounded font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPublishing ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  );
}
