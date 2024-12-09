import React, { useState, useEffect } from 'react';
import { MagnifyingGlass } from "../HeroIcons";
import AddDailyDipModal from '../Modals/AddDailyDipModal';
import AddFuelDeliveriesModal from '../Modals/AddFuelDeliveries';

const renameKeys = (obj, prefix) => {
    const renamedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            renamedObj[`${prefix}${key}`] = obj[key];
        }
    }
    return renamedObj;
};

export default function DailyDip({ handleDailyDipSave, userLogIn, getDailyDip, getFuelDeliveries, getDailySalesVolumes }) {
    const [combinedData, setCombinedData] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    // Merge data and rename sales volumes keys
    useEffect(() => {
        if (Array.isArray(getDailyDip) && Array.isArray(getFuelDeliveries) && Array.isArray(getDailySalesVolumes)) {
            const renamedSalesVolumes = getDailySalesVolumes.map(item => renameKeys(item, 'sales_'));
            
            const mergedData = getDailyDip.map(dip => {
                const matchingFuelDelivery = getFuelDeliveries.find(fuel => fuel.fuelDate === dip.date);
                const matchingSalesVolume = renamedSalesVolumes.find(sales => sales.sales_date === dip.date);
                return {
                    ...dip,
                    ...matchingFuelDelivery, // Merge the fuel deliveries data with the daily dip data
                    ...matchingSalesVolume, // Merge the daily sales volumes data
                };
            });
            setCombinedData(mergedData);
        }
    }, [getDailyDip, getFuelDeliveries, getDailySalesVolumes]);

    // Search filter function
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
    };

    // Calculate total for actual dip section
    const calculateTotal = (row) => {
        const total = ["vpn", "fsg", "vpnR", "fsd", "vpnD"].reduce((acc, key) => {
            return acc + (row[key] ? parseFloat(row[key]) : 0);
        }, 0);
        return total;
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
                        onChange={(e) => searchItems(e.target.value)} // Search items when input changes
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="flex float-right px-1 py-3 space-x-2">
                <AddDailyDipModal handleDailyDipSave={handleDailyDipSave} userLogIn={userLogIn} />
                <AddFuelDeliveriesModal handleDailyDipSave={handleDailyDipSave} userLogIn={userLogIn} />
            </div>

            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" colSpan="6">ACTUAL DIP(Liters)</th>
                            <th className="border p-2" rowSpan="2">UGT SALES</th>
                            <th className="border p-2" rowSpan="2">VAR SALES VS DIP</th>
                            <th className="border p-2" colSpan="6">FUEL DELIVERIES(Liters)</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border p-2">TOTAL</th>
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
                            ).map((dip, index) => {
                                const total = calculateTotal(dip); // Calculate total for actual dip section

                                // Calculate fuel total dynamically
                                const fuelTotal = [
                                    dip.fuelVpnPlus, 
                                    dip.fuelFsg, 
                                    dip.fuelVpnR, 
                                    dip.fuelFsd, 
                                    dip.fuelVpnD
                                ].reduce((acc, val) => acc + (val ? parseFloat(val) : 0), 0);

                                // Get the total of the next row to calculate ugtSales
                                const nextTotal = index < combinedData.length - 1 ? calculateTotal(combinedData[index + 1]) : 0;

                                // Calculate ugtSales as the difference between current row total and next row total
                                const ugtSales = total - nextTotal;

                                // Calculate the total for sales
                                const salesTotal = [
                                    dip.sales_vpnPlus, 
                                    dip.sales_fsg, 
                                    dip.sales_vpnR, 
                                    dip.sales_fsd, 
                                    dip.sales_vpnD
                                ].reduce((acc, val) => acc + (val ? parseFloat(val) : 0), 0);

                                // Calculate varSalesVsDip as salesTotal - ugtSales
                                const varSalesVsDip = salesTotal - ugtSales;

                                return (
                                    <tr key={index} className="bg-white">
                                        <td className="border p-2">{dip.day}</td>
                                        <td className="border p-2">{dip.date}</td>

                                        {/* Actual Dip (Liters) */}
                                        <td className="border p-2">{dip.vpn}</td>
                                        <td className="border p-2">{dip.fsg}</td>
                                        <td className="border p-2">{dip.vpnR}</td>
                                        <td className="border p-2">{dip.fsd}</td>
                                        <td className="border p-2">{dip.vpnD}</td>
                                        <td className="border p-2">{total}</td>

                                        {/* UGT Sales (calculated as total - next row total) */}
                                        <td className="border p-2">{ugtSales}</td>

                                        {/* Var Sales (calculated as salesTotal - ugtSales, formatted to 2 decimal places) */}
                                        <td className="border p-2">{varSalesVsDip.toFixed(2)}</td>

                                        {/* Fuel Deliveries */}
                                        <td className="border p-2">{dip.fuelVpnPlus}</td>
                                        <td className="border p-2">{dip.fuelFsg}</td>
                                        <td className="border p-2">{dip.fuelVpnR}</td>
                                        <td className="border p-2">{dip.fuelFsd}</td>
                                        <td className="border p-2">{dip.fuelVpnD}</td>
                                        
                                        {/* Calculated Fuel Total */}
                                        <td className="border p-2">{fuelTotal}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}
