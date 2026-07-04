import axios from 'axios';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_GATEWAY_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    if (!config.headers.Authorization) {
        const token = localStorage.getItem("user_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }

    return config;
});