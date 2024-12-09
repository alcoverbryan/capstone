import React, { useState } from "react";
import BranchEditModal from "./BranchEditmodal"; // Modal component for editing branch information
import UpdateBranches from "./Modals/UpdateBranches";

export default function BranchInformation({ allBranch, userLogIn }) {
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleEditClick = (branch) => {
        setSelectedBranch(branch); // Set the branch to be edited
    };

    return (
        <div className="mt-10 p-6 flex flex-col items-center justify-center">
            <div className="border lg:w-10/12 bg-white shadow-lg rounded-lg">
                <table className="w-full">
                    <thead>
                        <tr className="border-b-2 bg-white">
                            <th className="px-4 py-4 text-[14px] text-nowrap text-dark">Branch Name</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">Location</th>
                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">
                                <div className="flex border-0 justify-center"> ACTION</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allBranch.length > 0 ? (
                            allBranch.map((branch) => (
                                <tr key={branch.id} className="border-b">
                                    <td className="px-4 py-2 text-[14px] text-dark">{branch.branch_name}</td>
                                    <td className="px-4 py-2 text-[14px] text-dark">{branch.location}</td>
                                    <td className="px-4 py-2 text-[14px] flex justify-center gap-2 text-dark">
                                        <button
                                            onClick={() => handleEditClick(branch)} // Set the selected branch for editing
                                            className="px-2 py-2"
                                        >
                                            <UpdateBranches branch={branch} userLogIn={userLogIn}/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center text-gray-500">No branches available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
