import React from 'react';
import { UserGroupIcon } from './icons';
import GroupCard from './GroupCard';

function Dashboard({ groups, onSelectGroup, onShowGroupModal }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Groups</h2>
                <button 
                    onClick={onShowGroupModal}
                    className="bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    + New Group
                </button>
            </div>
            {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {groups.map(group => (
                        <GroupCard key={group.id} group={group} onSelect={() => onSelectGroup(group.id)} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                     <UserGroupIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"/>
                     <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">No groups yet</h3>
                     <p className="mt-1 text-gray-500 dark:text-gray-400">Get started by creating a new group.</p>
                     <button onClick={onShowGroupModal} className="mt-4 bg-blue-600 text-white font-semibold text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                         Create Group
                     </button>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
