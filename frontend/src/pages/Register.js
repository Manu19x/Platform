import React, { useState } from 'react';
import api from '../utils/api';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/auth/register', { email, password });
            console.log('Register successful:', response.data);
            setMessage('Registration successful');
        } catch (err) {
            console.error('Register error:', err.response.data);
            setMessage(err.response.data.error || 'An error occurred');
        }
    };

    return (
        <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
            <form onSubmit={handleRegister}>
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
                <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">Register</button>
            </form>
            {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </div>
    );
};

export default Register;
