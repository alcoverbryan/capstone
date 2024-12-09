import React, { useEffect, useState } from 'react';
import { MagnifyingGlass } from "../HeroIcons";

// Helper function to rename keys by adding a prefix
const renameKeys = (obj, prefix) => {
    const renamedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            renamedObj[`${prefix}${key}`] = obj[key];  
        }
    }
    return renamedObj;
};

const formatCurrency = (value) => {
    const number = parseFloat(value);
    if (isNaN(number)) return '₱ 0.00';
    return '₱ ' + number.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// Helper function to check if a value is negative
const isNegative = (value) => parseFloat(value) < 0;

export default function LossOrGain({ getPumpPrices, getDailyDip }) {
    const [combinedData, setCombinedData] = useState([]);
    console.log(combinedData);

    useEffect(() => {
        // Ensure both datasets are arrays and contain data
        if (Array.isArray(getDailyDip) && getDailyDip.length > 0 &&
            Array.isArray(getPumpPrices) && getPumpPrices.length > 0) {
            
            // Rename keys in getDailySalesVolumes to avoid conflicts
            const renamedSalesVolumes = getPumpPrices.map(item => renameKeys(item, 'sales_'));

            // Merge the data
            const mergedData = getDailyDip.map(dip => {
                const matchingPumpPrice = renamedSalesVolumes.find(price => price.sales_pumpDate === dip.date); // Match based on date
                
                if (matchingPumpPrice) {
                    return {
                        ...dip,
                        ...matchingPumpPrice, // Merge the renamed data
                    };
                }
                return dip;  // Return original dip if no matching data found
            });

            setCombinedData(mergedData);
        } else {
            console.error('Missing or invalid data:', { getPumpPrices, getDailyDip });
        }
    }, [getDailyDip, getPumpPrices]);

    const safeParse = (value) => parseFloat(value) || 0;

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
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="6">PRICE INCREASE/ROLLBACK</th>
                            <th className="border p-2" colSpan="5">WINDFALL GAIN & LOSSES</th>
                            <th className="border p-2" rowSpan="2">GAIN & LOSS TO DATE</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
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
                        {combinedData.filter((filtered_item) => 
                            filtered_item.day.toLowerCase().concat(" ", filtered_item.date.toLowerCase()).includes(searchInput.toLowerCase().trim()) ||
                            filtered_item.date.toLowerCase().concat(" ", filtered_item.day.toLowerCase()).includes(searchInput.toLowerCase().trim())
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
                        .map((data, index, array) => {
                            // Check for previous data to calculate the difference
                            const previousData = index > 0 ? array[index - 1] : null;

                            // Calculate price increase based on the difference between current and previous values
                            const priceIncreaseVpnPlus = previousData
                                ? (safeParse(data.sales_pumpVpnPlus) - safeParse(previousData.sales_pumpVpnPlus)).toFixed(2)
                                : "0.00";

                            const priceIncreaseFsg = previousData
                                ? (safeParse(data.sales_pumpFsg) - safeParse(previousData.sales_pumpFsg)).toFixed(2)
                                : "0.00";

                            const priceIncreaseVpnR = previousData
                                ? (safeParse(data.sales_pumpVpnR) - safeParse(previousData.sales_pumpVpnR)).toFixed(2)
                                : "0.00";

                            const priceIncreaseFsd = previousData
                                ? (safeParse(data.sales_pumpFsd) - safeParse(previousData.sales_pumpFsd)).toFixed(2)
                                : "0.00";

                            const priceIncreaseVpnD = previousData
                                ? (safeParse(data.sales_pumpVpnD) - safeParse(previousData.sales_pumpVpnD)).toFixed(2)
                                : "0.00";

                            // Windfall Gains/Losses (same as before)
                            const windfallVpnPlus = (safeParse(priceIncreaseVpnPlus) * safeParse(data.vpn)).toFixed(2);
                            const windfallFsg = (safeParse(priceIncreaseFsg) * safeParse(data.fsg)).toFixed(2);
                            const windfallVpnR = (safeParse(priceIncreaseVpnR) * safeParse(data.vpnR)).toFixed(2);
                            const windfallFsd = (safeParse(priceIncreaseFsd) * safeParse(data.fsd)).toFixed(2);
                            const windfallVpnD = (safeParse(priceIncreaseVpnD) * safeParse(data.vpnD)).toFixed(2);

                            // Total Gain/Loss
                            const total = (
                                safeParse(windfallVpnPlus) +
                                safeParse(windfallFsg) +
                                safeParse(windfallVpnR) +
                                safeParse(windfallFsd) +
                                safeParse(windfallVpnD)
                            ).toFixed(2);

                            // Calculate glToDate
                            const glToDate = previousData
                                ? (safeParse(previousData.glToDate) + safeParse(total)).toFixed(2)  // Add current total to previous glToDate
                                : total;  // For the first row, set glToDate as the total

                            return (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{data.day}</td>
                                    <td className="border p-2">{data.date}</td>
                                    {/* Price Increase */}
                                    <td className={`border p-2 ${isNegative(priceIncreaseVpnPlus) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(priceIncreaseVpnPlus)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(priceIncreaseFsg) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(priceIncreaseFsg)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(priceIncreaseVpnR) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(priceIncreaseVpnR)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(priceIncreaseFsd) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(priceIncreaseFsd)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(priceIncreaseVpnD) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(priceIncreaseVpnD)}
                                    </td>
                                    {/* Windfall Gains/Losses */}
                                    <td className={`border p-2 ${isNegative(windfallVpnPlus) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(windfallVpnPlus)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(windfallFsg) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(windfallFsg)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(windfallVpnR) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(windfallVpnR)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(windfallFsd) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(windfallFsd)}
                                    </td>
                                    <td className={`border p-2 ${isNegative(windfallVpnD) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(windfallVpnD)}
                                    </td>
                                    {/* Total Gain/Loss */}
                                    <td className={`border p-2 ${isNegative(total) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(total)}
                                    </td>
                                    {/* Gain & Loss To Date */}
                                    <td className={`border p-2 ${isNegative(glToDate) ? 'text-red-500' : ''}`}>
                                        {formatCurrency(glToDate)}
                                    </td>
                                </tr>
                            );
                        }))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
