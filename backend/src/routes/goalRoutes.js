const golaController = require('../controllers/goalController.js')

module.exports = (router) => {
    router.get('/goals', golaController.getGoals);
    router.post('/goals', golaController.createGoal);
    router.patch('/goals/:id', golaController.updateGoal);
    router.delete('/goals/:id', golaController.deleteGoal);
}