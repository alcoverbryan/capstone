import { useState, useEffect } from "react";
import { MagnifyingGlass } from "../../lib/components/HeroIcons";
import MaintenanceShutdown from "../../lib/components/MaintenanceShutdown";
import PasswordReset from "../../lib/components/PasswordReset";
import UserConfirmation from "../../lib/components/UserConfirmation";
import SettingsModal from "./SettingsModal";

export default function Settings({ userLogIn, getPendingUsers, displayAllPendingPassword }) {
    // State Variables
    const [viewMode, setViewMode] = useState("maintenance"); // Default view mode
    const [searchInput, setSearchInput] = useState("");
    const [activeButton, setActiveButton] = useState("maintenance");
    const [pendingData, setPendingData] = useState([]); // Pending password reset data
    const [pendingUsers, setPendingUsers] = useState([]); // Pending user confirmation data

    // Fetch pending data on mount or prop change
    useEffect(() => {
        if (Array.isArray(getPendingUsers)) {
            setPendingUsers(getPendingUsers);
        }
        if (Array.isArray(displayAllPendingPassword)) {
            setPendingData(displayAllPendingPassword);
        }
    }, [getPendingUsers, displayAllPendingPassword]);

    // Button click handler to switch views
    const handleButtonClick = (mode) => {
        setViewMode(mode);
        setActiveButton(mode);
    };

    // Search handler
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    // Dynamic rendering of view modes
    const renderView = () => {
        switch (viewMode) {
            case "reset_pass":
                return (
                    <div className="md:px-10">
                        <PasswordReset
                            pendingData={pendingData}
                            searchInput={searchInput}
                            userLogIn={userLogIn}
                        />
                    </div>
                );
            case "maintenance":
                return (
                    <div className="md:px-10">
                        <MaintenanceShutdown />
                    </div>
                );
            case "confirm_user":
                return (
                    <div className="md:px-10">
                        <UserConfirmation
                            pendingUserData={pendingUsers}
                            searchInput={searchInput}
                            userLogIn={userLogIn}
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <SettingsModal title="Add Devices" title_text="Settings" save_button="Save">
                <div>
                    {/* Button Group */}
                    <div className="flex md:flex-row flex-col items-center md:gap-1 justify-center mt-10">
                        <div className="flex gap-10 justify-center md:mt-0 mt-5">
                            {/* Maintenance Button */}
                            <button
                                onClick={() => handleButtonClick("maintenance")}
                                className={`p-2 px-4 md:w-full w-full rounded-full text-sm font-semibold border ${
                                    activeButton === "maintenance" ? "bg-[#F2D323] text-light" : ""
                                }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="md:text-[14px] text-nowrap text-[12px]">
                                        Maintenance Shutdown
                                    </span>
                                </div>
                            </button>

                            {/* Password Reset Button */}
                            <div className="relative flex justify-center items-center">
                                <button
                                    onClick={() => handleButtonClick("reset_pass")}
                                    className={`p-2 px-6 md:w-full w-full rounded-full text-sm font-semibold border ${
                                        activeButton === "reset_pass" ? "bg-[#F2D323] text-light" : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="md:text-[14px] text-nowrap text-[12px]">
                                            Password Reset
                                        </span>
                                    </div>
                                </button>

                                {/* Badge for Pending Password Resets */}
                                {pendingData.length > 0 && (
                                    <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                                        {pendingData.length}
                                    </span>
                                )}
                            </div>

                            {/* User Confirmation Button */}
                            <div className="relative flex justify-center items-center">
                                <button
                                    onClick={() => handleButtonClick("confirm_user")}
                                    className={`p-2 px-6 md:w-full w-full rounded-full text-sm font-semibold border ${
                                        activeButton === "confirm_user" ? "bg-[#F2D323] text-light" : ""
                                    }`}
                                >
                                    <div className="flex items-center justify-center gap-2">
                                        <span className="md:text-[14px] text-nowrap text-[12px]">
                                            User Confirmation
                                        </span>
                                    </div>
                                </button>

                                {/* Badge for Pending User Confirmations */}
                                {pendingUsers.length > 0 && (
                                    <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                                        {pendingUsers.length}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Search Bar */}
                        {(viewMode === "reset_pass" || viewMode === "confirm_user") && (
                            <div className="flex relative ml-10">
                                <input
                                    type="text"
                                    placeholder="Search Name..."
                                    className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                                    onChange={(e) => searchItems(e.target.value)}
                                />
                                <div className="absolute top-0 left-0 h-full flex items-center pr-2">
                                    <MagnifyingGlass className="md:w-5 w-4 md:h-5 h-4" />
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Dynamic View Rendering */}
                    {renderView()}
                </div>
            </SettingsModal>
        </>
    );
}
