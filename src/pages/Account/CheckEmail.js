import { useEffect, useState } from "react";
import Image from "next/image"; // Import the Image component
import { Chevron_left, Key, User, XmarkIcon } from "../../../lib/components/HeroIcons";

export default function Forgot_pass() {
    const [isShowScrollbar, setIsShowScrollbar] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsShowScrollbar(window.innerWidth <= 768); 
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Effect to control body overflow based on isShowScrollbar state
    useEffect(() => {
        document.body.style.overflow = isShowScrollbar ? "visible" : "hidden";
    }, [isShowScrollbar]);

    return (
        <div>
            <div
                className="bg-cover bg-center overflow-hidden relative h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500 to-red-600"
            >

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

                
                
                {/* Main content section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative z-20">
                    <div id="left" className="w-[500px] h-full md:text-left p-10 rounded-2xl bg-[#F2D323] shadow-2xl">
                        <div className="border-0 text-center max-h-[500px]">
                            <div className="mb-6 flex justify-center relative">
                                <Image src="/image/shell-logo.png" alt="Logo" width={100} height={100} />
                            </div>
                            <h1 className="text-3xl font-bold mb-10 text-[#4F5153]">Forgot Password </h1>
                            <p className=" text-[#797e83] mb-8 text-wrap">Enter your Email and we will see if you are registerd to our system</p>
                            <form action="/api/sendOTPEmail" method="POST" className="max-w-md w-full">
                                <div className="mb-8 relative">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5"/>
                                        </span>
                                        <input type="email" id="email" name="email" placeholder="Email" required className="w-full shadow-md p-2 pl-10 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-custom placeholder-custom" />
                                    </div>
                                </div>
                                                  
                                <button type="submit" className="bg-red-500 text-white px-4 w-full py-2 mb-6 rounded-lg  transition-transform transform duration-300 hover:scale-105">
                                    <a>Check It</a>
                                </button>

                                <div className="flex flex-col justify center items-center mb-4">
                                    <a href="/Account/Login" className="text-red-500 tracking-wide text-[13px] hover:text-red-700 relative">
                                        <Chevron_left className="w-4 h-4 absolute left-[-20px] top-1/2 transform -translate-y-1/2"/>
                                        Back to Login
                                    </a>
                                </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
