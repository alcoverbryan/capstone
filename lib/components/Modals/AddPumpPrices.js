import { useEffect, useState } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddPumpPrices({ userLogIn, handleWetStockSave }) {
    const [today, setToday] = useState({ pumpDate: "", pumpDay: "" });
    const [rows, setRows] = useState([
        {
            pumpVpnPlus: "",
            pumpFsg: "",
            pumpVpnR: "",
            pumpFsd: "",
            pumpVpnD: "",
        },
    ]); // State to track all rows

    // Set today's date on load in MM/DD/YYYY format and Day
    useEffect(() => {
        const now = new Date();
        const options = { weekday: "long" }; // For day of the week
        const dateOptions = { year: "numeric", month: "numeric", day: "numeric" }; // For date format

        setToday({
            pumpDate: now.toLocaleDateString(undefined, dateOptions),
            pumpDay: now.toLocaleDateString(undefined, options), // Get day of the week
        });
    }, []);

    const handleDipChange = (rowIndex, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex][name] = value;
        setRows(updatedRows);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dipData = {
            user_id: userLogIn?.id,
            pumpDay: today.pumpDay,
            pumpDate: today.pumpDate,
            rows: rows,
        };

        try {
            const response = await fetch("/api/addPumpPrices", {
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
            alert(result.message);

            // Reset the form
            setRows([
                {
                    pumpVpnPlus: "",
                    pumpFsg: "",
                    pumpVpnR: "",
                    pumpFsd: "",
                    pumpVpnD: "",
                },
            ]);

            handleWetStockSave();
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the fuel delivery data. Please try again.");
        }
    };

    return (
        <div>
            <Modal title="Pump Prices" icon={<PlusCircle className="w-7 h-7" />}>
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
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-black">
                                            <input
                                                name="pumpDay"
                                                type="text"
                                                readOnly
                                                value={today.pumpDay}
                                                className="w-fit border-none focus:ring-0 focus:outline-none px-1 py-2"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="pumpDate"
                                                type="text"
                                                readOnly
                                                value={today.pumpDate}
                                                className="w-fit border-none focus:ring-0 focus:outline-none px-1 py-2"
                                            />
                                        </td>

                                        {["pumpVpnPlus", "pumpFsg", "pumpVpnR", "pumpFsd", "pumpVpnD"].map((id) => (
                                            <td key={id} className="border border-black">
                                                <input
                                                    name={id}
                                                    type="number"
                                                    value={row[id]}
                                                    onChange={(e) => handleDipChange(index, e)}
                                                    required
                                                    className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                                />
                                            </td>
                                        ))}
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
