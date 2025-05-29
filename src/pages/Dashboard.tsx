import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import MoodForm from '../components/MoodForm';
import MoodList from '../components/MoodList';
import WeeklyStats from '../components/WeeklyStats';
import AIAdviceCard from '../components/AIAdviceCard';
import { Smile } from 'lucide-react';

interface Entry {
  _id: string;
  mood: string;
  note: string;
  date: string;
}

interface MoodStats {
  Happy: number;
  Sad: number;
  Angry: number;
  Tired: number;
  Calm: number;
}

const Dashboard: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [stats, setStats] = useState<MoodStats | null>(null);
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const API_URL = 'http://localhost:5000/api';
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Configure headers with token
        const config = {
          headers: {
            'x-auth-token': token
          }
        };
        
        // Fetch entries
        const entriesRes = await axios.get(`${API_URL}/entries`, config);
        setEntries(entriesRes.data);
        
        // Fetch stats
        const statsRes = await axios.get(`${API_URL}/entries/stats`, config);
        setStats(statsRes.data);
        
        // Fetch AI advice
        const adviceRes = await axios.get(`${API_URL}/entries/ai-advice`, config);
        setAdvice(adviceRes.data.advice);
        
        setError(null);
      } catch (err: any) {
        setError('Error fetching data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [token]);
  
  const addEntry = async (mood: string, note: string) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      };
      
      const res = await axios.post(
        `${API_URL}/entries`,
        { mood, note },
        config
      );
      
      // Update entries list with new entry
      setEntries([res.data, ...entries]);
      
      // Refresh stats and advice
      const statsRes = await axios.get(`${API_URL}/entries/stats`, config);
      setStats(statsRes.data);
      
      const adviceRes = await axios.get(`${API_URL}/entries/ai-advice`, config);
      setAdvice(adviceRes.data.advice);
      
    } catch (err) {
      setError('Error adding entry. Please try again.');
      console.error(err);
    }
  };
  
  const deleteEntry = async (id: string) => {
    try {
      const config = {
        headers: {
          'x-auth-token': token
        }
      };
      
      await axios.delete(`${API_URL}/entries/${id}`, config);
      
      // Update entries list
      setEntries(entries.filter(entry => entry._id !== id));
      
      // Refresh stats and advice
      const statsRes = await axios.get(`${API_URL}/entries/stats`, config);
      setStats(statsRes.data);
      
      const adviceRes = await axios.get(`${API_URL}/entries/ai-advice`, config);
      setAdvice(adviceRes.data.advice);
      
    } catch (err) {
      setError('Error deleting entry. Please try again.');
      console.error(err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
          <Smile className="mr-2 text-blue-600" size={32} />
          Your Mood Dashboard
        </h1>
        <p className="text-gray-600">Track, analyze, and improve your emotional wellbeing</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <MoodForm onAddEntry={addEntry} />
        </div>
        <div>
          <AIAdviceCard advice={advice} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MoodList entries={entries} onDeleteEntry={deleteEntry} />
        </div>
        <div>
          {stats && <WeeklyStats stats={stats} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;