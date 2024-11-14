import { useRouter } from "next/router";
import Modal from "../Modal";
import { useState } from "react";
import { PencilSqaure } from "../HeroIcons";

export default function UpdateFuelPrices ({userLogIn, fuelPrice, handleFuelPricesSave}){
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
        e.preventDefault(); // Prevent the default form submission

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

        if (!response.ok) {
            throw new Error("Failed to update fuel prices");
        }

        alert("Fuel Prices successfully updated!");
        handleFuelPricesSave();
        router.push(`/Users/${userLogIn.id}?view=fuel_prices`);
        } catch (error) {
        console.error(error);
        alert("Failed to update fuel prices.");
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
        <div className="flex">
            <form className="w-full" onSubmit={handleSubmit}>
            <div className="flex gap-0">
                <div className="md:w-[350px]">
                <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id} />
                <input type="hidden" id="id" name="id" required value={fuelPrice.id} />

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="fuel_type">
                    Fuel Type
                    </label>
                    <input
                    name="fuel_type"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="fuel_type"
                    type="text"
                    value={formData.fuel_type}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rsop">
                    RSOP
                    </label>
                    <input
                    name="rsop"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="rsop"
                    type="text"
                    value={formData.rsop}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="app_benross">
                    App
                    </label>
                    <input
                    name="app_benross"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="app_benross"
                    type="text"
                    value={formData.app_benross}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="petron_highway">
                    Petron Hiway
                    </label>
                    <input
                    name="petron_highway"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="petron_highway"
                    type="text"
                    value={formData.petron_highway}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="caltex">
                    Caltex
                    </label>
                    <input
                    name="caltex"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="caltex"
                    type="text"
                    value={formData.caltex}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="total">
                    Total
                    </label>
                    <input
                    name="total"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="total"
                    type="text"
                    value={formData.total}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rephil">
                    Rephil
                    </label>
                    <input
                    name="rephil"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="rephil"
                    type="text"
                    value={formData.rephil}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                    Shell Affinis
                    </label>
                    <input
                    name="shell_affinis"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="shell_affinis"
                    type="text"
                    value={formData.shell_affinis}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date">
                    Date
                    </label>
                    <input
                    name="date"
                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    />
                </div>
                </div>
            </div>

            <div className="flex items-center justify-center mb-5">
                <button className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 mt-4 rounded-md" type="submit">
                Save
                </button>
            </div>
            </form>
        </div>
        </Modal>
    );
}