import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from '../Utils/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const result = await AuthService.checkAuth();
                setIsAuthenticated(result.success);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setAuthLoading(false);
                setAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await AuthService.login(email, password);
            if (response.success) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            return response;
        } catch (error) {
            setIsAuthenticated(false);
            throw error;
        }
    };

    const logout = async () => {
        try {
            const response = await AuthService.logout();
            setIsAuthenticated(false);
            return response;
        } catch (error) {
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ authChecked, authLoading, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
