import { useEffect, useState } from "react";
import Navbar from "../../lib/components/Navbar";

export default function Home() {
    return (
        <div>
            <Navbar button="Log in" />

            <div className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-yellow-500 to-red-600">

                <div className="absolute inset-0 flex justify-between">
                {/* Left Box (Red Box) */}
                <div className="absolute left-0 top-96 w-1/3 h-3/4 bg-red-500 opacity-40 rounded-xl transform rotate-45 z-10"></div>
                
                <div className="absolute right-0 bottom-96 w-1/3 h-3/4 bg-yellow-400 opacity-40 rounded-xl transform rotate-45 z-10"></div>
                </div>
                {/* Side Boxes for Aesthetic */}
                <div className="absolute inset-0 flex justify-between">
                {/* Left Box (Large Red Box) */}
                <div className="absolute left-0 top-[50%] w-[180px] h-[180px] bg-red-500 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                <div className="absolute left-[700px] top-[90%] w-[180px] h-[180px] bg-red-500 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                
                {/* Right Box (Large Yellow Box) */}
                <div className="absolute right-0 bottom-[10%] w-[180px] h-[180px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                <div className="absolute right-[700px] bottom-[90%] w-[180px] h-[180px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                </div>

                {/* Additional Decorative Boxes */}
                <div className="absolute inset-0 flex justify-between">
                {/* Smaller Yellow Boxes */}
                <div className="absolute left-[5%] top-[45%] w-[50px] h-[50px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                <div className="absolute left-[30%] top-[40%] w-[60px] h-[60px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                <div className="absolute right-[10%] bottom-[30%] w-[40px] h-[40px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                {/* Even smaller Yellow Boxes */}
                <div className="absolute left-[60%] top-[30%] w-[30px] h-[30px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                <div className="absolute right-[20%] top-[60%] w-[20px] h-[20px] bg-yellow-400 opacity-60 rounded-xl transform rotate-45 z-10"></div>
                </div>

                {/* Background Pattern (Subtle Grid Pattern) */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-indigo-200 opacity-30 z-0">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 10 10%22%3E%3Crect width=%2210%22 height=%2210%22 fill=%22none%22 stroke=%22rgba(0, 0, 0, 0.2)%22 stroke-width=%220.8%22 /%3E%3C/svg%3E')] opacity-20"></div>
                </div>


                {/* Content Container */}
                <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-12 w-full h-full px-6">
                
                {/* Left Content */}
                <div id="left" className="text-center md:text-left w-full md:w-1/2 text-white px-6 md:px-12">
                    <h2 className="text-3xl md:text-[72px] font-bold mb-6 leading-tight">
                    Welcome to Bennros Shell, Your Trusted Gas Station!
                    </h2>
                    <p className="text-lg md:text-[24px] mb-6">
                    Fuel up, refresh, and get back on the road with our top-tier
                    services and amenities. Where energy meets technology.
                    </p>
                    <button className="bg-gray-800 hover:bg-gray-500 text-white text-sm md:text-base font-bold py-4 px-10 rounded-full mt-6 transition duration-300 ease-in-out transform hover:scale-105">
                    <a href="/Account/Login">Get Started</a>
                    </button>
                </div>

                {/* Right Content (Logo) */}
                <div id="right" className="hidden md:block">
                    <img
                    src="/image/shell-logo.png"
                    alt="Shell Logo"
                    className="rounded-lg object-contain"
                    width={500}
                    height={500}
                    />
                </div>
                </div>
            </div>
        </div>
    );
}
