import React from 'react';
import { useLocation } from 'react-router-dom';
import { HomeIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/24/outline';

function Sidebar({ minimized }) {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className={`transition-all duration-300 ${minimized ? 'w-24' : 'w-64'} p-5 bg-white shadow-xl border-r border-gray-100 dark:border-gray-900 dark:bg-gray-800 text-gray-700 dark:text-gray-200`}>
            <nav>
                <ul>
                    <li className="py-2">
                        <a
                            href="/dashboard"
                            className={`flex items-center ${minimized ? 'justify-center' : ''} hover:bg-blue-500 hover:text-white p-2 rounded-lg w-full ${isActive('/dashboard') ? 'font-bold text-blue-500 bg-gray-200 dark:bg-gray-700' : ''}`}
                        >
                            <HomeIcon className={`h-5 w-5 ${minimized ? '' : 'mr-2'}`} />
                            {!minimized && 'Home'}
                        </a>
                    </li>
                    <li className="py-2">
                        <a
                            href="/dashboard/posts"
                            className={`flex items-center ${minimized ? 'justify-center' : ''} hover:bg-blue-500 hover:text-white p-2 rounded-lg w-full ${isActive('/dashboard/posts') ? 'font-bold text-blue-500 bg-gray-200 dark:bg-gray-700' : ''}`}
                        >
                            <DocumentTextIcon className={`h-5 w-5 ${minimized ? '' : 'mr-2'}`} />
                            {!minimized && 'Posts'}
                        </a>
                    </li>
                    <li className="py-2">
                        <a
                            href="/dashboard/artists"
                            className={`flex items-center ${minimized ? 'justify-center' : ''} hover:bg-blue-500 hover:text-white p-2 rounded-lg w-full ${isActive('/dashboard/artists') ? 'font-bold text-blue-500 bg-gray-200 dark:bg-gray-700' : ''}`}
                        >
                            <UserIcon className={`h-5 w-5 ${minimized ? '' : 'mr-2'}`} />
                            {!minimized && 'Artists'}
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
