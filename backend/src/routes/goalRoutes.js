const golasController = require('../controllers/goalController.js')

module.exports = (router) => {
    router.get('/goals', golasController.getGoals)
    router.post('/goals', golasController.createGoal),
    router.patch('/goals/:id', golasController.updateGoal),
    router.delete('/goals/:id', golasController.deleteGoal)
}