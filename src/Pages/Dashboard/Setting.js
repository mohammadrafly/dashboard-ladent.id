import React, { useState, useEffect } from 'react';
import AppLayouts from "../../Layouts/AppLayouts";

function Setting() {
    const [mode, setMode] = useState(() => {
        // Initialize mode state from localStorage
        const storedMode = localStorage.getItem('mode');
        return storedMode || 'system';
    });

    useEffect(() => {
        // Apply mode based on state
        switch (mode) {
            case 'dark':
                document.documentElement.classList.add('dark');
                break;
            case 'light':
                document.documentElement.classList.remove('dark');
                break;
            case 'system':
                // Detect system theme preference
                if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    document.documentElement.classList.add('dark');
                } else {
                    document.documentElement.classList.remove('dark');
                }
                break;
            default:
                document.documentElement.classList.remove('dark');
        }
        // Store mode preference in localStorage
        localStorage.setItem('mode', mode);
    }, [mode]);

    const handleModeChange = (event) => {
        setMode(event.target.value);
    };

    return (
        <AppLayouts title="Settings">
            <div className="p-6 max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Settings</h2>

                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme Mode</h3>
                        <div className="mt-2">
                            <select
                                value={mode}
                                onChange={handleModeChange}
                                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            >
                                <option value="system">System</option>
                                <option value="light">Light Mode</option>
                                <option value="dark">Dark Mode</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Coming Soon</h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            This feature is currently under development. Stay tuned for updates!
                        </p>
                    </div>
                </div>
            </div>
        </AppLayouts>
    );
}

export default Setting;
