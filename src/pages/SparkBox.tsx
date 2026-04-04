import React, { useState } from 'react';
import { Lightbulb, RefreshCw, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PROMPTS = [
  "Write about a character who discovers a hidden room in their childhood home, but the room contains things from their future.",
  "Start a story with the sentence: 'The clock struck thirteen, and that was only the beginning of our problems.'",
  "Describe a bustling city marketplace from the perspective of a stray cat.",
  "Write a dialogue between two people who are trying to hide a massive secret from each other, but both know the other's secret.",
  "A letter arrives 50 years late. Who is it from, and what does it change?",
  "Write about a world where people can trade memories like currency.",
  "Your protagonist finds a notebook where everything written in it becomes true, but only for 24 hours.",
  "Describe the taste of a memory.",
  "Write a scene where the weather perfectly contradicts the mood of the characters.",
  "A character wakes up with a skill they never learned. What is it, and how does it get them into trouble?"
];

export function SparkBox() {
  const [currentPrompt, setCurrentPrompt] = useState(PROMPTS[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const generatePrompt = () => {
    setIsAnimating(true);
    setTimeout(() => {
      let newPrompt;
      do {
        newPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
      } while (newPrompt === currentPrompt && PROMPTS.length > 1);
      setCurrentPrompt(newPrompt);
      setIsAnimating(false);
    }, 500);
  };

  const handleWrite = () => {
    // In a real app, we might pass the prompt to the write page via state
    navigate('/write', { state: { prompt: currentPrompt } });
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh]">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/10 text-accent mb-6">
          <Lightbulb size={40} />
        </div>
        <h1 className="text-5xl font-playfair font-bold text-text mb-4">Spark Box</h1>
        <p className="text-text opacity-80 text-xl max-w-2xl mx-auto">
          Hit a wall? Draw a random writing prompt to ignite your creativity and break through writer's block.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-surface border-2 border-accent/20 rounded-2xl p-8 md:p-12 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-accent to-accent-secondary"></div>
        
        <div className={`transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <p className="text-2xl md:text-3xl font-playfair text-text leading-relaxed text-center">
            "{currentPrompt}"
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-12">
        <button 
          onClick={generatePrompt}
          disabled={isAnimating}
          className="px-8 py-4 bg-surface border border-border text-text rounded-full font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={20} className={isAnimating ? 'animate-spin' : ''} />
          Draw Another
        </button>
        
        <button 
          onClick={handleWrite}
          className="px-8 py-4 bg-accent text-white rounded-full font-medium hover:bg-accent-secondary transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
        >
          <PenTool size={20} />
          Start Writing
        </button>
      </div>
    </div>
  );
}
