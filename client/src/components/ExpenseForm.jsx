import React, { useState, useEffect } from 'react';

function ExpenseForm({ members, onAddExpense }) {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [paidBy, setPaidBy] = useState(members[0] || '');
    const [splitWith, setSplitWith] = useState(members);

    useEffect(() => {
        setPaidBy(members[0] || '');
        setSplitWith(members);
    }, [members]);

    const handleSplitChange = (member) => {
        setSplitWith(prev => 
            prev.includes(member) ? prev.filter(m => m !== member) : [...prev, member]
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!description || !amount || parseFloat(amount) <= 0 || !paidBy || splitWith.length === 0) return;
        onAddExpense({ description, amount: parseFloat(amount), paidBy, splitWith });
        setDescription('');
        setAmount('');
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Expense Description" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount ($)" step="0.01" className="w-full p-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                 <select value={paidBy} onChange={(e) => setPaidBy(e.target.value)} className="w-full p-2.5 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="" disabled>-- Paid By --</option>
                    {members.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 block">Split With</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {members.map(m => (
                            <label key={m} className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer transition-colors ${splitWith.includes(m) ? 'bg-blue-100 text-blue-800 ring-2 ring-blue-500 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600'}`}>
                                <input type="checkbox" checked={splitWith.includes(m)} onChange={() => handleSplitChange(m)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-600 dark:border-gray-500" style={{'--tw-ring-offset-shadow': 'none', '--tw-ring-shadow': 'none', 'boxShadow': 'none'}}/>
                                <span className="text-sm font-medium">{m}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="text-right pt-2">
                    <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors">Add</button>
                </div>
            </form>
        </div>
    );
}

export default ExpenseForm;
