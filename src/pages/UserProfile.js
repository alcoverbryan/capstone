import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavbarMain from '../../lib/components/navbars/NavbarMain';
import { Chevron_right } from "../../lib/components/HeroIcons";

export default function Profile() {
    const router = useRouter();
    const [userLogIn, setUserLogIn] = useState(null);
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

    if (!userLogIn) {
        return <div>Loading user data...</div>;
    }

    const hasChanges = () => JSON.stringify(editedData) !== JSON.stringify(userLogIn);

    const navigateBack = () => {
        if (backPath) {
            router.push(backPath);
        } else {
            console.warn("No back path provided.");
            router.push('/'); // Optionally navigate to a default route
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
    
        if (!userLogIn || !userLogIn.id) {
            console.error("User data is missing or incomplete.");
            return;
        }
    
        const formData = { ...editedData, user_id: userLogIn.id }; // Ensure the user id is included in the request body
    
        try {
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
                router.push(`/Users/${userLogIn.id}`); 
            } else {
                console.error("Error updating profile:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100 overflow-hidden">
            <div className="w-full h-full overflow-y-auto p-6">
                <div className="mb-5 mt-1 bg-white border-b border-r shadow-md rounded-md p-4 text-l font-medium flex items-center space-x-2">
                    <span className="text-l font-medium text-[#566a7f]">Account Setting</span>
                    <Chevron_right className="h-4 w-4 text-gray-500" />
                    <span className="text-l font-medium">Account</span>
                </div>
                <div className="w-full rounded-xl shadow-md p-6">
                    <div className="grid grid-cols-[1fr,4fr] gap-5">
                        <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow">
                            <div className="p-3 text-[1.125rem] text-[#566a7f] font-medium">Profile Details</div>
                            <div className="w-56 h-56 mb-4 rounded-full bg-gray-300 flex items-center justify-center">
                                <img src="/../image/avatar.png" alt="Profile" className="rounded-full w-[250px]" />
                            </div>
                            <h2 className="text-xl font-semibold">{userLogIn.first_name} {userLogIn.last_name}</h2>

                            <p className="text-gray-500">{userLogIn.position}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 bg-white p-4 rounded-lg shadow">
                            <div className="bg-white shadow-md border-b flex justify-center rounded-lg text-nowrap mb-5">
                                <span className="p-4 text-[1.125rem] text-[#566a7f] font-medium capitalize">
                                    Update Your Profile Here
                                </span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <input type="hidden" id="user_id" name="user_id" value={userLogIn.id} />
                                        <div>
                                            <label className="block text-sm font-semibold">First Name</label>
                                            <input
                                                type="text"
                                                name="first_name"
                                                value={editedData.first_name || ""}
                                                onChange={handleChange}
                                                className="mt-2 p-2 border rounded w-full bg-gray-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold">Last Name</label>
                                            <input
                                                type="text"
                                                name="last_name"
                                                value={editedData.last_name || ""}
                                                onChange={handleChange}
                                                className="mt-2 p-2 border rounded w-full bg-gray-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold">Gender</label>
                                            <select
                                                name="gender"
                                                value={editedData.gender || ''}
                                                onChange={handleChange}
                                                className="mt-2 p-2 border rounded w-full bg-white"
                                            >
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>


                                        <div>
                                        <label className="block text-sm font-semibold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={editedData.email || ""}
                                            onChange={handleChange}
                                            className="mt-2 p-2 border rounded w-full bg-gray-200"
                                        />
                                    </div>
                                    </div>

                                    <div>
                                    <div>
                                        <label className="block text-sm font-semibold">Phone</label>
                                        <div className="flex items-center">
                                            <span className="bg-gray-200 mr-0.5 text-[#4F5153] px-2 py-2 rounded-l-lg">+63</span>
                                            <input
                                                type="text"
                                                name="phone_num"
                                                value={(editedData.phone_num || "").replace(/^\+63/, "")}
                                                onChange={handleChange}
                                                className="w-full p-2 border-b bg-gray-200 border rounded-r-lg outline-none"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold">Address</label>
                                            <input
                                                type="text"
                                                name="permanent_address"
                                                value={editedData.permanent_address || ""}
                                                onChange={handleChange}
                                                className="mt-2 p-2 border rounded w-full bg-gray-200"
                                            />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold">Username</label>
                                        <input
                                            type="text"
                                            name="username"
                                            value={editedData.username || ""}
                                            onChange={handleChange}
                                            className="mt-2 p-2 border rounded w-full bg-gray-200"
                                        />
                                    </div>
                                </div>

                                    {/* Hidden Fields */}
                                    <div>
                                        <input
                                            type="hidden"
                                            name="position"
                                            value={editedData.position || ""}
                                            onChange={handleChange}
                                            className="mt-2 p-2 border rounded w-full bg-gray-200"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="hidden"
                                            name="branch"
                                            value={userLogIn.branch}
                                            disabled
                                            className="mt-2 p-2 border rounded w-full bg-gray-200"
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between">
                                    <button
                                        type="submit"
                                        className={`px-4 py-2 rounded ${hasChanges() ? "bg-red-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
                                        disabled={!hasChanges()}
                                    >
                                        Save Changes
                                    </button>
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
}
