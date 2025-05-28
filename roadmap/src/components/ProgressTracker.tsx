import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CourseProgress } from '../types';

interface ProgressTrackerProps {
  progress: CourseProgress;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ progress }) => {
  const calculateProgress = (days: any[]) => {
    return (days.filter(day => day.completed).length / days.length) * 100;
  };

  const progressData = [
    {
      name: 'Python',
      progress: calculateProgress(progress.python),
      total: 90,
      completed: progress.python.filter(day => day.completed).length
    },
    {
      name: 'SQL/Access',
      progress: calculateProgress(progress.sql),
      total: 30,
      completed: progress.sql.filter(day => day.completed).length
    },
    {
      name: 'Tableau',
      progress: calculateProgress(progress.tableau),
      total: 30,
      completed: progress.tableau.filter(day => day.completed).length
    }
  ];

  return (
    <div className="bg-[#111111] rounded-xl shadow-xl border border-[#222222] p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-200">Learning Progress</h2>
      
      <div className="h-[300px] mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
            <XAxis dataKey="name" stroke="#666666" />
            <YAxis domain={[0, 100]} stroke="#666666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1a1a1a',
                border: '1px solid #333333',
                borderRadius: '0.5rem',
                color: '#ffffff'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="progress" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="Progress (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {progressData.map((course) => (
          <div 
            key={course.name}
            className="bg-[#1a1a1a] rounded-lg p-4 border border-[#222222]"
          >
            <h3 className="font-semibold text-lg mb-2 text-gray-200">{course.name}</h3>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Completed: {course.completed}/{course.total} days</span>
              <span>{Math.round(course.progress)}%</span>
            </div>
            <div className="w-full h-2 bg-[#222222] rounded-full mt-2">
              <div 
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;