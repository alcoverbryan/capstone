import { useEffect, useState } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddDailyDepositModal({ userLogIn }) {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        // Format today's date as "Month Day, Year"
        const today = new Date();
        const formatted = new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        }).format(today);
        setFormattedDate(formatted);
    }, []);

    return (
        <>
            <Modal title="Daily Deposit" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" action="/api/addFuelPrices" method="POST">
                        <div className="flex gap-0">
                            <div className="md:w-[350px]">
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rsop">
                                        Date Deposited
                                    </label>
                                    <input
                                        name="rsop"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rsop"
                                        type="text"
                                        value={formattedDate}
                                        readOnly
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="app_benross">
                                        Shift Date
                                    </label>
                                    <input
                                        name="app_benross"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="app_benross"
                                        type="text"
                                        value={formattedDate}
                                        readOnly
                                        required
                                    />
                                </div>
                                {/* Other fields remain unchanged */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="petron_highway">
                                        Source
                                    </label>
                                    <input
                                        name="petron_highway"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="petron_highway"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="caltex">
                                        Cashier
                                    </label>
                                    <input
                                        name="caltex"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="caltex"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="total">
                                        Type
                                    </label>
                                    <input
                                        name="total"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="total"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rephil">
                                        Bank Deposited To
                                    </label>
                                    <select
                                        name="rephil"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rephil"
                                        required
                                    >
                                        <option value="" className= 
                                        'text-gray-500 opacity-50'>Select a bank</option>
                                        <option value="Banco De Oro">Banco De Oro</option>
                                        <option value="Chinabank">Chinabank</option>
                                        <option value="BPI">BPI</option>
                                        <option value="Citibank">Citibank</option>
                                        <option value="PNB">PNB</option>
                                        {/* Add more options as needed */}
                                    </select>
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
