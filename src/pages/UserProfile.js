import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavbarMain from '../../lib/components/navbars/NavbarMain';

export default function Profile() {
    const router = useRouter();
    const [userLogIn, setUserLogIn] = useState(null);
    const [editable, setEditable] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [backPath, setBackPath] = useState(""); // Store the back path

    useEffect(() => {
        // Check if user and back path are in the query
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

    const handleChange = (e) => {
        setEditedData({
            ...editedData,
            [e.target.name]: e.target.value,
        });
    };

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
            router.push(backPath); // Navigate back to the previous path
        } else {
            console.warn("No back path provided.");
        }
    };

    return (
        <div className="block">
            <div className="max-w-full h-full mx-auto p-6 mt-6">
                <div className="mt-6 p-6 bg-yellow-300 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold text-center">User Profile</h1>

                    {/* Profile Image */}
                    <div className="flex justify-center mt-4">
                        <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white shadow-lg">
                            <img
                                src="/path/to/profile-image.jpg" // Replace with your image path
                                alt="User Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Horizontal Line Below Profile Image */}
                    <div className="flex justify-center mt-4">
                        <hr className="border-t-2 border-gray-200 w-11/12" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={editedData.full_name}
                                onChange={handleChange}
                                disabled={!editable}
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Phone</label>
                            <input
                                type="text"
                                name="phone"
                                value={editedData.phone}
                                onChange={handleChange}
                                disabled={!editable}
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={editedData.email}
                                onChange={handleChange}
                                disabled={!editable}
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Position</label>
                            <input
                                type="text"
                                name="position"
                                value={editedData.position}
                                disabled
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={editedData.username}
                                onChange={handleChange}
                                disabled={!editable}
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Branch</label>
                            <input
                                type="text"
                                name="branch"
                                value={editedData.branch}
                                disabled
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={editedData.address}
                                onChange={handleChange}
                                disabled={!editable}
                                className="mt-2 p-2 border rounded w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-center gap-7">
                        <button
                            onClick={handleEditToggle}
                            className={`px-4 py-2 rounded ${editable ? 'bg-gray-200 text-black' : 'bg-red-500 text-white'}`}
                        >
                            {editable ? 'Cancel Edit' : 'Edit Profile'}
                        </button>

                        {editable && (
                            <button
                                onClick={handleSave}
                                className={`px-4 py-2 rounded ${hasChanges() ? 'bg-red-500 text-white' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
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
                </div>
            </div>
        </div>
    );
}
