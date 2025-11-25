import api from "./api";

export const getGoals = async () => {
    try {
        const response = await api.get("/goals");
        return response.data;
    } catch (error) {
        console.error("Error fetching goals:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to fetch goals" };
    }
}

export const createGoal = async (title, description, targetDate, status, priority) => {
    try {
        await api.post("/goals", { title, description, targetDate, status, priority });
    } catch (error) {
        console.error("Error creating goal:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to create goal" };
    }
}

export const updateGoal = async (id, data) => {
}

export const deleteGoal = async (id) => {
}