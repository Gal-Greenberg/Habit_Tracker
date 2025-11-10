const Habit = require('../models/habitModel.js');
const validators = require('../utils/validators.js');

exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id });
        res.status(200).json(habits);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createHabit = async (req, res) => {
    try {
        // await validators.validateUserExists(req.body.user);
        if (req.body.goal) {
            await validators.validateGoalExists(req.body.goal);
        }

        const habit = await Habit.create({ ...req.body, user: req.user._id });
        res.status(201).json(habit);
    } catch (error) {
        const status = err.message === 'User not found' ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
}

exports.updateHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findByIdAndUpdate(id, { ...req.body, user: req.user._id }, { new: true });
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteHabit = async (req, res) => {
    const { id } = req.params;
    try {
        await Habit.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
