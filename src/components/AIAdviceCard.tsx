
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';

interface MoodEntry {
  mood: string;
  note?: string;
  date: string;
}

const adviceLibrary: Record<string, string[]> = {
  happy: [
    "Your positive energy is valuable - consider channeling it into a creative project.",
    "Share your happiness with someone who might need encouragement today."
  ],
  sad: [
    "Remember that feelings are temporary - be gentle with yourself.",
    "A short walk outside might help shift your perspective."
  ],
  angry: [
    "Try taking three deep breaths before responding to frustrating situations.",
    "Physical activity can help release angry energy in a healthy way."
  ],
  calm: [
    "Your calm mindset is a strength - use it to approach challenges thoughtfully.",
    "Consider journaling to reflect on what's contributing to your peaceful state."
  ],
  tired: [
    "Listen to your body's need for rest - even short breaks can help.",
    "Hydration and a quick stretch might help revive your energy."
  ],
  default: [
    "Reflect on what you need most right now and honor that need.",
    "Small acts of self-care can make a big difference in your day."
  ]
};

const getFallbackAdvice = (entries: MoodEntry[]): string => {
  if (!entries || entries.length === 0) {
    const defaultOptions = adviceLibrary.default;
    return defaultOptions[Math.floor(Math.random() * defaultOptions.length)];
  }

  const moodCounts = entries.reduce((counts: Record<string, number>, entry) => {
    counts[entry.mood] = (counts[entry.mood] || 0) + 1;
    return counts;
  }, {});

  const mostFrequentMood = Object.entries(moodCounts).reduce(
    (max, [mood, count]) => count > max.count ? { mood, count } : max,
    { mood: 'calm', count: 0 }
  ).mood;

  const adviceOptions = adviceLibrary[mostFrequentMood] || adviceLibrary.default;
  return adviceOptions[Math.floor(Math.random() * adviceOptions.length)];
};

/* 
// Commented out API/AI integration
const generateAIAdvice = async (entries: MoodEntry[]): Promise<string> => {
  // This would call the OpenAI API in a real implementation
  return getFallbackAdvice(entries);
};
*/

function AIAdviceCard() {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Set to false since we're not doing API calls
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data instead of API call
  const mockMoodEntries: MoodEntry[] = [
    { mood: 'happy', date: new Date().toISOString() },
    { mood: 'calm', date: new Date().toISOString() }
  ];

  const fetchAdvice = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // const response = await api.get('/entries/recent');
      // const recentEntries: MoodEntry[] = response.data.entries;
      
      // Using mock data instead
      const aiAdvice = getFallbackAdvice(mockMoodEntries);
      setAdvice(aiAdvice);
    } catch (error) {
      console.error('Error:', error);
      setError('Could not load advice. Using default suggestions.');
      setAdvice(getFallbackAdvice([]));
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchAdvice();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <motion.div 
      className="card bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center text-primary-700">
          <Sparkles size={18} className="mr-2" />
          Mood Insight
        </h3>
        
        <button 
          onClick={handleRefresh} 
          disabled={isLoading || isRefreshing}
          className="p-1 rounded-full hover:bg-primary-200 transition-colors disabled:opacity-50"
          title="Get new advice"
        >
          <RefreshCw size={16} className={`text-primary-600 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>
      
      {isLoading ? (
        <div className="animate-pulse space-y-2 py-2">
          <div className="h-4 bg-primary-200 rounded w-full"></div>
          <div className="h-4 bg-primary-200 rounded w-5/6"></div>
          <div className="h-4 bg-primary-200 rounded w-4/6"></div>
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <blockquote className="text-primary-800 italic border-l-4 border-primary-300 pl-3 py-1">
          "{advice}"
        </blockquote>
      )}
      
      <div className="mt-4 text-xs text-primary-600 text-right">
        Based on mood patterns
      </div>
    </motion.div>
  );
}

export default AIAdviceCard;