import { useState } from 'react';
import { MagnifyingGlass } from "./HeroIcons";
import AddDailySalesModal from "./Modals/AddDailySalesModal";
import DateDailySalesDetails from './DateDailySalesDeatails';
import AddDailyDepositModal from './Modals/AddDailyDepositModal';
import AddTotalModal from './Modals/AddTotalModal';

export default function DailySales({ userLogIn, allDailySales, allActualPOS }) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const closeDetails = () => {
        setSelectedDate(null);
    };

    const lastShift = allDailySales.length > 0 ? allDailySales[allDailySales.length - 1].shift : null;

    const mergedSales = allDailySales.map(sale => {
        const matchingPOS = allActualPOS.find(pos => pos.date === sale.date);
        return {
            ...sale,
            actualPos: matchingPOS ? matchingPOS.actualPOS : sale.actualPOS,
            overShortage : matchingPOS ? matchingPOS.overShortage : sale.overShortage,
        };
    });

    const filteredSales = mergedSales.filter(sale => sale.date === selectedDate);

    const displayedDates = new Set();

    const calculateTotalForDate = (date) => {
        const salesForDate = mergedSales.filter(sale => sale.date === date);
        const total = salesForDate.reduce((sum, sale) => sum + (Number(sale.subtotal) || 0), 0);
        return total;
    };

    const calculateCoinsBillsForDate = (date) => {
        const salesForDate = mergedSales.filter(sale => sale.date === date);
        const coinsBillsTotal = salesForDate.reduce((sum, sale) => {
            const coins = Number(sale.coins) || 0;
            const bills = Number(sale.bills) || 0;
            return sum + coins + bills;
        }, 0);
        return coinsBillsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    };

    const calculateCreditCardsForDate = (date) => {
        const salesForDate = mergedSales.filter(sale => sale.date === date);
        const creditCardsTotal = salesForDate.reduce((sum, sale) => sum + (Number(sale.credit) || 0), 0);
        return creditCardsTotal.toLocaleString('en-US', { minimumFractionDigits: 2 });
    };

    return (
        <>
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border-b p-2 focus:outline-none w-full h-10 pl-8"
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
                {!(lastShift === "FC1" || lastShift === "FC2") && (
                    <AddDailySalesModal userLogIn={userLogIn} />
                )}
            </div>

            {!selectedDate && (
                <>
                    <div className="flex justify-center mb-10 p-4 shadow-md bg-white items-center">
                        <p className="text-[20px]">Daily Sales</p>
                    </div>


                    <div className="mt-10 bg-white rounded-md">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                                    <th className="border p-2">DATE</th>
                                    <th className="border p-2">TOTAL</th>
                                    <th className="border p-2">ACTUAL POS</th>
                                    <th className="border p-2">OVER/SHORTAGE</th>
                                    <th className="border p-2">COINS & BILLS</th>
                                    <th className="border p-2">CREDIT CARDS</th>
                                    <th className="border p-2">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mergedSales && mergedSales.length > 0 ? (
                                    mergedSales.map((sale, index) => {
                                        if (!displayedDates.has(sale.date)) {
                                            displayedDates.add(sale.date);

                                            const filteredSalesForDate = mergedSales.filter(s => s.date === sale.date);

                                            return (
                                                <tr key={index} className="text-center">
                                                    <td
                                                        className="border p-2 cursor-pointer"
                                                        onClick={() => handleDateClick(sale.date)}
                                                    >
                                                        {sale.date || "Pending"}
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {sale.subtotal !== undefined && <h1>₱</h1>}
                                                            {calculateTotalForDate(sale.date).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {sale.actualPos !== undefined && <h1>₱</h1>}
                                                            {sale.actualPos?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "Pending"}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {sale.overShortage !== undefined && <h1>₱</h1>}
                                                            {sale.overShortage?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "Pending"}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {sale.coins !== undefined || sale.bills !== undefined ? <h1>₱</h1> : null}
                                                            {calculateCoinsBillsForDate(sale.date)}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            {sale.credit !== undefined && <h1>₱</h1>}
                                                            {calculateCreditCardsForDate(sale.date)}
                                                        </div>
                                                    </td>
                                                    <td className="p-4 border border-gray-200">
                                                        <div className="flex justify-center items-center gap-2">
                                                            {sale.actualPos && sale.overShortage ? (
                                                                <span className="text-green-500 font-bold">Saved</span>
                                                            ) : (
                                                                (lastShift === "FC1" || lastShift === "FC2") ? (
                                                                    <span className="text-gray-500 font-bold">Pending</span>
                                                                ) : (
                                                                    <AddTotalModal userLogIn={userLogIn} date={sale.date} salesData={filteredSalesForDate} />
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                        return null;
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="border p-2 text-center">
                                            Pending
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {selectedDate && (
                <DateDailySalesDetails sales={filteredSales} userLogIn={userLogIn} closeDetails={closeDetails} />
            )}
        </>
    );
}
