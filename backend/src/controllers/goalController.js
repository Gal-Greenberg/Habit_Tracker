const Goal = require('../models/goalModel.js');

exports.getGoals = async (req, res) => {
    try {
        const goals = await Goal.find({ user: req.user._id });
        res.status(200).json(goals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createGoal = async (req, res) => {
    try {
        const goal = await Goal.create({ ...req.body, user: req.user._id });
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateGoal = async (req, res) => {
    try {
        const { id } = req.params;

        const goal = await Goal.findByIdAndUpdate(id, { ...req.body, user: req.user._id }, { new: true });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteGoal = async (req, res) => {
    try {
        const { id } = req.params;

        await Goal.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}