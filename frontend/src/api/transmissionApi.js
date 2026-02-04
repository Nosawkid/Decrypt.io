import api from "./axios";

// --- 1. SEND ---
export const sendTransmission = async (transmissionData) => {
    const response = await api.post("/transmissions/send", transmissionData);
    return response.data;
};

// --- 2. GET INBOX (Check this specifically!) ---
export const getMyTransmissions = async () => {
    const response = await api.get("/transmissions/inbox");
    // Returns: { transmissions: [...] }
    return response.data;
};

// --- 3. GET SENT ---
export const getSentTransmissions = async () => {
    const response = await api.get("/transmissions/sent");
    return response.data;
};

// --- 4. GET STARRED ---
export const getStarredTransmissions = async () => {
    const response = await api.get("/transmissions/starred");
    return response.data;
};

// --- 5. GET LOST ---
export const getLostTransmissions = async () => {
    const response = await api.get("/transmissions/lost");
    return response.data;
};

// --- 6. READ ---
export const readTransmission = async (id, decKey) => {
    const response = await api.post(`/transmissions/read/${id}`, { decKey });
    return response.data;
};

// --- 7. TOGGLE STAR ---
export const toggleStar = async (id) => {
    const response = await api.put(`/transmissions/star/${id}`);
    return response.data;
};