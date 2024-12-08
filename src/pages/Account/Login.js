import { useEffect, useState } from "react";
import { Eye, EyeSlash, Key, User, Xmark } from "../../../lib/components/HeroIcons";

export default function Login() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        try {
            const response = await fetch("/api/logInUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                window.location.href = `/Users/${data.userId}`;
            } else {
                const errorData = await response.json();
                window.alert(errorData.error);
            }
        } catch (error) {
            console.error("Login error:", error);
            window.alert("An error occurred. Please try again.");
        }
    };

    return (
        <div
            className=" bg-cover bg-center overflow-hidden relative h-screen flex flex-col justify-center items-center bg-gradient-to-br from-yellow-500 to-red-600"
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

            {/* Content Section */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative z-20">
                <div
                    id="left"
                    className="w-[500px] h-full md:text-left p-10 rounded-2xl bg-[#F2D323] shadow-2xl"
                >
                    <div className="border-0 text-center max-h-[500px]">
                        <div className="mb-6 flex justify-center relative">
                            <img src="/image/shell-logo.png" alt="Logo" width={100} height={100} />
                            <button className="absolute right-0 top-0 text-red-500" aria-label="Close">
                                <a href="/">
                                    <Xmark />
                                </a>
                            </button>
                        </div>
                        <h1 className="text-3xl font-bold mb-10 text-[#4F5153]">Bennros Shell</h1>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-8 relative">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <User className="h-5" />
                                    </span>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder="Username"
                                        required
                                        className="w-full shadow-md p-2 pl-10 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-custom placeholder-custom"
                                    />
                                </div>
                            </div>

                            <div className="relative mb-10">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Key className="h-5" />
                                    </span>
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Password"
                                        required
                                        className="w-full shadow-md p-2 pl-10 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-custom placeholder-custom"
                                    />
                                    <span
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                        className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                                    >
                                        {isPasswordVisible ? (
                                            <EyeSlash className="h-5 text-gray-700" />
                                        ) : (
                                            <Eye className="h-5 text-gray-700" />
                                        )}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="bg-red-500 text-white px-4 w-full py-2 mb-6 rounded-lg transition-transform transform duration-300 hover:scale-105"
                            >
                                Login
                            </button>
                        </form>

                        <div className="flex justify-center items-center space-x-2">
                            <p className="text-[18px] text-[#4F5153]">New on our platform?</p>
                            <a href="/Account/Register" className="text-red-500 text-[18px]">
                                Create New Account
                            </a>
                        </div>
                        <a href="/Account/CheckEmail" className="text-red-500 block">
                            Forgot password?
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
}
