import { useState, useEffect } from "react";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddDailySalesModal({ userLogIn, sales, handleDailySave }) {
    const [date, setDate] = useState("");
    const [shift, setShift] = useState("FC1");
    const [subtotal, setSubtotal] = useState("");

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
        return today.toISOString().split("T")[0];
    };

    useEffect(() => {
        setDate(getCurrentDate());
    }, []);

    useEffect(() => {
        if (sales && sales.length > 0) {
            const lastShift = sales[sales.length - 1].shift;
            setShift(lastShift === "FC1" ? "FC2" : lastShift === "FC2" ? "FC3" : lastShift);
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

        setSubtotal(total > 0 ? total.toFixed(2) : "");
    }, [credit, charge, grab, coins, bills, checks, card, gcash, vouchers]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
    
        handleDailySave(); // Execute any daily save actions you have
    
        const salesData = {
            user_id: userLogIn?.id,
            date,
            shift,
            subtotal,
            credit,
            charge,
            grab,
            coins,
            bills,
            checks,
            card,
            gcash,
            vouchers,
        };
    
        try {
            const response = await fetch("/api/addDailySales", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(salesData),
            });
    
            if (!response.ok) {
                throw new Error("Failed to save sales data");
            }
    
            const result = await response.json();
    
            alert(result.message);

            setTimeout(() => {
                window.location.href = `/Users/${result.userId}?view=daily_sales`;
            }, 0);
    
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error saving the sales data. Please try again.");
        }
    };    

    return (
        <>
            <Modal title="Daily Sales" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input type="hidden" id="user_id" name="user_id" required value={userLogIn?.id || ""} />
                        <input type="hidden" id="subtotal" name="subtotal" value={subtotal} />

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
                                            value={shift}
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div>
                                    <h1 className="font-semibold mb-2">Sales Amount</h1>
                                    <div className="grid grid-cols-3 gap-4">
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
                                                        required
                                                        value={field.value}
                                                        onChange={(e) => field.setter(e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

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
                                                        required
                                                        value={field.value}
                                                        onChange={(e) => field.setter(e.target.value)}
                                                    />
                                                </div>
                                            ))}
                                        </div>

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
                                                        required
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
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 mt-4 rounded-md"
                                type="submit"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
