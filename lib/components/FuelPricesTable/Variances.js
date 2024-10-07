import React from 'react';

export default function Variances({ allFuelPrices }) {
    return (
        <div>
            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">FUEL TYPE</th>
                            <th className="border p-2">VS RSOP</th>
                            <th className="border p-2">VS PETRON</th>
                            <th className="border p-2">VS CALTEX</th>
                            <th className="border p-2">VS TOTAL</th>
                            <th className="border p-2">VS REPHIL</th>
                            <th className="border p-2">SHELL AFFINIS</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {allFuelPrices.map((fuelPrice, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border p-2">{fuelPrice.fuel_type}</td>
                                <td className="border p-2">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.rsop).toFixed(2)}
                                    </div>
                                </td>
                                <td className="border p-2">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.petron_highway).toFixed(2)}
                                    </div>
                                </td>
                                <td className="border p-2">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.caltex).toFixed(2)}
                                    </div>
                                </td>
                                <td className="border p-2">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.total).toFixed(2)}
                                    </div>
                                </td>
                                <td className="border p-2">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {(fuelPrice.app_benross - fuelPrice.rephil).toFixed(2)}
                                    </div>
                                </td>
                                <td className="border p-2">
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
    );
}
