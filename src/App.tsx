import { useState } from 'react';
import MoodForm from './components/MoodForm';
import MoodList from './components/MoodList';
import WeeklyStats from './components/WeeklyStats';
import AIAdviceCard from './components/AIAdviceCard';
import { SmilePlus, Code} from 'lucide-react';
import { motion } from 'framer-motion';

interface Entry {
  _id: string;
  mood: string;
  note: string;
  date: string;
}

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);

  const handleAddEntry = (mood: string, note: string) => {
    const newEntry: Entry = {
      _id: Date.now().toString(),
      mood,
      note,
      date: new Date().toISOString(),
    };
    setEntries(prev => [...prev, newEntry]);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry._id !== id));
  };

  const calculateStats = (entries: Entry[]) => {
    const stats = {
      Happy: 0,
      Sad: 0,
      Angry: 0,
      Tired: 0,
      Calm: 0,
    };

    for (const entry of entries) {
      if (stats[entry.mood as keyof typeof stats] !== undefined) {
        stats[entry.mood as keyof typeof stats]++;
      }
    }

    return stats;
  };

  const stats = calculateStats(entries);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-cyan-900 text-slate-900">
      <nav className="bg-black/30 backdrop-blur-lg border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <SmilePlus className="text-cyan-400" size={24} />
              <Code className="text-purple-400" size={24} />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-200 text-transparent bg-clip-text">
              MoodMate
            </span>
          </motion.div>
        </div>
      </nav>
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="lg:col-span-2">
            <MoodForm onAddEntry={handleAddEntry} />
          </div>
          <div>
            <AIAdviceCard advice={''} />
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
           
          <div className="lg:col-span-2">
            <MoodList entries={entries} onDeleteEntry={handleDeleteEntry} />
          </div>
          <div>
            <WeeklyStats stats={stats} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
