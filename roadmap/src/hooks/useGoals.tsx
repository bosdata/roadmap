import { useState, useEffect } from 'react';
import { SavingGoal } from '../types';

export const useGoals = () => {
  const [goals, setGoals] = useState<SavingGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load goals from localStorage
    const loadGoals = () => {
      const savedGoals = localStorage.getItem('savingGoals');
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      }
      setIsLoading(false);
    };

    loadGoals();
  }, []);

  useEffect(() => {
    // Save goals to localStorage
    localStorage.setItem('savingGoals', JSON.stringify(goals));
  }, [goals]);

  const addGoal = (goal: Omit<SavingGoal, 'id' | 'currentAmount'>) => {
    const newGoal: SavingGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: 0
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (updatedGoal: SavingGoal) => {
    setGoals(prev => 
      prev.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal)
    );
  };

  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const contributeToGoal = (id: string, amount: number) => {
    setGoals(prev => 
      prev.map(goal => {
        if (goal.id === id) {
          const newAmount = goal.currentAmount + amount;
          return {
            ...goal,
            currentAmount: Math.min(newAmount, goal.targetAmount)
          };
        }
        return goal;
      })
    );
  };

  return {
    goals,
    isLoading,
    addGoal,
    updateGoal,
    deleteGoal,
    contributeToGoal
  };
};