import React, { useState } from "react";

const BranchEditModal = ({ showModal, handleClose, branchDetails, handleSave }) => {
    const [formData, setFormData] = useState({
        branchName: branchDetails?.branchName || "",
        location: branchDetails?.location || "",
    });

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the formData to the parent or handle saving logic here
        handleSave(formData);
        handleClose(); // Close the modal after saving
    };

    return (
        showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Edit Branch</h2>
                        <button onClick={handleClose} className="text-lg font-bold">×</button>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Branch Name</label>
                            <input
                                type="text"
                                name="branchName"
                                value={formData.branchName}
                                onChange={handleChange}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                placeholder="Enter branch name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="mt-2 p-2 border border-gray-300 rounded w-full"
                                placeholder="Enter location"
                                required
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="px-4 py-2 bg-gray-300 text-black rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default BranchEditModal;
