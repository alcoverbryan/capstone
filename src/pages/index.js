import { useEffect, useState } from "react";
import Navbar from "../../lib/components/Navbar";
import Image from "next/image";

export default function Home() {
    const [isShowScrollbar, setIsShowScrollbar] = useState(false);

    // Effect to handle window resize and scrollbar visibility
    useEffect(() => {
        const handleResize = () => {
            setIsShowScrollbar(window.innerWidth <= 768); // Adjust threshold as needed
        };

        handleResize(); // Initial call to set the initial state
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
            <Navbar button="Log in" />
            <div
                className={`relative bg-cover bg-center h-screen flex flex-col border-0 border-green-500 justify-center items-center overflow-auto`}
                style={{
                    backgroundImage: "url('/../image/1.jpg')",
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute border-0 border-yellow-500 inset-0 w-full h-full bg-white opacity-50"></div>
                
                {/* Main content section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-20 border-0 border-red-500 w-full relative h-screen">
                    <div id="left" className="text-center md:text-left p-1 border-0 w-1/2">
                        <h2 className="text-3xl md:text-[72px] font-bold mb-6 mt-10 text-[#181818] leading-tight">
                            Welcome to <br className="l:hidden" /> Bennros Shell, Your <br className="md:hidden" /> Trusted Gas <br className="md:hidden" /> Station!
                        </h2>

                        <p className="text-lg md:text-[24px] mb-3 text-black">
                            Fuel up, refresh, and get back on the road with our top-tier{" "}
                            <br /> services and amenities.
                        </p>
                        <button
                            className="bg-gray-800 hover:bg-gray-500 text-white text-sm md:text-base font-bold py-4 px-10 rounded-full mt-4"
                        >
                            <a href="/Account/Login ">Get started</a>
                        </button>
                    </div>
                    <div id="right" className="hidden md:block">
                        <Image
                            src="/image/gas-station-model.png"
                            alt="Gas Station Model"
                            layout="intrinsic"
                            width={730}
                            height={730}
                            className="rounded-lg object-contain"
                        />
                    </div>
                </div>

                {/* Login modal */}
                
            </div>
        </div>
    );
}
