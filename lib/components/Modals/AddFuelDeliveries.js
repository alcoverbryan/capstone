import { useState, useEffect } from "react";
import Modal from "../Modal"; // Import your Modal component

export default function AddFuelDeliveriesModal() {
    const [today, setToday] = useState({ date: "" });
    const [dipValues, setDipValues] = useState({
        vpnPlus: "",
        fsg: "",
        vpnR: "",
        fsd: "",
        vpnD: "",
        total: "",
    });
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

    // Set today's date on load
    useEffect(() => {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
        setToday({
            date: now.toLocaleDateString(undefined, options),
        });
    }, []);

    // Update total whenever any dip value changes
    useEffect(() => {
        // Calculate total by only summing non-empty dip values
        const total = Object.values(dipValues)
            .slice(0, 5) // Only use the 5 dip values
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
            <Modal span={<span className="bg-[#F2D323] px-4 py-2 rounded-md cursor-pointer">Fuel Deliveries</span>}>
                <div className="mt-1 mb-2 font-bold text-lg text-gray-700">Fuel Deliveries</div>
                <form className="w-full" action="/api/addFuelPrices" method="POST">
                    <div className="md:w-[350px]">
                        <div className="mb-3">
                            <label className="block float-left text-gray-500 text-sm mb-1" htmlFor="date">
                                Date
                            </label>
                            <input
                                name="date"
                                id="date"
                                type="text"
                                readOnly
                                value={today.date}
                                className="w-full px-8 py-1 border-b-2 font-semibold rounded-md bg-gray-100"
                            />
                        </div>

                        {/* Input fields for dip values */}
                        {[
                            { id: "vpnPlus", label: "VPN+" },
                            { id: "fsg", label: "FSG" },
                            { id: "vpnR", label: "VPN+R" },
                            { id: "fsd", label: "FSD" },
                            { id: "vpnD", label: "VPN+D" },
                        ].map(({ id, label }) => (
                            <div key={id} className="mb-3">
                                <label className="block float-left text-gray-500 text-sm mb-1" htmlFor={id}>
                                    {label}
                                </label>
                                <input
                                    name={id}
                                    id={id}
                                    type="number"
                                    value={dipValues[id]}
                                    onChange={handleDipChange}
                                    required
                                    className="w-full px-8 py-1 border-b-2 font-semibold rounded-md focus:outline-none focus:border-b-red-300"
                                />
                            </div>
                        ))}

                        {/* Total Field (Read-Only) */}
                        <div className="mb-3">
                            <label className="block float-left text-gray-500 text-sm mb-1" htmlFor="total">
                                Total
                            </label>
                            <input
                                name="total"
                                id="total"
                                type="number"
                                readOnly
                                value={dipValues.total}
                                className="w-full px-8 py-1 border-b-2 font-semibold rounded-md bg-gray-100"
                            />
                        </div>
                    </div>

                    {/* Save and Close Buttons */}
                    <div className="flex items-center justify-center mb-5">
                        <button
                            type="submit"
                            className="bg-red-500 hover:bg-red-600 text-white px-7 py-1 mt-4 rounded-md"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            className="ml-3 bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-1 mt-4 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
