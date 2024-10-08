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
                className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center overflow-auto"
                style={{
                    backgroundImage: "url('/../image/1.jpg')",
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 w-full h-full bg-white opacity-50"></div>
                
                {/* Main content section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative">
                    <div id="left" className="w-[500px] h-full md:text-left p-10 rounded-2xl bg-[#F2D323]">
                        <div className="border-0 text-center max-h-[500px]">
                            <div className="mb-6 flex justify-center relative">
                                <Image src="/image/shell-logo.png" alt="Logo" width={100} height={100} />
                            </div>
                            <h1 className="text-3xl font-bold mb-10 text-[#4F5153]">Forgot Password </h1>
                            <p className=" text-[#797e83] mb-8 text-wrap">Enter your Email and we will see if you are registerd to our system</p>
                            <form action="/api/sendOTPEmail" method="post" className="max-w-md w-full">
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
