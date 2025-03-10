import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Simulate registration (replace with actual registration logic)
        if (email && password) {
            setLoggedIn(true);
            navigate('/todo'); // Redirect to ToDo page after registration
        } else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-10">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-12">
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
                        Register
                    </button>
                </form>
                <p className="mt-4 text-gray-400">
                    Already have an account?{' '}
                    <a href="/login">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};