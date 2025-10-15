import React from 'react';
import { UserGroupIcon } from './icons';

function GroupCard({ group, onSelect }) {
    const totalExpenses = group.expenses.reduce((sum, exp) => sum + exp.amount, 0);

    return (
        <div 
            onClick={onSelect} 
            className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 group"
        >
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                    <UserGroupIcon className="h-6 w-6 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 truncate">{group.name}</h3>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{group.members.length} members</p>
            <div className="mt-4 pt-4 border-t border-gray-200/80 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Spent</p>
                <p className="text-3xl font-extrabold text-gray-800 dark:text-white tracking-tight">${totalExpenses.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default GroupCard;
