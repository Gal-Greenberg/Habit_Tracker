import api from "./api";

export const getHabits = async () => {
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
}

export const deleteHabit = async (id) => {
}