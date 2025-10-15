import React from 'react';
import { ReceiptIcon } from './icons';

function ExpenseList({ expenses }) {
    if (expenses.length === 0) {
        return <div className="text-center py-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
            <ReceiptIcon className="mx-auto h-10 w-10 text-gray-400 dark:text-gray-500"/>
            <p className="mt-4 text-gray-500 dark:text-gray-400">No expenses logged yet.</p>
        </div>;
    }

    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl">
            {expenses.map((expense, index) => (
                <div key={expense._id || index} className={`p-4 flex justify-between items-center ${index < expenses.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''}`}>
                    <div>
                        <p className="font-bold text-gray-800 dark:text-gray-100">{expense.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Paid by <span className="font-semibold">{expense.paidBy}</span></p>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-lg text-gray-900 dark:text-white">${expense.amount.toFixed(2)}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Split with {expense.splitWith.length}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;
