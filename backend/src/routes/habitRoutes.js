const habitController = require('../controllers/habitController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

module.exports = (router) => {
    router.get('/habits', authMiddleware, habitController.getHabits);
    router.post('/habits', authMiddleware, habitController.createHabit);
    router.patch('/habits/:id', authMiddleware, habitController.updateHabit);
    router.delete('/habits/:id', authMiddleware, habitController.deleteHabit);
}