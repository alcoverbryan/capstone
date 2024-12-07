import React, { useState } from 'react';
import AddBranchModal from "./FuelPricesTable/AddFuelPricesModal";
import { MagnifyingGlass } from "./HeroIcons";
import ActualFuelPrices from './FuelPricesTable/ActualFuelPrices';
import Variances from './FuelPricesTable/Variances';
import AddFuelPricesModal from './FuelPricesTable/AddFuelPricesModal';

export default function FuelPrices({userLogIn, allFuelPrices, handleFuelPricesSave}) {
    const [view, setView] = useState('actual');
    const [showGraph, setShowGraph] = useState(true);

    const [searchInput, setSearchInput] = useState("");

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search Fuel..."
                        className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                        onChange={(e) => searchItems(e.target.value)}
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5"/>
                    </div>
                </div>

                <div className="flex gap-5 items-center">
                    {view === 'actual' && <AddFuelPricesModal userLogIn={userLogIn} handleFuelPricesSave={handleFuelPricesSave} />}
                </div>
            </div>

                <div className="justify-self-end">
                    <button 
                        onClick={() => setShowGraph(!showGraph)} 

                        className="p-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839]">
                        {showGraph ? 'Show Table' : 'Show Graph'}
                    </button>
                </div>

            <ActualFuelPrices allFuelPrices={allFuelPrices} showGraph={showGraph} userLogIn={userLogIn} handleFuelPricesSave={handleFuelPricesSave} searchInput={searchInput} />
          
        </>
    );
}
