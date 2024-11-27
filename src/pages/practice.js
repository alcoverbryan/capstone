
Conversation opened. 1 read message.

Skip to content
Using University of San Carlos Mail with screen readers

4 of 818
hello
External
Inbox

Bryan Alcover - SD21 Intern <KDDP.SD21Intern2@ddp.kyocera.com>
Attachments
Nov 21, 2024, 8:00 PM (4 days ago)
to me

 

 3 Attachments
  •  Scanned by Gmail
import React, { useEffect, useState } from "react";
import {
    Camera,
    Chevron_right,
    CurrentLocation,
    EmailIcon,
    Fingerprint,
    IdCard,
    Plus,
    PlusCircle,
    QuestionMarkCircle,
    UserCircle,
} from "../../lib/components/views/HeroIcons";
import MyProfileModalView from "../../lib/components/MyProfileModalView";

const MyProfile = ({ UserLogIn }) => {
    const [base64Image, setBase64Image] = useState(Buffer.from(UserLogIn[0].profile_img.data).toString());
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const ldap = event.target.ldap.value;
        const full_name = event.target.full_name.value;
        const email = event.target.email.value;
        const location = event.target.location.value;
        const userId = document.getElementById("user_id").value;
        const currentProfileImg = base64Image;

        if (selectedFile) {
            if (selectedFile.size > 1 * 1024 * 1024) {
                alert("File size exceeds 1MB limit. Please choose a smaller file.");
                setIsLoading(false);
                return;
            }

            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result;
                await submitForm(base64String, ldap, full_name, email, location, userId, selectedFile.name);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            await submitForm(currentProfileImg, ldap, full_name, email, location, userId, null);
        }
    };

    const submitForm = async (base64String, ldap, full_name, email, location, userId, fileName) => {
        const response = await fetch("/api/processUpdatingUserProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                profile_img: base64String,
                file_name: fileName,
                ldap,
                full_name,
                email,
                location,
                user_id: userId,
            }),
        });

        if (response.ok) {
            window.location.href = `/dashboard/${userId}`;
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
        ldap: UserLogIn[0].ldap,
        full_name: UserLogIn[0].full_name,
        email: UserLogIn[0].email,
        location: UserLogIn[0].location,
        profile_img: UserLogIn[0].profile_img,
    });

    useEffect(() => {
        const isChanged =
            formData.ldap !== UserLogIn[0].ldap ||
            formData.full_name !== UserLogIn[0].full_name ||
            formData.email !== UserLogIn[0].email ||
            formData.location !== UserLogIn[0].location ||
            formData.profile_img !== UserLogIn[0].profile_img;
        setHasChanges(isChanged);
    }, [formData, UserLogIn]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChanged = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 1 * 1024 * 1024) {
                alert("File size exceeds 1MB limit. Please choose a smaller file.");
                setSelectedFile(null);
            } else {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prevData) => ({
                        ...prevData,
                        profile_img: reader.result,
                    }));
                };
                reader.readAsDataURL(file);
            }
        }
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
                                <div className="">
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
                                </div>
                                <div className="">
                                    <div className="border-0">
                                        <h1 className="block text-dark text-[2.5rem] font-semibold text-wrap">{UserLogIn[0].full_name}</h1>
                                        <p className="font-semibold flex items-center text-[16px] text-dark focus:outline-none gap-2">
                                            {UserLogIn[0].title}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:w-1/2">
                        {!showResetPassword ? (
                            <>
                                <div for="full_name" className=" bg-light shadow-md border-b border flex justify-center  rounded-lg  text-nowrap  ">
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
                            <div for="full_name" className=" bg-accent1  shadow-md border-b border flex justify-center  rounded-lg  text-nowrap  ">
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
                                                        name="register_id"
                                                        id="register_id"
                                                        type="hidden"
                                                        placeholder="ID"
                                                        value={UserLogIn[0].id}
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
                                            <input name="id" id="id" type="hidden" placeholder="ID" value={UserLogIn.id} />
                                        </div>
                                        <div className="flex  items-center relative">
                                            <input
                                                type="text"
                                                id="ldap"
                                                name="ldap"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.ldap}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <IdCard className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="ldap" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                id="full_name"
                                                name="full_name"
                                                className="bg-light border-b p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.full_name}
                                                onChange={handleInputChange}
                                            />
                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <UserCircle className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Full Name" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
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
                                                <EmailIcon className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Email" />
                                                <div class="  md:h-[25px] md:border-r flex items-center border-dark justify-center "></div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative mb-7">
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                className="bg-light border-b  p-2 w-full h-10 pl-10 font-semibold focus:outline-none border-dark focus:border-accent1 focus:ring-accent1 shadow-sm px-4 rounded-md"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                            />

                                            <div className="absolute top-0 left-0 h-full flex items-center pr-2 gap-2">
                                                <CurrentLocation className="md:w-5 w-4 md:h-5 h-4 text-dark" tooltip="Location" />
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