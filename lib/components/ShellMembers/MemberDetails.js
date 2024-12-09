import React, { useState, useEffect } from 'react';

export default function MemberDetails({ member, handleClose, allBranch, userLogIn, hideForUser }) {
    const [updatedMember, setUpdatedMember] = useState({ ...member });
    const [isChanged, setIsChanged] = useState(false);

    // Check if any changes are made
    useEffect(() => {
        const hasChanges = JSON.stringify(member) !== JSON.stringify(updatedMember);
        setIsChanged(hasChanges);
    }, [member, updatedMember]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember((prevMember) => ({
            ...prevMember,
            [name]: value,
        }));
    };    

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="relative flex w-auto">
                <div className="w-full md:w-auto bg-yellow-500 p-6 rounded">
                    <div className="modal-content">
                        <div className="p-4 text-[1.5rem] text-dark items-center justify-center font-medium">
                            Profile Details
                        </div>
                        <div className="flex justify-between">
                            <form action="/api/updateMemberDetails" method="POST">
                                <input name="user_id" id="user_id" type="hidden" value={userLogIn.id} />
                                <input
                                    type="hidden"
                                    id="id"
                                    name="id"
                                    onChange={handleChange}
                                    value={updatedMember.id}
                                />
                                <div className="flex flex-wrap">
                                    {/* First Name Field */}
                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="first_name" className="block font-semibold text-black mb-1 text-start">
                                            First Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            name="first_name"
                                            onChange={handleChange}
                                            className="bg-light border p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm rounded-md"
                                            defaultValue={updatedMember.first_name}
                                        />
                                    </div>

                                    {/* Last Name Field */}
                                    <div className="w-full md:w-1/2 px-2">
                                        <label htmlFor="last_name" className="block font-semibold text-black mb-1 text-start">
                                            Last Name:
                                        </label>
                                        <input
                                            type="text"
                                            id="last_name"
                                            name="last_name"
                                            onChange={handleChange}
                                            className="bg-light border p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm rounded-md"
                                            defaultValue={updatedMember.last_name}
                                        />
                                    </div>
                                </div>

                                {/* Gender Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Gender:
                                    </label>
                                    <input
                                        type="text"
                                        id="gender"
                                        name="gender"
                                        onChange={handleChange}
                                        className="w-full bg-light border-b p-2 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        defaultValue={updatedMember.gender}
                                    />
                                </div>

                                {/* Position Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Position:
                                    </label>
                                    {!hideForUser ? (
                                        <select
                                            id="position"
                                            name="position"
                                            onChange={handleChange}
                                            className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                            value={updatedMember.position || ""} // Ensure this is controlled by React state
                                            required
                                        >
                                            <option value="Admin">Admin</option>
                                            <option value="Office Staff">Office Staff</option>
                                            <option value="Cashier">Cashier</option>
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={updatedMember.position || ""} // Also ensure this is controlled
                                            readOnly
                                            className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 shadow-sm px-4 rounded-md"
                                        />
                                    )}
                                </div>

                                {/* Email Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Email:
                                    </label>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        onChange={handleChange}
                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        defaultValue={updatedMember.email}
                                    />
                                </div>

                                {/* Address Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Address:
                                    </label>
                                    <input
                                        type="text"
                                        id="permanent_address"
                                        name="permanent_address"
                                        onChange={handleChange}
                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        defaultValue={updatedMember.permanent_address}
                                    />
                                </div>

                                {/* Phone Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Phone:
                                    </label>
                                    <input
                                        type="text"
                                        id="phone_num"
                                        name="phone_num"
                                        onChange={handleChange}
                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        defaultValue={updatedMember.phone_num}
                                    />
                                </div>

                                {/* Username Field */}
                                <div className="px-2 mt-1">
                                    <label className="block float-left font-semibold text-black mb-1">
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        onChange={handleChange}
                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        defaultValue={updatedMember.username}
                                    />
                                </div>

                                {/* Branch Field */}
                                {updatedMember.position !== "Admin" && (
                                    <div className="px-2 mt-1">
                                        <label className="block float-left font-semibold text-black mb-1">
                                            Branch:
                                        </label>
                                        <select
                                            name="branch_id"
                                            id="branch_id"
                                            value={updatedMember.branch_id || ''}
                                            onChange={handleChange}
                                            className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                        >
                                            {allBranch.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.branch_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex justify-center gap-3 mt-5">
                                    <button
                                        type="Submit"
                                        disabled={!isChanged}
                                        className={`py-2 px-6 text-l font-medium rounded-md w-[100px] md:w-full flex justify-center shadow-md transform transition-transform duration-300 ${
                                            isChanged
                                                ? 'bg-gray-300 text-black hover:bg-accent1 hover:scale-105'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                    >
                                        Reset
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleClose}
                                        className="bg-red-500 py-2 px-6 text-l font-medium rounded-md md:w-full w-[70px] flex justify-center shadow-md text-accent1 transform hover:bg-red-600 hover:scale-105 transition-transform duration-300"
                                    >
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
