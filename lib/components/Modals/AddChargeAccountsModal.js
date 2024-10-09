
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddChargeAccountsModal ({userLogIn}){
    return (
        <>
            <Modal title="Charge Accounts" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full " action="/api/addChargeAccount" method="POST" >
                        <div className="flex gap-0  "> 
                            <div className="md:w-[350px]">
                                <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id}/>
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