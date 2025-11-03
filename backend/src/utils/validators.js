const User = require('../models/userModel.js');
const Goal = require('../models/goalModel.js');

exports.validateUserExists = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
}

exports.validateGoalExists = async (goalId) => {
    const goal = await Goal.findById(goalId);
    if (!goal) {
        throw new Error('Goal not found');
    }
}