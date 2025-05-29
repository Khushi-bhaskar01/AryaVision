import { useState, useEffect } from 'react';
import WeeklyStats from '../components/WeeklyStats';
import api from '../utils/api.cjs';

function Stats() {
  const [weeklyStats, setWeeklyStats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/entries/stats');
      setWeeklyStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setError('Failed to load mood statistics. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Helper function to get the week range (Sunday to Saturday)
  const getWeekRange = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 6 = Saturday
    
    // Calculate the date of the Sunday that starts the current week
    const startDate = new Date(now);
    startDate.setDate(now.getDate() - dayOfWeek);
    
    // Calculate the date of the Saturday that ends the current week
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    // Format the dates
    const formatDate = (date) => {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };
    
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood Statistics</h1>
        <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Week of {getWeekRange()}
        </div>
      </div>
      
      <WeeklyStats 
        stats={weeklyStats} 
        isLoading={isLoading} 
        error={error} 
      />
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Mood Insights</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-primary-700 mb-3">What Your Moods Tell You</h3>
            <p className="text-gray-700">
              Your mood patterns can reveal valuable insights about your emotional well-being. Look for 
              trends and triggers that might be affecting how you feel throughout the week.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-primary-700 mb-3">How to Use This Data</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>Identify patterns:</strong> Notice if certain days or activities consistently
                affect your mood.
              </li>
              <li>
                <strong>Connect the dots:</strong> Look for correlations between your notes and your mood states.
              </li>
              <li>
                <strong>Take action:</strong> Use these insights to make small changes that could improve your
                emotional well-being.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;