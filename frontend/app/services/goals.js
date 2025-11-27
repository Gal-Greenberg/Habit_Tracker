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

export const createGoal = async (data) => {
    try {
        const response = await api.post("/goals", data);
        return response.data;
    } catch (error) {
        console.error("Error creating goal:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to create goal" };
    }
}

export const updateGoal = async (id, data) => {
    try {
        const response = await api.patch(`/goals/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating goal:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to update goal" };
    }
}

export const deleteGoal = async (id) => {
    try {
        await api.delete(`/goals/${id}`);
    } catch (error) {
        console.error("Error deleting goal:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to delete goal" };
    }
}