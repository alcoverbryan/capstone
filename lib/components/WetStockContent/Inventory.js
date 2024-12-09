import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "../HeroIcons";

export default function Inventory({ getDailyDip, getPumpPrices }) {
    const [combinedData, setCombinedData] = useState([]);
    console.log(combinedData);
    
    useEffect(() => {
        if (Array.isArray(getDailyDip) && Array.isArray(getPumpPrices)) {
            const mergedData = getDailyDip.map(dip => {
                const matchingPumpPrice = getPumpPrices.find(price => price.pumpDate === dip.date);
                return {
                    ...dip,
                    ...matchingPumpPrice, // Merge the pump prices data with the daily dip data
                };
            });
            setCombinedData(mergedData);
        }
    }, [getDailyDip, getPumpPrices]);

    // Formatter function to format numbers with currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

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
            </div>

            {/* Table */}
            <div className="mt-10 bg-white rounded-md overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="6">DAILY INVENTORY VALUES</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border p-2">TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {combinedData
                        .filter(
                            (filtered_item) =>
                                (filtered_item.day.toLowerCase().concat(" ", filtered_item.day.toLowerCase()).includes(searchInput.toLowerCase().trim())) ||
                                (filtered_item.date.toLowerCase().concat(" ", filtered_item.date.toLowerCase()).includes(searchInput.toLowerCase().trim()))
                        ).length === 0 ? (
                            <tr>
                                <td colSpan="15" className="text-center text-red-500">
                                    Not found.
                                </td>
                            </tr>
                        ) : (
                            combinedData
                                .filter((data) =>
                                    data.day.toLowerCase().concat(" ", data.day.toLowerCase()).includes(searchInput.toLowerCase().trim()) ||
                                    data.date.toLowerCase().concat(" ", data.date.toLowerCase()).includes(searchInput.toLowerCase().trim())
                            )
                        .map((data, index) => {
                            // Calculate the values for each field
                            const vpnPlusValue = (parseFloat(data.vpn || 0) * parseFloat(data.pumpVpnPlus || 0));
                            const fsgValue = (parseFloat(data.fsg || 0) * parseFloat(data.pumpFsg || 0));
                            const vpnRValue = (parseFloat(data.vpnR || 0) * parseFloat(data.pumpVpnR || 0));
                            const fsdValue = (parseFloat(data.fsd || 0) * parseFloat(data.pumpFsd || 0));
                            const vpnDValue = (parseFloat(data.vpnD || 0) * parseFloat(data.pumpVpnD || 0));

                            // Calculate total by summing the individual values
                            const total = vpnPlusValue + fsgValue + vpnRValue + fsdValue + vpnDValue;

                            return (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{data.day}</td>
                                    <td className="border p-2">{data.date}</td>
                                    <td className="border gap-2 p-2">{formatCurrency(vpnPlusValue)}</td>
                                    <td className="border p-2">{formatCurrency(fsgValue)}</td>
                                    <td className="border p-2">{formatCurrency(vpnRValue)}</td>
                                    <td className="border p-2">{formatCurrency(fsdValue)}</td>
                                    <td className="border p-2">{formatCurrency(vpnDValue)}</td>
                                    <td className="border p-2">{formatCurrency(total)}</td> {/* Display total here */}
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
