import React, { useState } from 'react';
import { Fingerprint, IdCard, Plus, UserCircle } from '../HeroIcons';

export default function MemberDetails({ member, handleClose, allBranch, userLogIn }) {
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
    const base64Image = Buffer.from(member.profile_img.data).toString();

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative flex w-[9/12]">
                <div className="flex flex-col md:flex-row border-0 gap-5 md:px-10 md:mt-10">
                    <div className="md:w-full">
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
                    </div>
                        {/* {!hideForUserCustodian && ( */}
                        <div className="md:w-1/2">
                            <div className=" w-full  bg-light shadow-lg border-b border rounded-lg  flex justify-center ">
                                <div className="  border-0 mb-10 ">
                                    <div className="w-full border-0  mt-5 px-4">
                                        <form action="/api/updateRegister" method="POST" className="">
                                            <input name="user_id" id="user_id" type="hidden" value={userLogIn.id} />
                                            <div className="flex items-center relative">
                                                <input
                                                    type="hidden"
                                                    id="id"
                                                    name="id"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    value={updatedMember.id}
                                                />
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="full_name"
                                                    name="full_name"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={updatedMember.full_name}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <select
                                                    id="position"
                                                    name="position"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md appearance-none"
                                                    defaultValue={updatedMember.position}
                                                    required
                                                >
                                                    <option value="Admin">Admin</option>
                                                    <option value="Office Staff">Office Staff</option>
                                                    <option value="Cashier">Cashier</option>
                                                </select>
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Position" />
                                                    <div className="md:h-[25px] md:border-r flex items-center border-dark justify-center"></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="email"
                                                    name="email"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={updatedMember.email}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Email" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="phone_num"
                                                    name="phone_num"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={updatedMember.phone_num}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Phone Number" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="permanent_address"
                                                    name="permanent_address"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={updatedMember.permanent_address}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Permanent Address" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={updatedMember.username}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Username" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <select
                                                    name="branch_id"
                                                    id='branch_id'
                                                    value={updatedMember.branch_id || ''}
                                                    onChange={handleChange}
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md appearance-none"
                                                >
                                                    {allBranch.map((branch) => (
                                                        <option key={branch.id} value={branch.id}>
                                                            {branch.branch_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Username" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2 mt-5">
                                            
                                                    <>
                                                        <button
                                                            // onClick={handleButtonClick}
                                                            className=" border-0 py-1 md:gap-3 gap-1 hover:bg-accent1 px-6 w-[100px] md:w-full text-l font-medium bg-accent1 text-light rounded-md shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                                                        >
                                                            <Plus className="h-4" />
                                                            Reset
                                                        </button>
                                                    </>

                                                <button
                                                    onClick={handleClose}
                                                    className=" py-1 px-6 text-l font-medium rounded-md md:w-full w-[70px] flex justify-center shadow-md border border-accent1 text-accent1"
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
        </div>
    );
}
