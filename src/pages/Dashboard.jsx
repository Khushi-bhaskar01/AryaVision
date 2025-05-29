import React, { useState, useEffect } from 'react';
import MoodForm from '../components/MoodForm';
import MoodList from '../components/MoodList';
import AIAdviceCard from '../components/AIAdviceCard';
import api from "../utils/api.cjs";


function Dashboard() {
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEntries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/entries');
      // Sort by date (newest first) and limit to 5 most recent entries
      const sortedEntries = response.data
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);
      
      setEntries(sortedEntries);
    } catch (error) {
      console.error('Error fetching entries:', error);
      setError('Failed to load your mood entries. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleMoodAdded = (newEntry) => {
    // Add the new entry to the beginning of the list
    setEntries(prevEntries => [newEntry, ...prevEntries.slice(0, 4)]);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <MoodForm onMoodAdded={handleMoodAdded} />
        </div>
        <div>
          <AIAdviceCard />
        </div>
      </div>
      
      <div>
        <MoodList 
          entries={entries} 
          isLoading={isLoading} 
          error={error} 
        />
      </div>
    </div>
  );
}

export default Dashboard;