import React, { useState } from 'react';
import { Fingerprint, IdCard, Plus, UserCircle, Map_pin, Email, Phone, Station } from '../HeroIcons';

export default function MemberDetails({ member, handleClose, allBranch, userLogIn, hideForUser }) {
    console.log(userLogIn)
    const [updatedMember, setUpdatedMember] = useState({ ...member });
    console.log(updatedMember)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMember((prevMember) => ({
            ...prevMember,
            [name]: value,
        }));
    };
    // const base64Image = Buffer.from(member.profile_img.data).toString();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative flex w-auto">
                    {/* <div className="md:w-full">
                        <div className="  p-1 py-3.5 border bg-light w-full rounded-lg shadow-lg">
                            <div className="p-4 text-[1.125rem] text-dark flex font-medium">Profile Details</div>
                            <div className=" flex justify-left items-center py-4">
                                <div className="">
                                    <img src={base64Image} alt="Image" className="rounded-full w-[200px] h-[200px] mx-10 " />
                                </div>
                                <div className="border-0">
                                    <h1 className=" block text-dark text-[2.5rem] font-semibold text-wrap">{member.full_name} </h1>
                                    <p className="font-semibold flex text-[16px] text-dark focus:outline-none mb-4 gap-2">
                                        <div>{member.id}</div>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                        {/* {!hideForUserCustodian && ( */}
                        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                            <div className="w-48 md:w-auto bg-yellow-500 p-6 rounded">
                                <div className="modal-content">
                                    <div className="p-4 text-[1.5rem] text-dark items-center justify-center font-medium">Profile Details</div>

                                    <div className="flex justify-between">
                                        <form action="/api/updateMemberDetails" method="POST" className="">
                                            <input name="user_id" id="user_id" type="hidden" value={userLogIn.id} />
                                            <div className="flex items-center relative">
                                                <input
                                                    type="hidden"
                                                    id="id"
                                                    name="id"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    value={updatedMember.id}
                                                />
                                            </div>
                                        <div className="flex">
                                            <div className="px-2 py-2">
                                                <label className="block float-left font-semibold text-black mb-1">
                                                    First Name:
                                                </label>
                                                    <input
                                                        type="text"
                                                        id="first_name"
                                                        name="first_name"
                                                        onChange={handleChange}
                                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        defaultValue={updatedMember.first_name}
                                                    />
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
                                                <label className="block float-left font-semibold text-black mb-1">
                                                    Last Name:
                                                </label>                                                
                                                    <input
                                                        type="text"
                                                        id="last_name"
                                                        name="last_name"
                                                        onChange={handleChange}
                                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        defaultValue={updatedMember.last_name}
                                                    />
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Last Name" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                        </div>
                                            <div className="px-2 py-2">
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Gender" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
                                            <label className="block float-left font-semibold text-black mb-1">
                                                Position:
                                            </label>
                                                {!hideForUser ? ( 
                                                    <select
                                                        id="position"
                                                        name="position"
                                                        onChange={handleChange}
                                                        className="bg-light border-b p-2 w-full font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        value={updatedMember.position || ""}
                                                        required
                                                    >
                                                        <option value="Admin">Admin</option>
                                                        <option value="Office Staff">Office Staff</option>
                                                        <option value="Cashier">Cashier</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        type="text"
                                                        value={updatedMember.position || ""}
                                                        readOnly
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 shadow-sm px-4 rounded-md"
                                                    />
                                                )}

                                                {/* Icon Section */}
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Fingerprint
                                                        className="md:w-5 w-4 md:h-5 h-4 text-dark"
                                                        tooltip="Position"
                                                    />
                                                    <div className="md:h-[25px] md:border-r flex items-center border-dark"></div>
                                                </div> */}
                                            </div>

                                            <div className="px-2 py-2">
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Email className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Email" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center"></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Map_pin className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Permanent Address" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Phone className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Phone Number" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <IdCard className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Username" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="px-2 py-2">
                                            <label className="block float-left font-semibold text-black mb-1">
                                                Branch:
                                            </label>                                                
                                                <select
                                                    name="branch_id"
                                                    id='branch_id'
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
                                                {/* <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Station className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Branch" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div> */}
                                            </div>
                                            <div className="flex justify-center gap-3 mt-5">
                                            
                                                    <>
                                                        <button
                                                            // onClick={handleButtonClick}
                                                            className=" border-0 py-1 md:gap-3 gap-1 hover:bg-accent1 px-6 w-[100px] md:w-full text-l font-medium bg-gray-300 text-black rounded-md shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                                                        >
                                                            Reset
                                                        </button>
                                                    </>

                                                    <button
                                                        onClick={handleClose}
                                                        className="bg-red-500 py-1 px-6 text-l font-medium rounded-md md:w-full w-[70px] flex justify-center shadow-md text-accent1 transform hover:bg-red-600 hover:scale-105 transition-transform duration-300"
                                                    >
                                                        Back
                                                    </button>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* )} */}
                    </div>
            </div>
    );
}
