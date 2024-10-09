
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddChargeAccountsModal ({userLogIn}){
    return (
        <>
            <Modal title="Charge Accounts" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex">
                    <form className="w-full " action="/api/addFuelPrices" method="POST" >
                        <div className="flex gap-0  "> 
                            <div className="md:w-[350px]">
                                {/* <div className="flex flex-col items-center justify-center mb-5 mt-4">
                                    <div className="border shadow-lg rounded-full h-36 w-36 overflow-visible relative">
                                        <label htmlFor="fileInput" className="cursor-pointer">
                                            <input type="file" id="fileInput" accept="image/*"  style={{ display: "none" }} />
                                            <Camera className="w-6 h-6 absolute bottom-2 right-2" />
                                            <img
                                                type="file"
                                                accept="image/*"
                                                id="profilePicInput"
                                                className="mx-auto border rounded-full h-full w-full"
                                                src="/../images/icon.png"
                                                alt="author avatar"
                                            />
                                        </label>
                                    </div>
                                </div> */}
                                <input type="hidden" id="user_id" name="user_id" required value/>
                        
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rsop">
                                        Soap #
                                    </label>
                                    <input
                                        name="rsop"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rsop"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="app_benross">
                                       Costumer Name
                                    </label>
                                    <input
                                        name="app_benross"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="app_benross"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="petron_highway">
                                        Volume (ltrs)
                                    </label>
                                    <input
                                        name="petron_highway"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="petron_highway"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="caltex">
                                        Ammount
                                    </label>
                                    <input
                                        name="caltex"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="caltex"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="total">
                                        Terms
                                    </label>
                                    <input
                                        name="total"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="total"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rephil">
                                        Bank
                                    </label>
                                    <input
                                        name="rephil"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rephil"
                                        type="text"
                                        required
                                    />-
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                        Check No.
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                       Ammount Paid
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                       Ewt
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                        Date Collected
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                        CR Number
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
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