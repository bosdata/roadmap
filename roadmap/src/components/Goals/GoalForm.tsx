import React, { useState } from 'react';
import { Target } from 'lucide-react';
import Input from '../UI/Input';
import Button from '../UI/Button';

interface GoalFormProps {
  onAddGoal: (goal: { name: string; targetAmount: number; deadline: string }) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onAddGoal }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState<number>(0);
  const [deadline, setDeadline] = useState('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (targetAmount <= 0) {
      setError('Target amount must be greater than 0');
      return;
    }
    
    onAddGoal({ name, targetAmount, deadline });
    
    // Reset form
    setName('');
    setTargetAmount(0);
    setDeadline('');
    setError('');
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center mb-4">
        <Target className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Create New Goal</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="name"
          label="Goal Name"
          placeholder="e.g., New Laptop"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <Input
          id="targetAmount"
          label="Target Amount"
          type="number"
          placeholder="0.00"
          value={targetAmount}
          onChange={(e) => setTargetAmount(parseFloat(e.target.value) || 0)}
          step="0.01"
          min="0.01"
          required
          error={error}
        />
      </div>
      
      <div className="mt-4">
        <Input
          id="deadline"
          label="Target Date (Optional)"
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          min={getMinDate()}
        />
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Create Goal
        </Button>
      </div>
    </form>
  );
};

export default GoalForm;