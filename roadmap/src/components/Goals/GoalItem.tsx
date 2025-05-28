import React, { useState } from 'react';
import { Edit, Trash2, Check, X, PlusCircle } from 'lucide-react';
import { SavingGoal } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Button from '../UI/Button';
import Input from '../UI/Input';
import { getGoalProgress } from '../../utils/calculations';

interface GoalItemProps {
  goal: SavingGoal;
  onUpdate: (goal: SavingGoal) => void;
  onDelete: (id: string) => void;
  onContribute: (id: string, amount: number) => void;
}

const GoalItem: React.FC<GoalItemProps> = ({
  goal,
  onUpdate,
  onDelete,
  onContribute
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedGoal, setEditedGoal] = useState<SavingGoal>(goal);
  const [contributionAmount, setContributionAmount] = useState<number>(0);
  const [isContributing, setIsContributing] = useState(false);
  const [error, setError] = useState<string>('');

  const progress = getGoalProgress(goal.currentAmount, goal.targetAmount);
  const isCompleted = goal.currentAmount >= goal.targetAmount;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedGoal(goal);
    setError('');
  };

  const handleSave = () => {
    if (editedGoal.targetAmount <= 0) {
      setError('Target amount must be greater than 0');
      return;
    }
    
    onUpdate(editedGoal);
    setIsEditing(false);
    setError('');
  };

  const handleContributeClick = () => {
    setIsContributing(true);
  };

  const handleContributeCancel = () => {
    setIsContributing(false);
    setContributionAmount(0);
  };

  const handleContributeSubmit = () => {
    if (contributionAmount <= 0) {
      return;
    }
    
    onContribute(goal.id, contributionAmount);
    setIsContributing(false);
    setContributionAmount(0);
  };

  const getDaysRemaining = (): string => {
    if (!goal.deadline) return 'No deadline';
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const deadlineDate = new Date(goal.deadline);
    deadlineDate.setHours(0, 0, 0, 0);
    
    if (deadlineDate < today) {
      return 'Deadline passed';
    }
    
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return `${daysDiff} day${daysDiff !== 1 ? 's' : ''} left`;
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md mb-4">
        <Input
          id={`name-${goal.id}`}
          label="Goal Name"
          value={editedGoal.name}
          onChange={(e) => setEditedGoal({
            ...editedGoal,
            name: e.target.value
          })}
          required
        />
        
        <Input
          id={`targetAmount-${goal.id}`}
          label="Target Amount"
          type="number"
          value={editedGoal.targetAmount}
          onChange={(e) => setEditedGoal({
            ...editedGoal,
            targetAmount: parseFloat(e.target.value) || 0
          })}
          step="0.01"
          min="0.01"
          required
          error={error}
        />
        
        <Input
          id={`deadline-${goal.id}`}
          label="Target Date (Optional)"
          type="date"
          value={editedGoal.deadline || ''}
          onChange={(e) => setEditedGoal({
            ...editedGoal,
            deadline: e.target.value
          })}
        />
        
        <div className="mt-4 flex justify-end space-x-2">
          <Button
            variant="success"
            size="sm"
            onClick={handleSave}
          >
            <Check className="h-4 w-4 mr-1" />
            Save
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleCancel}
          >
            <X className="h-4 w-4 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md mb-4 
      ${isCompleted ? 'border-green-300 bg-green-50' : 'border-gray-200'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{goal.name}</h3>
          <div className="flex flex-wrap items-center mt-1 space-x-4">
            <span className="text-sm text-gray-600">
              {formatCurrency(goal.currentAmount)} of {formatCurrency(goal.targetAmount)}
            </span>
            {goal.deadline && (
              <span className="text-sm text-gray-600">
                {getDaysRemaining()}
              </span>
            )}
          </div>
        </div>
        
        {!isContributing && (
          <div className="flex items-center space-x-2">
            {!isCompleted && (
              <Button
                variant="success"
                size="sm"
                onClick={handleContributeClick}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(goal.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
      
      {isContributing ? (
        <div className="mt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <Input
                id={`contribution-${goal.id}`}
                label="Contribution Amount"
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(parseFloat(e.target.value) || 0)}
                step="0.01"
                min="0.01"
                required
              />
            </div>
            <div className="flex space-x-2 self-end mb-4">
              <Button
                variant="success"
                size="sm"
                onClick={handleContributeSubmit}
                disabled={contributionAmount <= 0}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleContributeCancel}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4">
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'} transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">{Math.round(progress)}% complete</span>
            {isCompleted && (
              <span className="text-xs font-medium text-green-600">Goal Achieved!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalItem;