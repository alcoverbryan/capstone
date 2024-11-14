import { useState } from "react";
import Modal from "../Modal";
import { PencilSqaure } from "../HeroIcons";
import { useRouter } from "next/router"; // Import useRouter for navigation

export default function AddTotalModal({ userLogIn, date, salesData, handleDailySave }) {
    const totalSales = salesData.reduce((acc, item) => acc + item.subtotal, 0);

    const [actualPOS, setActualPOS] = useState("");
    const [overShortage, setOverShortage] = useState(""); 
    const router = useRouter(); // Initialize router

    const handleActualPOSChange = (e) => {
        const value = e.target.value;

        // Remove commas and parse as float
        const posValue = parseFloat(value.replace(/,/g, '')) || 0; 
        setActualPOS(value); 

        // Calculate the over/shortage
        const calculatedOverShortage = totalSales - posValue;
        setOverShortage(value ? calculatedOverShortage.toFixed(2) : ""); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Validate if actualPOS is a valid number before proceeding
        if (isNaN(parseFloat(actualPOS.replace(/,/g, '')))) {
            alert("Please enter a valid Actual POS amount.");
            return;
        }

        try {
            const response = await fetch("/api/addActualPOS", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error("Failed to save Actual POS data");
            }

            const result = await response.json();
            alert(result.message); 

            handleDailySave(); 
            router.push(`/Users/${userLogIn.id}?view=daily_sales`); // Navigate to the daily sales view

            setActualPOS("");
            setOverShortage("");
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the Actual POS data. Please try again.");
        }
    };  

    return (
        <>
            <Modal title="Add Actual POS" icon={<PencilSqaure className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="flex gap-0">
                            <div className="md:w-[350px]">
                                <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id} />
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date">
                                        Date
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="date"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="date"
                                            type="date"
                                            defaultValue={date}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="time">
                                        Time
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="time"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="time"
                                            type="time"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="reference_id">
                                        Reference ID
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="reference_id"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="reference_id"
                                            type="number" // Corrected type for Reference ID
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="actualPOS">
                                        Actual POS
                                    </label>
                                    <input
                                        name="actualPOS"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="actualPOS"
                                        type="text"
                                        value={actualPOS}
                                        onChange={handleActualPOSChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="overShortage">
                                        OVER/SHORTAGE
                                    </label>
                                    <input
                                        name="overShortage"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="overShortage"
                                        type="text"
                                        value={overShortage} // Display the calculated OVER/SHORTAGE without currency symbol
                                        readOnly // Make it read-only
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
        </>
    );
}
