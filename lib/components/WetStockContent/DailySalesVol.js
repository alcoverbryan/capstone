import React from 'react';
import { MagnifyingGlass } from "../HeroIcons";
import AddDailySalesVolume from '../Modals/AddDailySalesVolume';
import AddDailySalesValue from '../Modals/AddDailySalesValue.';

export default function DailySalesVol() {
    return (
        <>
            {/* Search Bar */}
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-b p-2 focus:outline-none w-full h-10 pl-8"
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>
            </div>

            <div className="flex float-right px-1 py-3 space-x-2">
                <AddDailySalesVolume/>
                <AddDailySalesValue/>
            </div>
            {/* Section Title
            <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                <p className="text-[20px]">Daily Sales Volume</p>
            </div> */}

            {/* Table */}
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="6">DAILY SALES VOLUME FROM POS DAY REPORT(L)</th>
                            <th className="border p-2" colSpan="6">DAILY SALES VALUE FROM POS DAY REPORT</th>
                            <th className="border p-2" colSpan="5">PUMP PRICE COMPUTED</th>
                            <th className="border p-2" colSpan="5">VARIANCE</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
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
                            {/* Price Compute */}
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            {/* Variance */}
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>
        </>
    );
}
