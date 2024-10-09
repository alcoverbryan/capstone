import { PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";

export default function UpdateFuelPrices ({userLogIn, fuelPrice}){
    return(
        <>
            <Modal title="Fuel Prices" icon={<PencilSqaure className="w-7 h-7" />}>
            <div className="flex">
                    <form className="w-full " action="/api/updateFuelPrices" method="POST" >
                        <div className="flex gap-0  "> 
                            <div className="md:w-[350px]">
                                <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id}/>
                                <input type="hidden" id="id" name="id" required value={fuelPrice.id}/>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="fuel_type">
                                        Fuel Type
                                    </label>
                                    <input
                                        name="fuel_type"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="fuel_type"
                                        type="text"
                                        defaultValue={fuelPrice.fuel_type}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rsop">
                                        RSOP
                                    </label>
                                    <input
                                        name="rsop"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rsop"
                                        type="text"
                                        defaultValue={fuelPrice.rsop}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="app_benross">
                                        App
                                    </label>
                                    <input
                                        name="app_benross"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="app_benross"
                                        type="text"
                                        defaultValue={fuelPrice.app_benross}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="petron_highway">
                                        Petron Hiway
                                    </label>
                                    <input
                                        name="petron_highway"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="petron_highway"
                                        type="text"
                                        defaultValue={fuelPrice.petron_highway}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="caltex">
                                        Caltex
                                    </label>
                                    <input
                                        name="caltex"
                                       className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="caltex"
                                        type="text"
                                        defaultValue={fuelPrice.caltex}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="total">
                                        Total
                                    </label>
                                    <input
                                        name="total"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="total"
                                        type="text"
                                        defaultValue={fuelPrice.total}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rephil">
                                        Rephil
                                    </label>
                                    <input
                                        name="rephil"
                                        className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                        id="rephil"
                                        type="text"
                                        defaultValue={fuelPrice.rephil}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                                        Shell Affinis
                                    </label>
                                    <div className="relative">
    
                                        <input
                                            name="shell_affinis"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                            id="shell_affinis"
                                            type="text"
                                            defaultValue={fuelPrice.shell_affinis}
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
                                            defaultValue={fuelPrice.date}
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