const Anthropic = require('@anthropic-ai/sdk');
const habitService = require('./habitService');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

exports.generateContent = async (action, userId) => {
    const habits = await habitService.getHabits(userId);

    const habitsText = habits.length > 0
        ? habits.map(h => `- ${h.title}: ${h.completionCount} completions this ${h.frequencyUnit}`).join('\n')
        : 'No habits yet';

    const prompts = {
        review_habits: `You are a friendly habit coach. Here are the user's current habits:\n${habitsText}\n\nRespond in Hebrew with 3 short encouraging insights based on their actual habits.`,
        suggest_new: `You are a friendly habit coach. Here are the user's current habits:\n${habitsText}\n\nSuggest 3 new healthy habits that complement their existing ones. Respond in Hebrew with short, actionable suggestions.`,
    };

    const prompt = prompts[action];
    if (!prompt) throw new Error('Invalid action');

    const message = await client.messages.create({
        model: 'claude-sonnet-4-5',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
    });

    return message.content[0].text;
};
