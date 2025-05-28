import React, { useMemo } from 'react';
import { SavingEntry } from '../../types';
import { formatShortDate, formatCurrency } from '../../utils/formatters';
import { BarChart } from 'lucide-react';

interface SavingsChartProps {
  entries: SavingEntry[];
  days?: number;
}

const SavingsChart: React.FC<SavingsChartProps> = ({ entries, days = 7 }) => {
  const chartData = useMemo(() => {
    // Get the date range
    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days + 1);
    startDate.setHours(0, 0, 0, 0);
    
    // Create an array of all dates in the range
    const dateArray: { date: Date; dateString: string; total: number }[] = [];
    
    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      
      dateArray.push({
        date: new Date(currentDate),
        dateString,
        total: 0
      });
    }
    
    // Sum savings for each date
    entries.forEach(entry => {
      const entryDate = new Date(entry.date);
      
      // Check if the entry is within our date range
      if (entryDate >= startDate && entryDate <= today) {
        const dateString = entry.date;
        
        const dateItem = dateArray.find(item => item.dateString === dateString);
        if (dateItem) {
          dateItem.total += entry.amount;
        }
      }
    });
    
    return dateArray;
  }, [entries, days]);
  
  // Find the maximum value for scaling
  const maxValue = useMemo(() => {
    return Math.max(...chartData.map(item => item.total), 10);
  }, [chartData]);

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center mb-4">
        <BarChart className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Recent Savings</h2>
      </div>
      
      <div className="h-64">
        <div className="flex h-full items-end">
          {chartData.map((item, index) => {
            const height = item.total > 0 ? (item.total / maxValue) * 100 : 0;
            
            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center justify-end h-full"
              >
                <div className="relative group w-full flex justify-center">
                  <div
                    className={`w-3/4 bg-blue-400 rounded-t transition-all duration-500 ease-out ${
                      item.total > 0 ? 'hover:bg-blue-500' : 'bg-gray-200'
                    }`}
                    style={{ height: `${height}%` }}
                  ></div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none whitespace-nowrap">
                    {formatCurrency(item.total)}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2 w-full text-center">
                  {formatShortDate(item.dateString)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SavingsChart;