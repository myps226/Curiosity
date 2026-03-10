
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Info } from 'lucide-react';
import { Category, Difficulty, CuriosityTopic, AIPromptResponse } from './types';
import { CATEGORIES, DIFFICULTIES, INITIAL_TOPICS } from './constants';
import BubbleSelector from './components/BubbleSelector';
import TopicSpinner from './components/TopicSpinner';
import TopicCard from './components/TopicCard';
import AIResultList from './components/AIResultList';
import { generateAICuriosity } from './services/geminiService';

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Random');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('Random');
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<CuriosityTopic | null>(null);
  const [aiResponse, setAiResponse] = useState<AIPromptResponse | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const handleSpin = () => {
    setIsSpinning(true);
    setAiResponse(null);
    setCurrentTopic(null);

    // Simulate mechanical delay
    setTimeout(() => {
      setIsSpinning(false);
      
      // Filter topics based on selection
      let pool = [...INITIAL_TOPICS];
      if (selectedCategory !== 'Random') {
        const filtered = pool.filter(t => t.category === selectedCategory);
        // If we have a match in our curated list, use it. 
        // Otherwise, create a thematic placeholder so the user isn't confused.
        if (filtered.length > 0) {
          pool = filtered;
        } else {
          // Fallback dynamic placeholder for demo purposes if static list is missing a category
          setCurrentTopic({
            id: 'dynamic-' + Date.now(),
            category: selectedCategory,
            question: `What is the most mysterious thing about ${selectedCategory}?`,
            prompts: [
              `How does ${selectedCategory} influence our daily lives?`,
              `What would happen if ${selectedCategory} suddenly changed?`,
              `Why is the history of ${selectedCategory} so complex?`,
              `What is a common myth about ${selectedCategory}?`,
              `How might ${selectedCategory} look 100 years from now?`,
              `Who are the leading pioneers in ${selectedCategory} today?`
            ],
            direction: "Explore the fundamental unknowns of this field.",
            activity: "Write down three things you think you know about this, then fact-check them."
          });
          return;
        }
      }
      
      const randomTopic = pool[Math.floor(Math.random() * pool.length)];
      setCurrentTopic(randomTopic);
    }, 2000);
  };

  const handleGenerateAI = async () => {
    if (!currentTopic) return;
    setIsLoadingAI(true);
    try {
      const res = await generateAICuriosity(selectedCategory, selectedDifficulty);
      setAiResponse(res);
    } catch (err) {
      alert("Oops! The curiosity machine hiccuped. Try again?");
    } finally {
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-20 overflow-x-hidden">
      {/* Header */}
      <header className="flex flex-col items-center py-12 text-center">
        <motion.div
          initial={{ rotate: -5, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          className="bg-[#2d2d2d] text-white px-8 py-4 wobbly-pill wobbly-shadow mb-6 flex items-center gap-3"
        >
          <Wand2 size={32} />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">CURIOSITY MACHINE</h1>
        </motion.div>
        <p className="max-w-md text-lg italic opacity-70">
          "Unfold the mysteries of the mundane and the magnificent."
        </p>
      </header>

      {/* Selectors - Added more spacing (mb-32) to prevent overlap with spinner when open */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-32 z-50 relative">
        <BubbleSelector 
          label="Topic" 
          options={CATEGORIES} 
          selected={selectedCategory} 
          onSelect={setSelectedCategory}
          color="bg-white"
        />
        <BubbleSelector 
          label="Depth" 
          options={DIFFICULTIES} 
          selected={selectedDifficulty} 
          onSelect={setSelectedDifficulty}
          color="bg-[#e5e0d8]"
        />
      </div>

      {/* Main Action Area */}
      <main className="flex flex-col items-center relative z-10">
        <TopicSpinner isSpinning={isSpinning} onSpin={handleSpin} />

        <AnimatePresence>
          {currentTopic && !isSpinning && (
            <div className="flex flex-col items-center w-full mt-8">
              <TopicCard 
                topic={currentTopic} 
                onGenerateAI={handleGenerateAI}
                isLoadingAI={isLoadingAI}
              />
              
              {aiResponse && (
                <AIResultList data={aiResponse} />
              )}
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* Decorative Hand-Drawn Elements */}
      <div className="fixed bottom-4 right-4 flex items-center gap-2 opacity-40 hover:opacity-100 transition-opacity z-0">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold leading-tight">STAY<br/>CURIOUS</p>
        </div>
        <div className="p-3 bg-white border-2 border-[#2d2d2d] wobbly-pill wobbly-shadow-sm">
          <Info size={20} />
        </div>
      </div>

      <div className="fixed top-20 left-10 pointer-events-none opacity-10 hidden lg:block">
        <svg width="200" height="200" viewBox="0 0 200 200">
          <path d="M20,100 C20,20 180,20 180,100 C180,180 20,180 20,100" stroke="#2d2d2d" strokeWidth="3" fill="none" strokeDasharray="5,5" />
        </svg>
      </div>
      <div className="fixed bottom-20 right-20 pointer-events-none opacity-10 hidden lg:block">
         <svg width="150" height="150" viewBox="0 0 100 100">
          <rect x="10" y="10" width="80" height="80" rx="10" stroke="#2d2d2d" strokeWidth="2" fill="none" transform="rotate(15, 50, 50)" />
          <rect x="20" y="20" width="60" height="60" rx="5" stroke="#2d2d2d" strokeWidth="2" fill="none" transform="rotate(-10, 50, 50)" />
        </svg>
      </div>
    </div>
  );
};

export default App;
