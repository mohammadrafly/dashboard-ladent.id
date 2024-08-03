import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { initializeStars, drawStars } from "../Components/StarsComponent";
import GlobalVariables from "../Utils/GlobalVariables";
import { useAuth } from "../Context/AuthContext";
import "../App.css";
import LoadingSpinner from "../Components/LoadingComponents";

const Auth = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, authChecked, authLoading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [color, setColor] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const hasNavigated = useRef(false);

    useEffect(() => {
        if (!authLoading && authChecked) {
            console.log(isAuthenticated)
            if (isAuthenticated && !hasNavigated.current) {
                navigate('/dashboard');
                hasNavigated.current = true;
            }
        }
    }, [authLoading, authChecked, isAuthenticated, navigate]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        setColor('');

        const updateCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const stars = initializeStars(canvas);
            drawStars(ctx, stars, canvas, color);
        };

        updateCanvasSize();

        window.addEventListener('resize', updateCanvasSize);

        return () => {
            window.removeEventListener('resize', updateCanvasSize);
        };
    }, [color]);

    useEffect(() => {
        if (location.state?.error) {
            setError(location.state.error);
            navigate(location.pathname, { replace: true, state: {} });
        }
        if (location.state?.message) {
            setSuccess(location.state.message);
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    useEffect(() => {
        let timer;

        if (error) {
            timer = setTimeout(() => {
                setError('');
            }, 3000);
        } else if (success) {
            timer = setTimeout(() => {
                setSuccess('');
            }, 3000);
        }

        return () => clearTimeout(timer);
    }, [error, success]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await login(email, password);
            if (response.success) {
                setSuccess(response.message)
            } else {
                setError(response.message)
            }
        } catch (error) {
            setError("Login failed. Please try again.");
        }
        setLoading(false);
    };

    return (
        <main className="relative bg-white dark:bg-gray-900 min-h-screen w-full flex justify-center items-center font-sans">
            <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
            <div className="relative md:bg-white md:border md:border-gray-100 dark:bg-gray-800 w-full max-w-md rounded-lg p-6 md:shadow-md z-10">
                {authLoading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <div className="flex justify-center items-center mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">{GlobalVariables.APP_NAME}</h1>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="bg-red-500 px-2 py-2 rounded-lg text-white">
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div className="bg-green-500 px-2 py-2 rounded-lg text-white">
                                    {success}
                                </div>
                            )}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                            </div>
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Remember Me</label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 dark:bg-blue-600 text-white dark:text-gray-200 py-2 rounded-md hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <LoadingSpinner />
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </main>
    );
}

export default Auth;
