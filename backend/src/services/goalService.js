const Goal = require('../models/goalModel.js');

exports.getGoals = async (userId) => {
    return await Goal.find({ user: userId });
};

exports.createGoal = async (goalData, userId) => {
    return await Goal.create({ ...goalData, user: userId });
};

exports.updateGoal = async (id, body, userId) => {
    const goal = await Goal.findByIdAndUpdate(id, { ...body, user: userId }, { new: true });

    if (!goal)
        throw new Error('Goal not found');

    return goal;
};

exports.deleteGoal = async (id, userId) => {
    await Goal.findByIdAndDelete(id);
};
