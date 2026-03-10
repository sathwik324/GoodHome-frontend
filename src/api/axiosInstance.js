import axios from 'axios';

const BACKEND_BASE = 'https://goodhome-backend.onrender.com';

const api = axios.create({
    baseURL: BACKEND_BASE + '/api'
});

// Attach JWT token to every request (always reads current token from localStorage)
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor: cold start retries + auth error handling
api.interceptors.response.use(
    response => response,
    async error => {
        const config = error.config;

        // Render cold start: retry on network errors or 502/503/504
        const isColdStart = !error.response ||
            [502, 503, 504].includes(error.response?.status);

        if (!config._retryCount) config._retryCount = 0;

        if (isColdStart && config._retryCount < 3) {
            config._retryCount += 1;
            await new Promise(r => setTimeout(r, 3000));
            return api(config);
        }

        // 401: clear auth and redirect to login
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }

        return Promise.reject(error);
    }
);

export { BACKEND_BASE };
export default api;
