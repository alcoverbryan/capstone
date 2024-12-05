import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function AddDailySalesModal({ userLogIn, sales, handleDailySave }) {
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("FC1");
    const [rows, setRows] = useState([
        { credit: "", charge: "", grab: "", coins: "", bills: "", checks: "", card: "", gcash: "", vouchers: "", subtotal:"" },
    ]);
    const [subtotal, setSubtotal] = useState("");
    const router = useRouter();

    const getCurrentDate = () => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().split("T")[0];
    };

    useEffect(() => {
        setDate(getCurrentDate());
    }, []);

    useEffect(() => {
        if (sales && sales.length > 0) {
            const lastShift = sales[sales.length - 1].shift;
            setShift(lastShift === "FC1" ? "FC2" : lastShift === "FC2" ? "FC3" : lastShift);
        }
    }, [sales]);

    const calculateSubtotal = () => {
        const total = rows.reduce(
            (acc, row) =>
                acc +
                (parseFloat(row.credit) || 0) +
                (parseFloat(row.charge) || 0) +
                (parseFloat(row.grab) || 0) +
                (parseFloat(row.coins) || 0) +
                (parseFloat(row.bills) || 0) +
                (parseFloat(row.checks) || 0) +
                (parseFloat(row.card) || 0) +
                (parseFloat(row.gcash) || 0) +
                (parseFloat(row.vouchers) || 0),
            0
        );
        setSubtotal(total > 0 ? total.toFixed(2) : "");
    };

    useEffect(() => {
        calculateSubtotal();
    }, [rows]);

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const addRow = () => {
        setRows([
            ...rows,
            { credit: "", charge: "", grab: "", coins: "", bills: "", checks: "", card: "", gcash: "", vouchers: "", subtotal:"" },
        ]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const salesData = {
            user_id: userLogIn?.id,
            date,
            shift,
            subtotal,
            rows, // Include all row data
        };

        try {
            const response = await fetch("/api/addDailySales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(salesData),
            });

            if (!response.ok) {
                throw new Error("Failed to save sales data");
            }

            const result = await response.json();

            alert(result.message);

            handleDailySave();
            router.push(`/Users/${userLogIn.id}?view=daily_sales`);
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the sales data. Please try again.");
        }
    };

    return (
        <Modal title="Daily Sales" icon={<PlusCircle className="w-7 h-7" />}>
            <div className="flex">
                <form className="w-full" onSubmit={handleSubmit}>
                    <input type="hidden" id="user_id" name="user_id" required value={userLogIn?.id || ""} />
                    <input type="hidden" id="subtotal" name="subtotal" value={subtotal} />
                    <div className="border-0 flex gap-4">
                        <div className="mb-4">
                            <label className="block text-black text-sm mb-1 text-start" htmlFor="date">
                                Date
                            </label>
                            <input
                                name="date"
                                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                id="date"
                                type="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-black text-sm mb-1 text-start" htmlFor="shift">
                                Shift
                            </label>
                            <input
                                name="shift"
                                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                id="shift"
                                type="text"
                                required
                                value={shift}
                                readOnly
                            />
                        </div>
                    </div>
                    <h1 className="font-semibold mb-2">Sales Amount</h1>
                    <table className="table-auto w-full border-collapse border border-black">
                        <thead>
                            <tr className="bg-white">
                                <th className="border border-black px-4 py-2">Credit/Debit Card</th>
                                <th className="border border-black px-4 py-2">Charge Acc</th>
                                <th className="border border-black px-4 py-2">Grab Disc</th>
                                <th className="border border-black px-4 py-2">Coins</th>
                                <th className="border border-black px-4 py-2">Bills</th>
                                <th className="border border-black px-4 py-2">Checks</th>
                                <th className="border border-black px-4 py-2">Pay Points/Go+Card</th>
                                <th className="border border-black px-4 py-2">GCash</th>
                                <th className="border border-black px-4 py-2">Vouchers</th>
                                <th className="border border-black px-4 py-2">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, index) => (
                                <tr key={index}>
                                    {Object.keys(row).map((key) => (
                                        <td key={key} className="border border-black">
                                            <input
                                                type="number"
                                                value={row[key]}
                                                className="w-44 border-none focus:ring-0 focus: outline-none px-1 py-0"
                                                onChange={(e) => handleInputChange(index, key, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-center mt-4">
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md"
                            onClick={addRow}
                        >
                            Add Row
                        </button>
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md ml-4"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
