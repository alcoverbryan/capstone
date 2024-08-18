import Navbar from "../Navbar";
import { useState } from "react";
import BranchModal from "../Modal";
import Modal from "../ModalMain";
import AddBranch from "../Branch/AddBranch";

export default function NavbarMain({ title, userLogIn, allBranch }) {
    console.log(allBranch)
    const [isOpen, setIsOpen] = useState(false); // State for dropdown
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
 
    return (
        <Navbar className="h-12 bg-[#F2D323] text-white px-3 py-3">
            <div className="flex justify-start items-center">
                <a className="focus:outline-none" href="#" v>
                    <img
                        src="/image/shell-logo.png"
                        alt="Home Icon"
                        className=" w-[40px]  text-black"
                        title="Home"
                    />
                </a>
                <a className="focus:outline-none" href="#" v>
                    <img
                        src="/image/Benross_logo.png"
                        alt="Home Icon"
                        className=" w-full h-[25px] text-black"
                        title="Home"
                    />
                </a>
            </div>
            <div className="flex flex-row w-full gap-8 justify-end">
                <div className="items-center border-0 flex gap-6">
                    <button className="focus:outline-none">
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
                            onClick={toggleDropdown}
                        >
                            <img
                                src="/image/fuelStation.png"
                                alt="Fuel Station Icon"
                                className="h-7 w-7 text-black"
                                title="Branch Station"
                            />
                        </button>
                        {isOpen && (
                            <div className="absolute items-center mt-3 text-black border bg-white shadow-lg p-4 rounded-lg">
                                <ul className="flex justify-center flex-col items-center">
                                    {allBranch.map((branch) => (
                                        <li key={branch.id} className="mb-2">
                                            <p className="font-semibold text-nowrap">{branch.branch_name}</p>
                                        </li>
                                    ))}
                                </ul>
                                <div className=" flex justify-center">
                                    <AddBranch userLogIn={userLogIn} />
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

                <div className="flex border-0 gap-4 items-center">
                    <p className="text-sm text-black font-semibold">{userLogIn.position}</p>
                    <button>
                        <img 
                            src="/image/User_profile.png"
                            alt="User Profile"
                            className="rounded-full h-8 w-8"
                            title="User Profile"
                        />
                    </button>
                </div>
            </div>

            

        </Navbar>
    );
}
