import { Fingerprint, Map_pin, PencilSqaure } from "../HeroIcons";
import Modal from "../Modal";

export default function UpdateBranches({ branch, userLogIn }) {
    return (
        <Modal title="Edit Branches" icon={<PencilSqaure className="w-7 h-7" />}>
            <div className="flex flex-col md:flex-row items-center justify-center gap-20 relative border-0 mb-10">
                <div className="w-[500px] h-full">
                    <form action="/api/updateBranch" method="POST">
                        {/* Hidden Inputs */}
                        <input type="hidden" name="user_id" id="user_id" value={userLogIn.id} />
                        <input type="hidden" name="id" id="id" value={branch.id} />

                        {/* Branch Name */}
                        <div className="mb-4">
                            <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700 mb-2">
                                Branch Name
                            </label>
                            <input
                                type="text"
                                id="branch_name"
                                name="branch_name"
                                defaultValue={branch.branch_name}
                                className="w-full px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#F2D323]"
                                required
                            />
                        </div>
                    
                        {/* Location */}
                        <div className="mb-4 relative">
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                Location
                            </label>
                            <div className="relative">
                                {/* Icon and Divider */}
                                <div className="absolute top-0 left-0 h-full flex items-center pl-3 gap-2">
                                    <Map_pin className="w-5 h-5 text-dark" tooltip="Current" />
                                    {/* Divider */}
                                    <div className="h-[20px] border-l border-dark"></div>
                                </div>
                                {/* Input Field */}
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    defaultValue={branch.location}
                                    className="w-full pl-16 px-4 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-[#F2D323]"
                                    required
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="px-6 py-2 bg-[#F2D323] text-black rounded-md shadow-md hover:bg-[#f1d748] focus:outline-none"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
}
