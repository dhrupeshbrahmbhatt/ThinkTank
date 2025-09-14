import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Token management
const TOKEN_KEY = 'thinktank_access_token';
const USER_ID_KEY = 'thinktank_user_id';

export const tokenManager = {
    getAccessToken: () => localStorage.getItem(TOKEN_KEY),
    getUserId: () => localStorage.getItem(USER_ID_KEY),
    setTokenAndUserId: (accessToken, userId) => {
        localStorage.setItem(TOKEN_KEY, accessToken);
        localStorage.setItem(USER_ID_KEY, userId);
        console.log('💾 Access Token saved:', accessToken);
        console.log('💾 User ID saved:', userId);
    },
    clearTokens: () => {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        console.log('🗑️ Tokens and User ID cleared from localStorage');
    },
};

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = tokenManager.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle unauthorized requests
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            console.log('❌ Unauthorized request - redirecting to signin');
            // Clear tokens and redirect to login
            tokenManager.clearTokens();
            window.location.href = '/signin';
        }

        return Promise.reject(error);
    }
);

// Authentication API methods
export const authAPI = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            console.log('📝 Registration API Response:', response.data);
            
            if (response.data.success) {
                const { accessToken } = response.data.data.tokens;
                const { id: userId } = response.data.data.user;
                console.log('🔑 Access Token (Register):', accessToken);
                console.log('👤 User ID (Register):', userId);
                tokenManager.setTokenAndUserId(accessToken, userId);
            }
            
            return response.data;
        } catch (error) {
            console.error('❌ Registration API Error:', error);
            throw error.response?.data || { message: 'Registration failed' };
        }
    },

    // Login user
    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            console.log('🔐 Login API Response:', response.data);
            
            if (response.data.success) {
                const { accessToken } = response.data.data.tokens;
                const { id: userId } = response.data.data.user;
                console.log('🔑 Access Token (Login):', accessToken);
                console.log('👤 User ID (Login):', userId);
                tokenManager.setTokenAndUserId(accessToken, userId);
            }
            
            return response.data;
        } catch (error) {
            console.error('❌ Login API Error:', error);
            throw error.response?.data || { message: 'Login failed' };
        }
    },

    // Logout user
    logout: async () => {
        try {
            await api.post('/auth/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            tokenManager.clearTokens();
        }
    },

    // Logout from all devices
    logoutAll: async () => {
        try {
            await api.post('/auth/logout-all');
        } catch (error) {
            console.error('Logout all error:', error);
        } finally {
            tokenManager.clearTokens();
        }
    },

    // Get current user profile
    getProfile: async () => {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to get profile' };
        }
    },

    // Update user profile
    updateProfile: async (profileData) => {
        try {
            const response = await api.put('/auth/profile', profileData);
            return response.data;
        } catch (error) {
            throw error.response?.data || { message: 'Failed to update profile' };
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!tokenManager.getAccessToken();
    },
};

export default api;
