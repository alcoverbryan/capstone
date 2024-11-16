import { useState } from "react";
import { useRouter } from "next/router";

export default function Settings() {
    const [activeSetting, setActiveSetting] = useState("resetPassword");
    const router = useRouter();

    const renderSetting = () => {
        switch (activeSetting) {
            case "resetPassword":
                return (
                    <div className="p-4 bg-gray-100 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">New Password</label>
                                <input
                                    type="password"
                                    className="mt-2 p-2 border rounded w-full"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold">Confirm Password</label>
                                <input
                                    type="password"
                                    className="mt-2 p-2 border rounded w-full"
                                    placeholder="Confirm new password"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                );
            case "maintenanceShutdown":
                return (
                    <div className="p-4 bg-gray-100 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Maintenance Shutdown</h2>
                        <p className="mb-4">
                            Perform a system shutdown for maintenance. Ensure all users are notified beforehand.
                        </p>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                            onClick={() => alert("System shutting down for maintenance!")}
                        >
                            Shutdown Now
                        </button>
                    </div>
                );
            default:
                return (
                    <div className="p-4 bg-gray-100 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Settings</h2>
                        <p>Select a setting to configure.</p>
                    </div>
                );
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Settings</h1>
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveSetting("resetPassword")}
                    className={`px-4 py-2 rounded ${
                        activeSetting === "resetPassword"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                    }`}
                >
                    Reset Password
                </button>
                <button
                    onClick={() => setActiveSetting("maintenanceShutdown")}
                    className={`px-4 py-2 rounded ${
                        activeSetting === "maintenanceShutdown"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-black"
                    }`}
                >
                    Maintenance Shutdown
                </button>
            </div>
            {renderSetting()}
            <div className="mt-6">
                <button
                    onClick={() => router.back()} // Navigate back to the previous page
                    className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                    Back
                </button>
            </div>
        </div>
    );
}
