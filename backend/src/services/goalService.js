const Goal = require('../models/goalModel.js');

exports.getGoals = async (userId) => {
    return await Goal.find({ user: userId });
};

exports.createGoal = async (goalData, userId) => {
    return await Goal.create({ ...goalData, user: userId });
};

exports.updateGoal = async (id, body, userId) => {
    return await Goal.findByIdAndUpdate(id, { ...body, user: userId }, { new: true });
};

exports.deleteGoal = async (id) => {
    await Goal.findByIdAndDelete(id);
};
