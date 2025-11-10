const golaController = require('../controllers/goalController.js')
const { authMiddleware } = require('../middleware/authMiddleware.js');

module.exports = (router) => {
    router.get('/goals', authMiddleware, golaController.getGoals);
    router.post('/goals', authMiddleware, golaController.createGoal);
    router.patch('/goals/:id', authMiddleware, golaController.updateGoal);
    router.delete('/goals/:id', authMiddleware, golaController.deleteGoal);
}