import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddChargeAccountsModal({ userLogIn, handleChargeAccountSave }) {
    const router = useRouter();

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    // Initial row template
    const initialRow = {
        date: getCurrentDate(),
        soa: "",
        cust_name: "",
        volume: "",
        ammount: "",
        ammount_paid: "",
        terms: "",
        ewt: "",
    };

    // State to manage rows
    const [rows, setRows] = useState([initialRow]);

    const handleChange = (index, e) => {
        const { name, value } = e.target;
        setRows((prevRows) => {
            const updatedRows = [...prevRows];
            updatedRows[index] = { ...updatedRows[index], [name]: value };

            // Auto-calculate EWT if applicable
            if (name === "ammount" || name === "ammount_paid") {
                const amount = parseFloat(updatedRows[index].ammount) || 0;
                const amountPaid = parseFloat(updatedRows[index].ammount_paid) || 0;
                updatedRows[index].ewt = (amount - amountPaid).toFixed(2);
            }
            return updatedRows;
        });
    };

    const addRow = () => {
        setRows((prevRows) => [...prevRows, initialRow]);
    };

    const removeRow = (index) => {
        setRows((prevRows) => prevRows.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/addChargeAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ rows, user_id: userLogIn.id }),
            });

            if (response.ok) {
                alert("Charge accounts saved successfully!");
                handleChargeAccountSave();
                router.push(`/Users/${userLogIn.id}?view=charge_acc`);
            } else {
                alert("Failed to save charge accounts. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Modal title="Charge Accounts" icon={<PlusCircle className="w-7 h-7" />}>
            <form onSubmit={handleSubmit}>
                <table className="table-auto w-full border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">Date</th>
                            <th className="border px-4 py-2">SOA #</th>
                            <th className="border px-4 py-2">Customer Name</th>
                            <th className="border px-4 py-2">Volume (L)</th>
                            <th className="border px-4 py-2">Amount</th>
                            <th className="border px-4 py-2">Terms</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, index) => (
                            <tr key={index}>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="date"
                                            name="date"
                                            value={row.date}
                                            onChange={(e) => handleChange(index, e)}
                                            className="w-full border rounded px-2 focus:outline-none"
                                            required
                                        />
                                    </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        name="soa"
                                        value={row.soa}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-52 border rounded px-2 focus:outline-none"
                                        required
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                <textarea
                                    name="cust_name"
                                    value={row.cust_name}
                                    onChange={(e) => handleChange(index, e)}
                                    className="w-56 border rounded px-2 focus:outline-none resize-none overflow-hidden"
                                    rows="1" // Start with a single line
                                    required
                                    onInput={(e) => {
                                    // Automatically resize the height of the textarea
                                    e.target.style.height = "auto"; // Reset height
                                    e.target.style.height = `${e.target.scrollHeight}px`; // Set height to scrollHeight (auto-fit)
                                    }}
                                />
                                </td>

                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        name="volume"
                                        value={row.volume}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-24 border rounded px-2 focus:outline-none"
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        name="ammount"
                                        value={row.ammount}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-32 border rounded px-2 focus:outline-none"
                                        required
                                    />
                                </td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="text"
                                        name="terms"
                                        value={row.terms}
                                        onChange={(e) => handleChange(index, e)}
                                        className="w-full border rounded px-2 focus:outline-none"
                                        required
                                    />
                                </td>
                                <td className="border px-4 py-2 text-center">
                                    {rows.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeRow(index)}
                                            className="text-red-500"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-center items-center mt-4 gap-3">
                    <button
                        type="button"
                        onClick={addRow}
                        className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md"
                    >
                        Add Row
                    </button>
                    <button
                        type="submit"
                        className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Modal>
    );
}
