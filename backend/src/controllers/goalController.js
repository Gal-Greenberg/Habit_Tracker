const Goal = require('../models/goalModel.js');
const validators = require('../utils/validators.js');

exports.getGoals = async (req, res) => {
    try {
        const user = req.body;
        const goals = await Goal.find(user);
        res.status(200).json(goals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createGoal = async (req, res) => {
    try {
        await validators.validateUserExists(req.body.user);

        const goal = await Goal.create(req.body);
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateGoal = async (req, res) => {
    const { id } = req.params;
    try {
        const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteGoal = async (req, res) => {
    const { id } = req.params;
    try {
        await Goal.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}