const golasController = require('../controllers/goalController.js')

module.exports = (router) => {

    router.get('/goals', golasController.getGoals)
    // router.post('/goals', console.log('create goals')),
    // router.patch('/goals/:id', console.log('patch goals')),
    // router.delete('/goals/:id', console.log('delete goals'))

}