import React, { useState, useEffect } from 'react';
import { fetchGroups, addGroup, updateGroup, addExpense } from './services/apiService';
import AddGroupModal from './components/AddGroupModal';
import EditGroupModal from './components/EditGroupModal';
import Dashboard from './components/Dashboard';
import GroupDetail from './components/GroupDetail';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [groups, setGroups] = useState([]);
    const [activeGroupId, setActiveGroupId] = useState(null);
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [editingGroup, setEditingGroup] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const loadGroups = async () => {
        setIsLoading(true);
        try {
            const data = await fetchGroups();
            setGroups(data);
        } catch (err) {
            setError(err.message);
            console.error("Failed to fetch groups:", err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadGroups();
    }, []);

    const handleAddGroup = async (name, members) => {
        try {
            const newGroup = await addGroup(name, members);
            setGroups(prev => [newGroup, ...prev]);
            setActiveGroupId(newGroup.id);
            setShowGroupModal(false);
        } catch (err) {
            console.error(err);
            setError('Could not add group.');
        }
    };

    const handleUpdateGroup = async (groupId, newName, newMembers) => {
        try {
            const updatedGroup = await updateGroup(groupId, newName, newMembers);
            setGroups(prev => prev.map(g => g.id === groupId ? updatedGroup : g));
            setEditingGroup(null);
        } catch (err) {
            console.error(err);
            setError('Could not update group.');
        }
    };

    const handleAddExpense = async (expense) => {
        try {
            const updatedGroup = await addExpense(activeGroupId, expense);
            setGroups(prev => prev.map(g => g.id === activeGroupId ? updatedGroup : g));
        } catch (err) {
            console.error(err);
            setError('Could not add expense.');
        }
    };
    
    const activeGroup = activeGroupId ? groups.find(g => g.id === activeGroupId) : null;

    return (
        <div className="bg-gray-50/50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 flex flex-col">
            <style>
              {`
                @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap');
                body { font-family: 'Manrope', sans-serif; }
              `}
            </style>
            
            <Header theme={theme} toggleTheme={toggleTheme} />
            
            <main className="flex-grow">
                <div className="container mx-auto p-4 md:p-8 max-w-5xl">
                    {showGroupModal && <AddGroupModal onAddGroup={handleAddGroup} onClose={() => setShowGroupModal(false)} />}
                    {editingGroup && <EditGroupModal group={editingGroup} onUpdateGroup={handleUpdateGroup} onClose={() => setEditingGroup(null)} />}
                    
                    {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

                    {isLoading ? <p className="text-center">Loading groups...</p> : (
                        !activeGroup ? (
                            <Dashboard 
                                groups={groups} 
                                onSelectGroup={(id) => setActiveGroupId(id)}
                                onShowGroupModal={() => setShowGroupModal(true)}
                            />
                        ) : (
                            <GroupDetail 
                                group={activeGroup} 
                                onAddExpense={handleAddExpense}
                                onBack={() => setActiveGroupId(null)}
                                onEditGroup={() => setEditingGroup(activeGroup)}
                            />
                        )
                    )}
                </div>
            </main>
            
            <Footer />
        </div>
    );
}
