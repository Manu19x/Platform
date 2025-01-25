import React, { useState } from 'react';
import api from '../utils/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/login', { email, password });
            console.log('Login successful:', response.data);
            setMessage('Login successful');
            localStorage.setItem('token', response.data.token); // Stocăm token-ul
        } catch (err) {
            console.error('Login error:', err.response.data);
            setMessage(err.response.data.error || 'An error occurred');
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full p-2 border rounded mt-1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border rounded mt-1"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </div>
    );
};

export default Login;
