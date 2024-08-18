import { Map_pin, PlusCircle, User } from "../HeroIcons";
import Modal from "../Modal";

export default function addBranchModal (){
    return (
        <>
            <Modal title="Add Devices" icon={<PlusCircle className="w-7 h-7" />}>
                <div className="flex justify-center ">
                    <form className="w-full " action="/api/createDevices" method="POST" >
                        <div className="flex gap-10 "> 
                            <div className="md:w-full">
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
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="device_name">
                                        Device Name
                                    </label>
                                    <input
                                        name="device_name"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="device_name"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="custodian">
                                        Custodian
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-700">
                                            <User className="w-4 h-4" />
                                        </span>
                                        <input
                                            name="custodian"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                            id="custodian"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="location">
                                        Location
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-gray-500">
                                            <Map_pin className="w-5 h-5" />
                                        </span>
                                        <input
                                            name="location"
                                            className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                            id="location"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div class="  md:h-[400px] border-r flex items-center justify-center "></div>

                            <div className="md:w-[75%]">
                                <div className="mb-3 mt-14">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="project">
                                        Project
                                    </label>
                                    <input
                                        name="project"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="project"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="product_type">
                                        Product Type
                                    </label>
                                    <input
                                        name="product_type"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="product_type"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="model">
                                        Model
                                    </label>
                                    <input
                                        name="model"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="model"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="model_code">
                                        Model Code
                                    </label>
                                    <input
                                        name="model_code"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="model_code"
                                        type="text"
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="manufacturing_date">
                                        Manufacturing Date
                                    </label>
                                    <input
                                        name="manufacturing_date"
                                        className="w-full px-2 border-b-2 font-semibold focus:outline-none focus:border-b-red-300"
                                        id="manufacturing_date"
                                        type="date"
                                        required
                                    />
                                </div>
                            </div>

                        </div>
                       
                        <div className="flex items-center justify-end mb-5">
                            <button className="bg-[#696cff] hover:bg-indigo-600 text-white px-4 py-1 mt-4 rounded-full" type="submit">
                                Save
                            </button>
                        </div>
                    </form>
                </div> 
            </Modal>
        </>
    );
}