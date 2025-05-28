import React, { useState, useEffect } from 'react';
import { BookOpen, Brain, Code, Database, FileSpreadsheet, GraduationCap, BarChart } from 'lucide-react';
import { roadmapData } from './data/roadmapData';
import { CourseProgress, LearningDay, RoadmapSection } from './types';
import ProgressTracker from './components/ProgressTracker';

function App() {
  const [selectedCourse, setSelectedCourse] = useState<'python' | 'sql' | 'tableau'>('python');
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [progress, setProgress] = useState<CourseProgress>(() => {
    const saved = localStorage.getItem('learningProgress');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      python: Array.from({ length: 90 }, (_, i) => ({
        id: i + 1,
        date: '',
        completed: false
      })),
      sql: Array.from({ length: 30 }, (_, i) => ({
        id: i + 91,
        date: '',
        completed: false
      })),
      tableau: Array.from({ length: 30 }, (_, i) => ({
        id: i + 121,
        date: '',
        completed: false
      }))
    };
  });

  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  const toggleDayCompletion = (dayId: number) => {
    setProgress(prev => ({
      ...prev,
      [selectedCourse]: prev[selectedCourse].map(day => 
        day.id === dayId 
          ? { ...day, completed: !day.completed, date: !day.completed ? new Date().toISOString() : '' }
          : day
      )
    }));
  };

  const getIcon = (topic: string) => {
    const icons = {
      'Python': Code,
      'SQL': Database,
      'Tableau': BarChart,
      'Data Analysis': Brain,
      'Projects': BookOpen,
      'Interview Prep': GraduationCap,
      'Visualization': FileSpreadsheet
    };
    
    const IconComponent = icons[topic as keyof typeof icons] || Brain;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <header className="bg-[#111111] shadow-lg border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-5xl font-bold bosdata-title bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            BOSDATA ANALYTICS
          </h1>
          <p className="mt-2 text-gray-400">Your journey to becoming a data analyst</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <ProgressTracker progress={progress} />

        <div className="bg-[#111111] rounded-xl shadow-xl border border-[#222222] p-6">
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setSelectedCourse('python')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                selectedCourse === 'python' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]'
              }`}
            >
              <Code className="w-5 h-5" />
              <span>Python (90 Days)</span>
            </button>
            <button
              onClick={() => setSelectedCourse('sql')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                selectedCourse === 'sql' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]'
              }`}
            >
              <Database className="w-5 h-5" />
              <span>SQL/Access (30 Days)</span>
            </button>
            <button
              onClick={() => setSelectedCourse('tableau')}
              className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-200 ${
                selectedCourse === 'tableau' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-[#1a1a1a] text-gray-300 hover:bg-[#222222]'
              }`}
            >
              <BarChart className="w-5 h-5" />
              <span>Tableau (30 Days)</span>
            </button>
          </div>

          <div className="space-y-4">
            {roadmapData[selectedCourse].map((section: RoadmapSection) => (
              <div key={section.id} className="border border-[#222222] rounded-lg p-4 bg-[#1a1a1a]">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => setSelectedDay(selectedDay === section.id ? null : section.id)}
                >
                  <div className="flex items-center space-x-3">
                    {getIcon(section.topic)}
                    <div>
                      <h3 className="font-semibold text-gray-200">Day {section.day}: {section.topic}</h3>
                      <p className="text-sm text-gray-400">{section.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={progress[selectedCourse][section.day - 1].completed}
                        onChange={() => toggleDayCompletion(section.id)}
                        className="w-5 h-5 rounded text-blue-500 focus:ring-blue-500 bg-[#222222] border-[#333333]"
                      />
                      <span className="text-sm text-gray-400">Mark as completed</span>
                    </label>
                    <span className="text-gray-500">{selectedDay === section.id ? '−' : '+'}</span>
                  </div>
                </div>

                {selectedDay === section.id && (
                  <div className="mt-4 pl-8">
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-200 mb-2">Learning Objectives:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-400">
                        {section.objectives.map((objective, index) => (
                          <li key={index}>{objective}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-200 mb-2">Resources:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-400">
                        {section.resources.map((resource, index) => (
                          <li key={index}>{resource}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-200 mb-2">Practice Exercises:</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-400">
                        {section.practice.map((exercise, index) => (
                          <li key={index}>{exercise}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;