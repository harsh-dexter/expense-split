import React, { useState } from 'react';
import { ArrowLeftIcon, EditIcon } from './icons';
import BalanceSummary from './BalanceSummary';
import SettlementPlan from './SettlementPlan';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';

function GroupDetail({ group, onAddExpense, onBack, onEditGroup }) {
    // State for the form is still managed here, but calculations are not.
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    
    // The balance and settlement logic is now removed from here.
    // The component receives the calculated data directly in the `group` prop.
    const balances = group.balances || {};
    const settlements = group.settlements || [];
    
    const handleAddExpenseLocal = (expense) => {
        onAddExpense(expense);
        setShowExpenseForm(false);
    }
    
    return (
        <main>
             <button onClick={onBack} className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-semibold mb-6 hover:underline">
                <ArrowLeftIcon />
                All Groups
            </button>
            <div className="flex justify-between items-start mb-8">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">{group.name}</h2>
                <button onClick={onEditGroup} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-semibold py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700/60 transition-colors">
                    <EditIcon className="h-4 w-4" />
                    Edit Group
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-10">
                <div className="lg:col-span-3 space-y-8">
                     <BalanceSummary balances={balances} />
                     <SettlementPlan settlements={settlements} />
                </div>
                <div className="lg:col-span-2">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                        <h3 className="font-bold text-lg mb-2 dark:text-white">Group Members</h3>
                        <ul className="space-y-2">
                           {group.members.map(member => <li key={member} className="text-gray-600 dark:text-gray-300">{member}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Expenses</h3>
                    <button
                        onClick={() => setShowExpenseForm(!showExpenseForm)}
                        className="bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {showExpenseForm ? 'Cancel' : '+ Add Expense'}
                    </button>
                </div>
                {showExpenseForm && <ExpenseForm members={group.members} onAddExpense={handleAddExpenseLocal} />}
                <ExpenseList expenses={group.expenses} />
            </div>
        </main>
    );
}

export default GroupDetail;
