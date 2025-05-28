import { useState, useEffect } from 'react';
import { SavingEntry, SavingsSummary } from '../types';
import { getSavingsSummary } from '../utils/calculations';

export const useSavings = () => {
  const [entries, setEntries] = useState<SavingEntry[]>([]);
  const [summary, setSummary] = useState<SavingsSummary>({
    totalSaved: 0,
    averagePerDay: 0,
    streak: 0,
    bestDay: { date: '', amount: 0 }
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load entries from localStorage
    const loadEntries = () => {
      const savedEntries = localStorage.getItem('savingEntries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      setIsLoading(false);
    };

    loadEntries();
  }, []);

  useEffect(() => {
    // Update summary whenever entries change
    setSummary(getSavingsSummary(entries));
    
    // Save entries to localStorage
    localStorage.setItem('savingEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: Omit<SavingEntry, 'id'>) => {
    const newEntry: SavingEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  const updateEntry = (updatedEntry: SavingEntry) => {
    setEntries(prev => 
      prev.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
    );
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return {
    entries,
    summary,
    isLoading,
    addEntry,
    updateEntry,
    deleteEntry
  };
};