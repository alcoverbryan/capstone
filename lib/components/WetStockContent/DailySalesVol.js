import React, { useEffect, useState } from 'react';
import { MagnifyingGlass } from "../HeroIcons";
import AddDailySalesVolume from '../Modals/AddDailySalesVolume';
import AddDailySalesValue from '../Modals/AddDailySalesValue.';

export default function DailySalesVol({ handleDailySalesVolumeSave, userLogIn, getDailySalesVolumes, getDailySalesPos, getPumpPrices }) {
    const [combinedData, setCombinedData] = useState([]);
    console.log(combinedData)

    useEffect(() => {
        if (Array.isArray(getDailySalesVolumes) && Array.isArray(getDailySalesPos) && Array.isArray(getPumpPrices)) {
            // Merge daily dip, fuel deliveries, and pump prices based on the date
            const mergedData = getDailySalesVolumes.map(dip => {
                const matchingFuelDelivery = getDailySalesPos.find(fuel => fuel.posDate === dip.date);
                const matchingPumpPrice = getPumpPrices.find(price => price.pumpDate === dip.date);

                return {
                    ...dip,
                    ...matchingFuelDelivery, // Merge fuel deliveries data
                    ...matchingPumpPrice,    // Merge pump prices data
                };
            });

            setCombinedData(mergedData);
        }
    }, [getDailySalesVolumes, getDailySalesPos, getPumpPrices]);

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
                        onChange={(e) => searchItems(e.target.value)} // Search items when input changes
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
            </div>

            <div className="flex float-right px-1 py-3 space-x-2">
                <AddDailySalesVolume handleDailySalesVolumeSave={handleDailySalesVolumeSave} userLogIn={userLogIn} />
                <AddDailySalesValue handleDailySalesVolumeSave={handleDailySalesVolumeSave} userLogIn={userLogIn} />
            </div>

            {/* Table */}
            <div className="mt-10 bg-white rounded-md">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2" rowSpan="2">DAY</th>
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border border-r-black p-2" colSpan="6">DAILY SALES VOLUME FROM POS DAY REPORT(L)</th>
                            <th className="border border-r-black p-2" colSpan="6">DAILY SALES VALUE FROM POS DAY REPORT</th>
                            <th className="border border-r-black p-2" colSpan="5">PUMP PRICE COMPUTED</th>
                            <th className="border p-2" colSpan="5">VARIANCE</th>
                        </tr>
                        <tr className="bg-yellow-300 text-black text-lg">
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border border-r-black p-2">TOTAL</th>
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
                            <th className="border border-r-black p-2">TOTAL</th>
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border border-r-black p-2">VPN+D</th>
                            <th className="border p-2">VPN+</th>
                            <th className="border p-2">FSG</th>
                            <th className="border p-2">VPN+R</th>
                            <th className="border p-2">FSD</th>
                            <th className="border p-2">VPN+D</th>
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
                        .map((data, index) => {
                            // Calculate totals
                            const totalVolume = (
                                parseFloat(data.posVpnPlus || 0) +
                                parseFloat(data.posFsg || 0) +
                                parseFloat(data.posVpnR || 0) +
                                parseFloat(data.posFsd || 0) +
                                parseFloat(data.posVpnD || 0)
                            ).toFixed(2);

                            const total = (
                                parseFloat(data.vpnPlus || 0) +
                                parseFloat(data.fsg || 0) +
                                parseFloat(data.vpnR || 0) +
                                parseFloat(data.fsd || 0) +
                                parseFloat(data.vpnD || 0)
                            ).toFixed(2);

                            return (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{data.day}</td>
                                    <td className="border p-2">{data.date}</td>
                                    <td className="border p-2">{data.vpnPlus}</td>
                                    <td className="border p-2">{data.fsg}</td>
                                    <td className="border p-2">{data.vpnR}</td>
                                    <td className="border p-2">{data.fsd}</td>
                                    <td className="border p-2">{data.vpnD}</td>
                                    <td className="border border-r-black p-2">{total}</td>
                                    <td className="border p-2">{data.posVpnPlus ? `₱ ${parseFloat(data.posVpnPlus).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border p-2">{data.posFsg ? `₱ ${parseFloat(data.posFsg).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border p-2">{data.posVpnR ? `₱ ${parseFloat(data.posVpnR).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border p-2">{data.posFsd ? `₱ ${parseFloat(data.posFsd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border p-2">{data.posVpnD ? `₱ ${parseFloat(data.posVpnD).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border border-r-black p-2">{totalVolume ? `₱ ${parseFloat(totalVolume).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '₱ 0.00'}</td>
                                    <td className="border p-2">
                                        {(parseFloat(data.vpnPlus) !== 0 && parseFloat(data.posVpnPlus || 0) !== 0) 
                                            ? `₱ ${(parseFloat(data.posVpnPlus || 0) / parseFloat(data.vpnPlus)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                                            : '₱ 0.00'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.fsg) !== 0 && parseFloat(data.posFsg || 0) !== 0) 
                                            ? `₱ ${(parseFloat(data.posFsg || 0) / parseFloat(data.fsg)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                                            : '₱ 0.00'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.vpnR) !== 0 && parseFloat(data.posVpnR || 0) !== 0) 
                                            ? `₱ ${(parseFloat(data.posVpnR || 0) / parseFloat(data.vpnR)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                                            : '₱ 0.00'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.fsd) !== 0 && parseFloat(data.posFsd || 0) !== 0) 
                                            ? `₱ ${(parseFloat(data.posFsd || 0) / parseFloat(data.fsd)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                                            : '₱ 0.00'}
                                    </td>
                                    <td className="border border-r-black p-2">
                                        {(parseFloat(data.vpnD) !== 0 && parseFloat(data.posVpnD || 0) !== 0) 
                                            ? `₱ ${(parseFloat(data.posVpnD || 0) / parseFloat(data.vpnD)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
                                            : '₱ 0.00'}
                                    </td>

                                    {/* //Variances// */}
                                    <td className="border p-2">
                                        {(parseFloat(data.vpnPlus) !== 0 && parseFloat(data.posVpnPlus || 0) !== 0 && parseFloat(data.pumpVpnPlus || 0) !== 0) 
                                            ? ((parseFloat(data.posVpnPlus || 0) / parseFloat(data.vpnPlus)) - parseFloat(data.pumpVpnPlus)).toFixed(2) 
                                            : '0'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.fsg) !== 0 && parseFloat(data.posFsg || 0) !== 0 && parseFloat(data.pumpFsg || 0) !== 0) 
                                            ? ((parseFloat(data.posFsg || 0) / parseFloat(data.fsg)) - parseFloat(data.pumpFsg)).toFixed(2) 
                                            : '0'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.vpnR) !== 0 && parseFloat(data.posVpnR || 0) !== 0 && parseFloat(data.pumpVpnR || 0) !== 0) 
                                            ? ((parseFloat(data.posVpnR || 0) / parseFloat(data.vpnR)) - parseFloat(data.pumpVpnR)).toFixed(2) 
                                            : '0'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.fsd) !== 0 && parseFloat(data.posFsd || 0) !== 0 && parseFloat(data.pumpFsd || 0) !== 0) 
                                            ? ((parseFloat(data.posFsd || 0) / parseFloat(data.fsd)) - parseFloat(data.pumpFsd)).toFixed(2) 
                                            : '0'}
                                    </td>
                                    <td className="border p-2">
                                        {(parseFloat(data.vpnD) !== 0 && parseFloat(data.posVpnD || 0) !== 0 && parseFloat(data.pumpVpnD || 0) !== 0) 
                                            ? ((parseFloat(data.posVpnD || 0) / parseFloat(data.vpnD)) - parseFloat(data.pumpVpnD)).toFixed(2) 
                                            : '0'}
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
