import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function AddDailySalesModal({ userLogIn, sales, handleDailySave }) {
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("FC1");
    const [rows, setRows] = useState([
        { credit: "", charge: "", grab: "", coins: "", bills: "", checks: "", card: "", gcash: "", vouchers: "" },
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
        const total = rows.reduce((acc, row) => {
            const rowTotal = Object.values(row).reduce(
                (sum, value) => sum + (parseFloat(value) || 0),
                0
            );
            return acc + rowTotal;
        }, 0);
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
            { credit: "", charge: "", grab: "", coins: "", bills: "", checks: "", card: "", gcash: "", vouchers: "" },
        ]);
    };

    const handleRemoveRow = (index) => {
        const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
        setRows(updatedRows);
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
            <form className="w-full" onSubmit={handleSubmit}>
                <input type="hidden" id="user_id" name="user_id" required value={userLogIn?.id || ""} />
                <input type="hidden" id="subtotal" name="subtotal" value={subtotal} />

                <div className="flex gap-4 mb-4 mt-3">
                    <div>
                        <label className="block float-left text-black text-sm mb-1" htmlFor="date">
                            Date
                        </label>
                        <input
                            name="date"
                            className="w-full border-none focus:ring-0 focus: outline-none px-1"
                            id="date"
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block float-left text-black text-sm mb-1" htmlFor="shift">
                            Shift
                        </label>
                        <input
                            name="shift"
                            className="w-full border-none focus:ring-0 focus: outline-none px-1"
                            id="shift"
                            type="text"
                            required
                            value={shift}
                            readOnly
                        />
                    </div>
                </div>

                <table className="table-auto w-full border-collapse border border-black">
                    <thead>
                        <tr className="bg-white">
                            <th className="border border-black px-2 py-1">Credit/Debit Card</th>
                            <th className="border border-black px-2 py-1">Charge Acc</th>
                            <th className="border border-black px-2 py-1">Grab Disc</th>
                            <th className="border border-black px-2 py-1">Coins</th>
                            <th className="border border-black px-2 py-1">Bills</th>
                            <th className="border border-black px-2 py-1">Checks</th>
                            <th className="border border-black px-2 py-1">Pay Points/Go+Card</th>
                            <th className="border border-black px-2 py-1">GCash</th>
                            <th className="border border-black px-2 py-1">Vouchers</th>
                            <th className="border border-black px-2 py-1">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index} className="bg-white">
                                {Object.keys(row).map((key) => (
                                    <td key={key} className="border border-black">
                                        <input
                                            type="number"
                                            value={row[key]}
                                            className="w-40 border-none focus:ring-0 focus: outline-none px-1"
                                            onChange={(e) => handleInputChange(index, key, e.target.value)}
                                        />
                                    </td>
                                ))}
                                        <td className="border border-black bg-white font-semibold">
                                            {rows.length > 1 && (
                                                <button
                                                    type="button"
                                                    className="text-red-500 w-full border-none focus:ring-0 focus: outline-none px-1"
                                                    onClick={() => {
                                                        const updatedRows = rows.filter((_, i) => i !== index);
                                                        setRows(updatedRows);
                                                    }}
                                                >
                                                    Remove
                                                </button>
                                            )}
                                        </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex items-center justify-center mt-4">
                    <button
                            type="button"
                            onClick={addRow}
                            className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md"
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
        </Modal>
    );
}
