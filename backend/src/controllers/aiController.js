const aiService = require('../services/aiService');

exports.generateContent = async (req, res) => {
    try {
        const { action, freeQuestion } = req.body;
        const insights = await aiService.generateContent(action, req.user._id, freeQuestion);
        res.json({ insights });
    } catch (error) {
        console.error('AI error:', error);
        const status = error.message === 'Invalid action' ? 400 : 500;
        res.status(status).json({ message: error.message || 'Failed to generate insights' });
    }
};