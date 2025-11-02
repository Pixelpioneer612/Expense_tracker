
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gray-800 shadow-md">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                    <span className="text-brand-400">Visual</span> Expense Tracker
                </h1>
                <p className="text-gray-400 mt-1">Your personal finance dashboard.</p>
            </div>
        </header>
    );
};

export default Header;
