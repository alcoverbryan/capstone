import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddDailySalesModal({ userLogIn }) {
    return (
        <>
            <Modal title="Daily Sales" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full" action="/api/addFuelPrices" method="POST">
                        <div className="flex gap-0">
                            <div className="md:w-[300px] max-h-[80vh] overflow-y-auto">
                                <input type="hidden" id="user_id" name="user_id" required value />


                                <div className="mb">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date">
                                        Date
                                    </label>
                                    <input
                                        name="date"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="date"
                                        type="date"  
                                        required
                                    />
                                </div>
                                
                                {/* Form Fields */}
                                {["Shift", "Cashier", "Credit/Debit Card", "Charge Acc.", "Grab Disc", "Coins", "Bills", "Checks", "Pay Points/Gcash", "Vouchers", "Others", "Actual POS"].map((label, index) => (
                                    <div className="mb" key={index}>
                                        <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor={label.toLowerCase().replace(/ /g, "_")}>
                                            {label}
                                        </label>
                                        <input
                                            name={label.toLowerCase().replace(/ /g, "_")}
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id={label.toLowerCase().replace(/ /g, "_")}
                                            type="text"
                                            required
                                        />
                                    </div>
                                ))}
                            
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
