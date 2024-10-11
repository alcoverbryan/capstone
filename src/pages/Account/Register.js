import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, Chevron_left, XmarkIcon } from "../../../lib/components/HeroIcons";

export default function Register() {  // Make sure the component name is Register, not Login
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

    useEffect(() => {
        document.body.style.overflow = isShowScrollbar ? "visible" : "hidden";
    }, [isShowScrollbar]);

    const [full_name, setFullName] = useState("");
    const [permanent_address, setPermanentAddress] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone_num, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                full_name,
                permanent_address,
                email,
                username,
                phone_num,
                password,
            }),
        });

        if (response.ok) {
            window.location.href = "/Account/Login";
        } else {
            console.error("Error submitting form");
        }
    };

    return (
        <div>
            <div
                className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center overflow-auto"
                style={{
                    backgroundImage: "url('/../image/1.jpg')",
                }}
            >
                {/* Semi-transparent overlay */}
                <div className="absolute inset-0 bg-white opacity-50"></div>

                {/* Main content section */}
                <div className="flex flex-col items-center justify-center gap-10 w-full h-full relative">
                    <div className="bg-[#F2D323] w-[500px] p-6 rounded-xl">
                        <Image
                            className="mx-auto"
                            src="/image/shell-logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                        />

                        <div className="border-0 relative">
                            <h1 className="text-2xl font-bold mb-4 text-[#4F5153] text-center">
                                Create Account
                            </h1>
                            <form onSubmit={handleSubmit}>
                                <div className="flex w-full border-0 justify-between gap-4 mb-4">
                                    <div className="border-0 w-1/2">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="full_name"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                Full Name:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setFullName(e.target.value)
                                                }
                                                type="text"
                                                id="full_name"
                                                name="full_name"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="email"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                Email:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="username"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                User Name:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setUsername(e.target.value)
                                                }
                                                type="text"
                                                id="username"
                                                name="username"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div className="border-0 w-1/2">
                                        <div className="mb-2">
                                            <label
                                                htmlFor="permanent_address"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                Permanent Address:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPermanentAddress(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                id="permanent_address"
                                                name="permanent_address"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="phone_num"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                Phone No:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPhoneNum(e.target.value)
                                                }
                                                type="number"
                                                id="phone_num"
                                                name="phone_num"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                        <div className="mb-2">
                                            <label
                                                htmlFor="password"
                                                className="block text-[#4F5153] font-semibold"
                                            >
                                                Password:
                                            </label>
                                            <input
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                type="password"
                                                id="password"
                                                name="password"
                                                required
                                                className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="text-center md:text-left mb-4">
                                    <button
                                        type="submit"
                                        className="bg-red-500 w-full text-white px-4 py-2 rounded-lg transition-transform duration-300 transform hover:scale-105"
                                    >
                                        Submit
                                    </button>
                                </div>
                                <div className="flex flex-col justify-center items-center mb-4">
                                    <a
                                        href="/Account/Login"
                                        className="text-red-500 tracking-wide text-[13px] hover:text-red-700 relative"
                                    >
                                        <Chevron_left className="w-4 h-4 absolute left-[-20px] top-1/2 transform -translate-y-1/2" />
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
