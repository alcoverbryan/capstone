import React from 'react';

export default function ActualFuelPrices({ allFuelPrices }) {
    return (
        <div>
            <div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">FUEL TYPE</th>
                            <th className="border p-2">RSOP</th>
                            <th className="border p-2">APP BENNROS SHELL</th>
                            <th className="border p-2">PETRON HIWAY</th>
                            <th className="border p-2">CALTEX</th>
                            <th className="border p-2">TOTAL</th>
                            <th className="border p-2">REPHIL</th>
                            <th className="border p-2">SHELL AFFINIS</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {allFuelPrices.map((fuelPrice, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border p-2">{fuelPrice.fuel_type}</td>
                                <td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.rsop}
                                    </div>
                                </td>
                                <td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.app_benross}
                                    </div>
                                </td><td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.petron_highway}
                                    </div>
                                </td><td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.caltex}
                                    </div>
                                </td><td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.total}
                                    </div>
                                </td><td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.rephil}
                                    </div>
                                </td><td className="border p-2 ">
                                    <div className='flex gap-2'>
                                        <h1>₱</h1> {fuelPrice.shell_affinis}
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
