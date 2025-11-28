const Habit = require('../models/habitModel.js');
const HabitCompletion = require('../models/habitCompletionModel.js');
const validators = require('../utils/validators.js');

exports.getHabits = async (req, res) => {
    try {
        const habits = await Habit.find({ user: req.user._id }).lean();

        const habitsWithCompletion = await Promise.all(
            habits.map(async (habit) => {
                habit.completionCount = await calculateProgressByFrequencyUnit(habit.frequencyUnit, habit._id, req.user._id);
                return habit;
            })
        );

        res.status(200).json(habitsWithCompletion);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.createHabit = async (req, res) => {
    try {
        if (req.body.goal) {
            await validators.validateGoalExists(req.body.goal);
        }

        const habit = await Habit.create({ ...req.body, user: req.user._id });
        habit.completionCount = await calculateProgressByFrequencyUnit(habit.frequencyUnit, habit._id, req.user._id);
        res.status(201).json(habit);
    } catch (error) {
        const status = err.message === 'User not found' ? 404 : 400;
        res.status(status).json({ error: error.message });
    }
}

exports.updateHabit = async (req, res) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findByIdAndUpdate(id, { ...req.body, user: req.user._id }, { new: true });
        habit.completionCount = await calculateProgressByFrequencyUnit(habit.frequencyUnit, habit._id, req.user._id);
        res.status(200).json(habit);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteHabit = async (req, res) => {
    try {
        const { id } = req.params;

        await Habit.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.completeHabit = async (req, res) => {
    try {
        const { id } = req.params;

        const habit = await Habit.findById(id);
        if (!habit) {
            return res.status(404).json({ error: 'Habit not found' });
        }

        const habitCompletion = await HabitCompletion.create({
            habit: id,
            date: new Date(),
            user: req.user._id
        });

        const completion = await calculateProgressByFrequencyUnit(habit.frequencyUnit, id, req.user._id);
        
        res.status(201).json({ completion });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const calculateProgressByFrequencyUnit = (unit, habitId, userId) => {
    if (unit === "day") {
        const now = new Date();
        var start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var end = new Date(start);
        end.setHours(23, 59, 59, 999);
    } else {
        const now = new Date();
        const day = now.getDay();

        var start = new Date(now);
        start.setDate(now.getDate() - day);
        start.setHours(0, 0, 0, 0);

        var end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
    }

    return calculateProgress(habitId, userId, start, end);
}

const calculateProgress = async (habitId, userId, startDate, endDate) => {
    const completions = await HabitCompletion.countDocuments({
        habit: habitId,
        user: userId,
        date: { $gte: startDate, $lte: endDate }
    });

    return completions;
};
