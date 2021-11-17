import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const createBox = (payload) => api.post("/create-box", payload);
export const getAllBoxes = (userId) => api.get(`/${userId}/boxes`);
export const updateBoxById = (userId, boxId, payload) => api.put(`/${userId}/boxes/${boxId}`);
export const deleteBoxById = (userId, boxId) => api.delete(`/${userId}/boxes/${boxId}`);
