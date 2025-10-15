import React, { useState } from 'react';

function AddGroupModal({ onAddGroup, onClose }) {
    const [name, setName] = useState('');
    const [members, setMembers] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name && members) {
            const memberArray = members.split(',').map(m => m.trim()).filter(Boolean);
            if (memberArray.length > 0) {
                onAddGroup(name, memberArray);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">Create a New Group</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="group-name" className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Group Name</label>
                        <input
                            type="text" id="group-name" value={name} onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Trip to Bali"
                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="group-members" className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 block">Members (comma-separated)</label>
                        <input
                            type="text" id="group-members" value={members} onChange={(e) => setMembers(e.target.value)}
                            placeholder="e.g., John, Jane, Mike"
                            className="w-full p-2.5 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-100 font-semibold py-2 px-5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors">Create Group</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddGroupModal;
