import React from 'react';
import { BalanceIcon } from './icons';

function BalanceSummary({ balances }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <BalanceIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Balances</h3>
            </div>
            <div className="space-y-1">
                {Object.entries(balances).map(([person, balance]) => (
                    <div key={person} className="flex justify-between items-center py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <span className="font-medium text-gray-600 dark:text-gray-300">{person}</span>
                        <span className={`font-semibold text-lg ${balance >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {balance >= 0 ? `+${balance.toFixed(2)}` : `${balance.toFixed(2)}`}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BalanceSummary;
