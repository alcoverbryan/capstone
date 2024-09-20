import { useRouter } from "next/router";
import { Chevron_right, Fingerprint, Plus } from "./HeroIcons";

export default function ForgotPassword ({UserLogIn}) {
    console.log(UserLogIn)
    const router = useRouter();
    const base64Image = Buffer.from(UserLogIn.profile_img.data).toString();
    return (
        <div className="flex justify-center bg-slate-50 h-screen p-2">
            <div className="w-full md:w-9/12">
                <div className=" mb-20 mt-6 bg-white border-b border-r shadow-md rounded-lg p-4 text-l font-medium flex items-center space-x-2">
                    <span className=" text-[12px] md:text-[18px] text-nowrap text-dark font-medium  text-[#566a7f]">Account Setting</span>
                        <Chevron_right className=" h-4 w-4 text-gray-500"/>
                    <span className="text-[12px] md:text-[18px] text-nowrap font-[700] text-[#566a7f]">Account</span>
                </div>

                <div className="flex flex-col md:flex-row border-0 gap-5">
                    <div className="md:w-full">
                        <div className=" p-4 mb-10 border bg-white w-full rounded-lg shadow-md">
                            <div className="p-4 text-[1.125rem] text-dark flex font-medium">Profile Details</div>
                            <div className=" flex justify-left items-center mb-9">
                                <div className="">
                                    <img src={base64Image} alt="Image" className="rounded-full w-[200px] h-[200px] mx-10 " />
                                </div>
                                <div className="border-0">
                                    <h1 className=" block text-dark text-[2.5rem] font-semibold text-wrap">{UserLogIn.full_name}</h1>
                                    <p className="font-semibold flex text-[16px] text-dark focus:outline-none mb-4 gap-2">{UserLogIn.position}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-2/4">
                        <div for="full_name" className=" bg-white shadow-md border-b border flex justify-center  rounded-lg  text-nowrap mb-2   ">
                            <a className="p-4 text-[1.125rem] text-dark font-semibold capitalize">Update your password here</a>
                        </div>
                        <div className=" w-full  bg-white shadow-md border-b rounded-lg  flex justify-center ">
                            <div className="  border-0 mb-8 ">
                                <div className="w-full border-0  mt-5 px-4">
                                    <form action="/api/forgotPassword" method="POST">
                                        <div class="">
                                            <input name="register_id" id="register_id" type="hidden" value={`${router.query.id}`} />
                                        </div>
                                        <div className="flex items-center relative mb-2">
                                            <input
                                                type="password"
                                                id="new_password"
                                                name="new_password"
                                                placeholder="New Password"
                                                required
                                                className=" border-b p-2 w-full h-10 pl-10 font-normal focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="New" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative">
                                            <input
                                                type="password"
                                                id="retype_new_password"
                                                name="retype_new_password"
                                                placeholder="Re-type New Password"
                                                required
                                                className=" border-b p-2 w-full h-10 pl-10 font-normal focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Re-Type" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            class="mt-6 bg-[#696cff] text-white py-2 px-4 w-full rounded-md hover:bg-indigo-600 mb-2 transform hover:scale-105 transition-transform duration-300 flex justify-center items-center"
                                        >
                                            <Plus className="h-4" />
                                            Reset Password
                                        </button>
                                    </form>
                                    <div>
                                        <button className="py-2 px-6 text-l font-medium rounded-md md:w-full w-full flex justify-center shadow-md border border-accent1 text-accent1">
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