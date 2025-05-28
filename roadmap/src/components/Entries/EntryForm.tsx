import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import Input from '../UI/Input';
import Select from '../UI/Select';
import Button from '../UI/Button';
import { getTodayString } from '../../utils/formatters';

interface EntryFormProps {
  onAddEntry: (entry: { amount: number; date: string; category: string; note: string }) => void;
}

const CATEGORIES = [
  { value: 'general', label: 'General Savings' },
  { value: 'emergency', label: 'Emergency Fund' },
  { value: 'retirement', label: 'Retirement' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'education', label: 'Education' },
  { value: 'housing', label: 'Housing' },
  { value: 'other', label: 'Other' }
];

const EntryForm: React.FC<EntryFormProps> = ({ onAddEntry }) => {
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>(getTodayString());
  const [category, setCategory] = useState<string>('general');
  const [note, setNote] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    
    onAddEntry({ amount, date, category, note });
    
    // Reset form
    setAmount(0);
    setDate(getTodayString());
    setCategory('general');
    setNote('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-4 mb-6">
      <div className="flex items-center mb-4">
        <PlusCircle className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Add New Saving</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="amount"
          label="Amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
          step="0.01"
          min="0.01"
          required
          error={error}
        />
        
        <Input
          id="date"
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={getTodayString()}
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          id="category"
          label="Category"
          options={CATEGORIES}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        
        <Input
          id="note"
          label="Note (Optional)"
          placeholder="Add a note about this saving"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button type="submit" variant="primary">
          Add Saving
        </Button>
      </div>
    </form>
  );
};

export default EntryForm;