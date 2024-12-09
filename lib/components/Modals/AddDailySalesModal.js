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
            rows, // Send rows array directly
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
                        <label className="block float-left text-black text-xl mb-1" htmlFor="date">
                            Date
                        </label>
                        <input
                            name="date"
                            className="w-full border border-black focus:ring-0 focus: outline-none px-2 py-2"
                            id="date"
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block float-left text-black text-xl mb-1" htmlFor="shift">
                            Shift
                        </label>
                        <input
                            name="shift"
                            className="w-full border border-black focus:ring-0 focus: outline-none px-2 py-2"
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
                            <th className="border border-black px-2 py-1">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => {
                            // Calculate subtotal for the current row
                            const rowSubtotal = Object.values(row).reduce(
                                (sum, value) => sum + (parseFloat(value) || 0),
                                0
                            );

                            return (
                                <tr key={index} className="bg-white">
                                    {Object.keys(row).map((key) => (
                                        <td key={key} className="border border-black px-2 py-1">
                                            <input
                                                type="number"
                                                value={row[key]}
                                                className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                                onChange={(e) => handleInputChange(index, key, e.target.value)}
                                            />
                                        </td>
                                    ))}
                                    <td className="border border-black px-2 py-1 text-right">
                                        {rowSubtotal.toFixed(2)} {/* Display the row subtotal */}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="flex items-center justify-center mt-4 mb-4">
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md"
                    >
                        Save
                    </button>
                </div>

            </form>
        </Modal>
    );
}
