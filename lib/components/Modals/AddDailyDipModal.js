import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component
import { PlusCircle } from "../HeroIcons";

export default function AddDailyDipModal({ userLogIn, handleDailyDipSave }) {
    const [today, setToday] = useState({ date: "", day: "" });
    const [row, setRow] = useState({
        vpn: "",
        fsg: "",
        vpnR: "",
        fsd: "",
        vpnD: "",
        total: "",
    });

    // Set today's date and day on load
    useEffect(() => {
        const now = new Date();
        const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(
            now.getDate()
        ).padStart(2, "0")}`; // Format as YYYY-MM-DD
        const dayName = now.toLocaleDateString(undefined, { weekday: "long" });
        setToday({ date: formattedDate, day: dayName });
    }, []);

    // Update the total when any field changes
    useEffect(() => {
        const total = Object.values(row)
            .slice(0, 5) // Only consider the first 5 values (vpn, fsg, vpnR, fsd, vpnD)
            .reduce((acc, val) => acc + (val ? Number(val) : 0), 0); // If value is empty, treat it as 0
        setRow((prevRow) => ({ ...prevRow, total: total || 0 })); // Set total to 0 if no valid inputs
    }, [row.vpn, row.fsg, row.vpnR, row.fsd, row.vpnD]);

    // Handle change in dip values for the row
    const handleDipChange = (e) => {
        const { name, value } = e.target;
        setRow((prevRow) => ({ ...prevRow, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const dipData = {
            user_id: userLogIn?.id,
            day: today.day,
            date: today.date,
            rows: [row], // Send the single row as an array
        };

        try {
            const response = await fetch("/api/addDailyDip", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dipData),
            });

            if (!response.ok) {
                throw new Error("Failed to save dip data");
            }

            const result = await response.json();
            alert(result.message); // Notify the user of success

            // Reset the form
            setRow({
                vpn: "",
                fsg: "",
                vpnR: "",
                fsd: "",
                vpnD: "",
                total: 0, // Reset total to 0
            });

            // Call the callback function after save
            handleDailyDipSave();
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the dip data. Please try again.");
        }
    };

    return (
        <div>
            <Modal
                icon={PlusCircle}
                title="Actual 6am Dip"
                span={
                    <span className="flex items-center gap-1 px-3 py-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839] cursor-pointer">
                        <PlusCircle className="w-5 h-5" />
                        Daily Dip
                    </span>
                }
            >
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full text-center border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-black px-1 py-2 bg-white text-black font-semibold">Day</th>
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
                                <tr className="bg-white">
                                    <td className="border border-black">
                                        <input
                                            name="day"
                                            type="text"
                                            readOnly
                                            value={today.day}
                                            className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        />
                                    </td>
                                    <td className="border border-black">
                                        <input
                                            name="date"
                                            type="date"
                                            readOnly
                                            value={today.date}
                                            className="w-auto border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        />
                                    </td>
                                    {["vpn", "fsg", "vpnR", "fsd", "vpnD"].map((id) => (
                                        <td key={id} className="border border-black">
                                            <input
                                                name={id}
                                                type="number"
                                                value={row[id]}
                                                onChange={handleDipChange}
                                                required
                                                className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                            />
                                        </td>
                                    ))}
                                    <td className="border border-black">
                                        <input
                                            name="total"
                                            type="number"
                                            readOnly
                                            value={row.total}
                                            className="w-auto border-none focus:ring-0 focus:outline-none px-1"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Save Button */}
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
        </div>
    );
}
