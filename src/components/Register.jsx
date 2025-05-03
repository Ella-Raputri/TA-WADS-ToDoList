import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export const Register = ({ setLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const handleRegister = async (e) => {
        e.preventDefault();
        if (email && password && name) {
            try{
                const response = await axios.post(
                    `${API_BASE_URL}/api/user/register`,
                    {email, password, name, bio},
                    {withCredentials: true}
                );

                if(response.data.success){
                    toast.success("User registered successfully!");
                    setLoggedIn(true);
                    navigate('/');
                }
                else{
                    toast.error("Failed to register user!");
                }
            }
            catch(err){
                toast.error("Failed to register user!");
                console.error('Error register ', err);
            }             
        } 
        else {
            setError('Please fill in all fields');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-950 mt-10">
            <div className="bg-gray-800 p-8 rounded-lg shadow-md w-96 mt-20 mb-20">
                <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleRegister}>
                    <div className="mb-10">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                            required
                        />
                    </div>
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
                    <div className="mb-10">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-700 text-white rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-12">
                        <label className="block text-left ml-1 text-gray-300 mb-1">Description</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
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

            <ToastContainer position='bottom-right' autoClose={1000} hideProgressBar />
            
        </div>
    );
};