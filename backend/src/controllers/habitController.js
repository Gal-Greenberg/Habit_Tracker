const Habit = require('../models/habitModel.js');

exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find();
        res.status(200).json(habits);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createHabit = async (req, res) => {
    console.log("try to create habit", req.body);
    
    try {
        const habit = await Habit.create(req.body);
        res.status(201).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateHabit = async (req, res) => {
    const { id } = req.params;
    try {
        const habit = await Habit.findByIdAndUpdate(id, req.body);
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
