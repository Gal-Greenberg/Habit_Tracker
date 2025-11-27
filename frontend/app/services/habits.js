import api from "./api";

export const getHabits = async () => {
    try {
        const response = await api.get("/habits");
        return response.data;
    } catch (error) {
        console.error("Error fetching habits:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to fetch habits" };
    }
}

export const createHabit = async (title, description, frequencyValue, frequencyUnit, goal) => {
    try {
        frequencyUnit = frequencyUnit.toLowerCase();
        const data = { title, description, frequencyValue, frequencyUnit };
        if (goal) {
            data.goal = goal;
        }
        
        await api.post("/habits", data);
    } catch (error) {
        console.error("Error creating habit:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to create habit" };
    }
}

export const updateHabit = async (id, data) => {
    try {
        await api.patch(`/habits/${id}`, data);
    } catch (error) {
        console.error("Error updating habit:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to update habit" };
    }
}

export const deleteHabit = async (id) => {
    try {
        await api.delete(`/habits/${id}`);
    } catch (error) {
        console.error("Error deleting habit:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to delete habit" };
    }
}

export const completeHabit = async (id) => {
    try {
        await api.post(`/habits/${id}/complete`);
    }
    catch (error) {
        console.error("Error completing habit:", error.response?.data || error);
        throw error.response?.data || { message: "Failed to complete habit" };
    }
}