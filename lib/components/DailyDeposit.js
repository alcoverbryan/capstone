import React from "react";
import AddDailyDepositMOdal from "./Modals/AddDailyDepositModal";
import { MagnifyingGlass } from "./HeroIcons";
import AddBranchModal from "./FuelPricesTable/AddFuelPricesModal";


export default function DailyDeposit(){
    return(
        <>
           <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input type="text" placeholder="Search" className="border-b p-2 focus:outline-none w-full h-10 pl-8"/>
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>
                <AddDailyDepositMOdal/>
            </div>
            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Daily Deposit</p>
            </div>
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">LINE NO.</th>
                            <th className="border p-2">DATE DEPOSITED</th>
                            <th className="border p-2">SHIFT DATE</th>
                            <th className="border p-2">SOURCE</th>
                            <th className="border p-2">CASHIER</th>
                            <th className="border p-2">TYPE</th>
                            <th className="border p-2">BANK DEPOSITED TO</th>
                            <th className="border p-2">SUBTOTAL</th>                            
                        </tr>
                    </thead>
                  
                </table>
            </div>
        </>
    );
}