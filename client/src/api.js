import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor for adding auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/admin';
        }
        return Promise.reject(error);
    }
);

// Auth helper functions
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};

export const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    window.location.href = '/admin';
};

export default api;