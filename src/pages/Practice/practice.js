
import { useState } from "react";
import { Chevron_left, Chevron_right, CurrentLocation, Fingerprint, IdCard, Plus, UserCircle } from "./views/HeroIcons";

export default function MembersDetails({ Register, onBackClick, hideForUserCustodian, UserLogIn }) {
    const base64Image = Buffer.from(Register.profile_img.data).toString();

    function formatDate(datetimeStr) {
        const originalDatetime = new Date(datetimeStr);

        const timeStr = originalDatetime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
        });

        const monthName = originalDatetime.toLocaleString("en-US", { month: "long" });
        const day = originalDatetime.getDate();

        const year = originalDatetime.getFullYear();
        return `${timeStr} | ${monthName} ${day}, ${year}`;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const userBorrowedHistory = Register.borrowedHistory.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(Register.borrowedHistory.length / itemsPerPage);
    console.log(userBorrowedHistory)

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    return (
        <>
            <div className="flex flex-row  md:p-4 md:px-10 ">
                <div className="flex flex-col w-full   ">
                    <div className=" bg-light py-4 p-1 md:p-4 ">
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="flex items-start md:items-center flex-col md:flex-row md:px-2 px-4 gap-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-[12px] md:text-[18px] text-dark font-medium">Account Settings</span>
                                        <Chevron_right className="h-3 md:h-4 w-3 md:w-4 text-dark" />
                                    </div>
                                    <span className="text-[12px] md:text-[18px] font-[700] text-dark">Members</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row border-0 gap-5 md:px-10 md:mt-10">
                        <div className="md:w-full">
                            <div className="  p-1 py-3.5 border bg-light w-full rounded-lg shadow-lg">
                                <div className="p-4 text-[1.125rem] text-dark flex font-medium">Profile Details</div>
                                <div className=" flex justify-left items-center py-4">
                                    <div className="">
                                        <img src={base64Image} alt="Image" className="rounded-full w-[200px] h-[200px] mx-10 " />
                                    </div>
                                    <div className="border-0">
                                        <h1 className=" block text-dark text-[2.5rem] font-semibold text-wrap">{Register.full_name} </h1>
                                        <p className="font-semibold flex text-[16px] text-dark focus:outline-none mb-4 gap-2">
                                            <div>{Register.location}</div>
                                            <div>{Register.id}</div>
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
                                            <input name="user_login_id" id="user_login_id" type="hidden" value={UserLogIn[0].id} />
                                            <div className="flex items-center relative">
                                                <input
                                                    type="id"
                                                    id="id"
                                                    name="id"
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    value={Register.id}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <IdCard className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="ID" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="ldap"
                                                    name="ldap"
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-gray-300 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={Register.ldap}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <IdCard className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="ldap" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    id="full_name"
                                                    name="full_name"
                                                    className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={Register.full_name}
                                                />
                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            {!hideForUserCustodian && (
                                                <div className="flex items-center relative">
                                                    <select
                                                        id="title_id"
                                                        name="title_id"
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md appearance-none"
                                                        defaultValue={Register.title}
                                                        required
                                                    >
                                                        <option value="Admin">Admin</option>
                                                        <option value="Custodian">Custodian</option>
                                                        <option value="User">User</option>
                                                    </select>
                                                    <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                        <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Title" />
                                                        <div className="md:h-[25px] md:border-r flex items-center border-dark justify-center"></div>
                                                    </div>
                                                </div>
                                            )}
                                            {hideForUserCustodian && (
                                                <div className="flex items-center relative">
                                                    <input
                                                        id="title_id"
                                                        name="title_id"
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md appearance-none"
                                                        value={Register.title}
                                                        required
                                                    ></input>
                                                    <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                        <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Title" />
                                                        <div className="md:h-[25px] md:border-r flex items-center border-accent6 justify-center"></div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center relative mb-7">
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    className="bg-light border-b  p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-accent6 focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                    defaultValue={Register.location}
                                                />

                                                <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                    <CurrentLocation className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Location" />
                                                    <div class="  md:h-[25px] md:border-r flex items-center border-accent6 justify-center "></div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2 mt-5">
                                                {!hideForUserCustodian && (
                                                    <>
                                                        <button
                                                            // onClick={handleButtonClick}
                                                            className=" border-0 py-1 md:gap-3 gap-1 hover:bg-accent1 px-6 w-[100px] md:w-full text-l font-medium bg-accent1 text-light rounded-md shadow-md flex items-center justify-center transform hover:scale-105 transition-transform duration-300"
                                                        >
                                                            <Plus className="h-4" />
                                                            Reset
                                                        </button>
                                                    </>
                                                )}
                                                <button
                                                    onClick={onBackClick}
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

                    <div className="md:w-full md:p-10">
                        <div className="border-0">
                            <h1 className=" border-t border-l border-r bg-light font-mdium text-dark flex justify-start  rounded-md p-4 text-l font-medium">
                                {Register.full_name}'s History
                            </h1>

                            <div className=" bg-light shadow-md  rounded-md overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className=" border-b-2 bg-light">
                                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">PERSON</th>
                                            <th className="px-4 py-4 text-[14px] text-nowrap text-dark">ID</th>
                                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">STATUS</th>
                                            <th className="px-4 py-2 text-[14px] text-nowrap text-dark">DETAILS</th>
                                        </tr>
                                    </thead>
                                    {/* {showBorrowHistory && ( */}
                                        <tbody>
                                            {userBorrowedHistory.map((data) => (
                                                <tr key={data.id} className="">
                                                    <td className="border-b px-10 py-3 font-normal text-[14px] text-nowrap text-gray-500 ">
                                                        {data.registerMember.full_name}
                                                    </td>
                                                    <td
                                                        className="border-b px-4 py-3 font-normal text-[14px] text-nowrap text-gray-500 "
                                                    >
                                                        {data.register_id}
                                                    </td>
                                                    <td
                                                        className="border-b px-4 py-3 text-sm font-semibold text-center text-nowrap text-gray-700"
                                                        style={{
                                                            color:
                                                                data.status_id === "1"
                                                                    ? "green" 
                                                                    : data.status_id === "2"
                                                                    ? "orange" 
                                                                    : "red", 
                                                        }}
                                                    >
                                                        {data.status_id === "1"
                                                            ? "Returned"
                                                            : data.status_id === "2"
                                                            ? "Borrowed"
                                                            : data.status_id === "5"
                                                            ? "Disposed"
                                                            : "Unknown"}
                                                </td>

                                                <td className="border-b px-4 py-3 text-center text-[14px] font-semibold text-nowrap text-gray-500">
                                                    <div className="flex flex-col">
                                                        {data.status_id === "1" ? (
                                                            <div>
                                                                <span className="flex text-[#697a8d] text-[90%] font-[500] gap-1">
                                                                    <b>{data.devicesDetail.project} • </b> {data.devicesDetail.model} •{" "}
                                                                    {data.devicesDetail.model_code} • {data.devicesDetail.serial_number}
                                                                </span>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    <b className="font-[700]">Remarks:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.remarks}</a>{" "}
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    <b className="font-[700]">Date Processed:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{formatDate(data.createdAt)}</a>{" "}
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    <b className="font-[700]">Device Location:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.current_location}</a>{" "}
                                                                </div>
                                                            </div>
                                                        ) : data.status_id === "2" ? (
                                                            <div>
                                                                <span className="flex text-[90%] text-[#697a8d] font-[500] gap-1">
                                                                    <b>{data.devicesDetail.project} • </b>{" "}
                                                                    <div>
                                                                        {data.devicesDetail.model} • {data.devicesDetail.model_code} •{" "}
                                                                        {data.devicesDetail.serial_number}
                                                                    </div>
                                                                </span>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    {" "}
                                                                    <b className="font-[700]">Return date:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.planned_date_returned}</a>
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    {" "}
                                                                    <b className="font-[700]">Remarks:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.remarks}</a>
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    {" "}
                                                                    <b className="font-[700]">Date Processed:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{formatDate(data.createdAt)}</a>{" "}
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    <b className="font-[700]">Device Location:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.current_location}</a>{" "}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="flex text-[90%] text-[#697a8d] font-[500] gap-1">
                                                                    <b>{data.devicesDetail.project} • </b>{" "}
                                                                    <div>
                                                                        {data.devicesDetail.model} • {data.devicesDetail.model_code} •{" "}
                                                                        {data.devicesDetail.serial_number}
                                                                    </div>
                                                                </span>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    {" "}
                                                                    <b className="font-[700]">Remarks:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.remarks}</a>
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    {" "}
                                                                    <b className="font-[700]">Date Disposed:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{formatDate(data.date_inlisted)}</a>{" "}
                                                                </div>
                                                                <div className="flex gap-1 text-[89%]">
                                                                    <b className="font-[700]">Device Location:</b>{" "}
                                                                    <a className="text-gray-500 font-normal">{data.current_location}</a>{" "}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    {/* )} */}
                                </table>
                            </div>
                            {Register.borrowedHistory.length > itemsPerPage && (
                                <div className="flex justify-end mt-4 gap-2 items-center">
                                    <div className="text-gray-700">
                                        Page {currentPage} of {totalPages}
                                    </div>
                                    <div className="border flex border-accent1 rounded-lg gap-0.5">
                                        <button
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                            className={`px-4 py-0.5 text-l font-medium rounded-l-lg  ${currentPage === 1 ? 'border-accent1 text-accent1' : 'bg-accent1 text-light'}`}
                                        >
                                            <Chevron_left className="h-5 w-5"/>
                                        </button>
                                        <button
                                            onClick={handleNextPage}
                                            disabled={indexOfLastItem >= Register.borrowedHistory.length}
                                            className={`px-4 py-0.5 text-l font-medium rounded-r-lg ${indexOfLastItem >= Register.borrowedHistory.length ? 'border-accent1 text-accent1' : 'bg-accent1 text-light'}`}
                                        >
                                            <Chevron_right className="h-5 w-5"/>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}