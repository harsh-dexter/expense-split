import React from 'react';
import { SettleIcon } from './icons';

function SettlementPlan({ settlements }) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3 mb-4">
                <SettleIcon className="h-5 w-5 text-gray-500 dark:text-gray-400"/>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Settlement Plan</h3>
            </div>
            {settlements.length === 0 ? (
                 <div className="text-center py-4">
                    <p className="text-green-600 dark:text-green-500 font-semibold">Everyone is settled up!</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {settlements.map((s, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-100/80 dark:bg-gray-700/50 rounded-lg">
                             <span className="font-bold text-sm text-red-600 dark:text-red-500">{s.from}</span>
                             <span className="text-gray-500 dark:text-gray-400 text-sm font-semibold mx-2">pays</span>
                             <span className="font-bold text-sm text-green-600 dark:text-green-500">{s.to}</span>
                             <span className="font-extrabold text-gray-800 dark:text-white ml-auto tracking-tight text-lg">${s.amount.toFixed(2)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SettlementPlan;
