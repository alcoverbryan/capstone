import { useEffect, useState } from "react";
import { Eye, EyeSlash, Key, User, Xmark } from "../../../lib/components/HeroIcons";
import ActionButton from "../../../lib/components/Forms/ActionButton";

export default function Login() {
    const [isShowScrollbar, setIsShowScrollbar] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
        <div>
            <div
                className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center overflow-auto"
                style={{
                    backgroundImage: "url('/../image/1.jpg')",
                }}
            >
                <div className="absolute inset-0 w-full h-full bg-white opacity-50"></div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative">
                    <div id="left" className="w-[500px] h-full md:text-left p-10 rounded-2xl bg-[#F2D323]">
                        <div className="border-0 text-center max-h-[500px]">
                            <div className="mb-6 flex justify-center relative">
                                <img src="/image/shell-logo.png" alt="Logo" width={100} height={100} />
                                <button className="absolute right-0 top-0 text-red-500" aria-label="Close">
                                    <a href="/">
                                        <Xmark/>
                                    </a>
                                </button>
                            </div>
                            <h1 className="text-3xl font-bold mb-10 text-[#4F5153]">Bennros Shell</h1>
                            
                            <form onSubmit={handleSubmit}>
                                <div className="mb-8 relative">
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5"/>
                                        </span>
                                        <input type="text" id="username" name="username" placeholder="Username" required className="w-full shadow-md p-2 pl-10 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-custom placeholder-custom" />
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
                                
                                <button type="submit" className="bg-red-500 text-white px-4 w-full py-2 mb-6 rounded-lg  transition-transform transform duration-300 hover:scale-105">Login</button>
                            </form>

                            <div className="flex justify-center items-center space-x-2">
                                <p className="text-[18px] text-[#4F5153]">New on our platform?</p>
                                <a href="/Account/Register" className="text-red-500 text-[18px]">Create New Account</a>
                            </div>
                            <a href="/Account/CheckEmail" className="text-red-500 block">Forgot password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
