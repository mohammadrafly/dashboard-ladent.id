import axios from 'axios';
import GlobalVariables from './GlobalVariables';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await axios.post(`${GlobalVariables.API_BASE_URL}/api/auth/v1/login`, { email, password });
            if (response.data.data) {
                localStorage.setItem('authToken', response.data.data.token);
                localStorage.setItem('authEmail', response.data.data.name);
            }
            
            return response.data;
        } catch (error) {
            let errorMessage = 'Login failed';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response received from the server';
            } else {
                errorMessage = error.message;
            }
            return errorMessage;
        }
    },

    logout: async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await axios.post(`${GlobalVariables.API_BASE_URL}/api/auth/v1/logout`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            localStorage.removeItem('authToken')
            localStorage.removeItem('authEmail')
            return response.data;
        } catch (error) {
            let errorMessage = 'Logout failed';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response received from the server';
            } else {
                errorMessage = error.message;
            }
            return { success: false, message: errorMessage };
        }
    },

    checkAuth: async () => {
        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('No token found');
            }
    
            const response = await axios.get(`${GlobalVariables.API_BASE_URL}/api/user`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            return response.data;
        } catch (error) {
            let errorMessage = 'Invalid token';
            if (error.response) {
                errorMessage = error.response.data.message || errorMessage;
            } else if (error.request) {
                errorMessage = 'No response received from the server';
            } else {
                errorMessage = error.message;
            }
            return errorMessage;
        }
    }
};

export default AuthService;
