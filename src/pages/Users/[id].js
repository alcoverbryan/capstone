
import { useEffect, useState } from "react";
import NavbarMain from "../../../lib/components/navbars/NavbarMain";
import ChargeAccounts from "../../../lib/components/ChargeAccounts";
import WetStock from "../../../lib/components/WetStock";
import DailyDip from "../../../lib/components/WetStockContent/DailyDip";
import DailySalesVol from "../../../lib/components/WetStockContent/DailySalesVol";
import Inventory from "../../../lib/components/WetStockContent/Inventory";
import FuelPrices from "../../../lib/components/FuelPrices";
import DailyDeposit from "../../../lib/components/DailyDeposit";
import DailyDales from "../../../lib/components/DailySales";
import DBManager from "../../../lib/db/DBManager";
import { DB_CONF } from "../../../lib/db/DBConf";
import AdminDashboard from "../../../lib/components/Dashboard/AdminDashboard";
import { Chevron_right } from "../../../lib/components/HeroIcons";
import { useRouter } from "next/router";
import LossOrGain from "../../../lib/components/WetStockContent/PriceG&L";
import { getIronSession } from "iron-session";
import { SESSION_OPTION } from "../../../lib/session/session_option";
import PaidAccounts from "../../../lib/components/PaidAccounts";
import UnpaidAccounts from "../../../lib/components/UnpaidAccounts";

export default function Home({userLogIn, allBranch, allFuelPrices, allRegister, allChargeAccount, allDailySales, allActualPOS, displayAllPending, getDailyDeposit, getPendingUsers, getDailyDip, getFuelDeliveries, getDailySalesVolumes, getDailySalesPos, getPumpPrices}) {
    console.log(getPumpPrices)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const router = useRouter();
    const { view } = router.query; 
    const [selectedContent, setSelectedContent] = useState("");
    const [isWetStockDropdownOpen, setIsWetStockDropdownOpen] = useState(false); 
    const [isChargeAccountDropdownOpen, setIsChargeAccountDropdownOpen] = useState(false); 
    useEffect(() => {
        if (view) {
            setSelectedContent(view);
        }
    }, [view]);

    const handleBackToHome = () => {
        setSelectedContent("");
        router.push(`/Users/${userLogIn.id}/?view=" "`); 
    };
    
    const handleFuelPricesSave = () => {
        setSelectedContent("fuel_prices");
        router.push("/?view=fuel_prices"); 
    };
    
    const handleDailySave = () => {
        setSelectedContent("daily_sales");
        router.push("/?view=daily_sales"); 
    }; 

    const handleChargeAccountSave = () => {
        setSelectedContent("charge_acc");
        router.push("/?view=charge_acc"); 
    };

    const handleDailyDepositSave = () => {
        setSelectedContent("daily_deposit");
        router.push("/?view=daily_deposit"); 
    };

    const handleDailyDipSave = () => {
        setSelectedContent("daily_dip");
        router.push("/?view=daily_dip"); 
    };

    const handleDailySalesVolumeSave = () => {
        setSelectedContent("daily_sales_vol");
        router.push("/?view=daily_sales_vol"); 
    };

    const handleWetStockSave = () => {
        setSelectedContent("wet_stock");
        router.push("/?view=wet_stock"); 
    };
    const handleUnpaidSave = () => {
        setSelectedContent("unpaid_account");
        router.push("/?view=unpaid_account"); 
    };

    const toggleSidebar = () => {
        setIsSidebarExpanded(!isSidebarExpanded);
    };

    const toggleWetStockDropdown = () => {
        setIsWetStockDropdownOpen(!isWetStockDropdownOpen);
    };

    const toggleChargeAccountDropdown = () => {
        setIsChargeAccountDropdownOpen(!isChargeAccountDropdownOpen);
    };
    

    const [hideForUser, serHideForUser] = useState(userLogIn.position === "User" || userLogIn.position === "Office Staff" || userLogIn.position === "Cashier" );

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

                            <div className="border-gray-700 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4 md:px-5 px-3 hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                    ${selectedContent === "charge_acc" ? "text-white" : ""}`}
                                    onClick={() => {
                                        setSelectedContent("charge_acc"); // First action
                                        toggleChargeAccountDropdown();  // Second action
                                    }}
                                >
                                    <span
                                        className={`md:text-xl text-[12px] font-medium duration-300 ease-in-out ${
                                            isSidebarExpanded ? "opacity-100" : "opacity-0"
                                        }`}
                                    >
                                        Charge accounts
                                    </span>
                                </a>
                                {isChargeAccountDropdownOpen && (
                                    <div className="pl-10 text-gray-300">
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "unpaid_account" ? "text-white" : ""}`}      
                                            onClick={() => setSelectedContent("unpaid_account")}
                                        >
                                            Unpaid Charge Account
                                        </div>
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "paid_account" ? "text-white" : ""}`}      
                                            onClick={() => setSelectedContent("paid_account")}
                                        >
                                            Paid Charge Account
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="border-gray-700 w-full font-medium mb-2">
                                <a
                                    href="#"
                                    className={`flex items-center md:gap-6 gap-4  md:px-5 px-3  hover:text-gray-100 text-gray-400 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline p-3 w-full text-center cursor-pointer 
                                        ${selectedContent === "wet_stock" ? "text-white" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedContent("wet_stock"); // First action
                                        toggleWetStockDropdown();  // Second action
                                    }}
                                >
                                    <span className={`md:text-xl text-[12px] font-medium duration-300 ease-in-out ${isSidebarExpanded ? "opacity-100" : "opacity-0"}`}>
                                        WetStock 
                                    </span>
                                </a>

                                {isWetStockDropdownOpen && (
                                    <div className="pl-10 text-gray-300">
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "daily_dip" ? "text-white" : ""}`}      
                                            onClick={() => setSelectedContent("daily_dip")}
                                        >
                                            Daily Dip
                                        </div>
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "daily_sales_vol" ? "text-white" : ""}`}      
                                                onClick={() => setSelectedContent("daily_sales_vol")}
                                        >
                                            Daily Sales Volume
                                        </div>
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "inventory" ? "text-white" : ""}`}      
                                            onClick={() => setSelectedContent("inventory")}
                                        >
                                            Inventory
                                        </div>
                                        <div
                                            className={`text-[18px] py-1 cursor-pointer hover:text-gray-100 transition-colors duration-150 ease-in-out focus:outline-none focus:shadow-outline w-full 
                                            ${selectedContent === "price_gain_loss" ? "text-white" : ""}`}                                            
                                            onClick={() => setSelectedContent("price_gain_loss")}
                                        >
                                            Price Gain/Loss
                                        </div>
                                    </div>
                                )}
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
                {selectedContent === "fuel_prices" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <FuelPrices userLogIn={userLogIn} allFuelPrices={allFuelPrices} handleFuelPricesSave={handleFuelPricesSave}/>
                            </div>
                        </div> 
                    </div>
                ) : selectedContent === "charge_acc" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}  />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <ChargeAccounts userLogIn={userLogIn} allChargeAccount={allChargeAccount} handleChargeAccountSave={handleChargeAccountSave}/>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "wet_stock" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <WetStock userLogIn={userLogIn} handleWetStockSave={handleWetStockSave} getPumpPrices={getPumpPrices}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_dip" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                            <DailyDip handleDailyDipSave={handleDailyDipSave} userLogIn={userLogIn} getDailyDip={getDailyDip} getFuelDeliveries={getFuelDeliveries} getDailySalesVolumes={getDailySalesVolumes}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_sales_vol" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                            <DailySalesVol handleDailySalesVolumeSave={handleDailySalesVolumeSave} userLogIn={userLogIn} getDailySalesVolumes={getDailySalesVolumes} getDailySalesPos={getDailySalesPos} getPumpPrices={getPumpPrices}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "inventory" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                        <div className="text-center">
                            <Inventory getDailyDip={getDailyDip} getPumpPrices={getPumpPrices}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "price_gain_loss" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                        <div className="text-center">
                            <LossOrGain getPumpPrices={getPumpPrices} getDailyDip={getDailyDip}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_deposit" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <DailyDeposit userLogIn={userLogIn} getDailyDeposit={getDailyDeposit} handleDailyDepositSave={handleDailyDepositSave}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "daily_sales" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <DailyDales userLogIn={userLogIn} allDailySales={allDailySales} allActualPOS={allActualPOS} handleDailySave={handleDailySave}/>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "paid_account" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <PaidAccounts userLogIn={userLogIn} allChargeAccount={allChargeAccount} handleChargeAccountSave={handleChargeAccountSave}/>
                            </div>
                        </div>
                    </div>
                ) : selectedContent === "unpaid_account" ? (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} handleBackToHome={handleBackToHome} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser} />
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <UnpaidAccounts userLogIn={userLogIn} allChargeAccount={allChargeAccount} handleChargeAccountSave={handleUnpaidSave}/>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col w-full h-screen overflow-hidden">
                        <NavbarMain userLogIn={userLogIn} allBranch={allBranch} toggleSidebar={toggleSidebar} displayAllPending={displayAllPending} getPendingUsers={getPendingUsers} hideForUser={hideForUser}/>
                        <div className="w-full top-12 h-[calc(100vh-4px)] p-8 overflow-auto bg-slate-50">
                            <div className="text-center">
                                <div><AdminDashboard allBranch={allBranch} allRegister={allRegister} userLogIn={userLogIn} hideForUser={hideForUser}/></div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}

