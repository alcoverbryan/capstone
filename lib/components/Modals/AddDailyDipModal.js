import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component

export default function AddDailyDipModal() {
    const [today, setToday] = useState({ date: "" });
    const [dipValues, setDipValues] = useState({
        vpnPlus: "",
        fsg: "",
        vpnR: "",
        fsd: "",
        vpnD: "",
        total: "",
    });

    // Set today's date on load
    useEffect(() => {
        const now = new Date();
        const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
        setToday({
            date: now.toLocaleDateString(undefined, options),
        });
    }, []);

    // Update total whenever any dip value changes
    useEffect(() => {
        const total = Object.values(dipValues)
            .slice(0, 5) // Only use the first 5 dip values
            .reduce((acc, val) => acc + (val ? Number(val) : 0), 0); // Ignore empty values
        setDipValues((prev) => ({ ...prev, total: total || "" })); // Set total to empty string if no valid inputs
    }, [dipValues.vpnPlus, dipValues.fsg, dipValues.vpnR, dipValues.fsd, dipValues.vpnD]);

    // Handle change in dip values
    const handleDipChange = (e) => {
        const { name, value } = e.target;
        setDipValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Modal
                title={<span className="font-bold text-gray-700">6am Dip</span>}
                className="w-[600px] p-6 bg-white rounded-lg shadow-md"
                span={<span className="bg-[#F2D323] px-4 py-2 rounded-md cursor-pointer">6am Dip</span>}
            >
                <form className="w-full" action="/api/addFuelPrices" method="POST">
                    <div className="flex flex-col gap-4">
                        {/* Date Field */}
                        <div>
                            <label className="block text-gray-500 text-sm mb-1" htmlFor="date">
                                Date
                            </label>
                            <input
                                name="date"
                                id="date"
                                type="text"
                                readOnly
                                value={today.date}
                                className="w-[250px] px-4 py-1 border-b-2 font-semibold rounded-md bg-gray-100"
                            />
                        </div>

                        {/* Dip Values in Grid Layout */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { id: "vpnPlus", label: "VPN+" },
                                { id: "fsg", label: "FSG" },
                                { id: "vpnR", label: "VPN+R" },
                                { id: "fsd", label: "FSD" },
                                { id: "vpnD", label: "VPN+D" },
                            ].map(({ id, label }) => (
                                <div key={id}>
                                    <label className="block text-gray-500 text-sm mb-1" htmlFor={id}>
                                        {label}
                                    </label>
                                    <input
                                        name={id}
                                        id={id}
                                        type="number"
                                        value={dipValues[id]}
                                        onChange={handleDipChange}
                                        required
                                        className="w-full px-4 py-1 border-b-2 font-semibold rounded-md focus:outline-none focus:border-b-red-300"
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Total Field (Read-Only) */}
                        <div>
                            <label className="block text-gray-500 text-sm mb-1" htmlFor="total">
                                Total
                            </label>
                            <input
                                name="total"
                                id="total"
                                type="number"
                                readOnly
                                value={dipValues.total}
                                className="w-[250px] px-4 py-1 border-b-2 font-semibold rounded-md bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Save and Close Buttons */}
                    <div className="flex items-center justify-center mt-5">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-1 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
