import React, { useState, useEffect } from 'react';
import '../App.css';
import Sidebar from './Partials/Sidebar';
import Navbar from './Partials/Navbar';

function AppLayouts({ title, children }) {
    const [isSidebarMinimized, setIsSidebarMinimized] = useState(() => {
        const saved = localStorage.getItem('isSidebarMinimized');
        return saved !== null ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        if (title) {
            document.title = `Dashboard | ${title}`;
        } else {
            document.title = 'Dashboard';
        }
    }, [title]);

    const handleMinimizeSidebar = () => {
        setIsSidebarMinimized(prevState => {
            const newState = !prevState;
            localStorage.setItem('isSidebarMinimized', JSON.stringify(newState));
            return newState;
        });
    };

    return (
        <main className="flex flex-col min-h-screen bg-white dark:bg-gray-900 font-sans">
            <Navbar 
                onMinimizeSidebar={handleMinimizeSidebar} z
                isSidebarMinimized={isSidebarMinimized} 
            />
            <div className="flex-grow flex flex-row">
                <Sidebar minimized={isSidebarMinimized} />
                <div className="flex-grow p-5">
                    {title != null && (
                        <div className="px-5 text-xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </div>
                    )}
                    {children}
                </div>
            </div>
        </main>
    );
}

export default AppLayouts;
