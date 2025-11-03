const userController = require("../controllers/userController");

module.exports = (router) => {
    router.post('/users', userController.createUser);
    router.patch('/users/:id', userController.updateUser);
    router.get('/users/:id', userController.getUserById);
}