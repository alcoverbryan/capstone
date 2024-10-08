import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';
import UpdateFuelPrices from './UpdateFuelPrices';

export default function ActualFuelPrices({ allFuelPrices, showGraph, userLogIn }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5;

    const chartData = allFuelPrices.map((fuelPrice) => ({
        id: fuelPrice.id,
        date: fuelPrice.date,
        fuel_type: fuelPrice.fuel_type,
        rsop: fuelPrice.rsop,
        app_benross: fuelPrice.app_benross,
        petron_highway: fuelPrice.petron_highway,
        caltex: fuelPrice.caltex,
        total: fuelPrice.total,
        rephil: fuelPrice.rephil,
        shell_affinis: fuelPrice.shell_affinis,
    }));

    const pagedData = chartData.slice(currentIndex, currentIndex + itemsPerPage);

    const handleNext = () => {
        if (currentIndex + itemsPerPage < chartData.length) {
            setCurrentIndex(currentIndex + itemsPerPage);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - itemsPerPage);
        }
    };

    const groupedByDate = chartData.reduce((acc, item) => {
        acc[item.date] = acc[item.date] || [];
        acc[item.date].push(item);
        return acc;
    }, {});

    return (
        <div>
            {showGraph ? (
                <div style={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                        <BarChart data={pagedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="date" 
                                tickFormatter={(date, index) => {
                                    const fuelType = pagedData[index].fuel_type;
                                    return `${date}\n( ${fuelType} )`; 
                                }} 
                                tick={{ fontSize: 12 }} 
                                interval={0} 
                            />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            
                            {/* Rendering Bars */}
                            <Bar dataKey="rsop" fill="#8884d8">
                                <LabelList dataKey="rsop" position="top" />
                            </Bar>
                            <Bar dataKey="app_benross" fill="#82ca9d">
                                <LabelList dataKey="app_benross" position="top" />
                            </Bar>
                            <Bar dataKey="petron_highway" fill="#ff7300">
                                <LabelList dataKey="petron_highway" position="top" />
                            </Bar>
                            <Bar dataKey="caltex" fill="#ff6347">
                                <LabelList dataKey="caltex" position="top" />
                            </Bar>
                            <Bar dataKey="total" fill="#ffc658">
                                <LabelList dataKey="total" position="top" />
                            </Bar>
                            <Bar dataKey="rephil" fill="#d0ed57">
                                <LabelList dataKey="rephil" position="top" />
                            </Bar>
                            <Bar dataKey="shell_affinis" fill="#ffbb28">
                                <LabelList dataKey="shell_affinis" position="top" />
                            </Bar>

                            {pagedData.map((entry, index) => (
                                <text
                                    key={`fuel_type_${index}`}
                                    x={index * (100 / pagedData.length) + (100 / (pagedData.length * 2))} 
                                    y={420} 
                                    textAnchor="middle"
                                    fill="#000"
                                    fontSize={12}
                                >
                                    {entry.fuel_type}
                                </text>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>

                    {chartData.length > itemsPerPage && (
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                                className="p-2 bg-gray-500 text-white rounded disabled:opacity-50">
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={currentIndex + itemsPerPage >= chartData.length}
                                className="p-2 bg-gray-500 text-white rounded disabled:opacity-50">
                                Next
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="mb-10 p-6 bg-gray-50">
                        <div className="overflow-x-auto">
                            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
                                <thead className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                                    <tr>
                                        <th className="p-4 text-left">DATE</th>
                                        <th className="p-4 text-left">FUEL TYPE</th>
                                        <th className="p-4 text-left">RSOP</th>
                                        <th className="p-4 text-left">APP BENROSS SHELL</th>
                                        <th className="p-4 text-left">PETRON HIWAY</th>
                                        <th className="p-4 text-left">CALTEX</th>
                                        <th className="p-4 text-left">TOTAL</th>
                                        <th className="p-4 text-left">REPHIL</th>
                                        <th className="p-4 text-left">SHELL AFFINIS</th>
                                        <th className="p-4 text-left">ACTION</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {Object.entries(groupedByDate).map(([date, fuelPrices], dateIndex) => (
                                        <React.Fragment key={date}>
                                            {fuelPrices.map((fuelPrice, index) => (
                                                <tr
                                                    key={`${date}-${index}`}
                                                    className={`bg-white hover:bg-gray-50 transition-all duration-300 ease-in-out ${index === 0 ? "rounded-lg shadow-lg" : ""}`}>
                                                    {index === 0 && (
                                                        <td
                                                            className="p-4 text-center font-bold bg-gray-100 text-gray-700 border border-gray-200 rounded-l-lg"
                                                            rowSpan={fuelPrices.length}>
                                                            {date}
                                                        </td>
                                                    )}
                                                    <td className="p-4 border border-gray-200 text-gray-700 font-medium">
                                                        {fuelPrice.fuel_type}
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.rsop}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.app_benross}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.petron_highway}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.caltex}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.total}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.rephil}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <h1>₱</h1>{fuelPrice.shell_affinis}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200 ">
                                                        <div className="flex justify-center items-center gap-2">
                                                            <UpdateFuelPrices userLogIn={userLogIn} fuelPrice={fuelPrice}/>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="text-center text-2xl font-bold text-gray-700 mb-6">
                            APP BENROSS SHELL vs. COMPETITORS
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                                <thead className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                                    <tr>
                                        <th className="p-4 text-left">FUEL TYPE</th>
                                        <th className="p-4 text-left">VS RSOP</th>
                                        <th className="p-4 text-left">VS PETRON</th>
                                        <th className="p-4 text-left">VS CALTEX</th>
                                        <th className="p-4 text-left">VS TOTAL</th>
                                        <th className="p-4 text-left">VS REPHIL</th>
                                        <th className="p-4 text-left">SHELL AFFINIS</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                    {allFuelPrices.map((fuelPrice, index) => (
                                        <tr key={index} className="bg-white">
                                            <td className="p-4 border border-gray-200">{fuelPrice.fuel_type}</td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.rsop).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.petron_highway).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.caltex).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.total).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.rephil).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="p-4 border border-gray-200">
                                                <div className='flex gap-2'>
                                                    <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.shell_affinis).toFixed(2)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
