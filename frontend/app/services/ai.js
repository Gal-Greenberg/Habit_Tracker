import api from "./api";

export const getAiInsights = async (action, freeQuestion) => {
    try {
        const response = await api.post("/ai", { action, freeQuestion });
        return response.data.insights;
    } catch (error) {
        console.error("Error fetching AI insights:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to get AI insights" };
    }
};