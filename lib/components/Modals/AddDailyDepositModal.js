import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from 'next/router';

export default function AddDailyDepositModal({ userLogIn, handleDailyDepositSave }) {
    // State for dates
    const [shiftDate, setShiftDate] = useState("");
    const [dateDeposited, setDateDeposited] = useState("");
    const [type, setType] = useState("");
    const [bankDepositedTo, setBankDepositedTo] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const router = useRouter();

    // Automatically generate the current date for the input fields
    const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd format

    useEffect(() => {
        setShiftDate(currentDate);
        setDateDeposited(currentDate);
    }, [currentDate]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const formData = {
            user_id: userLogIn?.id,
            shiftDate,
            dateDeposited,
            cashier: userLogIn?.username || "Unknown Cashier",
            type,
            bankDepositedTo,
            subtotal
        };

        try {
            const response = await fetch('/api/dailyDeposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure JSON format
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Daily deposit added successfully");
                handleDailyDepositSave();
                router.push(`/Users/${userLogIn.id}?view=daily_deposit`);
            } else {
                const errorData = await response.json();
                console.error("Failed to save daily deposit", errorData);
            }
        } catch (error) {
            console.error("Error occurred while saving daily deposit:", error);
        }
    };


    return (
        <Modal title="Daily Deposit" icon={<PlusCircle className="w-7 h-7" />}>
            <div className="flex">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex gap-0">
                        <input type="hidden" id="user_id" name="user_id" required value={userLogIn?.id || ""}></input>
                        <div className="md:w-[350px]">

                            <div className="mb-4">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shiftDate">
                                    Shift Date
                                </label>
                                <input
                                    name="shiftDate"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="shiftDate"
                                    type="date"
                                    required
                                    value={shiftDate}
                                    onChange={(e) => setShiftDate(e.target.value)}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="dateDeposited">
                                    Date Deposited
                                </label>
                                <input
                                    name="dateDeposited"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="dateDeposited"
                                    type="date"
                                    required
                                    value={dateDeposited}
                                    onChange={(e) => setDateDeposited(e.target.value)}
                                />
                            </div>

                            {/* Cashier */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cashier">
                                    Cashier
                                </label>
                                <input
                                    name="cashier"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="cashier"
                                    type="text"
                                    value={userLogIn?.username || "Unknown Cashier"}
                                    readOnly
                                    required
                                />
                            </div>

                            {/* Type */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="type">
                                    Type
                                </label>
                                <input
                                    name="type"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="type"
                                    type="text"
                                    placeholder="Enter type"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Bank Deposited To */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="bankDepositedTo">
                                    Bank Deposited To
                                </label>
                                <input
                                    name="bankDepositedTo"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="bankDepositedTo"
                                    type="text"
                                    placeholder="Enter bank name"
                                    value={bankDepositedTo}
                                    onChange={(e) => setBankDepositedTo(e.target.value)}
                                    required
                                />
                            </div>

                            {/* SubTotal */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="subtotal">
                                    SubTotal
                                </label>
                                <input
                                    name="subtotal"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="subtotal"
                                    type="text"
                                    placeholder="Enter subtotal"
                                    value={subtotal}
                                    onChange={(e) => setSubtotal(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="subtotal">
                                    SubTotal
                                </label>
                                <input
                                    name="subtotal"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="subtotal"
                                    type="text"
                                    placeholder="Enter bank name"
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
