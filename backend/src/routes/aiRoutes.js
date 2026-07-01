const aiController = require('../controllers/aiController.js');
const { authMiddleware } = require('../middleware/authMiddleware.js');

module.exports = (router) => {
    router.post('/ai', authMiddleware, aiController.generateContent);
}