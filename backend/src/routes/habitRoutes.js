const habitController = require('../controllers/habitController.js')

module.exports = (router) => {
    router.get('/habits', habitController.getHabits);
    router.post('/habits', habitController.createHabit);
    router.patch('/habits/:id', habitController.updateHabit);
    router.delete('/habits/:id', habitController.deleteHabit);
}