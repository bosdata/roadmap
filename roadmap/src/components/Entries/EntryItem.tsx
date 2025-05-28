import React, { useState } from 'react';
import { Edit, Trash2, Check, X } from 'lucide-react';
import { SavingEntry } from '../../types';
import { formatCurrency, formatDate } from '../../utils/formatters';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Select from '../UI/Select';

interface EntryItemProps {
  entry: SavingEntry;
  onUpdate: (entry: SavingEntry) => void;
  onDelete: (id: string) => void;
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

const EntryItem: React.FC<EntryItemProps> = ({ entry, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEntry, setEditedEntry] = useState<SavingEntry>(entry);
  const [error, setError] = useState<string>('');

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEntry(entry);
    setError('');
  };

  const handleSave = () => {
    if (editedEntry.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    
    onUpdate(editedEntry);
    setIsEditing(false);
    setError('');
  };

  const getCategoryLabel = (value: string): string => {
    const category = CATEGORIES.find(cat => cat.value === value);
    return category ? category.label : 'Unknown';
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      general: 'bg-blue-100 text-blue-800',
      emergency: 'bg-red-100 text-red-800',
      retirement: 'bg-purple-100 text-purple-800',
      vacation: 'bg-yellow-100 text-yellow-800',
      education: 'bg-green-100 text-green-800',
      housing: 'bg-indigo-100 text-indigo-800',
      other: 'bg-gray-100 text-gray-800'
    };
    
    return colors[category] || colors.other;
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 shadow-sm hover:shadow-md mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id={`amount-${entry.id}`}
            label="Amount"
            type="number"
            value={editedEntry.amount}
            onChange={(e) => setEditedEntry({
              ...editedEntry,
              amount: parseFloat(e.target.value) || 0
            })}
            step="0.01"
            min="0.01"
            required
            error={error}
          />
          
          <Input
            id={`date-${entry.id}`}
            label="Date"
            type="date"
            value={editedEntry.date}
            onChange={(e) => setEditedEntry({
              ...editedEntry,
              date: e.target.value
            })}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Select
            id={`category-${entry.id}`}
            label="Category"
            options={CATEGORIES}
            value={editedEntry.category}
            onChange={(e) => setEditedEntry({
              ...editedEntry,
              category: e.target.value
            })}
            required
          />
          
          <Input
            id={`note-${entry.id}`}
            label="Note"
            value={editedEntry.note}
            onChange={(e) => setEditedEntry({
              ...editedEntry,
              note: e.target.value
            })}
          />
        </div>
        
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
    <div className="bg-white border border-gray-200 rounded-lg p-4 transition-all duration-300 shadow-sm hover:shadow-md mb-4">
      <div className="flex flex-col sm:flex-row justify-between">
        <div>
          <div className="flex items-center">
            <span className="text-lg font-semibold text-gray-800">
              {formatCurrency(entry.amount)}
            </span>
            <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(entry.category)}`}>
              {getCategoryLabel(entry.category)}
            </span>
          </div>
          <div className="text-sm text-gray-500 mt-1">
            {formatDate(entry.date)}
          </div>
          {entry.note && (
            <p className="text-sm text-gray-600 mt-2">{entry.note}</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2 mt-3 sm:mt-0">
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
            onClick={() => onDelete(entry.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EntryItem;