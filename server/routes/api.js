const express = require('express');
const router = express.Router();
const Group = require('../models/groupModel');

// --- Calculation Logic ---
/**
 * Calculates balances and a settlement plan for a given group.
 * @param {object} group - A group object with members and expenses.
 * @returns {object} An object containing balances and settlements.
 */
const calculateSplits = (group) => {
    const balances = group.members.reduce((acc, member) => ({ ...acc, [member]: 0 }), {});

    group.expenses.forEach(expense => {
        const { amount, paidBy, splitWith } = expense;
        if (!amount || !paidBy || !splitWith || splitWith.length === 0) return;
        
        const share = amount / splitWith.length;
        balances[paidBy] += amount;
        splitWith.forEach(member => {
            if (balances[member] !== undefined) {
                balances[member] -= share;
            }
        });
    });

    const debtors = [];
    const creditors = [];
    Object.entries(balances).forEach(([person, balance]) => {
        if (balance < -0.01) debtors.push({ person, amount: -balance });
        else if (balance > 0.01) creditors.push({ person, amount: balance });
    });

    const settlements = [];
    while (debtors.length > 0 && creditors.length > 0) {
        const debtor = debtors[0];
        const creditor = creditors[0];
        const amountToSettle = Math.min(debtor.amount, creditor.amount);

        if (amountToSettle > 0.01) {
            settlements.push({ from: debtor.person, to: creditor.person, amount: amountToSettle });
            debtor.amount -= amountToSettle;
            creditor.amount -= amountToSettle;
        }

        if (debtor.amount < 0.01) debtors.shift();
        if (creditor.amount < 0.01) creditors.shift();
    }
    
    return { balances, settlements };
};


// --- API Routes ---

// GET all groups (with calculations)
router.get('/groups', async (req, res) => {
    try {
        const groups = await Group.find().sort({ _id: -1 }).lean(); // .lean() for plain JS objects
        const groupsWithCalculations = groups.map(group => {
            const { balances, settlements } = calculateSplits(group);
            return { ...group, balances, settlements };
        });
        res.json(groupsWithCalculations);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching groups', error: err.message });
    }
});

// POST a new group
router.post('/groups', async (req, res) => {
    const { name, members } = req.body;
    if (!name || !members || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: 'Group name and members are required.' });
    }
    const newGroup = new Group({ name, members, expenses: [] });
    try {
        const savedGroup = await newGroup.save();
        // Return with initial empty calculations
        const { balances, settlements } = calculateSplits(savedGroup);
        res.status(201).json({ ...savedGroup.toObject(), balances, settlements });
    } catch (err) {
        res.status(500).json({ message: 'Error creating group', error: err.message });
    }
});

// GET a single group by ID (with calculations)
router.get('/groups/:id', async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).lean();
        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }
        const { balances, settlements } = calculateSplits(group);
        res.json({ ...group, balances, settlements });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching group', error: err.message });
    }
});


// PUT (update) a group's details (name, members)
router.put('/groups/:id', async (req, res) => {
    const { name, members } = req.body;
    if (!name || !members || !Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: 'Group name and members are required.' });
    }
    try {
        const updatedGroup = await Group.findByIdAndUpdate(
            req.params.id,
            { name, members },
            { new: true }
        ).lean();
        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found.' });
        }
        const { balances, settlements } = calculateSplits(updatedGroup);
        res.json({ ...updatedGroup, balances, settlements });
    } catch (err) {
        res.status(500).json({ message: 'Error updating group', error: err.message });
    }
});


// POST a new expense to a group
router.post('/groups/:id/expenses', async (req, res) => {
    const { description, amount, paidBy, splitWith } = req.body;

    if (!description || !amount || !paidBy || !splitWith) {
         return res.status(400).json({ message: 'Missing fields for expense.' });
    }

    try {
        const group = await Group.findById(req.params.id);
        if (!group) {
            return res.status(404).json({ message: 'Group not found.' });
        }

        group.expenses.push({ description, amount, paidBy, splitWith });
        
        const savedGroup = await group.save();
        const { balances, settlements } = calculateSplits(savedGroup);
        res.status(201).json({ ...savedGroup.toObject(), balances, settlements });
    } catch (err) {
        res.status(500).json({ message: 'Error adding expense', error: err.message });
    }
});

module.exports = router;
