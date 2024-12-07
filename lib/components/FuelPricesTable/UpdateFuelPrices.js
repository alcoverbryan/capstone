import { useRouter } from "next/router";
import Modal from "../Modal";
import { useState } from "react";
import { PencilSqaure } from "../HeroIcons";

export default function UpdateFuelPrices({ userLogIn, fuelPrice, handleFuelPricesSave }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        fuel_type: fuelPrice.fuel_type || "",
        rsop: fuelPrice.rsop || "",
        app_benross: fuelPrice.app_benross || "",
        petron_highway: fuelPrice.petron_highway || "",
        caltex: fuelPrice.caltex || "",
        total: fuelPrice.total || "",
        rephil: fuelPrice.rephil || "",
        shell_affinis: fuelPrice.shell_affinis || "",
        date: fuelPrice.date || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        try {
            const response = await fetch("/api/updateFuelPrices", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    user_id: userLogIn.id,
                    id: fuelPrice.id,
                }),
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(responseData.message || "Failed to update fuel prices");
            }
    
            alert(responseData.message); 
            handleFuelPricesSave();  
        } catch (error) {
            console.error(error);
            alert(error.message || "Failed to update fuel prices.");  // Show the error message from the API
        }
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Modal title="Fuel Prices" icon={<PencilSqaure className="w-7 h-7" />}>
            <div className="flex justify-evenly max-w-full">
                <form className="w-full max-w-full" onSubmit={handleSubmit}>
                    <table className="table-auto w-full text-center">
                        <thead>
                            <tr>
                                <td className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</td>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Fuel Type</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">RSOP</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Bennros Shell</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Petron Highway</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Caltex</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Total</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Rephil</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Shell Affinis</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black">
                                    <input
                                        name="date"
                                        className="w-full border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="fuel_type"
                                        className="w-56 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="fuel_type"
                                        type="text"
                                        value={formData.fuel_type}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="rsop"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="rsop"
                                        type="text"
                                        value={formData.rsop}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="app_benross"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="app_benross"
                                        type="text"
                                        value={formData.app_benross}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="petron_highway"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="petron_highway"
                                        type="text"
                                        value={formData.petron_highway}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="caltex"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="caltex"
                                        type="text"
                                        value={formData.caltex}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="total"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="total"
                                        type="text"
                                        value={formData.total}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="rephil"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="rephil"
                                        type="text"
                                        value={formData.rephil}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="shell_affinis"
                                        className="w-24 border-none focus:ring-0 focus:outline-none px-1 py-2"
                                        id="shell_affinis"
                                        type="text"
                                        value={formData.shell_affinis}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className="flex items-center justify-center mb-5">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 mt-4 rounded-md" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
