import { useState, useEffect } from "react";
import Image from "next/image";
import { Chevron_left, Eye, EyeSlash, User, Xmark,  } from "../../../lib/components/HeroIcons";

export default function Register() {
    const [isOtpSent, setIsOtpSent] = useState(false);  
    const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]); 
    const [isOtpVerified, setIsOtpVerified] = useState(false); 
    const [isLoading, setIsLoading] = useState(false);
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [gender, setGender] = useState("");
    const [permanent_address, setPermanentAddress] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phone_num, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [countdown, setCountdown] = useState(50); 
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    

    useEffect(() => {
        let timer;
        if (isOtpSent && countdown > 0) {
            timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
        } else if (countdown === 0) {
            setIsOtpSent(false); 
            setCountdown(200); 
        }

        return () => clearInterval(timer); 
    }, [isOtpSent, countdown]);

    const handleOtpChange = (e, index) => {
        const value = e.target.value;

        if (/^[a-zA-Z0-9]*$/.test(value)) { 
            const newOtpDigits = [...otpDigits];
            newOtpDigits[index] = value;
            setOtpDigits(newOtpDigits);

            if (index < otpDigits.length - 1 && value !== "") {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

        if (!/[a-zA-Z0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
            e.preventDefault();
        }

        if (e.key === "Backspace" && index > 0 && otpDigits[index] === "") {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        setIsLoading(true);
    
        // Format the phone number by replacing +63 with 0
        const formattedPhoneNum = `0${phone_num}`; // phone_num will hold the 10 digits the user inputs.
    
        if (!first_name || !last_name || !gender || !email || !username || !permanent_address || !formattedPhoneNum || !password) {
            alert("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }
    
        // Ensure the phone number is exactly 11 digits after formatting
        if (formattedPhoneNum.length !== 11) {
            alert("Phone number must be 11 digits.");
            setIsLoading(false);
            return;
        }

        // Password validation
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and contain at least one letter, one number, and one special character.");
            setIsLoading(false);
            return;
        }
    
        const response = await fetch("/api/pendingUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                gender,
                permanent_address,
                email,
                username,
                phone_num: formattedPhoneNum, 
                password,
            }),
        });
    
        setIsLoading(false);
        if (response.ok) {
            setIsOtpSent(true);
            setCountdown(100); 
        } else {
            console.error("Error submitting form");
        }
    };
    
    const handlePhoneNumChange = (e) => {
        const value = e.target.value;
        // Allow the user to input only digits
        if (/^\d{0,10}$/.test(value)) {
            setPhoneNum(value);  // Ensure phone number stays within the length limit
        }
    };
    

    const handleOtpVerification = async (event) => {
        event.preventDefault(); 
        setIsLoading(true);

        const otp = otpDigits.join(""); 

        if (!otp) {
            alert("Please enter the OTP.");
            setIsLoading(false);
            return;
        }

        const response = await fetch("/api/pendingUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                otp,
            }),
        });

        setIsLoading(false);
        if (response.ok) {
            setIsOtpVerified(true);
            window.location.href = "/Account/Login"; 
        } else {
            alert("Invalid OTP or error verifying OTP.");
            console.error("Invalid OTP or error verifying OTP");
        }
    };

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

                <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative z-20">
                    <div className="bg-[#F2D323] w-[500px] p-6 rounded-xl shadow-2xl">
                        <Image
                            className="mx-auto"
                            src="/image/shell-logo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                        />

                        <div className="border-0 relative">
                            <h1 className="text-2xl font-bold mb-2 mt-10 text-[#4F5153] text-center">
                                {isOtpSent ? "Verify OTP" : "Create Account"}
                            </h1>
                            {isOtpSent && (
                                <div className="border-0 flex justify-center mb-4">
                                    <p className="text-light text-wrap">Enter the OTP sent to your email</p>
                                </div>
                            )}
                            <form onSubmit={isOtpSent ? handleOtpVerification : handleSubmit}>
                                {!isOtpSent ? (
                                    <>
                                        <div className="flex w-full border-0 justify-between gap-4 mb-4">
                                            <div className="border-0 w-1/2">
                                                <div className="mb-2">
                                                    <label
                                                        htmlFor="full_name"
                                                        className="block text-[#4F5153] font-semibold"
                                                    >
                                                        First Name:
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setFirstName(e.target.value)
                                                        }
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        required
                                                        className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label
                                                        htmlFor="last_name"
                                                        className="block text-[#4F5153] font-semibold"
                                                    >
                                                        Last Name:
                                                    </label>
                                                    <input
                                                        onChange={(e) =>
                                                            setLastName(e.target.value)
                                                        }
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        required
                                                        className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label
                                                        htmlFor="gender"
                                                        className="block text-[#4F5153] font-semibold"
                                                    >
                                                        Gender:
                                                    </label>
                                                    <select
                                                        id="gender"
                                                        name="gender"
                                                        required
                                                        className={`w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md ${
                                                            gender === "" ? "text-gray-500" : "text-black"
                                                        }`}
                                                        value={gender}
                                                        onChange={(e) => setGender(e.target.value)} // Update state with selected value
                                                    >
                                                        <option value="" disabled>Select Gender</option> {/* Placeholder option */}
                                                        <option value="Male" className="text-black">Male</option>
                                                        <option value="Female" className="text-black">Female</option>
                                                    </select>
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
                                            </div>
                                            <div className="border-0 w-1/2">
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
                                                    <div className="flex items-center">
                                                        <span className="bg-[#D9D9D9] text-[#4F5153] px-2 py-2 rounded-l-lg">+63</span>
                                                        <input
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                // Ensure that the value is numeric and doesn't exceed 10 digits.
                                                                if (/^\d{0,10}$/.test(value)) {
                                                                    setPhoneNum(value);  
                                                                }
                                                            }}
                                                            type="text"
                                                            id="phone_num"
                                                            name="phone_num"
                                                            required
                                                            pattern="^\d{10}$"  // Validate for exactly 10 digits (after +63)
                                                            placeholder="e.g. 9123456789"
                                                            maxLength={10}  // Limit input to 10 digits
                                                            className="w-full p-2 border-b bg-[#D9D9D9] border rounded-r-lg outline-none shadow-md"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="mb-2">
                                                    <label
                                                        htmlFor="password"
                                                        className="block text-[#4F5153] font-semibold"
                                                    >
                                                        Password:
                                                    </label>
                                                    <div className="relative">
                                                        <input
                                                            onChange={(e) => setPassword(e.target.value)}
                                                            type={isPasswordVisible ? "text" : "password"} 
                                                            id="password"
                                                            name="password"
                                                            required
                                                            placeholder="at least 8 characters"
                                                            className="w-full p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md"
                                                        />
                                                        <div
                                                            onClick={() => setIsPasswordVisible(!isPasswordVisible)} 
                                                            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                        >
                                                            {isPasswordVisible ? (
                                                                <EyeSlash className="h-5 text-gray-700" />
                                                            ) : (
                                                                <Eye className="h-5 text-gray-700" />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="mb-10">
                                       
                                        <div className="flex justify-between gap-2 mb-1 ">
                                            {otpDigits.map((digit, index) => (
                                                <input
                                                    key={index}
                                                    id={`otp-${index}`}
                                                    type="text"
                                                    value={digit}
                                                    onChange={(e) => handleOtpChange(e, index)}
                                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                                    maxLength={1}
                                                    className="w-1/6 p-2 border-b bg-[#D9D9D9] border rounded-lg outline-none shadow-md text-center"
                                                    disabled={countdown === 0}
                                                />
                                            ))}
                                        </div>
                                        <div className="border-0 flex justify-end">
                                            <label
                                                htmlFor="otp"
                                                className="block text-[#4F5153] font-[2px]"
                                            >
                                                Enter OTP (Expires in {countdown}s):
                                            </label>
                                        </div>
                                    </div>
                                )}

                                <div className="text-center md:text-left mb-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading || (isOtpSent && countdown === 0)} 
                                        className={`font-semibold border-2 bg-red-500 text-white px-4 w-full py-2 mb-6 rounded-lg transition-transform transform duration-300 hover:scale-105 ${ 
                                            isOtpSent
                                                ? "bg-green-500 text-white" 
                                                : "bg-[#F2D323] text-[#4F5153]"
                                        }`}
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center justify-center">
                                                <span className="animate-spin h-5 w-5 mr-2 border-t-2 rounded-full"></span>
                                            </span>
                                        ) : (
                                            isOtpSent ? "Verify OTP" : "Send OTP"
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {!isOtpSent && (
                            <div className="flex flex-col justify center items-center mb-4">
                                <a href="/Account/Login" className="text-red-500 tracking-wide text-[13px] hover:text-red-700 relative">
                                    <Chevron_left className="w-4 h-4 absolute left-[-20px] top-1/2 transform -translate-y-1/2"/>
                                    Back to Login
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
