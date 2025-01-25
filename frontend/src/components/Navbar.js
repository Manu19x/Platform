import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-2xl font-bold">Fiverr Clone</h1>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:text-gray-400">Home</a></li>
                    <li><a href="/login" className="hover:text-gray-400">Login</a></li>
                    <li><a href="/register" className="hover:text-gray-400">Register</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
