import React, { useState } from 'react';
import MemberDetails from './MemberDetails';  // Import the MemberDetails component

export default function AllMembersComponent({ handleBack, allRegister, allBranch, userLogIn }) {
    const [selectedMember, setSelectedMember] = useState(null);

    const handleNameClick = (member) => {
        setSelectedMember(member);
    };

    const closeDetails = () => {
        setSelectedMember(null);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full mb-6">
                <table className="w-full table-auto border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Position</th>
                            <th className="border border-gray-300 px-4 py-2">Address</th>
                            <th className="border border-gray-300 px-4 py-2">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allRegister.map((member, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-4 py-2">{member.id}</td>
                                <td
                                    className="border border-gray-300 px-4 py-2 cursor-pointer text-blue-500 underline"
                                    onClick={() => handleNameClick(member)}
                                >
                                    {member.full_name}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">{member.email}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.phone_num}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.position}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.permanent_address}</td>
                                <td className="border border-gray-300 px-4 py-2">{member.username}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end text-center mt-6 w-full">
                <button
                    onClick={handleBack}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
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
