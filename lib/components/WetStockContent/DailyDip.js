import React, { useState } from 'react';
import { MagnifyingGlass } from "../HeroIcons";
import AddDailyDipModal from '../Modals/AddDailyDipModal';
import AddFuelDeliveriesModal from '../Modals/AddFuelDeliveries';

export default function DailyDip() {
    return (
        <>
            {/* Search Bar */}
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative w-full">
                <input
                    type="text"
                    placeholder="Search"
                    className="border-b p-2 focus:outline-none h-10 pl-8 w-full"
                />  
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Section Title */}
         {/*  <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Daily Dip</p>
            </div> */}

            <div className="flex float-right px-1 py-3 space-x-2">
                <AddDailyDipModal/> 
                <AddFuelDeliveriesModal/>
            </div>

            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="6">ACTUAL DIP(Liters)</th>
                            <th className="border p-2" rowSpan="2">UGT SALES</th>
                            <th className="border p-2" rowSpan="2">VAR SALES VS DIP</th>
                            <th className="border p-2" colSpan="6">FUEL DELIVERIES(Liters)</th>
                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border p-2">TOTAL</th>
                            {/* Fuel Deliveries */}
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border p-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>

        </>
    );
}
