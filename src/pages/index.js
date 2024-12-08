import { useEffect, useState } from "react";
import Navbar from "../../lib/components/Navbar";
import Image from "next/image";
import { getIronSession } from "iron-session";
import { SESSION_OPTION } from "../../lib/session/session_option";

export default function Home() {
    const [isShowScrollbar, setIsShowScrollbar] = useState(false);

    // Handle window resize and set scrollbar visibility
    useEffect(() => {
        const handleResize = () => {
            setIsShowScrollbar(window.innerWidth <= 768); // Adjust threshold as needed
        };

        handleResize(); // Set the initial state on mount
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Control body overflow based on scrollbar visibility
    useEffect(() => {
        document.body.style.overflow = isShowScrollbar ? "visible" : "hidden";
    }, [isShowScrollbar]);

    return (
        <div>
            {/* Navbar */}
            <Navbar button="Log in" />

            {/* Hero Section */}
            <div
                className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center"
                style={{
                    backgroundImage: "url('/../image/landingpage_background2.jpg')",
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 w-full h-full bg-white opacity-50"></div>

                {/* Content Container */}
                <div className="relative w-full h-screen flex flex-col md:flex-row items-center justify-center gap-20">
                    {/* Left Content */}
                    <div id="left" className="text-center md:text-left w-full md:w-1/2 p-5">
                        <h2 className="text-3xl md:text-[72px] font-bold mb-6 text-[#181818] leading-tight">
                            Welcome to <br className="hidden md:block" />
                            Bennros Shell, Your <br className="hidden md:block" />
                            Trusted Gas Station!
                        </h2>
                        <p className="text-lg md:text-[24px] mb-3 text-black">
                            Fuel up, refresh, and get back on the road with our top-tier
                            <br /> services and amenities.
                        </p>
                        <button className="bg-gray-800 hover:bg-gray-500 text-white text-sm md:text-base font-bold py-4 px-10 rounded-full mt-4">
                            <a href="/Account/Login">Get started</a>
                        </button>
                    </div>

                    {/* Right Content (Image) */}
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
            </div>
        </div>
    );
}

// Server-side logic
export async function getServerSideProps({ req, res, query }) {
    const session = await getIronSession(req, res, SESSION_OPTION);

     //Redirect logged-in users to their account page
    if (session.username !== undefined) {
        const queryString = new URLSearchParams(query).toString(); // Preserve query params
        const destination = session.id
            ? `/Users/${session.id}${queryString ? `?${queryString}` : ""}`
            : "/";

        return {
            redirect: {
                destination,
                permanent: false,
            },
        };
    }

    return {
        props: {}, // No props needed for this page
    };
}

