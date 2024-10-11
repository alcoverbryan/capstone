import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddDailySalesModal({ userLogIn, sales }) {
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("FC1"); 
    const [subtotal, setSubtotal] = useState(""); 

    // State variables for different sales amounts
    const [credit, setCredit] = useState("");
    const [charge, setCharge] = useState("");
    const [grab, setGrab] = useState("");
    const [coins, setCoins] = useState("");
    const [bills, setBills] = useState("");
    const [checks, setChecks] = useState("");
    const [card, setCard] = useState("");
    const [gcash, setGcash] = useState("");
    const [vouchers, setVouchers] = useState("");

    const getCurrentDate = () => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().split('T')[0];
    };

    useEffect(() => {
        setDate(getCurrentDate());
    }, []);

    useEffect(() => {
        // Automatically update shift based on the last sale
        if (sales && sales.length > 0) {
            const lastShift = sales[sales.length - 1].shift;

            if (lastShift === "FC1") {
                setShift("FC2");
            } else if (lastShift === "FC2") {
                setShift("FC3");
            } else {
                setShift(lastShift); // fallback to lastShift if it's not FC1 or FC2
            }
        }
    }, [sales]);

    useEffect(() => {
        const total =
            (parseFloat(credit) || 0) +
            (parseFloat(charge) || 0) +
            (parseFloat(grab) || 0) +
            (parseFloat(coins) || 0) +
            (parseFloat(bills) || 0) +
            (parseFloat(checks) || 0) +
            (parseFloat(card) || 0) +
            (parseFloat(gcash) || 0) +
            (parseFloat(vouchers) || 0);

        setSubtotal(total > 0 ? total.toFixed(2) : ""); // Update the subtotal, only display if total is > 0
    }, [credit, charge, grab, coins, bills, checks, card, gcash, vouchers]);

    return (
        <>
            <Modal title="Daily Sales" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" action="/api/addDailySales" method="POST">
                        {/* Hidden input for user ID */}
                        <input
                            type="hidden"
                            id="user_id"
                            name="user_id"
                            required
                            value={userLogIn?.id || ""}
                        />

                        {/* Hidden input for subtotal */}
                        <input
                            type="hidden"
                            id="subtotal"
                            name="subtotal"
                            value={subtotal} // Add this to include subtotal in the form data
                        />
                        
                        <div className="flex gap-0">

                            <div className="gap-4">
                                <div className="border-0 flex gap-4">
                                    <div className="mb-4">
                                        <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date">
                                            Date
                                        </label>
                                        <input
                                            name="date"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="date"
                                            type="date"
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shift">
                                            Shift
                                        </label>
                                        <input
                                            name="shift"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shift"
                                            type="text"
                                            required
                                            value={shift} // Pre-filled with automatic shift value
                                            readOnly // Make shift read-only to prevent manual input
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h1 className="font-semibold mb-2">Sales Amount</h1>

                                    <div className="grid grid-cols-3 gap-4">
                                        {/* Column 1 */}
                                        <div>
                                            {[{ id: "credit", label: "Credit/Debit Card", value: credit, setter: setCredit },
                                            { id: "charge", label: "Charge Acct.", value: charge, setter: setCharge },
                                            { id: "grab", label: "Grab Disc.", value: grab, setter: setGrab }].map((field) => (
                                                <div className="mb-2" key={field.id}>
                                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor={field.id}>
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        name={field.id}
                                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                                        id={field.id}
                                                        type="number"
                                                        value={field.value}
                                                        onChange={(e) => field.setter(e.target.value)}
                                                    />
                                                </div>
                                            ))}

                                        </div>

                                        {/* Column 2 */}
                                        <div>
                                            {[{ id: "coins", label: "Coins", value: coins, setter: setCoins },
                                            { id: "bills", label: "Bills", value: bills, setter: setBills },
                                            { id: "checks", label: "Checks", value: checks, setter: setChecks }].map((field) => (
                                                <div className="mb-2" key={field.id}>
                                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor={field.id}>
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        name={field.id}
                                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                                        id={field.id}
                                                        type="number"
                                                        value={field.value}
                                                        onChange={(e) => field.setter(e.target.value)}
                                                    />
                                                </div>
                                            ))}

                                        </div>

                                        {/* Column 3 */}
                                        <div>
                                            {[{ id: "card", label: "Pay Points/GO+Card", value: card, setter: setCard },
                                            { id: "gcash", label: "G-Cash", value: gcash, setter: setGcash },
                                            { id: "vouchers", label: "Vouchers", value: vouchers, setter: setVouchers },
                                            { id: "subtotal", label: "Subtotal", value: subtotal, setter: setSubtotal }].map((field, index) => (
                                                <div className="mb-2" key={field.id}>
                                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor={field.id}>
                                                        {field.label}
                                                    </label>
                                                    <input
                                                        name={field.id}
                                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                                        id={field.id}
                                                        type="number"
                                                        value={index === 3 ? subtotal : field.value}
                                                        onChange={(e) => field.setter(e.target.value)} 
                                                        disabled={index === 3}
                                                    />
                                                </div>
                                            ))}

                                        </div>
                                    </div>
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