export async function getServerSideProps({req, res, query}) {
    let session = await getIronSession(req, res, SESSION_OPTION);
    let db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    let userLogIn = await db_conn.getRegisterById(query.id);
    if (session.username === undefined || session.username !== userLogIn.username) {
        return {
            redirect: {
                destination: session.id ? `/Users/${session.id}` : "/", 
                permanent: false,
            },
        };
    }
    
    let allBranch = await db_conn.getBranch();
    let allFuelPrices = await db_conn.getFuelPrices();
    let allChargeAccount = await db_conn.getChargeAccount();
    let allDailySales= await db_conn.getDailySales();
    let allRegister = await db_conn.getRegister();
    let allActualPOS = await db_conn.getActualPOS();
    let displayAllPending = await db_conn.getPendingPasswords();
    let getDailyDeposit = await db_conn.getDailyDeposit();
    let getPendingUsers = await db_conn.getPendingUser();
    let getDailyDip = await db_conn.getDailyDip();
    let getFuelDeliveries = await db_conn.getFuelDeliveries();
    let getDailySalesVolumes = await db_conn.getDailySalesVolumes();
    let getDailySalesPos = await db_conn.getDailySalesPos();
    let getPumpPrices = await db_conn.getPumpPrices();

    return {
        props: {
            userLogIn: userLogIn,
            allBranch: allBranch,
            allFuelPrices: allFuelPrices,
            allChargeAccount: allChargeAccount,
            allDailySales: allDailySales,
            allActualPOS: allActualPOS,
            allRegister: allRegister,
            displayAllPending: displayAllPending,
            getDailyDeposit: getDailyDeposit,
            getPendingUsers: getPendingUsers,
            getDailyDip: getDailyDip,
            getFuelDeliveries: getFuelDeliveries,
            getDailySalesVolumes: getDailySalesVolumes,
            getDailySalesPos: getDailySalesPos,
            getPumpPrices: getPumpPrices,
        },
    }
}