const habitsController = require('../controllers/habitController.js')

module.exports = (router) => {
    router.get('/habits', habitsController.getHabits),
    router.post('/habits', habitsController.createHabit),
    router.patch('/habits/:id', habitsController.updateHabit),
    router.delete('/habits/:id', habitsController.deleteHabit)
}