import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { BarChart } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MoodStats {
  Happy: number;
  Sad: number;
  Angry: number;
  Tired: number;
  Calm: number;
}

interface WeeklyStatsProps {
  stats: MoodStats;
}

const WeeklyStats: React.FC<WeeklyStatsProps> = ({ stats }) => {
  const chartData = {
    labels: Object.keys(stats),
    datasets: [
      {
        label: 'Mood Count',
        data: Object.values(stats),
        backgroundColor: [
          'rgba(255, 206, 86, 0.6)', // Happy - yellow
          'rgba(54, 162, 235, 0.6)', // Sad - blue
          'rgba(255, 99, 132, 0.6)', // Angry - red
          'rgba(153, 102, 255, 0.6)', // Tired - purple
          'rgba(75, 192, 192, 0.6)', // Calm - green
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  const totalEntries = Object.values(stats).reduce((sum, count) => sum + count, 0);
  const dominantMood = Object.entries(stats).reduce(
    (max, [mood, count]) => (count > max.count ? { mood, count } : max),
    { mood: '', count: -1 }
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-1">
        <BarChart className="text-blue-600 mr-2" size={24} />
        <h2 className="text-xl font-semibold">Weekly Mood Stats</h2>
      </div>
      
      {totalEntries === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No data available for the past week.</p>
          <p className="text-sm mt-2">Start tracking your mood to see statistics.</p>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <Bar data={chartData} options={options} />
          </div>
          
          <div className="space-y-2 text-sm">
            <p className="font-medium">Summary:</p>
            <p>Total entries this week: <span className="font-semibold">{totalEntries}</span></p>
            {dominantMood.mood && (
              <p>
                Most frequent mood: <span className="font-semibold">{dominantMood.mood}</span> 
                ({Math.round((dominantMood.count / totalEntries) * 100)}%)
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default WeeklyStats;