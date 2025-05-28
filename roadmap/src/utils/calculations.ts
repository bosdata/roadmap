import { SavingEntry, SavingsSummary } from '../types';

export const calculateTotalSavings = (entries: SavingEntry[]): number => {
  return entries.reduce((total, entry) => total + entry.amount, 0);
};

export const calculateAveragePerDay = (entries: SavingEntry[]): number => {
  if (entries.length === 0) return 0;
  const total = calculateTotalSavings(entries);
  return total / entries.length;
};

export const calculateStreak = (entries: SavingEntry[]): number => {
  if (entries.length === 0) return 0;
  
  // Sort entries by date in descending order
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  let currentDate = today;
  let streak = 0;
  
  // Check if there's an entry for today
  const hasEntryForToday = sortedEntries.some(entry => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });
  
  if (!hasEntryForToday) {
    return 0;
  }
  
  // Count consecutive days with entries
  while (true) {
    const hasEntryForDate = sortedEntries.some(entry => {
      const entryDate = new Date(entry.date);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === currentDate.getTime();
    });
    
    if (!hasEntryForDate) break;
    
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }
  
  return streak;
};

export const findBestDay = (entries: SavingEntry[]): { date: string; amount: number } => {
  if (entries.length === 0) return { date: '', amount: 0 };
  
  const best = entries.reduce((best, entry) => 
    entry.amount > best.amount ? { date: entry.date, amount: entry.amount } : best, 
    { date: entries[0].date, amount: entries[0].amount }
  );
  
  return best;
};

export const getSavingsSummary = (entries: SavingEntry[]): SavingsSummary => {
  return {
    totalSaved: calculateTotalSavings(entries),
    averagePerDay: calculateAveragePerDay(entries),
    streak: calculateStreak(entries),
    bestDay: findBestDay(entries)
  };
};

export const getGoalProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  const progress = (current / target) * 100;
  return Math.min(progress, 100);
};