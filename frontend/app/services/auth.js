import api from "./api";

export const register = async (userName, email, password) => {
    try {
        const response = await api.post("/register", { userName, email, password });
        const { token } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", userName);
    } catch (error) {
        console.error("Registration error:", error.response?.data || error);
        throw error.response?.data || { message: "Registration failed" };
    }
}

export const signIn = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        const { token, userName } = response.data;
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userName", userName);
    } catch (error) {
        console.error("Login error:", error.response?.data || error);
        throw error.response?.data || { message: "Login failed" };
    }
}