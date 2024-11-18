import Navbar from "../Navbar";
import { useState } from "react";
import AddBranch from "../Branch/AddBranch";
import { EllipsisVertical, ProfileIcon, PowerIcon, GearIcon } from "../HeroIcons";

export default function NavbarMain({ title, userLogIn, allBranch,handleBackToHome, toggleSidebar, }) {
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
            <div className="flex flex-row w-full justify-end">
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
                            <div className="absolute  mt-3 right-0 text-black border bg-white shadow-lg p-4 rounded-lg">
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

                    <a href="/" className="text-lg font-semibold">
                        {title}
                    </a>
                </div>

                <div className="relative">
                    <div className="flex items-center gap-2">
                        <button  className="text-sm text-black font-semibold">{userLogIn.position}</button>
                        <button onClick={toggleUserDropdown} className="">
                            <EllipsisVertical  className="h-8 text-red-500"/>
                        </button>
                    </div>
                    {isUserDropdownOpen && (
                        <div className="absolute right-0 mt-3 text-black border bg-white shadow-lg rounded-lg w-48">
                            <ul className="">
                                <li className="flex items-center px-4 justify-start hover:bg-gray-100">
                                    <ProfileIcon className="w-5 h-5"/>
                                    <a href="/UserProfile" className="block px-4 py-2 text-gray-700">Profile</a>
                                </li>
                                <li className="flex items-center px-4 justify-start hover:bg-gray-100">
                                    <GearIcon className="w-7 h-7"/>
                                    <a href="/settings" className="block px-4 py-2 text-gray-700">Settings</a>
                                </li>
                                <li className="flex items-center px-4 justify-start hover:bg-gray-100">
                                    <PowerIcon className="w-4 h-4"/>
                                    <a href="/Account/Login" className="block px-4 py-2 text-gray-700">Logout</a>
                                </li>
                            </ul>
                        </div>
                    )}
                   
                </div>
            </div>
        </Navbar>
    );
}