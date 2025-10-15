const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    paidBy: { type: String, required: true },
    splitWith: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now }
});

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: { type: [String], required: true },
    expenses: [ExpenseSchema]
});

const Group = mongoose.model('Group', GroupSchema);

module.exports = Group;
