import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavbarMain from '../../lib/components/navbars/NavbarMain';
import { Chevron_right } from "../../lib/components/HeroIcons";

export default function Profile() {
    const router = useRouter();
    const [userLogIn, setUserLogIn] = useState(null);
    const [editable, setEditable] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [backPath, setBackPath] = useState(""); // Store the back path

    useEffect(() => {
        if (router.query.user) {
            try {
                const parsedUser = JSON.parse(router.query.user);
                setUserLogIn(parsedUser);
                setEditedData(parsedUser);
            } catch (error) {
                console.error("Failed to parse user data:", error);
            }
        }

        if (router.query.back) {
            setBackPath(router.query.back); // Set the back path from the query
        }
    }, [router.query]);

    console.log(userLogIn)

    if (!userLogIn) {
        return <div>Loading user data...</div>;
    }

    const handleEditToggle = () => {
        setEditable((prev) => !prev);
        setEditedData({ ...userLogIn });
    };

    const handleSave = () => {
        if (window.confirm('Are you sure you want to save the changes?')) {
            console.log('Saved Data:', editedData);
            setEditable(false);
        }
    };

    const hasChanges = () => JSON.stringify(editedData) !== JSON.stringify(userLogIn);

    const navigateBack = () => {
        if (backPath) {
            router.push(backPath); 
        } else {
            console.warn("No back path provided.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Here you can validate or prepare your data if needed
        const formData = { ...editedData };

        try {
            // Assuming you have an API endpoint to handle profile updates
            const response = await fetch("/api/updateRegister", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Profile updated successfully:", result);
                setEditable(false); // Turn off editing after successful submission
            } else {
                console.error("Error updating profile:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-white overflow-hidden">
            {/* Scrollable container */}
            <div className="w-full max-w-5xl h-full overflow-y-auto p-6">
                <div className="mb-10 mt-6 bg-white border-b border-r shadow-md rounded-md p-4 text-l font-medium flex items-center space-x-2">
                    <span className="text-l font-medium text-[#566a7f]">Account Setting</span>
                    <Chevron_right className="h-4 w-4 text-gray-500" />
                    <span className="text-l font-medium">Account</span>
                </div>
                <div className="w-full bg-yellow-500 rounded-xl shadow-md p-6">
                    <div className="grid grid-cols-[2fr,4fr] gap-5">
                        {/* Left Column */}
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <div className="p-3 text-[1.125rem] text-[#566a7f] font-medium">Profile Details</div>
                            <div className="w-56 h-56 mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                                <img src="/../image/avatar.png" alt="Profile" className="rounded-full w-[250px]" />
                            </div>
                            <h2 className="text-xl font-semibold">{userLogIn.name}</h2>
                            <p className="text-gray-500">{userLogIn.position}</p>
                        </div>

                        {/* Right Column */}
                        <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-lg shadow">
                            <div className="bg-white shadow-md border-b flex justify-center rounded-lg text-nowrap mb-5">
                                <span className="p-4 text-[1.125rem] text-[#566a7f] font-medium capitalize">
                                    Update Your Profile Here
                                </span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" id="user_id" name="user_id" value={userLogIn.id} />
                                <div>
                                    <label className="block text-sm font-semibold">Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        value={editable ? editedData.full_name : userLogIn.full_name}
                                        onChange={handleChange}
                                        disabled={!editable}
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={editable ? editedData.email : userLogIn.email}
                                        onChange={handleChange}
                                        disabled={!editable}
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Phone</label>
                                    <div className="flex items-center">
                                        <span className="bg-gray-200 mr-0.5 text-[#4F5153] px-2 py-2 rounded-l-lg">+63</span>
                                        <input
                                            type="text"
                                            name="phone_num"
                                            value={editable ? (editedData.phone_num || "").replace(/^\+63/, "") : (userLogIn.phone_num || "").replace(/^\+63/, "")}
                                            onChange={handleChange}
                                            disabled={!editable}
                                            className="w-full p-2 border-b bg-gray-200 border rounded-r-lg outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Address</label>
                                    <input
                                        type="text"
                                        name="permanent_address"
                                        value={editable ? editedData.permanent_address : userLogIn.permanent_address}
                                        onChange={handleChange}
                                        disabled={!editable}
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editable ? editedData.username : userLogIn.username}
                                        onChange={handleChange}
                                        disabled={!editable}
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <input
                                        type="hidden"
                                        name="position"
                                        value={editable ? editedData.position : userLogIn.position}
                                        onChange={handleChange}
                                        disabled={!editable}
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold">Branch</label>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={userLogIn.branch}
                                        disabled
                                        className="mt-2 p-2 border rounded w-full bg-gray-200"
                                    />
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        onClick={handleEditToggle}
                                        className={`px-4 py-2 rounded ${
                                            editable ? "bg-gray-200 text-black" : "bg-red-500 text-white"
                                        }`}
                                    >
                                        {editable ? "Cancel Edit" : "Edit Profile"}
                                    </button>
                                    {editable && (
                                        <button
                                            type="submit"
                                            className={`px-4 py-2 rounded ${
                                                hasChanges()
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                                            }`}
                                            disabled={!hasChanges()}
                                        >
                                            Save Changes
                                        </button>
                                    )}
                                    <button
                                        onClick={navigateBack}
                                        className="px-4 py-2 rounded bg-yellow-500 text-white"
                                    >
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
