import { useState } from "react";
import { MagnifyingGlass } from "./HeroIcons";
import AddDailySalesModal from "./Modals/AddDailySalesModal";
import DateDailySalesDetails from "./DateDailySalesDeatails";
import AddTotalModal from "./Modals/AddTotalModal";

export default function DailySales({ userLogIn, allDailySales, allActualPOS, handleDailySave }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [searchInput, setSearchInput] = useState("");

    const handleDateClick = (date) => setSelectedDate(date);
    const closeDetails = () => setSelectedDate(null);

    const lastShift = allDailySales.length > 0 ? allDailySales[allDailySales.length - 1].shift : null;

    // Merging Daily Sales with Actual POS
    const mergedSales = allDailySales.map((sale) => {
        const matchingPOS = allActualPOS.find((pos) => pos.date === sale.date);
        return {
            ...sale,
            actualPos: matchingPOS ? matchingPOS.actualPOS : sale.actualPOS,
            overShortage: matchingPOS ? matchingPOS.overShortage : sale.overShortage,
        };
    });

    // Calculate totals
    const calculateTotalForDate = (date) =>
        mergedSales
            .filter((sale) => sale.date === date)
            .reduce((sum, sale) => sum + (Number(sale.subtotal) || 0), 0);

    const calculateCoinsBillsForDate = (date) =>
        mergedSales
            .filter((sale) => sale.date === date)
            .reduce((sum, sale) => sum + (Number(sale.coins) || 0) + (Number(sale.bills) || 0), 0)
            .toLocaleString("en-US", { minimumFractionDigits: 2 });

    const calculateCreditCardsForDate = (date) =>
        mergedSales
            .filter((sale) => sale.date === date)
            .reduce((sum, sale) => sum + (Number(sale.credit) || 0), 0)
            .toLocaleString("en-US", { minimumFractionDigits: 2 });

    // Filtered Data based on Search Input
    const filteredSales = mergedSales.filter((sale) =>
        sale.date.toLowerCase().includes(searchInput.toLowerCase().trim())
    );

    const displayedDates = new Set();

    return (
        <>
            {/* Header Section */}
            <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                {/* Search Input */}
                <div className="flex items-center relative">
                    <input
                        type="text"
                        placeholder="Search Date..."
                        className="border-b p-2 w-full focus:outline-none h-10 pl-8 bg-light"
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <div className="absolute top-0 left-0 h-full flex items-center pl-2">
                        <MagnifyingGlass className="w-5 h-5" />
                    </div>
                </div>
                {!(lastShift === "FC1" || lastShift === "FC2") && (
                    <AddDailySalesModal userLogIn={userLogIn} handleDailySave={handleDailySave} />
                )}
            </div>

            {/* Table or Details View */}
            {!selectedDate ? (
                <div className="mt-10 bg-white rounded-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-yellow-300 text-lg text-black">
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
                            {filteredSales.length > 0 ? (
                                filteredSales.map((sale, index) => {
                                    if (!displayedDates.has(sale.date)) {
                                        displayedDates.add(sale.date);

                                        return (
                                            <tr key={index} className="text-center">
                                                <td
                                                    className="border p-2 cursor-pointer"
                                                    onClick={() => handleDateClick(sale.date)}
                                                >
                                                    {sale.date || "Pending"}
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex items-center gap-2">
                                                        {sale.subtotal !== undefined && <h1>₱</h1>}
                                                        {calculateTotalForDate(sale.date).toLocaleString("en-US", {
                                                            minimumFractionDigits: 2,
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex items-center gap-2">
                                                        {sale.actualPos !== undefined && <h1>₱</h1>}
                                                        {sale.actualPos?.toLocaleString("en-US", {
                                                            minimumFractionDigits: 2,
                                                        }) || "Pending"}
                                                    </div>
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex items-center gap-2">
                                                        {sale.overShortage !== undefined && <h1>₱</h1>}
                                                        {sale.overShortage?.toLocaleString("en-US", {
                                                            minimumFractionDigits: 2,
                                                        }) || "Pending"}
                                                    </div>
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex items-center gap-2">
                                                        <h1>₱</h1>
                                                        {calculateCoinsBillsForDate(sale.date)}
                                                    </div>
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex items-center gap-2">
                                                        <h1>₱</h1>
                                                        {calculateCreditCardsForDate(sale.date)}
                                                    </div>
                                                </td>
                                                <td className="p-4 border">
                                                    <div className="flex justify-center items-center gap-2">
                                                        {sale.actualPos && sale.overShortage ? (
                                                            <span className="text-green-500 font-bold">Completed</span>
                                                        ) : lastShift === "FC1" || lastShift === "FC2" ? (
                                                            <span className="text-gray-500 font-bold">Pending</span>
                                                        ) : (
                                                            <AddTotalModal
                                                                userLogIn={userLogIn}
                                                                date={sale.date}
                                                                salesData={filteredSales}
                                                                handleDailySave={handleDailySave}
                                                            />
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
                                    <td colSpan="7" className="text-center text-red-500 p-4">
                                        {searchInput ? "No matching data found." : "No data available."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            ) : (
                <DateDailySalesDetails
                    sales={mergedSales.filter((sale) => sale.date === selectedDate)}
                    userLogIn={userLogIn}
                    closeDetails={closeDetails}
                    handleDailySave={handleDailySave}
                />
            )}
        </>
    );
}
