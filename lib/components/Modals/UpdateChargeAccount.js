import { useEffect, useState } from "react";
import { PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";

export default function UpdateChargeAccount ({userLogIn, account}){
    const [amount, setAmount] = useState(account.ammount || "");
    const [amountPaid, setAmountPaid] = useState(account.ammount_paid || "");
    const [ewt, setEwt] = useState(account.ewt || "");

    useEffect(() => {
        const validAmount = parseFloat(amount) || 0;
        const validAmountPaid = parseFloat(amountPaid) || 0;

        if (!isNaN(validAmount) && !isNaN(validAmountPaid)) {
            setEwt(validAmount - validAmountPaid);
        } else {
            setEwt("");
        }
    }, [amount, amountPaid]);
    return(
        <>
            <Modal title="Charge Account" icon={<PencilSqaure className="w-7 h-7" />}>
            <div className="flex">
                    <form className="w-full " action="/api/updateChargeAccount" method="POST" >
                        <div className="flex gap-0  "> 
                            <div className="md:w-[350px]">
                                <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id}/>
                                <input type="hidden" id="id" name="id" required value={account.id}/>
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
                                            defaultValue={account.date}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="soa">
                                        Soa #
                                    </label>
                                    <input
                                        name="soa"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="soa"
                                        type="text"
                                        defaultValue={account.soa}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cust_name">
                                       Costumer Name
                                    </label>
                                    <input
                                        name="cust_name"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="cust_name"
                                        type="text"
                                        defaultValue={account.cust_name}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="volume">
                                        Volume (ltrs)
                                    </label>
                                    <input
                                        name="volume"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="volume"
                                        type="text"
                                        defaultValue={account.volume}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ammount">
                                        Ammount
                                    </label>
                                    <input
                                        name="ammount"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ammount"
                                        type="text"
                                        defaultValue={amount}
                                        onChange={(e) => setAmount(parseFloat(e.target.value) || "")} 
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="terms">
                                        Terms
                                    </label>
                                    <input
                                        name="terms"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="terms"
                                        type="text"
                                        defaultValue={account.terms}
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
                                        defaultValue={account.bank}
                                        type="text"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="check_no.">
                                        Check No.
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="check_no"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="check_no"
                                            defaultValue={account.check_no}
                                            type="text"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ammount_paid">
                                        Ammount Paid
                                    </label>
                                    <input
                                        name="ammount_paid"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ammount_paid"
                                        type="text"
                                        defaultValue={amountPaid}
                                        onChange={(e) => setAmountPaid(parseFloat(e.target.value) || "")} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="ewt">
                                        EWT
                                    </label>
                                    <input
                                        name="ewt"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="ewt"
                                        type="text"
                                        value={ewt}
                                        readOnly 
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cr_num">
                                        CR Number
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="cr_num"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="cr_num"
                                            type="text"
                                            defaultValue={account.cr_num}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date_collected">
                                        Date Collected
                                    </label>
                                    <div className="relative">
                                        <input
                                            name="date_collected"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="date_collected"
                                            type="date"  
                                            defaultValue={account.date_collected}
                                        />
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