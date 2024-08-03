import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Bars3Icon, UserIcon, Cog6ToothIcon, ArrowLeftEndOnRectangleIcon, MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import useFetchUser from "../../Utils/FetchUser";
import LogoutModal from "../../Components/LogoutModal";

function Navbar({ onMinimizeSidebar, isSidebarMinimized }) {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { user, loading, error } = useFetchUser();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize darkMode state from localStorage
        const storedDarkMode = localStorage.getItem('darkMode');
        return storedDarkMode === 'true';
    });
    const dropdownRef = useRef(null);
    const userIconRef = useRef(null);

    useEffect(() => {
        // Apply dark mode class based on state
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Store dark mode preference in localStorage
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = async () => {
        try {
            const result = await logout();

            if (result.success) {
                navigate('/', { state: { message: result.message } });
            } else {
                console.error('Logout failed:', result.error || 'An error occurred');
            }
        } catch (error) {
            console.error('An unexpected error occurred during logout:', error);
        } finally {
            closeModal();
        }
    };

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) && 
                !userIconRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, userIconRef]);

    return (
        <nav className="bg-white shadow-md dark:bg-gray-800">
            <div className="">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex justify-between items-center">
                        <div className="w-64 flex justify-center items-center">
                            <span className="font-semibold text-xl dark:text-blue-500">
                                Dashboard Ladent
                            </span>
                        </div>
                        <button
                            onClick={onMinimizeSidebar}
                            className="px-10 flex items-center text-gray-800 dark:text-white rounded-md text-sm font-medium hover:text-blue-500"
                        >
                            <span className={`transition-transform duration-300 ${isSidebarMinimized ? '' : ''}`}>
                                {isSidebarMinimized ? (
                                    <Bars3Icon className="h-5 w-5" />
                                ) : (
                                    <Bars3Icon className="h-5 w-5" />
                                )}
                            </span>
                        </button>
                    </div>
                    <div className="flex justify-between items-center relative">
                        <div className="px-8 flex justify-center items-center">
                            <button
                                onClick={toggleDarkMode}
                                className="flex text-sm border-transparent rounded-full focus:outline-none transition duration-150 ease-in-out mr-3"
                            >
                                {darkMode ? (
                                    <SunIcon className="h-5 w-5 text-gray-700 dark:text-white" />
                                ) : (
                                    <MoonIcon className="h-5 w-5 text-gray-700 dark:text-white" />
                                )}
                            </button>
                            <div className="relative ml-3">
                                <div className="hover:bg-gray-100 dark:hover:bg-gray-600 p-2 rounded-full">
                                    <button
                                        onClick={toggleDropdown}
                                        ref={userIconRef}
                                        className="flex text-sm border-transparent rounded-full focus:outline-none transition duration-150 ease-in-out"
                                    >
                                        <UserIcon className="h-5 w-5 text-gray-700 dark:text-white" />
                                    </button>
                                </div>
                                {dropdownOpen && (
                                    <div
                                        ref={dropdownRef}
                                        className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-in-out ${
                                            dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                        }`}
                                    >
                                        <div className="py-4 px-4">
                                            {loading ? 'Loading...' : <span className="font-semibold text-gray-700 dark:text-white">{user.data.email}</span>}
                                            {error ? `Error ${error}` : ''}
                                        </div>
                                        <a
                                            href="/dashboard/profile"
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                        >
                                            <UserIcon className="h-5 w-5 mr-2" />
                                            Profile
                                        </a>
                                        <a
                                            href="/dashboard/settings"
                                            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                        >
                                            <Cog6ToothIcon className="h-5 w-5 mr-2" />
                                            Settings
                                        </a>
                                        <button
                                            onClick={openModal}
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                                        >
                                            <ArrowLeftEndOnRectangleIcon className="h-5 w-5 mr-2" />
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LogoutModal isOpen={isModalOpen} closeModal={closeModal} handleLogout={handleLogout} />
        </nav>
    );
}

export default Navbar;
