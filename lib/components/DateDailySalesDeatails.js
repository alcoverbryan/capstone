import AddDailySalesModal from "./Modals/AddDailySalesModal";

export default function DateDailySalesDetails({ sales, userLogIn, closeDetails }) {
    const lastShift = sales.length > 0 ? sales[sales.length - 1].shift : null;

    // Formatting function to add commas and ensure at least three digits
    const formatNumber = (num) => {
        if (num === null || num === undefined) return "-";
        const formatted = Number(num).toLocaleString('en-US', { minimumFractionDigits: 0 });
        return formatted.length < 3 ? `0${formatted}` : formatted; // Ensure at least three digits
    };

    return (
        <>
            <div className="mt-10 bg-white rounded-md">
                <div className="flex justify-between mb-10 p-4 shadow-md bg-white items-center">
                    <p className="text-[20px]">Daily Sales</p>
                    <div className="flex justify-end">
                        {lastShift !== "FC3" && <AddDailySalesModal userLogIn={userLogIn} sales={sales} />}
                    </div>
                </div>

                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2" rowSpan="2">DATE</th>
                            <th className="border p-2" rowSpan="2">SHIFT</th>
                            <th className="border p-2" rowSpan="2">CASHIER</th>
                            <th className="border p-2" colSpan="9">SALES AMOUNT</th>
                            <th className="border p-2" rowSpan="2">SUBTOTAL</th>
                        </tr>
                        <tr className="bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-gray-50">
                            <th className="border p-2">CREDIT/DEBIT CARD</th>
                            <th className="border p-2">CHARGE ACCT</th>
                            <th className="border p-2">GRAB DISC</th>
                            <th className="border p-2">COINS</th>
                            <th className="border p-2">BILLS</th>
                            <th className="border p-2">CHECKS</th>
                            <th className="border p-2">PAY POINTS</th>
                            <th className="border p-2">GCASH</th>
                            <th className="border p-2">VOUCHERS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.length > 0 ? (
                            sales.map((sale, index) => (
                                <tr key={index} className="text-center">
                                    <td className="border p-2">{sale.date || "-"}</td>
                                    <td className="border p-2">{sale.shift || "-"}</td>
                                    <td className="border p-2">{sale.user.username || "-"}</td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.credit !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.credit) }
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.charge !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.charge)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.grab !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.grab)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.coins !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.coins)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.bills !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.bills)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.checks !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.checks)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.card !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.card)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.gcash !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.gcash)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.vouchers !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.vouchers)}
                                        </div>
                                    </td>
                                    <td className="p-4 border border-gray-200">
                                        <div className="flex items-center gap-2">
                                            {sale.subtotal !== undefined && <h1>₱</h1>}
                                            {formatNumber(sale.subtotal)}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="border p-2 text-center">
                                    No sales data available for this date.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                
            </div>
            <button
                onClick={closeDetails}
                className="md:w-full flex justify-end mt-4"
            >
                <div className="py-1 px-6 text-l font-medium rounded-md border border-accent1 text-accent1 shadow-md">Back</div>
            </button>
        </>
    );
}
