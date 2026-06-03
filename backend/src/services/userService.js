const User = require('../models/userModel');
const { generateToken } = require('../utils/generateToken');

exports.register = async (userName, email, password) => {
    const userExists = await User.findOne({ email });
    if (userExists) throw new Error('User already exists');

    const user = await User.create({ userName, email, password });
    return {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
    };
};

exports.login = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        throw new Error('Invalid email or password');
    }
    return {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
    };
};

exports.updateUser = async (userId, updates) => {
    const user = await User.findById(userId);
    
    if (!user) 
        throw new Error('User not found');

    Object.assign(user, updates);
    await user.save();
    
    return {
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
    };
};
