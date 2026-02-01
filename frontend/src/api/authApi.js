import api from "./axios";



export const loginUser = async (credentials) => {
    // credentials = { agentId: "...", password: "..." }
    const response = await api.post("/auth/login", credentials);
    return response.data;
};

export const registerUser = async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response.data;
};