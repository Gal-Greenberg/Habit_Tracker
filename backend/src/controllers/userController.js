const userService = require('../services/userService');

exports.register = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        const result = await userService.register(userName, email, password);
        res.status(201).json(result);
    } catch (error) {
        const status = error.message === 'User already exists' ? 400 : 500;
        res.status(status).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await userService.login(email, password);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await userService.updateUser(req.user._id, req.body);
        res.status(200).json(user);
    } catch (error) {
        const status = error.message === 'User not found' ? 404 : 500;
        res.status(status).json({ error: error.message });
    }
};
