import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tokenManager } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check if user is authenticated on app load
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = tokenManager.getAccessToken();
                if (token) {
                    const response = await authAPI.getProfile();
                    if (response.success) {
                        setUser(response.data.user);
                        setIsAuthenticated(true);
                    }
                }
            } catch (error) {
                console.error('Auth initialization error:', error);
                tokenManager.clearTokens();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            setLoading(true);
            const response = await authAPI.login(credentials);
            
            if (response.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, user: response.data.user };
            }
            
            return { success: false, message: response.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Login failed' 
            };
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        try {
            setLoading(true);
            const response = await authAPI.register(userData);
            
            if (response.success) {
                setUser(response.data.user);
                setIsAuthenticated(true);
                return { success: true, user: response.data.user };
            }
            
            return { success: false, message: response.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Registration failed' 
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
        }
    };

    const updateProfile = async (profileData) => {
        try {
            const response = await authAPI.updateProfile(profileData);
            
            if (response.success) {
                setUser(response.data.user);
                return { success: true, user: response.data.user };
            }
            
            return { success: false, message: response.message };
        } catch (error) {
            return { 
                success: false, 
                message: error.message || 'Profile update failed' 
            };
        }
    };

    const value = {
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
