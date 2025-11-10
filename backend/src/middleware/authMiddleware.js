const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

module.exports.authMiddleware = async (req, res, next) => {
    console.log("check user connection!!!!");
    let token;

    if (req.headers.authorization) {
        try {
            token = req.headers.authorization;
            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
}
