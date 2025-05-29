import React, { useState, useEffect } from 'react';
import { Calendar, Search } from 'lucide-react';
import MoodList from '../components/MoodList';
import api from '../utils/api.cjs';
import { formatDate } from '../utils/dateUtils.cjs';

function History() {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  const fetchAllEntries = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.get('/entries');
      const sortedEntries = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setEntries(sortedEntries);
      setFilteredEntries(sortedEntries);
    } catch (error) {
      console.error('Error fetching all entries:', error);
      setError('Failed to load your mood history. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEntries();
  }, []);

  useEffect(() => {
    let result = [...entries];
    
    // Filter by search term (looks in notes)
    if (searchTerm) {
      result = result.filter(entry => 
        entry.note && entry.note.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by date
    if (dateFilter) {
      const filterDate = new Date(dateFilter).toDateString();
      result = result.filter(entry => 
        new Date(entry.date).toDateString() === filterDate
      );
    }
    
    setFilteredEntries(result);
  }, [searchTerm, dateFilter, entries]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Mood History</h1>
      </div>
      
      <div className="card bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search in notes..."
              className="form-input pl-10"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar size={18} className="text-gray-400" />
            </div>
            <input
              type="date"
              className="form-input pl-10"
              value={dateFilter}
              onChange={handleDateChange}
            />
          </div>
        </div>
        
        {(searchTerm || dateFilter) && (
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500 mr-2">
              {filteredEntries.length} results found
            </span>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-500 hover:text-primary-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
      
      <MoodList 
        entries={filteredEntries} 
        isLoading={isLoading} 
        error={error} 
      />
    </div>
  );
}

export default History;