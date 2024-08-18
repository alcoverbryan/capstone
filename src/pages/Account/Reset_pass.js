import { Chevron_right } from "../../../lib/components/HeroIcons";

export default function Reset_pass () {
    return (
        <div className="flex justify-center bg-slate-50 p-2">
            <div className="w-full md:w-9/12">
                <div className=" mb-10 mt-6 bg-white border-b  border-r shadow-md rounded-md p-4 text-l font-medium flex items-center space-x-2">
                    <span className="text-l  font-medium text-[#566a7f]">Account Setting</span>
                    <Chevron_right className=" h-4 w-4 text-gray-500"/>
                    <span className="text-l font-medium">Account</span>
                </div>
                <div className="flex flex-col md:flex-row border-0 gap-5">
                    <div className="md:w-full">
                        <div className="p-2 mb-10 border bg-white w-full  rounded-lg shadow-md">
                            <div className="p-4 text-[1.125rem] text-[#566a7f] font-medium">Profile Details</div>
                            <div className="flex justify-left items-center flex-col md:flex-row">
                                <div className="">
                                    <img src="/../image/avatar.png" alt="image" className="rounded-full w-[250px] mx-10"></img>
                                </div>
                                <div className="">
                                    <h1 className="block text-gray-700 text-[2.5rem] text-wrap">Bryan Alcover</h1>
                                    <p className="font-semibold text-[0.75rem] text-gray-600 focus:outline-none mb-4">Admin</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="md:w-full">
                        <div  for="full_name" className="bg-white shadow-md border-b border flex justify-center rounded-lg text-nowrap mb-5">
                            <a className="p-4 text-[1.125rem] text-[#566a7f] font-medium capitalize"> Update your password here</a>
                        </div>
                        <div className="w-full bg-white shadow-md border-b rounded-lg flex justify-center">
                            <div className="mb-10">
                                <div className="w-full mt-5 px-4">
                                    <div className="mb-4 text-[1.125rem] text-gray-700 font-medium">
                                        New password
                                    </div>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        name="password" 
                                        className="mt-1 mb-4 block w-[330px] border-b focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-md px-4 py-4 rounded-md" 
                                        required
                                        placeholder="Enter your new password"
                                    >
                                    </input>

                                    <button type="submit" className="mt-6 bg-[#696cff] text-white py-2 px-4 w-full rounded-md hover:bg-indigo-600 mb-2 transform hover:scale-105 transition-transform duration-300 flex justify-center items-center">
                                        Reset Password
                                    </button>
                                    <div>
                                        <button className="border border-[#696cff] text-[#696cff] py-2 px-4 w-full rounded-full mb-1 transform hover:scale-105 transition-transform duration-300">
                                            <a href="/Account/Login">Back</a>
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}