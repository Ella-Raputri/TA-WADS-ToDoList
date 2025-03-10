import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


export const Homepage = ({setPage}) => {
    const navigate = useNavigate();

    const goToDo = () => {
        navigate("/todo");
        setPage("To Do");
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col items-center justify-center text-white">

            <div className="text-center mb-8 mt-25 md:mt-15">
                <h2 className="text-lg sm:text-2xl font-light text-gray-300">
                Boost Your Efficiency with
                </h2>
                <h1 className="text-4xl sm:text-5xl font-bold saira-stencil text-white mt-4">
                TO DO LIST
                </h1>
            </div>

            <button
                onClick={goToDo}
                className="bg-indigo-600 hover:bg-indigo-700 mt-6 text-white px-6 py-3 rounded-lg shadow-lg transition duration-300"
            >
                Get Started
            </button>

            <div className="w-full max-w-4xl mt-25 px-6">
                <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-10"
                >
                {[
                    { title: "Easy Task Management", desc: "Organize tasks effortlessly." },
                    { title: "Neat Scheduling", desc: "No messy to do list." },
                    { title: "Effortless to Use", desc: "Add, tick, and that's it." },
                    { title: "Sync Across Devices", desc: "Access from anywhere." },
                ].map((feature, index) => (
                    <SwiperSlide key={index}>
                    <div className="p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-lg text-center border border-white/20 py-20 min-h-64">
                        <h3 className="text-xl font-semibold">{feature.title}</h3>
                        <p className="text-md text-gray-300 mt-4">{feature.desc}</p>
                    </div>
                    </SwiperSlide>
                ))}
                </Swiper>
            </div>
            </div>

    )
}