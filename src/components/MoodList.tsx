import React from 'react';
import { formatDistanceToNow } from '../utils/dateUtils';
import { Smile, Frown, Angry, Moon, Sun, Trash2 } from 'lucide-react';

interface Entry {
  _id: string;
  mood: string;
  note: string;
  date: string;
}

interface MoodListProps {
  entries: Entry[];
  onDeleteEntry: (id: string) => void;
}

const MoodList: React.FC<MoodListProps> = ({ entries, onDeleteEntry }) => {
  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'Happy':
        return <Smile className="text-yellow-500\" size={20} />;
      case 'Sad':
        return <Frown className="text-blue-500" size={20} />;
      case 'Angry':
        return <Angry className="text-red-500" size={20} />;
      case 'Tired':
        return <Moon className="text-purple-500" size={20} />;
      case 'Calm':
        return <Sun className="text-green-500" size={20} />;
      default:
        return <Smile className="text-gray-500" size={20} />;
    }
  };
  
  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'Happy':
        return 'bg-yellow-50 border-yellow-200';
      case 'Sad':
        return 'bg-blue-50 border-blue-200';
      case 'Angry':
        return 'bg-red-50 border-red-200';
      case 'Tired':
        return 'bg-purple-50 border-purple-200';
      case 'Calm':
        return 'bg-green-50 border-green-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }

  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Mood History</h2>
      
      {entries.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No mood entries yet. Start tracking your mood!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {entries.map(entry => (
            <div 
              key={entry._id} 
              className={`border rounded-lg p-4 ${getMoodColor(entry.mood)}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center">
                  {getMoodIcon(entry.mood)}
                  <span className="ml-2 font-medium">{entry.mood}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">
                    {formatDistanceToNow(new Date(entry.date))}
                  </span>
                  <button 
                    onClick={() => onDeleteEntry(entry._id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Delete entry"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              {entry.note && (
                <div className="mt-2 text-gray-700">
                  {entry.note}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoodList;