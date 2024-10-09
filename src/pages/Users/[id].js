import { useState } from "react";
import NavbarMain from "../../../lib/components/navbars/NavbarMain";
import ChargeAccounts from "../../../lib/components/ChargeAccounts";
import WetStock from "../../../lib/components/WetStock";
import FuelPrices from "../../../lib/components/FuelPrices";
import DailyDeposit from "../../../lib/components/DailyDeposit";
import DailyDales from "../../../lib/components/DailySales";
import TransactionMonitoring from "../../../lib/components/TransactionMonitoring";
import DBManager from "../../../lib/db/DBManager";
import { DB_CONF } from "../../../lib/db/DBConf";
import AdminDashboard from "../../../lib/components/Dashboard/AdminDashboard";
import { Chevron_right } from "../../../lib/components/HeroIcons";

export default function Home({userLogIn, allBranch, allFuelPrices, allRegister}) {
    const [selectedContent, setSelectedContent] = useState("");
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const handleBackToHome = () => {
        setSelectedContent("");
    };

    return (
        <div>
            <div className="flex">
                <div
                    className={` h-screen overflow-hidden flex  bg-stone-900 transition-all duration-300 ease-in-out ${
                        isSidebarExpanded ? "md:w-[350px] w-[200px]" : "md:w-0 w-[50px]"
                    }`}
                >
                    {isSidebarExpanded && (
                        <div className=" flex flex-col items-center justify-center">
                            <div className=" border-gray-700 border-0 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4  md:px-5 px-3 hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer
                                        ${selectedContent === "fuel_prices" ? "text-white" : ""}`}
                                    onClick={() => setSelectedContent("fuel_prices")}
                                >
                                    {/* <img
                                        src="/../images/dashboard_icon.png"
                                        alt="Expand sidebar"
                                        className={` flex-shrink-0 md:h-[35px] h-[20px]  transform ${isSidebarExpanded ? "rotate-0" : "rotate-0"}`}
                                        onClick={() => {
                                            setIsSidebarExpanded(!isSidebarExpanded);
                                        }}
                                    /> */}
                                    <span className={` md:text-xl text-[12px] font-medium  duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        Fuel prices
                                    </span>
                                </a>
                            </div>

                            <div className=" border-gray-700 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center  md:gap-6 gap-4  md:px-5 px-3 hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                    ${selectedContent === "charge_acc" ? "text-white" : ""}`}
                                    onClick={() => setSelectedContent("charge_acc")}
                                >
                                    <span className={` md:text-xl text-[12px] font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        Charge accounts
                                    </span>
                                </a>
                            </div>

                            <div className=" border-gray-700 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4  md:px-5 px-3  hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                    ${selectedContent === "wet_stock" ? "text-white" : ""}`}
                                    onClick={() => setSelectedContent("wet_stock")}
                                >
                                    <span className={` md:text-xl text-[12px] font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        Wet stock deliveries 
                                    </span>
                                </a>
                            </div>

                            <div className=" border-gray-700 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4  md:px-5 px-3  hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                    ${selectedContent === "daily_deposit" ? "text-white" : ""}`}
                                    onClick={() => setSelectedContent("daily_deposit")}
                                >
                                    <span className={` md:text-xl text-[12px] font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        Daily Deposit 
                                    </span>
                                </a>
                            </div>

                            <div className=" border-gray-700 w-full font-medium mb-2 ">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4  md:px-5 px-3  hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                    ${selectedContent === "daily_sales" ? "text-white" : ""}`}
                                    onClick={() => setSelectedContent("daily_sales")}
                                >
                                    <span className={` md:text-xl text-[12px] font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        Daily Sales 
                                    </span>
                                </a>
                            </div>

                           
                        </div>
                    )} 
                </div>
                <div className="absolute  mt-[500px] items-center ">
                    <button
                        onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
                        className="text-gray-400 hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none"
                    >
                        <Chevron_right size={24} />
                    </button>
                </div>

                {selectedContent === "fuel_prices" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <FuelPrices userLogIn={userLogIn} allFuelPrices={allFuelPrices}/>
                            </div>
                        </div> 
                    </div>
                ) : selectedContent === "charge_acc" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <ChargeAccounts userLogIn={userLogIn}/>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "wet_stock" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <WetStock/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_deposit" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <DailyDeposit/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_sales" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <DailyDales/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : 
                 (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <div><AdminDashboard allBranch={allBranch} allRegister={allRegister} userLogIn={userLogIn}/></div>
                            </div>
                        </div>
                    </div>
                ) }
            </div>
        </div>
    );
}

export async function getServerSideProps({req, res, query}) {
    let db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    let userLogIn = await db_conn.getRegisterById(query.id);
    let allBranch = await db_conn.getBranch();
    let allFuelPrices = await db_conn.getFuelPrices();
    let allRegister = await db_conn.getRegister();

    return {
        props: {
            userLogIn: userLogIn,
            allBranch: allBranch,
            allFuelPrices: allFuelPrices,
            allRegister: allRegister,
        },
    }
}