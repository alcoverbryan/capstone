import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component
import { PlusCircle } from "../HeroIcons";

export default function AddFuelDeliveriesModal({ handleDailyDipSave, userLogIn }) {
    const [today, setToday] = useState({ fuelDate: "" });
    const [rows, setRows] = useState([{
        fuelVpnPlus: "",
        fuelFsg: "",
        fuelVpnR: "",
        fuelFsd: "",
        fuelVpnD: "",
        total: "",
    }]);

    // Set today's date in MM/DD/YYYY format
    useEffect(() => {
        const now = new Date();
        const month = now.getMonth() + 1; // getMonth() is zero-based
        const day = now.getDate();
        const year = now.getFullYear();
        setToday({
            fuelDate: `${month}/${day}/${year}`,
        });
    }, []);

    // Handle change in dip values and calculate total
    const handleDipChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        // Calculate the total for this row, treating empty values as 0
        const total = Object.values(updatedRows[index])
            .slice(0, 5) // Only consider the first 5 fields (fuelVpn, fuelFsg, fuelVpnR, fuelFsd, fuelVpnD)
            .reduce((acc, val) => acc + (val && val !== "" ? Number(val) : 0), 0); // Treat empty fields as 0

        updatedRows[index].total = total || ""; // If no valid total, leave it empty
        setRows(updatedRows);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the server
        const dipData = {
            user_id: userLogIn?.id,
            fuelDate: today.fuelDate,
            rows: rows, // Send all rows
        };

        try {
            const response = await fetch("/api/addFuelDeliveries", {
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
                fuelVpnPlus: "",
                fuelFsg: "",
                fuelVpnR: "",
                fuelFsd: "",
                fuelVpnD: "",
                total: "",
            }]);

            // Call the callback function after save
            handleDailyDipSave();
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the fuel delivery data. Please try again.");
        }
    };

    return (
        <div>
            <Modal title="Fuel Deliveries" span={<span className="flex items-center gap-1 px-3 py-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839] cursor-pointer"><PlusCircle className="w-5 h-5" />Fuel Deliveries</span>}>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">Date</th>
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
                                                name="fuelDate"
                                                id="fuelDate"
                                                type="text"
                                                readOnly
                                                value={today.fuelDate}
                                                className="w-auto border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fuelVpnPlus"
                                                type="number"
                                                value={row.fuelVpnPlus}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fuelFsg"
                                                type="number"
                                                value={row.fuelFsg}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fuelVpnR"
                                                type="number"
                                                value={row.fuelVpnR}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fuelFsd"
                                                type="number"
                                                value={row.fuelFsd}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fuelVpnD"
                                                type="number"
                                                value={row.fuelVpnD}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="total"
                                                type="number"
                                                readOnly
                                                value={row.total}
                                                className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
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
