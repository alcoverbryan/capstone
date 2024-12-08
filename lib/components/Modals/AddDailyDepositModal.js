import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function AddDailyDepositModal({ userLogIn, handleDailyDepositSave }) {
    const [rows, setRows] = useState([]);
    const router = useRouter();

    const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

    // Initial state for a single row
    const createNewRow = () => ({
        shiftDate: currentDate,
        dateDeposited: currentDate,
        source: "",
        cashier: "",
        type: "",
        bankDepositedTo: "",
        subtotal: "",
    });

    useEffect(() => {
        // Add the first row by default
        setRows([createNewRow()]);
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = rows.map((row) => ({
            user_id: userLogIn?.id,
            ...row,
        }));
    
        try {
            const response = await fetch("/api/dailyDeposit", {
                method: "POST",
                headers: {

                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ deposits: formData }),
            });
    
            if (response.ok) {

                // Show success alert
                alert("Daily deposits saved successfully!");
    
                // Reset the form by clearing the rows and adding a new blank row
                setRows([createNewRow()]);
    
                // Notify the parent component

                handleDailyDepositSave();
            } else {
                const errorData = await response.json();

                // Show error alert with server message
                alert(`Failed to save daily deposits: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            // Show error alert
            alert("Error occurred while saving daily deposits. Please try again later.");

            console.error("Error occurred while saving daily deposits:", error);
        }
    };
    

    // Handle input change for a specific row
    const handleRowChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    // Add a new row
    const addRow = () => {
        setRows([...rows, createNewRow()]);
    };

    // Remove a row
    const removeRow = (index) => {
        const updatedRows = rows.filter((_, i) => i !== index);
        setRows(updatedRows);
    };

    return (
        <Modal title="Daily Deposit" icon={<PlusCircle className="w-7 h-7" />}>

        <div className="flex flex-col items-center">
            <form className="w-full" onSubmit={handleSubmit}>
            <table className="table-auto w-full border-collapse ">
                <thead>
                <tr className="bg-white">
                    <th className="border border-black px-4 py-2">Date Deposited</th>
                    <th className="border border-black px-4 py-2">Shift Date</th>
                    <th className="border border-black px-4 py-2">Source</th>
                    <th className="border border-black px-4 py-2">Cashier</th>
                    <th className="border border-black px-4 py-2">Type</th>
                    <th className="border border-black px-4 py-2">Bank Deposited To</th>
                    <th className="border border-black px-4 py-2">Subtotal</th>
                    {rows.length > 1 && <th className="border border-black px-4 py-2">Actions</th>}
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                    <td className="border border-black">
                        <input
                        type="date"
                        value={row.dateDeposited}
                        className="w-full border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "dateDeposited", e.target.value)}
                        />
                    </td>
                    <td className="border border-black">
                        <input
                        type="date"
                        value={row.shiftDate}
                        className="w-full border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "shiftDate", e.target.value)}
                        />
                    </td>
                    <td className="border border-black">
                        <select
                        value={row.source}
                        onChange={(e) => handleRowChange(index, "source", e.target.value)}
                        className={`w-auto border-none focus:ring-0 focus:outline-none px-1 py-2 ${
                            row.source === "" ? "text-gray-400" : "text-black"
                        }`}
                        >
                            <option disabled value="" className="text-gray-400">
                                Select Source
                            </option>
                            <option className="text-black" value="FC1">FC1</option>
                            <option className="text-black" value="FC2">FC2</option>
                            <option className="text-black" value="FC3">FC3</option>
                            <option className="text-black" value="SELECT1">SELECT1</option>
                            <option className="text-black" value="SELECT2">SELECT2</option>
                            <option className="text-black" value="HSC">HSC</option>
                            <option className="text-black" value="FCLUBE1">FCLUBE1</option>
                            <option className="text-black" value="FCLUBE2">FCLUBE2</option>
                            <option className="text-black" value="FCLUBE3">FCLUBE3</option>
                            <option className="text-black" value="SOLANE">SOLANE</option>
                            <option className="text-black" value="FC1 COINS">FC1 COINS</option>
                            <option className="text-black" value="FC2 COINS">FC2 COINS</option>
                            <option className="text-black" value="FC3 COINS">FC3 COINS</option>
                        {/* Add other options here */}
                        </select>
                    </td>
                    <td className="border border-black">
                        <input
                        type="text"
                        value={row.cashier}
                        className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "cashier", e.target.value)}
                        />
                    </td>
                    <td className="border border-black">
                        <input
                        type="text"
                        value={row.type}
                        className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "type", e.target.value)}
                        />
                    </td>
                    <td className="border border-black">
                        <input
                        type="text"
                        value={row.bankDepositedTo}
                        className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "bankDepositedTo", e.target.value)}
                        />
                    </td>
                    <td className="border border-black">
                        <input
                        type="text"
                        value={row.subtotal}
                        className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                        onChange={(e) => handleRowChange(index, "subtotal", e.target.value)}
                        />
                    </td>
                        <td className={`bg-white font-semibold ${rows.length > 1 ? 'border border-black' : ''}`}>
                            {rows.length > 1 && (
                            <button
                                type="button"
                                className="text-red-500 w-full border-none focus:ring-0 focus:outline-none px-1"
                                onClick={() => removeRow(index)}
                            >
                                Remove
                            </button>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className="flex items-center justify-center mt-5 mb-5">
                <button
                className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md"
                type="button"
                onClick={addRow}
                >
                Add Row
                </button>
                <button
                className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md ml-4"
                type="submit"
                >
                Save
                </button>
            </div>
            </form>
        </div>
        </Modal>
    );
}
