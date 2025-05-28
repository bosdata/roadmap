import React from 'react';
import { Coins, TrendingUp, Flame, Award } from 'lucide-react';
import Card from '../UI/Card';
import { SavingsSummary } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface StatsSummaryProps {
  summary: SavingsSummary;
}

const StatsSummary: React.FC<StatsSummaryProps> = ({ summary }) => {
  const stats = [
    {
      label: 'Total Saved',
      value: formatCurrency(summary.totalSaved),
      icon: <Coins className="h-5 w-5 text-blue-500" />,
      color: 'bg-blue-50 border-blue-200',
      valueColor: 'text-blue-600'
    },
    {
      label: 'Daily Average',
      value: formatCurrency(summary.averagePerDay),
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      color: 'bg-green-50 border-green-200',
      valueColor: 'text-green-600'
    },
    {
      label: 'Current Streak',
      value: `${summary.streak} day${summary.streak !== 1 ? 's' : ''}`,
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      color: 'bg-orange-50 border-orange-200',
      valueColor: 'text-orange-600'
    },
    {
      label: 'Best Day',
      value: summary.bestDay.date ? 
        `${formatCurrency(summary.bestDay.amount)}` : 
        'No data yet',
      subtext: summary.bestDay.date ? 
        `on ${formatDate(summary.bestDay.date)}` : 
        '',
      icon: <Award className="h-5 w-5 text-purple-500" />,
      color: 'bg-purple-50 border-purple-200',
      valueColor: 'text-purple-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card 
          key={index}
          className={`${stat.color} border p-4 flex flex-col`}
        >
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-full bg-white shadow-sm">
              {stat.icon}
            </div>
            <span className="text-xs font-medium text-gray-500 uppercase">
              {stat.label}
            </span>
          </div>
          <div className="mt-2">
            <div className={`text-xl font-bold ${stat.valueColor}`}>
              {stat.value}
            </div>
            {stat.subtext && (
              <div className="text-xs text-gray-500 mt-1">
                {stat.subtext}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default StatsSummary;