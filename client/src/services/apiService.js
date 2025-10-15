const API_URL = 'http://localhost:5003/api';

export const fetchGroups = async () => {
    const response = await fetch(`${API_URL}/groups`);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.map(g => ({ ...g, id: g._id }));
};

export const addGroup = async (name, members) => {
    const response = await fetch(`${API_URL}/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, members }),
    });
    if (!response.ok) throw new Error('Failed to create group');
    const newGroup = await response.json();
    return { ...newGroup, id: newGroup._id };
};

export const updateGroup = async (groupId, newName, newMembers) => {
    const response = await fetch(`${API_URL}/groups/${groupId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName, members: newMembers }),
    });
    if (!response.ok) throw new Error('Failed to update group');
    const updatedGroup = await response.json();
    return { ...updatedGroup, id: updatedGroup._id };
};

export const addExpense = async (groupId, expense) => {
    const response = await fetch(`${API_URL}/groups/${groupId}/expenses`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
    });
    if (!response.ok) throw new Error('Failed to add expense');
    const updatedGroup = await response.json();
    return { ...updatedGroup, id: updatedGroup._id };
};
