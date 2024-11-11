import Navbar from "../Navbar";
import { useState } from "react";
import AddBranch from "../Branch/AddBranch";

export default function NavbarMain({ title, userLogIn, allBranch,handleBackToHome, toggleSidebar }) {
    // const base64Image = Buffer.from(userLogIn. profile_img.data).toString();
    const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    const toggleBranchDropdown = () => {
        setIsBranchDropdownOpen(prev => !prev);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(prev => !prev);
    };

    return (
        <Navbar className=" h-12 bg-[#F2D323] text-white px-3 py-3">
            <div onClick={toggleSidebar} className="flex justify-start items-center">
                <button   className="focus:outline-none" >
                    <img
                        src="/image/shell-logo.png"
                        alt="Home Icon"
                        className="w-[40px] text-black"
                        title="Home"
                    />
                </button>
                <a className="focus:outline-none" >
                    <img
                        src="/image/Benross_logo.png"
                        alt="Home Icon"
                        className="w-full h-[25px] text-black"
                        title="Home"
                    />
                </a>
            </div>
            <div className="flex flex-row w-full gap-8 justify-end">
                <div className="items-center border-0 flex gap-6">
                    <button className="focus:outline-none" onClick={handleBackToHome}>
                        <img
                            src="/image/home.png"
                            alt="Home Icon"
                            className="h-6 w-6 text-black"
                            title="Home"
                        />
                    </button>
                    <div className="relative">
                        <button
                            className="focus:outline-none flex items-center"
                            onClick={toggleBranchDropdown}
                        >
                            <img
                                src="/image/fuelStation.png"
                                alt="Fuel Station Icon"
                                className="h-7 w-7 text-black"
                                title="Branch Station"
                            />
                        </button>
                        {isBranchDropdownOpen && (
                            <div className="absolute  mt-3 text-black border bg-white shadow-lg p-4 rounded-lg">
                                <div className="w-full">
                                    <ul className="">
                                        {allBranch.map((branch) => (
                                            <li key={branch.id} className="mb-2 ">
                                                <p className="font-semibold text-nowrap  border-0">{branch.branch_name}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 flex justify-center">
                                        <AddBranch userLogIn={userLogIn} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="focus:outline-none">
                        <img
                            src="/image/dashboard.png"
                            alt="Dashboard Icon"
                            className="h-7 w-7 text-black"
                            title="Dashboard"
                        />
                    </button>
                    <a href="/" className="text-lg font-semibold">
                        {title}
                    </a>
                </div>

                <div className="relative">
                    <div className="flex items-center gap-4">
                        <p className="text-sm text-black font-semibold">{userLogIn.position}</p>
                        {/* <button onClick={toggleUserDropdown}>
                            <img 
                                src={base64Image} alt="Image"
                                className="rounded-full h-8 w-8"
                                title="User Profile"
                            />
                        </button> */}
                    </div>
                    {isUserDropdownOpen && (
                        <div className="absolute right-0 mt-3 text-black border bg-white shadow-lg rounded-lg w-48">
                            <ul className="">
                                <li>
                                    <a href="/profile" className="block px-4  py-2 text-gray-700 hover:bg-gray-100">Profile</a>
                                </li>
                                <li>
                                    <a href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</a>
                                </li>
                                <li>
                                    <a href="/Account/Login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                   
                </div>
            </div>
        </Navbar>
    );
}
