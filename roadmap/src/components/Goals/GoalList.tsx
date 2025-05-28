import React from 'react';
import { SavingGoal } from '../../types';
import GoalItem from './GoalItem';
import { Target } from 'lucide-react';

interface GoalListProps {
  goals: SavingGoal[];
  onUpdateGoal: (goal: SavingGoal) => void;
  onDeleteGoal: (id: string) => void;
  onContributeToGoal: (id: string, amount: number) => void;
}

const GoalList: React.FC<GoalListProps> = ({
  goals,
  onUpdateGoal,
  onDeleteGoal,
  onContributeToGoal
}) => {
  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <Target className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">No savings goals yet</h3>
        <p className="text-gray-500 mt-2">Create a goal to track your progress!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <Target className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Your Savings Goals</h2>
      </div>
      
      <div className="space-y-3">
        {goals.map(goal => (
          <GoalItem
            key={goal.id}
            goal={goal}
            onUpdate={onUpdateGoal}
            onDelete={onDeleteGoal}
            onContribute={onContributeToGoal}
          />
        ))}
      </div>
    </div>
  );
};

export default GoalList;