import { useEffect, useState } from "react";
import { CurrencyDollar, PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function PaidChargeAccount({ userLogIn, account, handleChargeAccountSave }) {
    const [amount, setAmount] = useState(account.ammount || "");
    const [amountPaid, setAmountPaid] = useState(account.ammount_paid || "");
    const [ewt, setEwt] = useState(account.ewt || "");
    const router = useRouter();

    useEffect(() => {
        const validAmount = parseFloat(amount) || 0;
        const validAmountPaid = parseFloat(amountPaid) || 0;
    
        if (!isNaN(validAmount) && !isNaN(validAmountPaid)) {
            // Calculate and set EWT with 2 decimal places
            setEwt((validAmount - validAmountPaid).toFixed(2));
        } else {
            setEwt("");
        }
    }, [amount, amountPaid]);    

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const updatedAccountData = {
            user_id: userLogIn.id,
            id: account.id,
            date: account.date, // Use existing value
            soa: account.soa, // Use existing value
            cust_name: account.cust_name, // Use existing value
            volume: account.volume, // Use existing value
            ammount: parseFloat(amount) || 0,
            terms: account.terms, // Use existing value
            bank: e.target.bank.value,
            check_no: e.target.check_no.value,
            ammount_paid: parseFloat(amountPaid) || 0,
            ewt,
            cr_num: e.target.cr_num.value,
            date_collected: e.target.date_collected.value,
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
                alert("Are you sure you want to save these changes?");
                
                // Reset form fields
                e.target.reset();
                setAmount(account.ammount || "");
                setAmountPaid(account.ammount_paid || "");
                setEwt(account.ewt || "");
    
                // Notify parent component and redirect
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
            <Modal title="Charge Account" icon={<CurrencyDollar className="w-7 h-7" />}>
                <form className="w-full" onSubmit={handleSubmit}>
                    <table className="table-auto w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Soa #</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Customer Name</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Volume(L)</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Amount</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Terms</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Bank</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Check No.</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Amount Paid</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">EWT</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">CR Number</th>
                                <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Date Collected</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-black">
                                    <input
                                        name="date"
                                        type="date"
                                        value={account.date}
                                        readOnly
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="soa"
                                        type="text"
                                        value={account.soa}
                                        readOnly
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="cust_name"
                                        type="text"
                                        value={account.cust_name}
                                        readOnly
                                        className="w-auto border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="volume"
                                        type="text"
                                        value={account.volume}
                                        readOnly
                                        className="w-2 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="ammount"
                                        type="text"
                                        value={amount}
                                        readOnly
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="terms"
                                        type="text"
                                        value={account.terms}
                                        readOnly
                                        className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="bank"
                                        type="text"
                                        defaultValue={account.bank}
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="check_no"
                                        type="text"
                                        defaultValue={account.check_no}
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="ammount_paid"
                                        type="text"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || "")}
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="ewt"
                                        type="text"
                                        value={ewt}
                                        readOnly
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="cr_num"
                                        type="text"
                                        defaultValue={account.cr_num}
                                        className="w-24 border-none focus:ring-0 focus: outline-none px-1"
                                    />
                                </td>
                                <td className="border border-black">
                                    <input
                                        name="date_collected"
                                        type="date"
                                        defaultValue={account.date_collected}
                                        className="w-full border-none focus:ring-0 focus: outline-none px-1"
                                    />
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
                </form>
            </Modal>
        </>
    );
}
