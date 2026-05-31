const goalService = require('../services/goalService.js');

exports.getGoals = async (req, res) => {
    try {
        const goals = await goalService.getGoals(req.user._id);
        res.status(200).json(goals);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.createGoal = async (req, res) => {
    try {
        const goal = await goalService.createGoal(req.body, req.user._id);
        res.status(201).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateGoal = async (req, res) => {
    try {
        const goal = await goalService.updateGoal(req.params.id, req.body, req.user._id);
        res.status(200).json(goal);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteGoal = async (req, res) => {
    try {
        await goalService.deleteGoal(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
