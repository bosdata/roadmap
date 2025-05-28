import React from 'react';
import { SavingEntry } from '../../types';
import EntryItem from './EntryItem';
import { List } from 'lucide-react';

interface EntryListProps {
  entries: SavingEntry[];
  onUpdateEntry: (entry: SavingEntry) => void;
  onDeleteEntry: (id: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({
  entries,
  onUpdateEntry,
  onDeleteEntry
}) => {
  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <div className="flex justify-center mb-4">
          <List className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-700">No savings entries yet</h3>
        <p className="text-gray-500 mt-2">Add your first saving to get started!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <List className="h-5 w-5 text-blue-500 mr-2" />
        <h2 className="text-lg font-semibold">Your Savings</h2>
      </div>
      
      <div className="space-y-3">
        {entries.map(entry => (
          <EntryItem
            key={entry.id}
            entry={entry}
            onUpdate={onUpdateEntry}
            onDelete={onDeleteEntry}
          />
        ))}
      </div>
    </div>
  );
};

export default EntryList;