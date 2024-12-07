import { useEffect, useState } from "react";
import { PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function UpdateChargeAccount({ userLogIn, account, handleChargeAccountSave }) {
    const [amount, setAmount] = useState(account.ammount || "");
    const [amountPaid, setAmountPaid] = useState(account.ammount_paid || "");
    const [ewt, setEwt] = useState(account.ewt || "");
    const router = useRouter();

    useEffect(() => {
        const validAmount = parseFloat(amount) || 0;
        const validAmountPaid = parseFloat(amountPaid) || 0;

        if (!isNaN(validAmount) && !isNaN(validAmountPaid)) {
            setEwt(validAmount - validAmountPaid);
        } else {
            setEwt("");
        }
    }, [amount, amountPaid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedAccountData = {
            user_id: userLogIn.id,
            id: account.id,
            date: e.target.date.value,
            soa: e.target.soa.value,
            cust_name: e.target.cust_name.value,
            volume: e.target.volume.value,
            ammount: parseFloat(amount) || 0,
            terms: e.target.terms.value,
        };
    
        const requiredFields = [
            updatedAccountData.date,
            updatedAccountData.soa,
            updatedAccountData.cust_name,
            updatedAccountData.ammount,
            updatedAccountData.terms,
        ];
    
        const isValid = requiredFields.every((field) => field !== "" && field !== undefined);
        if (!isValid) {
            alert("Please fill in all required fields.");
            return;
        }
    
        try {
            const response = await fetch("/api/updateChargeAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedAccountData),
            });
    
            if (response.ok) {
                // Confirmation alert
                alert("Are you sure you want to save these changes?");
                
                // Reset form fields
                e.target.reset();
                setAmount("");
                setAmountPaid("");
                setEwt("");
    
                handleChargeAccountSave();
            } else {
                const errorResponse = await response.text();
                console.error("Error response:", errorResponse);
                alert("Failed to update charge account. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("There was an error updating the charge account. Please try again.");
        }
    };
    

    return (
        <>
            <Modal title="Charge Account" icon={<PencilSqaure className="w-7 h-7" />}>
                <form className="w-full" onSubmit={handleSubmit}>
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Soa #</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Customer Name</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Volume(Liters)</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Amount</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Terms</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black">
                                    <input
                                        name="date"
                                        type="date"
                                        defaultValue={account.date}
                                        required
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="soa"
                                        type="text"
                                        defaultValue={account.soa}
                                        required
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td >
                                <td className="border border-black">
                                    <input
                                        name="cust_name"
                                        type="text"
                                        defaultValue={account.cust_name}
                                        required
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="volume"
                                        type="text"
                                        defaultValue={account.volume}
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="ammount"
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
                                        required
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <select
                                        name="terms"
                                        defaultValue={account.terms}
                                        required
                                        className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                    >
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="text-center mt-5">
                        <button
                            className="bg-red-500 hover:bg-red-600 text-white px-10 py-2 rounded-md"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </div>
                </form>
            </Modal>
        </>
    );
}
