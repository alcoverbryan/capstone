import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddChargeAccountsModal({ userLogIn, handleChargeAccountSave }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        date: "",
        soa: "",
        cust_name: "",
        volume: "",
        ammount: "",
        ammount_paid: "",
        terms: "",
        bank: "",
        check_no: "",
        ewt: "",
        cr_num: "",
        date_collected: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        // Automatically calculate EWT as the difference between amount and amount_paid
        const calculatedEWT = (parseFloat(formData.ammount) || 0) - (parseFloat(formData.ammount_paid) || 0);
        setFormData((prev) => ({ ...prev, ewt: calculatedEWT === 0 ? "0" : calculatedEWT.toFixed(2) }));
    }, [formData.ammount, formData.ammount_paid]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch("/api/addChargeAccount", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, user_id: userLogIn.id })
            });
    
            if (response.ok) {
                alert("Charge account successfully added!");
                handleChargeAccountSave(); 
                router.push(`/Users/${userLogIn.id}?view=charge_acc`); 
            } else {
                alert("Failed to add charge account. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("An error occurred. Please try again.");
        }
    };    

    return (
        <>
            <Modal title="Charge Accounts" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" onSubmit={handleSubmit}>
                        <div className="flex gap-0">
                            <div className="md:w-[350px]">
                                <input type="hidden" id="user_id" name="user_id" value={userLogIn.id} />

                                {/* Date Field */}
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
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Soa # Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="soa">
                                        Soa #
                                    </label>
                                    <input
                                        name="soa"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="soa"
                                        type="text"
                                        value={formData.soa}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Customer Name Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cust_name">
                                       Customer Name
                                    </label>
                                    <input
                                        name="cust_name"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="cust_name"
                                        type="text"
                                        value={formData.cust_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Volume Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="volume">
                                        Volume (ltrs)
                                    </label>
                                    <input
                                        name="volume"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="volume"
                                        type="text"
                                        value={formData.volume}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Amount Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ammount">
                                        Amount
                                    </label>
                                    <input
                                        name="ammount"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ammount"
                                        type="text"
                                        value={formData.amount}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Amount Paid Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ammount_paid">
                                        Amount Paid
                                    </label>
                                    <input
                                        name="ammount_paid"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ammount_paid"
                                        type="text"
                                        value={formData.amount_paid}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* EWT Field */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ewt">
                                        EWT
                                    </label>
                                    <input
                                        name="ewt"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ewt"
                                        type="text"
                                        value={formData.ewt}
                                        readOnly
                                        required
                                    />
                                </div>

                                {/* Other fields... */}
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="terms">
                                        Terms
                                    </label>
                                    <input
                                        name="terms"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="terms"
                                        type="text"
                                        value={formData.terms}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="bank">
                                        Bank
                                    </label>
                                    <input
                                        name="bank"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="bank"
                                        type="text"
                                        value={formData.bank}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="check_no">
                                        Check No.
                                    </label>
                                    <input
                                        name="check_no"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="check_no"
                                        type="text"
                                        value={formData.check_no}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cr_num">
                                        CR Number
                                    </label>
                                    <input
                                        name="cr_num"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="cr_num"
                                        type="text"
                                        value={formData.cr_num}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date_collected">
                                        Date Collected
                                    </label>
                                    <input
                                        name="date_collected"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="date_collected"
                                        type="date"
                                        value={formData.date_collected}
                                        onChange={handleChange}
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
        </>
    );
}
