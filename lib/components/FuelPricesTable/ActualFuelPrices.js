import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

export default function ActualFuelPrices({ allFuelPrices, showGraph }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerPage = 5;

    const chartData = allFuelPrices.map((fuelPrice) => ({
        date: fuelPrice.date,
        fuel_type: fuelPrice.fuel_type,
        RSOP: fuelPrice.rsop,
        Benross: fuelPrice.app_benross,
        Petron_Highway: fuelPrice.petron_highway,
        Caltex: fuelPrice.caltex,
        Total: fuelPrice.total,
        Rephil: fuelPrice.rephil,
        Shell_Affinis: fuelPrice.shell_affinis,
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
                            <XAxis dataKey="date" />
                            <XAxis dataKey="fuel_type" />
                            <YAxis domain={[0, 100]} />
                            <Tooltip />
                            <Legend />
                            
                            {/* Rendering Bars */}
                            <Bar dataKey="RSOP" fill="#8884d8">
                                <LabelList dataKey="rsop" position="top" />
                            </Bar>
                            <Bar dataKey="Benross" fill="#82ca9d">
                                <LabelList dataKey="app_benross" position="top" />
                            </Bar>
                            <Bar dataKey="Petron_Highway" fill="#ff7300">
                                <LabelList dataKey="petron_highway" position="top" />
                            </Bar>
                            <Bar dataKey="Caltex" fill="#ff6347">
                                <LabelList dataKey="caltex" position="top" />
                            </Bar>
                            <Bar dataKey="Total" fill="#ffc658">
                                <LabelList dataKey="total" position="top" />
                            </Bar>
                            <Bar dataKey="Rephil" fill="#d0ed57">
                                <LabelList dataKey="rephil" position="top" />
                            </Bar>
                            <Bar dataKey="Shell_Affinis" fill="#ffbb28">
                                <LabelList dataKey="shell_affinis" position="top" />
                            </Bar>

                            {/* Custom Labels for Fuel Type under Each Date */}
                            {pagedData.map((entry, index) => (
                                <text
                                    key={`fuel_type_${index}`}
                                    x={index * (100 / pagedData.length) + (100 / (pagedData.length * 2))} // Adjusting position based on index
                                    y={420} // Position below the bars
                                    textAnchor="middle"
                                    fill="#000"
                                    fontSize={12}
                                >
                                    {entry.fuel_type}
                                </text>
                            ))}
                        </BarChart>
                    </ResponsiveContainer>

                    {/* Pagination Buttons (conditionally rendered) */}
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
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">DATE</th>
                                <th className="border p-2">FUEL TYPE</th>
                                <th className="border p-2">RSOP</th>
                                <th className="border p-2">BENROSS SHELL</th>
                                <th className="border p-2">PETRON HIWAY</th>
                                <th className="border p-2">CALTEX</th>
                                <th className="border p-2">TOTAL</th>
                                <th className="border p-2">REPHIL</th>
                                <th className="border p-2">SHELL AFFINIS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(groupedByDate).map(([date, fuelPrices]) => (
                                fuelPrices.map((fuelPrice, index) => (
                                    <tr key={`${date}-${index}`} className="bg-white">
                                        {index === 0 && (
                                            <td className="border p-2" rowSpan={fuelPrices.length}>
                                                {date}
                                            </td>
                                        )}
                                        <td className="border p-2">{fuelPrice.fuel_type}</td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.RSOP}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Benross}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Petron_Highway}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Caltex}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Total}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Rephil}
                                            </div>
                                        </td>
                                        <td className="border p-2">
                                            <div className='flex gap-2'>
                                                <h1>₱</h1> {fuelPrice.Shell_Affinis}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

