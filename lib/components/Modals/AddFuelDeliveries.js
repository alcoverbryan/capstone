import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component

export default function AddFuelDeliveriesModal() {
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
    ]);

    // Set today's date on load
    useEffect(() => {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "numeric", day: "numeric" };
        setToday({
            date: now.toLocaleDateString(undefined, options),
        });
    }, []);

    // Handle change in dip values
    const handleDipChange = (e, index) => {
        const { name, value } = e.target;
        const updatedRows = [...rows];
        updatedRows[index][name] = value;

        // Calculate the total for this row
        const total = Object.values(updatedRows[index])
            .slice(0, 5)
            .reduce((acc, val) => acc + (val ? Number(val) : 0), 0);

        updatedRows[index].total = total || ""; // Set total to empty string if no valid inputs
        setRows(updatedRows);
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
            <Modal title="Fuel Deliveries" span={<span className="px-4 py-2 bg-[#E63946] text-[#FFFFFF] rounded-md hover:bg-[#D62839] cursor-pointer">Fuel Deliveries</span>}>
                <form className="w-full" action="/api/addFuelPrices" method="POST">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">FSG</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+R</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">FSD</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">VPN+D</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Total</th>
                                    <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {rows.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border border-black">
                                            <input
                                                name="date"
                                                id="date"
                                                type="text"
                                                readOnly
                                                value={today.date}
                                                className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="vpnPlus"
                                                type="number"
                                                value={row.vpnPlus}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fsg"
                                                type="number"
                                                value={row.fsg}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="vpnR"
                                                type="number"
                                                value={row.vpnR}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="fsd"
                                                type="number"
                                                value={row.fsd}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="vpnD"
                                                type="number"
                                                value={row.vpnD}
                                                onChange={(e) => handleDipChange(e, index)}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                            />
                                        </td>
                                        <td className="border border-black">
                                            <input
                                                name="total"
                                                type="number"
                                                readOnly
                                                value={row.total}
                                                className="w-full border-none focus:ring-0 focus: outline-none px-1"
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
                    {/* Save and Cancel Buttons */}
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
