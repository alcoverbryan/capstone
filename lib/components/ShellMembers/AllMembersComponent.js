import React, { useState } from 'react';
import MemberDetails from './MemberDetails';  // Import the MemberDetails component

export default function AllMembersComponent({ handleBack, allRegister, allBranch, userLogIn, searchInput }) {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleNameClick = (member) => {
        setSelectedMember(member);
    };

    const closeDetails = () => {
        setSelectedMember(null);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full">
                <table className="w-full table-auto bg-yellow-300 text-black text-lg text-center">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-4">ID</th>
                            <th className="border border-gray-300 px-4 py-4">First Name</th>
                            <th className="border border-gray-300 px-4 py-4">Last Name</th>
                            <th className="border border-gray-300 px-4 py-4">Gender</th>
                            <th className="border border-gray-300 px-4 py-4">Phone</th>
                            <th className="border border-gray-300 px-4 py-4">Position</th>
                            <th className="border border-gray-300 px-4 py-4">Username</th>
                            <th className="border border-gray-300 px-4 py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allRegister.filter(
                            (filtered_item) =>
                                (filtered_item.first_name.toLowerCase().concat(" ", filtered_item.last_name.toLowerCase()).includes(searchInput.toLowerCase().trim()))
                        ).length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-red-500">
                                    No member found.
                                </td>
                            </tr>
                        ) : (
                            allRegister
                                .filter((data) =>
                                    data.first_name.toLowerCase().concat(" ", data.last_name.toLowerCase()).includes(searchInput.toLowerCase().trim())
                            )
                                .map((data, index) => (
                                    <tr
                                        key={index}
                                        className="mt-10 bg-white rounded-md shadow-md transition duration-300 hover:bg-gray-100"
                                    >
                                        <td className="border-b border-l py-3 font-normal text-[14px] text-dark">{data.id}</td>
                                        <td
                                            className="border-b py-3 font-normal text-[14px] text-dark cursor-pointer"
                                            onClick={() => handleNameClick(data)}
                                        >
                                            {data.first_name}
                                        </td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark">{data.last_name}</td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark">{data.gender}</td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark">{data.phone_num}</td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark">{data.position}</td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark border-r">{data.username}</td>
                                        <td className="border-b py-3 font-normal text-[14px] text-dark border-r">
                                            <div className="flex gap-2 justify-center">
                                                <button
                                                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600"
                                                    onClick={() => console.log("Enable clicked", data.id)}
                                                >
                                                    Enable
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
                                                    onClick={() => console.log("Disable clicked", data.id)}
                                                >
                                                    Disable
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end text-center mt-6 w-full">
                <button
                    onClick={handleBack}
                    className="bg-[#F2D323] text-black rounded px-4 py-2 border border-[#F2D323] transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-red-700"
                >
                    Back
                </button>
            </div>

            {selectedMember && (
                <MemberDetails
                    member={selectedMember}
                    handleClose={closeDetails}
                    allBranch={allBranch}
                    userLogIn={userLogIn}
                />
            )}
        </div>
    );
}
