import React, { useState } from 'react';
import AddBranchModal from "./Branch/AddBranchModal";
import { MagnifyingGlass } from "./HeroIcons";
import ActualFuelPrices from './FuelPricesTable/ActualFuelPrices';
import Variances from './FuelPricesTable/Variances';

export default function FuelPrices({userLogIn, allFuelPrices}) {
    const [view, setView] = useState('actual'); // Default view is 'actual'
    const [showGraph, setShowGraph] = useState(true);

    const renderTableContent = () => {
        switch (view) {
            case 'actual':
                return (
                    <>
                        <ActualFuelPrices allFuelPrices={allFuelPrices} showGraph={showGraph}/>
                    </>
                );
            case 'variances':
                return (
                    <>
                        <Variances allFuelPrices={allFuelPrices}/>
                    </>
                );
            default:
                return null;
        }
    };

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
                    <button onClick={() => setView('actual')} className={`px-4 py-2 ${view === 'actual' ? 'bg-gray-300' : 'bg-gray-100'} rounded`}>
                        ACTUAL PUMP PRICES
                    </button>
                    <button onClick={() => setView('variances')} className={`px-4 py-2 ${view === 'variances' ? 'bg-gray-300' : 'bg-gray-100'} rounded`}>
                        VARIANCES
                    </button>
                    {view === 'actual' && <AddBranchModal userLogIn={userLogIn} />} {/* Conditionally render AddBranchModal */}
                </div>
            </div>

            <div className="flex justify-between items-center mb-10 p-4 shadow-md bg-white">
                <p className="text-[20px]">Fuel Prices</p>
                <div className="ml-auto">
                    <button 
                        onClick={() => setShowGraph(!showGraph)} 
                        className=" p-2 bg-red-500 text-white rounded hover:bg-white hover:text-black border border-red-500 focus:outline-none transition-colors">
                        {showGraph ? 'Show Table' : 'Show Graph'}
                    </button>
                </div>
            </div>

          
            <div className="mt-10 bg-white rounded-md ">
                <table className="w-full border-collapse">
                    {renderTableContent()}
                </table>
            </div>
        </>
    );
}
