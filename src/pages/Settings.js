import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Chevron_right, MagnifyingGlass } from "../../lib/components/HeroIcons";
import MaintenanceShutdown from "../../lib/components/MaintenanceShutdown";
import PasswordReset from "../../lib/components/PasswordReset";

export default function Settings() {
    const [pendingData, setPendingData] = useState(null);
    const [displayPendingUserPassword, setDisplayPendingUserPassword] = useState([]);
    const [userLogInData, setUserLogInData] = useState(null); // State for user login data
    const router = useRouter();
    const [activeButton, setActiveButton] = useState("maintenance");
    const [viewMode, setViewMode] = useState("maintenance");
    const [searchInput, setSearchInput] = useState("");
    const [backPath, setBackPath] = useState(""); 

    useEffect(() => {
        if (router.isReady) {
            // Parse 'pending' query parameter
            if (router.query.pending) {
                try {
                    const parsedPending = JSON.parse(router.query.pending);
                    setPendingData(parsedPending);
                    if (Array.isArray(parsedPending)) {
                        setDisplayPendingUserPassword(parsedPending);
                    }
                } catch (error) {
                    console.error("Error parsing pending data:", error);
                    setPendingData(null);
                }
            }

            // Parse 'userLogIn' query parameter
            if (router.query.userLogIn) {
                try {
                    const parsedUserLogIn = JSON.parse(router.query.userLogIn);
                    setUserLogInData(parsedUserLogIn);
                } catch (error) {
                    console.error("Error parsing userLogIn data:", error);
                    setUserLogInData(null);
                }
            }

            if (router.query.back) {
                setBackPath(router.query.back); // Set the back path from the query
            }
        }
    }, [router.isReady, router.query]);

    const navigateBack = () => {
        if (backPath) {
            router.push(backPath); 
        } else {
            console.warn("No back path provided.");
        }
    };
    const handleButtonClick = (viewMode) => {
        setActiveButton(viewMode);
        setViewMode(viewMode);
    };

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    const renderView = () => {
        switch (viewMode) {
            case "reset_pass":
                return (
                    <div className="md:px-10">
                        <PasswordReset
                            pendingData={pendingData}
                            searchInput={searchInput}
                            userLogInData={userLogInData} // Pass userLogInData to PasswordReset component
                        />
                    </div>
                );
            case "maintenance":
                return (
                    <div className="md:px-10">
                        <MaintenanceShutdown />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-start md:items-center md:px-2 px-4 gap-2">
                <span className="text-[12px] md:text-[18px] text-nowrap font-[700] text-dark">
                    Settings
                </span>
            </div>

            {/* Button Group */}
            <div className="flex md:flex-row flex-col items-center md:gap-1 justify-center mt-10">
                <div className="flex gap-10 justify-center md:mt-0 mt-5">
                    {/* Maintenance Button */}
                    <button
                        onClick={() => handleButtonClick("maintenance")}
                        className={`p-2 px-4 md:w-full w-full rounded-full text-sm font-semibold border ${
                            activeButton === "maintenance" ? "bg-accent1 text-light" : ""
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
                        {/* Password Reset Button */}
                        <button
                            onClick={() => handleButtonClick("reset_pass")}
                            className={`p-2 px-6 md:w-full w-full rounded-full text-sm font-semibold border ${
                                activeButton === "reset_pass" ? "bg-accent1 text-light" : ""
                            }`}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <span className="md:text-[14px] text-nowrap text-[12px]">
                                    Password Reset
                                </span>
                            </div>
                        </button>

                        {/* Badge for Pending Users */}
                        {displayPendingUserPassword.length > 0 && (
                            <span className="absolute top-[-10px] right-[-10px] bg-red-500 text-white rounded-full px-3 py-1 text-sm">
                                {displayPendingUserPassword.length}
                            </span>
                        )}
                    </div>
                </div>

                {/* Search Bar */}
                {viewMode === "reset_pass" && (
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

            {/* Render Active View */}
            {renderView()}
            <button
                onClick={navigateBack}
                className="px-4 py-2 rounded bg-yellow-500 text-white"
            >
                Back
            </button>
        </div>
    );
}
