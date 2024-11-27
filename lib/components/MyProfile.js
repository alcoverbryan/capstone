import React, { useEffect, useState } from "react";
import MyProfileModalView from "../../lib/components/MyProfileModalView";
import { CurrentLocation, Fingerprint, IdCard, Plus, UserCircle } from "./HeroIcons";

const MyProfile = ({ userLogIn }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const first_name = event.target.first_name.value;
        const last_name = event.target.last_name.value;
        const gender = event.target.gender.value;
        const email = event.target.email.value;
        const phone_num = event.target.phone_num.value;
        const permanent_address = event.target.permanent_address.value;
        const username = event.target.username.value;
        const userId = document.getElementById("id").value;

        if (selectedFile) {
            if (selectedFile.size > 1 * 1024 * 1024) {
                alert("File size exceeds 1MB limit. Please choose a smaller file.");
                setIsLoading(false);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                await submitForm(first_name, last_name, gender, email, phone_num, permanent_address, username, userId,);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            await submitForm( first_name, last_name, gender, email, phone_num, permanent_address, username,  userId,);
        }
    };

    const submitForm = async ( first_name, last_name, gender, email, phone_num, permanent_address, username, userId,) => {
        const response = await fetch("/api/updateRegister", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                gender,
                email,
                phone_num,
                permanent_address,
                username,
                user_id: userId,
            }),
        });

        if (response.ok) {
            window.location.href = `/Users/${userId}`;
        } else {
            console.error("Error submitting form");
        }
        setIsLoading(false);
    };

    const [showResetPassword, setShowResetPassword] = useState(false);

    const handleChange = () => {
        setShowResetPassword(!showResetPassword);
    };

    const handleBackClick = () => {
        setShowResetPassword(null);
    };

    const [hasChanges, setHasChanges] = useState(false);
    const [formData, setFormData] = useState({
        first_name: userLogIn.first_name,
        last_name: userLogIn.last_name,
        gender: userLogIn.gender,
        email: userLogIn.email,
        phone_num: userLogIn.phone_num,
        permanent_address: userLogIn.permanent_address,
        username: userLogIn.username,
    });

    useEffect(() => {
        const isChanged =
            formData.first_name !== userLogIn.first_name ||
            formData.last_name !== userLogIn.last_name ||
            formData.gender !== userLogIn.gender ||
            formData.email !== userLogIn.email ||
            formData.phone_num !== userLogIn.phone_num ||
            formData.permanent_address !== userLogIn.permanent_address ||
            formData.username !== userLogIn.username;
    
        setHasChanges(isChanged);
    }, [formData, userLogIn]);
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (
        <>
            <MyProfileModalView
                handleSubmit={handleSubmit}
                showResetPassword={showResetPassword}
                title="Add Devices"
                title_text="My Profile"
                save_button="Save"
                isLoading={isLoading}
                hasChanges={hasChanges}
            >
                <div className="flex flex-col md:flex-row border-0 gap-5 md:px-10 md:mt-10 md:mb-2">
                    <div className="md:w-full">
                        <div className="text-[1.125rem] text-dark flex font-medium">Profile Details</div>
                        <div className="p-10 border-0 bg-light w-full">
                            <div className="flex items-center gap-10 mb-10">
                                {/* <div className="">
                                    <div>
                                        <div className="w-40">
                                            <img
                                                src={selectedFile ? URL.createObjectURL(selectedFile) : base64Image}
                                                alt="User profile"
                                                className="rounded-full h-40 w-57 mt-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <label htmlFor="fileInput" className="p-2 cursor-pointer">
                                            <input
                                                type="file"
                                                name="profile_img"
                                                id="fileInput"
                                                accept="image/*"
                                                onChange={handleFileChanged}
                                                style={{ display: "none" }}
                                            />
                                            <span className="text-dark">
                                                <Camera />
                                            </span>
                                        </label>
                                    </div>
                                    <input name="user_id" id="user_id" type="hidden" value={UserLogIn[0].id} />
                                </div> */}
                                <div className="">
                                    <div className="border-0">
                                        <h1 className="block text-dark text-[2.5rem] font-semibold text-wrap gap-2">
                                            <span>{userLogIn.first_name}</span>
                                            <span className="ml-2">{userLogIn.last_name}</span> {/* Add margin-left */}
                                        </h1>

                                        <p className="font-semibold flex items-center text-[16px] text-dark focus:outline-none gap-2">
                                            {userLogIn.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        {!showResetPassword ? (
                            <>
                                <div for="last_name" className=" bg-light shadow-md border-b border flex justify-center  rounded-lg  text-nowrap  ">
                                    <a className="p-2 text-[1.125rem] text-dark font-medium capitalize">Password</a>
                                </div>

                                <div className="flex justify-center">
                                    <div
                                        onClick={handleChange}
                                        class="mt-4 md:w-7/12 bg-accent1 text-light py-2 px-4 w-full rounded-md mb-2 transform flex justify-center text-nowrap items-center cursor-pointer"
                                    >
                                        <Plus className="h-4" />
                                        Update Password Here
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div for="last_name" className=" bg-accent1  shadow-md border-b border flex justify-center  rounded-lg  text-nowrap  ">
                                <a className="p-2 text-[1.125rem] text-light  font-medium capitalize">Update Password</a>
                            </div>
                        )}
                        {showResetPassword ? (
                            <>
                                <form action="/api/updatePassword" method="POST">
                                    <div className=" w-full  bg-light shadow-md border-b border rounded-lg  flex justify-center mt-10 mb-5">
                                        <div className="  border-0">
                                            <div className="w-full border-0  mt-5 mb-5 px-4">
                                                <div className="mb-4">
                                                    <input
                                                        name="user_id"
                                                        id="user_id"
                                                        type="hidden"
                                                        placeholder="ID"
                                                        value={userLogIn.id}
                                                    />
                                                </div>
                                                <div className="flex items-center relative mb-2">
                                                    <input
                                                        type="password"
                                                        id="current_password"
                                                        name="current_password"
                                                        placeholder="Current Password"
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-normal focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        required
                                                    />
                                                    <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                        <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Current" />
                                                        <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center relative mb-2">
                                                    <input
                                                        type="password"
                                                        id="new_password"
                                                        name="new_password"
                                                        placeholder="New Password"
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-normal focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        required
                                                    />
                                                    <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                        <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="New" />
                                                        <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center relative mb-2">
                                                    <input
                                                        type="password"
                                                        id="retype_new_password"
                                                        name="retype_new_password"
                                                        placeholder="Re-type New Password"
                                                        className="bg-light border-b p-2 w-full h-10 pl-10 font-normal focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                        required
                                                    />
                                                    <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                        <Fingerprint className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Re-Type" />
                                                        <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex gap-2 items-center justify-end">
                                        <button className="">
                                            <span
                                                className=" border-0 py-1  px-4 text-l font-medium bg-accent1 text-light rounded-md shadow-md flex items-center"
                                                type="submit"
                                            >
                                                Save
                                            </span>
                                        </button>
                                        <button
                                            onClick={handleBackClick}
                                            className="border-accent1 text-accent1 border font-medium py-1 px-4 rounded-md shadow-md"
                                        >
                                            Back
                                        </button>
                                    </div>
                                </form>
                            </>
                        ) : (
                            <div className=" w-full  bg-light shadow-md border-b border rounded-lg flex justify-center mt-10 mb-5">
                                <div className="  border-0 w-full p-4">
                                    <div className="w-full border-0  mt-5 px-4">
                                        <div className="mb-4">
                                            <input name="id" id="id" type="hidden" placeholder="ID" value={userLogIn.id} />
                                        </div>
                                        <div className="flex  items-center relative">
                                            <input
                                                type="text"
                                                id="first_name"
                                                name="first_name"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.first_name}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <IdCard className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="first_name" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                id="last_name"
                                                name="last_name"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.last_name}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative">
                                            <select
                                                id="gender"
                                                name="gender"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.gender}
                                                onChange={handleInputChange}
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Gender" />
                                                <div className="md:h-[25px] md:border-r flex items-center border-dark justify-center"></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative">
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <CurrentLocation className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Email" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                id="phone_num"
                                                name="phone_num"
                                                className="bg-light border-b  p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.phone_num}
                                                onChange={handleInputChange}
                                            />

                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <CurrentLocation className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Location" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                id="permanent_address"
                                                name="permanent_address"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.permanent_address}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                id="username"
                                                name="username"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </MyProfileModalView>
        </>
    );
};

export default MyProfile;