import React, { useState } from 'react';
import { MagnifyingGlass } from './HeroIcons';
import AddPumpPrices from './Modals/AddPumpPrices';

// Helper function to format numbers as currency
const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '₱ 0.00'; // Handle invalid numbers
    return '₱ ' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

export default function WetStock({ userLogIn, handleWetStockSave, getPumpPrices }) {
    const [searchInput, setSearchInput] = useState("");

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };
    return (
        <>
            {/* Search Bar */}
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                        onChange={(e) => searchItems(e.target.value)} // Assuming `searchItems` is defined
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
                <AddPumpPrices userLogIn={userLogIn} handleWetStockSave={handleWetStockSave} />
            </div>

            {/* Table */}
            <div className="mt-10 bg-white rounded-md overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="5">PUMP PRICES FROM MANUAL FC REPORT</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getPumpPrices
                        .filter(
                            (filtered_item) =>
                                (filtered_item.pumpDate.toLowerCase().concat(" ", filtered_item.pumpDate.toLowerCase()).includes(searchInput.toLowerCase().trim())) ||
                                (filtered_item.pumpDay.toLowerCase().concat(" ", filtered_item.pumpDay.toLowerCase()).includes(searchInput.toLowerCase().trim()))
                        ).length === 0 ? (
                            <tr>
                                <td colSpan="15" className="text-center text-red-500">
                                    Not found.
                                </td>
                            </tr>
                        ) : (
                            getPumpPrices
                                .filter((data) =>
                                    data.pumpDate.toLowerCase().concat(" ", data.pumpDate.toLowerCase()).includes(searchInput.toLowerCase().trim()) ||
                                    data.pumpDay.toLowerCase().concat(" ", data.pumpDay.toLowerCase()).includes(searchInput.toLowerCase().trim())
                            )
                        .map((price, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-2">{price.pumpDay || '-'}</td>
                                <td className="border p-2">{price.pumpDate || '-'}</td>
                                <td className="border p-2">{formatCurrency(price.pumpVpnPlus)}</td>
                                <td className="border p-2">{formatCurrency(price.pumpFsg)}</td>
                                <td className="border p-2">{formatCurrency(price.pumpVpnR)}</td>
                                <td className="border p-2">{formatCurrency(price.pumpFsd)}</td>
                                <td className="border p-2">{formatCurrency(price.pumpVpnD)}</td>
                            </tr>
                        )))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
