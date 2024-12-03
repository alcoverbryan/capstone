import { Xmark } from "../HeroIcons";

export default function UserConfirmationModal({ selectedUser, handleClose, userLogIn }) {
    if (!selectedUser) return null; // Ensure that the modal doesn't render without a member

    return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
        <div className="w-48 md:w-auto bg-yellow-500 p-6 rounded">
            <div className="modal-content">
                <div className="flex justify-between">
                    <h2 className="font-semibold text-start text-[30px] text-black w-full">User Details</h2>
                    <button className="mr-2 border-0 transform" onClick={handleClose}>
                        <span className="text-gray-600 text-4xl flex items-center ">
                            <Xmark />
                        </span>
                    </button>                    
                </div>
                <div className="flex">
                    <div className="px-2 py-2">
                        <label className="block font-semibold text-black mb-1">
                            First Name:
                        </label>
                            <input
                                type="text"
                                value={selectedUser.first_name}
                                className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                readOnly
                            />
                    </div>
                    <div className="px-2 py-2">
                        <label className="block font-semibold text-black mb-1">
                            Last Name:
                        </label>
                            <input
                                type="text"
                                value={selectedUser.last_name}
                                className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                readOnly
                            />
                    </div>
                    </div>
                    <div className="px-2 py-2">
                         <label className="block font-semibold text-black mb-1">
                            Gender:
                        </label>
                        <input
                            type="text"
                            value={selectedUser.gender}
                            className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>
                    <div className="px-2 py-2">
                        <label className="block font-semibold text-black mb-1">
                            Position:
                        </label>
                        <input
                            type="text"
                            value={selectedUser.position}
                            className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>

                    <div className="px-2 py-2">
                        <label className="block font-semibold text-black mb-1">
                            Email:
                        </label>
                        <input
                            type="email"
                            value={selectedUser.email}
                            className="border-b p-2w-auto w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>

                    <div className="px-2 py-2">
                    <label className="block font-semibold text-black mb-1">
                      Address:
                        </label>
                        <input
                            type="text"
                            value={selectedUser.permanent_address}
                            className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>

                    <div className="px-2 py-2">
                    <label className="block font-semibold text-black mb-1">
                      Phone:
                        </label>
                        <input
                            type="text"
                            value={selectedUser.phone_num}
                            className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>

                    <div className="px-2 py-2">
                    <label className="block font-semibold text-black mb-1">
                        Username:
                        </label>
                        <input
                            type="text"
                            value={selectedUser.username}
                            className="bg-light border-b p-2 w-full h-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
