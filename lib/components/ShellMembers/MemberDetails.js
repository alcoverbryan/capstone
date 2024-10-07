import React, { useState } from 'react';

export default function MemberDetails({ member, handleClose, allBranch, userLogIn }) {
    console.log(userLogIn)
    const [updatedMember, setUpdatedMember] = useState({ ...member });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember((prevMember) => ({
            ...prevMember,
            [name]: value,
        }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <h2 className="text-2xl font-bold mb-4">Edit Member Details</h2>
                <form action='/api/updateRegister' method='POST'>
                    <input
                        type="hidden"
                        name="user_id"
                        id='user_id'
                        value={userLogIn.id}
                    />
                    <div className="mb-4">
                        <label className="block text-gray-700">ID:</label>
                        <input
                            type="text"
                            name="id"
                            id='id'
                            value={updatedMember.id}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            name="full_name"
                            id='full_name'
                            value={updatedMember.full_name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id='email'
                            value={updatedMember.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Phone:</label>
                        <input
                            type="text"
                            name="phone_num"
                            id='phone_num'
                            value={updatedMember.phone_num}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Position:</label>
                        <select
                            name="position"
                            id="position"
                            value={updatedMember.position}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        >
                            <option value="admin">Admin</option>
                            <option value="office_staff">Office Staff</option>
                            <option value="cashier">Cashier</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Address:</label>
                        <input
                            type="text"
                            name="permanent_address"
                            id='permanent_address'
                            value={updatedMember.permanent_address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Username:</label>
                        <input
                            type="text"
                            name="username"
                            id='username'
                            value={updatedMember.username}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        />
                    </div>

                    
                    <div className="mb-4">
                        <label className="block text-gray-700">Branch:</label>
                        <select
                            name="branch_id"
                            id='branch_id'
                            value={updatedMember.branch_id || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                        >
                            {allBranch.map((branch) => (
                                <option key={branch.id} value={branch.id}>
                                    {branch.branch_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300 ease-in-out"
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
