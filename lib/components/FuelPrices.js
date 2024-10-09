import React, { useState } from 'react';
import AddBranchModal from "./FuelPricesTable/AddFuelPricesModal";
import { MagnifyingGlass } from "./HeroIcons";
import ActualFuelPrices from './FuelPricesTable/ActualFuelPrices';
import Variances from './FuelPricesTable/Variances';

export default function FuelPrices({userLogIn, allFuelPrices}) {
    const [view, setView] = useState('actual');
    const [showGraph, setShowGraph] = useState(true);

    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input type="text" placeholder="Search" className="border-b p-2 focus:outline-none w-full h-10 pl-8"/>
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    {view === 'actual' && <AddBranchModal userLogIn={userLogIn} />}
                </div>
            </div>

            <div className="flex justify-between items-center mb-10 p-4 shadow-md bg-white">
                <p className="text-[20px]">Fuel Prices</p>
                <div className="ml-auto">
                    <button 
                        onClick={() => setShowGraph(!showGraph)} 

                        className=" p-2 bg-[#F2D323] text-black rounded">
                        {showGraph ? 'Show Table' : 'Show Graph'}
                    </button>
                </div>
            </div>

            <ActualFuelPrices allFuelPrices={allFuelPrices} showGraph={showGraph} userLogIn={userLogIn}/>
          
        </>
    );
}
