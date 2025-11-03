const User = require("../models/userModel");

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}