const Habit = require('../models/habitModel.js');
const HabitCompletion = require('../models/habitCompletionModel.js');
const validators = require('../utils/validators.js');

exports.getHabits = async (userId) => {
    const habits = await Habit.find({ user: userId }).lean();

    const habitsWithCompletion = await Promise.all(
        habits.map(async (habit) => {
            habit.completionCount = await calculateProgressByFrequencyUnit(habit.frequencyUnit, habit._id, userId);
            return habit;
        })
    );

    return habitsWithCompletion;
};

exports.createHabit = async (habitData, userId) => {
    if (habitData.goal) {
        await validators.validateGoalExists(habitData.goal);
    }

    const habit = await Habit.create({ ...habitData, user: userId });
    const habitObj = habit.toObject();
    habitObj.completionCount = await calculateProgressByFrequencyUnit(habitObj.frequencyUnit, habitObj._id, userId);
    return habitObj;
}

exports.updateHabit = async (id, body, userId) => {
    const habit = await Habit.findByIdAndUpdate(id, { ...body, user: userId }, { new: true });

    if (!habit)
        throw new Error('Habit not found');

    const habitObj = habit.toObject();
    habitObj.completionCount = await calculateProgressByFrequencyUnit(habitObj.frequencyUnit, habitObj._id, userId);
    return habitObj;
};

exports.deleteHabit = async (id, userId) => {
    await Habit.findByIdAndDelete(id);
};

exports.completeHabit = async (id, userId) => {
    const habit = await Habit.findById(id);

    if (!habit)
        throw new Error('Habit not found');
    
    await HabitCompletion.create({ habit: id, date: new Date(), user: userId });
    return await calculateProgressByFrequencyUnit(habit.frequencyUnit, id, userId);
};

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
