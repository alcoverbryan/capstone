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
                handleChargeAccountSave();
                router.push(`/Users/${userLogIn.id}?view=charge_acc`);
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
                    <table className="table-auto w-full text-sm text-left border-separate border-spacing-2">
                        <tbody>
                            <tr>
                                <td className="font-semibold">Date</td>
                                <td>
                                    <input
                                        name="date"
                                        type="date"
                                        defaultValue={account.date}
                                        required
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Soa #</td>
                                <td>
                                    <input
                                        name="soa"
                                        type="text"
                                        defaultValue={account.soa}
                                        required
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Customer Name</td>
                                <td>
                                    <input
                                        name="cust_name"
                                        type="text"
                                        defaultValue={account.cust_name}
                                        required
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Volume (Ltrs)</td>
                                <td>
                                    <input
                                        name="volume"
                                        type="text"
                                        defaultValue={account.volume}
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Amount</td>
                                <td>
                                    <input
                                        name="ammount"
                                        type="text"
                                        value={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
                                        required
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Terms</td>
                                <td>
                                    <input
                                        name="terms"
                                        type="text"
                                        defaultValue={account.terms}
                                        required
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Bank</td>
                                <td>
                                    <input
                                        name="bank"
                                        type="text"
                                        defaultValue={account.bank}
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Check No.</td>
                                <td>
                                    <input
                                        name="check_no"
                                        type="text"
                                        defaultValue={account.check_no}
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Amount Paid</td>
                                <td>
                                    <input
                                        name="ammount_paid"
                                        type="text"
                                        value={amountPaid}
                                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || "")}
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">EWT</td>
                                <td>
                                    <input
                                        name="ewt"
                                        type="text"
                                        value={ewt}
                                        readOnly
                                        className="w-full px-2 py-1 border rounded-md bg-gray-100"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">CR Number</td>
                                <td>
                                    <input
                                        name="cr_num"
                                        type="text"
                                        defaultValue={account.cr_num}
                                        className="w-full px-2 py-1 border rounded-md"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="font-semibold">Date Collected</td>
                                <td>
                                    <input
                                        name="date_collected"
                                        type="date"
                                        defaultValue={account.date_collected}
                                        className="w-full px-2 py-1 border rounded-md"
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
