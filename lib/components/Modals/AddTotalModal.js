import { PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";
import { useState } from "react";

export default function AddTotalModal({ userLogIn, date, salesData }) {
    console.log(salesData);

    // Calculate the total of salesData.subtotal
    const totalSales = salesData.reduce((acc, item) => acc + item.subtotal, 0);
    
    // State to hold the Actual POS input
    const [actualPOS, setActualPOS] = useState("");
    const [overShortage, setOverShortage] = useState(""); // Initially set to an empty string

    // Update OVER/SHORTAGE whenever Actual POS changes
    const handleActualPOSChange = (e) => {
        const value = e.target.value;
        setActualPOS(value);
        
        // Calculate OVER/SHORTAGE only if there is input
        const posValue = parseFloat(value.replace(/,/g, '')) || 0; // Convert to float, default to 0 if NaN
        
        // Calculate OVER/SHORTAGE as totalSales - posValue
        const calculatedOverShortage = totalSales - posValue;
        
        // Set the OVER/SHORTAGE value without the currency symbol
        setOverShortage(value ? calculatedOverShortage.toFixed(2) : ""); // Set to empty if no input
    };

    return (
        <>
            <Modal title="Add Actual POS" icon={<PencilSqaure className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" action="/api/addActualPOS" method="POST">
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
