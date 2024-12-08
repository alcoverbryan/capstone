import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component
import { PlusCircle } from "../HeroIcons";

export default function AddDailySalesVolume() {
    const [today, setToday] = useState({ date: "" });
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

    // Set today's date on load
    useEffect(() => {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "numeric", day: "numeric" };
        setToday({
            date: now.toLocaleDateString(undefined, options),
        });
    }, []);

    // Update the total for a specific row
    const updateRowTotal = (rowIndex) => {
        const updatedRows = [...rows];
        const row = updatedRows[rowIndex];
        const total = Object.values(row)
            .slice(0, 5) // Only consider the first 5 values
            .reduce((acc, val) => acc + (val ? Number(val) : 0), 0);
        updatedRows[rowIndex].total = total || ""; // Set total or empty string if invalid
        setRows(updatedRows);
    };

    // Handle change in dip values for a specific row
    const handleDipChange = (rowIndex, e) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[rowIndex][name] = value;
        setRows(updatedRows);
        updateRowTotal(rowIndex);
    };

    // Add a new row
    const addRow = () => {
        setRows([
            ...rows,
            {
                vpnPlus: "",
                fsg: "",
                vpnR: "",
                fsd: "",
                vpnD: "",
                total: "",
            },
        ]);
    };

    return (
        <div>
            <Modal title="Daily Sales Volume" span={<span className="flex items-center gap-1 p-3 py-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839] cursor-pointer"><PlusCircle className="w-5 h-5"/>Daily Sales Volume</span>}>
                <form className="w-full" action="/api/addFuelPrices" method="POST">
                    <div className="overflow-x-auto">
                      <table className="table-auto w-full text-center border border-gray-300">
                         <thead>
                                <tr>
                                    <td className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</td>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">FSG</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+R</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">FSD</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+D</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Total</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((row, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border border-black">
                                            <input
                                                name="date"
                                                type="text"
                                                readOnly
                                                value={today.date}
                                                className="w-fit border-none focus:ring-0 focus: outline-none px-1"
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
                                                    className="w-fit border-none focus:ring-0 focus: outline-none px-1"
                                                />
                                            </td>
                                        ))}
                                        <td className="border border-black">
                                            <input
                                                name="total"
                                                type="number"
                                                readOnly
                                                value={row.total}
                                                className="w-fit border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
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
                    </div>

                    {/* Save and Add Row Buttons */}
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
        </div>
    );
}
