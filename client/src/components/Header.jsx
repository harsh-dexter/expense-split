import React from 'react';
import { AppLogo, MoonIcon, SunIcon } from './icons';

function Header({ theme, toggleTheme }) {
    return (
        <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/80 sticky top-0 z-40">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex justify-between items-center h-16">
                     <div className="flex items-center gap-3">
                        <AppLogo />
                        <h1 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">Expense Splitter</h1>
                    </div>
                    <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors">
                        {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
