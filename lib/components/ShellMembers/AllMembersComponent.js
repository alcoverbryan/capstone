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
                <table className="w-full table-auto bg-gradient-to-r to-[#DD1D21] from-[#f2d323ee] text-center">
                    <thead>
                        <tr className="">
                            <th className="border border-gray-300 px-4 py-4 ">ID</th>
                            <th className="border border-gray-300 px-4 py-4">Name</th>
                            <th className="border border-gray-300 px-4 py-4">Phone</th>
                            <th className="border border-gray-300 px-4 py-4">Position</th>
                            <th className="border border-gray-300 px-4 py-4">Username</th>
                        </tr>
                    </thead>
                    <tbody>
                    {allRegister.filter(
                        (filtered_item) =>
                            filtered_item.full_name.toLowerCase().includes(searchInput.toLowerCase().trim())
                        ).length === 0 ? (
                            <tr>
                                <td colSpan="8" className="text-center text-red-500">
                                    No member found.
                                </td>
                            </tr>
                                                ) : (
                        allRegister.filter(
                            (data) =>
                                data.full_name.toLowerCase().includes(searchInput.toLowerCase().trim())
                        ).map((data, index) => {
                            return (
                                <tr key={index} className="mt-10 bg-white rounded-md shadow-md transition duration-300  hover:bg-gray-100">
                                    <td className="border-b border-l py-3 font-normal border-0 items-center text-[14px] text-dark text-wrap md:text-nowrap">{data.id}</td>
                                    <td
                                        className="border-b py-3 font-normal items-center text-[14px] text-dark text-wrap md:text-nowrap cursor-pointer"
                                        onClick={() => handleNameClick(data)}
                                    >
                                        {data.full_name}
                                    </td>
                                    <td className="border-b py-3 font-normal border-0 items-center text-[14px] text-dark text-wrap md:text-nowrap">{data.phone_num}</td>
                                    <td className="border-b py-3 font-normal border-0 items-center text-[14px] text-dark text-wrap md:text-nowrap">{data.position}</td>
                                    <td className="border-b py-3 font-normal border-0 items-center text-[14px] text-dark text-wrap md:text-nowrap border-r">{data.username}</td>
                                </tr>
                            )}
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-end text-center mt-6 w-full">
              <button
                 onClick={handleBack}
                  className="bg-red-500 text-white px-4 py-2 rounded-md border border-red-700 transition duration-300 ease-in-out hover:bg-white hover:text-black hover:border-red-700"
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
