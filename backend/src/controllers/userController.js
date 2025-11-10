const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
    console.log("register");

    try {
        const { userName, email, password } = req.body;
        
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }
   
        const user = await User.create({ userName, email, password });
        res.status(201).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            token: generateToken(user._id)
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    // const { id } = req.params;
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log("we have user");
        
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                userName: user.userName,
                email: user.email,
                token: generateToken(user._id)
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
        // const user = await User.findById(id);
        // if (!user) {
        //     return res.status(404).json({ error: "User not found" });
        // }
        // res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const user = await User.findById(userId);
        if (!user) 
            return res.status(404).json({ error: 'User not found' });

        Object.assign(user, updates);
        await user.save();

        res.status(200).json(user).select("-password");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}