import React, { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


export const ProfilePage = () => {
    const [isEditing, setEditing] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("")
    const [propic, setPropic] = useState("src/assets/default-avatar.jpg")
    const fileRef = useRef(null);
    const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

    const fetchUserData = async() => {
        try {
            const response = await axios.get(`${API_BASE_URL}/api/user/userData`, {
                withCredentials: true
            });
            const user = response.data.user;
            setName(user.name);
            setBio(user.bio);
            setPropic(user.propic || "src/assets/default-avatar.jpg");
        } 
        catch (err) {
            console.error("Error fetching user data:", err);
            toast.error("Failed to load user data.");
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [])

    const handleSave = async () => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/user/updateUser`,
                {
                    name: name,
                    bio: bio,
                    propic: propic === "src/assets/default-avatar.jpg" ? null : propic
                },
                {withCredentials: true}
            );
    
            setEditing(false);
            toast.success("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating user:", err);
            toast.error("Failed to update profile.");
        }
    }

    const handlePropic = (event) => {
        const file = event.target.files[0];
        if(file){
            const imgUrl = URL.createObjectURL(file);
            setPropic(imgUrl)
            toast.success("Profile picture changed!")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center text-white px-6">
            <h2 className="text-2xl font-semibold text-center py-6 w-full shadow-md mt-30">
                Edit Profile
            </h2>
            <div className="relative mt-4">
                <img
                    src={propic}
                    alt="Profile"
                    className="rounded-full w-42 h-42 border-4 border-gray-700"
                />
                {isEditing && (
                    <>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="absolute bottom-0 right-0 text-indigo-400 hover:text-indigo-600"
                            onClick={() => fileRef.current.click()}
                        />
                        <input type="file" ref={fileRef} accept="image/*"
                            className='hidden' onChange={handlePropic}
                        />

                        <FontAwesomeIcon
                            icon={faTrash}
                            className="absolute bottom-0 -right-5 text-indigo-400 hover:text-indigo-600"
                            onClick={() => setPropic("src/assets/default-avatar.jpg")}
                        />
                    </>                    
                )}
            </div>


            <div className="w-full max-w-md mt-12 mb-8 text-left ">
                <label className="block text-gray-300 mb-3 text-md">Name</label>
                {isEditing ? (
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-500 rounded-lg 
                        text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                ) : (
                    <p className="w-full px-4 py-4 bg-gray-800 rounded-lg">{name}</p>
                )}
            </div>

            
            <div className="w-full max-w-md mt-4 mb-10 text-left">
                <label className="block text-gray-300 mb-3 text-md">Bio</label>
                {isEditing ? (
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-500 rounded-lg 
                        text-white focus:outline-none focus:ring-2 focus:ring-indigo-700 h-28"
                    />
                ) : (
                    <p className="w-full px-4 py-4 bg-gray-800 rounded-lg">{bio}</p>
                )}
            </div>

            <button
                onClick={isEditing ? handleSave : () => setEditing(true)}
                className="bg-indigo-600 hover:bg-indigo-700 mt-6 text-white 
                px-8 py-3 text-lg rounded-full shadow-lg transition duration-300"
            >
                {isEditing ? "Save Profile" : "Edit Profile"}
            </button>


            <ToastContainer position='bottom-right' autoClose={1000} hideProgressBar />

        
        </div>
    )
}