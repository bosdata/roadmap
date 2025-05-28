import React from 'react';
import StatsSummary from './StatsSummary';
import SavingsChart from './SavingsChart';
import EntryForm from '../Entries/EntryForm';
import EntryList from '../Entries/EntryList';
import GoalForm from '../Goals/GoalForm';
import GoalList from '../Goals/GoalList';
import { SavingEntry, SavingGoal, SavingsSummary } from '../../types';

interface DashboardProps {
  entries: SavingEntry[];
  goals: SavingGoal[];
  summary: SavingsSummary;
  onAddEntry: (entry: Omit<SavingEntry, 'id'>) => void;
  onUpdateEntry: (entry: SavingEntry) => void;
  onDeleteEntry: (id: string) => void;
  onAddGoal: (goal: Omit<SavingGoal, 'id' | 'currentAmount'>) => void;
  onUpdateGoal: (goal: SavingGoal) => void;
  onDeleteGoal: (id: string) => void;
  onContributeToGoal: (id: string, amount: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  entries,
  goals,
  summary,
  onAddEntry,
  onUpdateEntry,
  onDeleteEntry,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onContributeToGoal
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <StatsSummary summary={summary} />
      
      <SavingsChart entries={entries} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <EntryForm onAddEntry={onAddEntry} />
          <EntryList 
            entries={entries}
            onUpdateEntry={onUpdateEntry}
            onDeleteEntry={onDeleteEntry}
          />
        </div>
        
        <div>
          <GoalForm onAddGoal={onAddGoal} />
          <GoalList 
            goals={goals}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
            onContributeToGoal={onContributeToGoal}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;