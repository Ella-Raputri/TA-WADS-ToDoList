import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login (replace with actual authentication logic)
        if (email === 'user@example.com' && password === 'password') {
            setLoggedIn(true);
            navigate('/todo'); // Redirect to ToDo page after login
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-12 mt-10">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-gray-400">
                    Don't have an account?{' '}
                    <a href="/register">
                        Register
                    </a>
                </p>
            </div>
        </div>
    );
};