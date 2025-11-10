const userController = require("../controllers/userController");
const { authMiddleware } = require('../middleware/authMiddleware');

module.exports = (router) => {
    router.post('/register', userController.register);
    router.post('/login', userController.login);
    router.patch('/users/update', authMiddleware, userController.updateUser);
}