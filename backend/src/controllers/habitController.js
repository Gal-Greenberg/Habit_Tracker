const habitService = require('../services/habitService.js');

exports.getHabits = async (req, res) => {
    try {
        const habits = await habitService.getHabits(req.user._id);
        res.status(200).json(habits);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createHabit = async (req, res) => {
    try {
        const habitObj = await habitService.createHabit(req.body, req.user._id);
        res.status(201).json(habitObj);
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
}

exports.updateHabit = async (req, res) => {
    try {
        const habit = await habitService.updateHabit(req.params.id, req.body, req.user._id);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteHabit = async (req, res) => {
    try {
        await habitService.deleteHabit(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.completeHabit = async (req, res) => {
    try {
        const completion = await habitService.completeHabit(req.params.id, req.user._id);
        res.status(201).json({ completion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

