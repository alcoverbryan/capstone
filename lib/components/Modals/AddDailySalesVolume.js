import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component
import { PlusCircle } from "../HeroIcons";

export default function AddDailySalesVolume({ handleDailySalesVolumeSave, userLogIn }) {
    const [today, setToday] = useState({ date: "", day: "" });
    const [rows, setRows] = useState([
        {
            vpnPlus: "",
            fsg: "",
            vpnR: "",
            fsd: "",
            vpnD: "",
            total: "",
        },
    ]); // State to track all rows

    // Set today's date on load in MM/DD/YYYY format and Day
    useEffect(() => {
        const now = new Date();
        const options = { weekday: "long" }; // For day of the week
        const dateOptions = { year: "numeric", month: "numeric", day: "numeric" }; // For date format

        setToday({
            date: now.toLocaleDateString(undefined, dateOptions),
            day: now.toLocaleDateString(undefined, options), // Get day of the week
        });
    }, []);

    const updateRowTotal = (rowIndex) => {
        const updatedRows = [...rows];
        const row = updatedRows[rowIndex];
        const total = Object.values(row)
            .slice(0, 5) // Only consider the first 5 values
            .reduce((acc, val) => acc + (val ? Number(val) : 0), 0);
        updatedRows[rowIndex].total = total ? total.toFixed(2) : ""; // Set total with 2 decimals
        setRows(updatedRows);
    };
    

    const handleDipChange = (rowIndex, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex][name] = value;
        setRows(updatedRows);
        updateRowTotal(rowIndex); 
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the server
        const dipData = {
            user_id: userLogIn?.id,
            day: today.day,
            date: today.date,
            rows: rows, // Send all rows
        };

        try {
            const response = await fetch("/api/addDailySalesVolume", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dipData),
            });

            if (!response.ok) {
                throw new Error("Failed to save fuel delivery data");
            }

            const result = await response.json();
            alert(result.message); // Notify the user of success

            // Reset the form
            setRows([{
                vpnPlus: "",
                fsg: "",
                vpnR: "",
                fsd: "",
                vpnD: "",
                total: "",
            }]);

            // Call the callback function after save
            handleDailySalesVolumeSave();
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the fuel delivery data. Please try again.");
        }
    };

    return (
        <div>
            <Modal title="Daily Sales Volume" span={<span className="flex items-center gap-1 p-3 py-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839] cursor-pointer"><PlusCircle className="w-5 h-5"/>Daily Sales Volume</span>}>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full text-center border border-gray-300">
                         <thead>
                                <tr>
                                    <td className="border border-black px-1 py-2 bg-white text-black font-semibold">Day</td>
                                    <td className="border border-black px-1 py-2 bg-white text-black font-semibold">Date</td>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">VPN+</th>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">FSG</th>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">VPN+R</th>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">FSD</th>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">VPN+D</th>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-black">
                                            <input
                                                name="day"
                                                type="text"
                                                readOnly
                                                value={today.day} // Display the day of the week
                                                className="w-fit border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="date"
                                                type="text"
                                                readOnly
                                                value={today.date} // Format: MM/DD/YYYY
                                                className="w-fit border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                      
                                        {["vpnPlus", "fsg", "vpnR", "fsd", "vpnD"].map((id) => (
                                            <td key={id} className="border border-black">
                                                <input
                                                    name={id}
                                                    type="number"
                                                    value={row[id]}
                                                    onChange={(e) => handleDipChange(index, e)}
                                                    required
                                                    className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                                />
                                            </td>
                                        ))}
                                        <td className="border border-black">
                                            <input
                                                name="total"
                                                type="number"
                                                readOnly
                                                value={row.total}
                                                className="w-fit border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-center mt-4 mb-4">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md ml-4"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
