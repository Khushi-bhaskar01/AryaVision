import React, { useState } from 'react';
import { SmilePlus, Smile, Frown, Angry, Moon, Sun } from 'lucide-react';

interface MoodFormProps {
  onAddEntry: (mood: string, note: string) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onAddEntry }) => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  
  const moods = [
    { value: 'Happy', icon: <Smile className="text-yellow-500\" size={24} />, color: 'bg-yellow-100 border-yellow-300' },
    { value: 'Sad', icon: <Frown className="text-blue-500" size={24} />, color: 'bg-blue-100 border-blue-300' },
    { value: 'Angry', icon: <Angry className="text-red-500\" size={24} />, color: 'bg-red-100 border-red-300' },
    { value: 'Tired', icon: <Moon className="text-purple-500" size={24} />, color: 'bg-purple-100 border-purple-300' },
    { value: 'Calm', icon: <Sun className="text-green-500\" size={24} />, color: 'bg-green-100 border-green-300' }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) {
      return;
    }
    
    setSubmitting(true);
    
    try {
      onAddEntry(selectedMood, note);
      setSelectedMood('');
      setNote('');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <SmilePlus className="text-blue-600 mr-2" size={24} />
        <h2 className="text-xl font-semibold">How are you feeling today?</h2>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Select your mood:
          </label>
          <div className="flex flex-wrap gap-3">
            {moods.map(mood => (
              <button
                key={mood.value}
                type="button"
                className={`flex items-center px-4 py-2 rounded-full border ${
                  selectedMood === mood.value
                    ? `${mood.color} border-2`
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                } transition-colors`}
                onClick={() => setSelectedMood(mood.value)}
              >
                {mood.icon}
                <span className="ml-2">{mood.value}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <label htmlFor="note" className="block text-gray-700 font-medium mb-2">
            Add a note (optional):
          </label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={3}
            placeholder="What's making you feel this way?"
          ></textarea>
        </div>
        
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
          disabled={!selectedMood || submitting}
        >
          {submitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            'Save Mood'
          )}
        </button>
      </form>
    </div>
  );
};

export default MoodForm;