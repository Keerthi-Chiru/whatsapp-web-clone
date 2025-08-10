// src/api.js
import axios from "axios";

// Change this to your backend base URL when deployed
const API = axios.create({ baseURL: "http://localhost:5000" });

export const getConversations = () => API.get("/conversations");
export const getMessages = (wa_id) => API.get(`/messages/${wa_id}`);
export const sendMessage = (data) => API.post("/messages", data);
