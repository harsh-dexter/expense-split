import React from 'react';

function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-800 mt-12 border-t border-gray-200 dark:border-gray-700">
             <div className="container mx-auto p-4 md:p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                <p>&copy; {new Date().getFullYear()} Expense Splitter. Simplify your shared costs.</p>
            </div>
        </footer>
    );
}

export default Footer;
