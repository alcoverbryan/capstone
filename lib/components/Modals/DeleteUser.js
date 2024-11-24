import { useState } from "react";
import Modal from "../Modal";
import { Trash } from "../HeroIcons";
import { useRouter } from "next/router"; // Import useRouter

export default function DeleteUser({ selectedMember, userLogIn }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter(); // Initialize the router

    const handleDelete = async () => {
        try {
            setIsDeleting(true);

            // Send DELETE request to API
            const response = await fetch('/api/deleteUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_login_id: userLogIn.id, id: selectedMember.id }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Successfully deleted ${selectedMember.first_name} ${selectedMember.last_name}`);
                router.push(`/Users/${userLogIn.id}`); // Redirect to user list page
            } else {
                alert(`Failed to delete ${selectedMember.first_name} ${selectedMember.last_name}`);
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("An error occurred while trying to delete the user.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Modal title="Delete User" icon={<Trash className="w-7 h-7" />}>
            <div className="flex flex-col gap-6 mt-10">
                <p className="text-gray-700 text-center text-xl">
                    Are you sure you want to delete <strong>{selectedMember.first_name} {selectedMember.last_name}</strong>?
                </p>

                {/* Delete Confirmation Form */}
                <form onSubmit={(e) => e.preventDefault()} className="w-full">
                    <div className="flex justify-center mt-4">
                        <button
                            type="submit"
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className={`px-8 py-3 text-lg font-semibold text-white bg-red-500 rounded-md ${isDeleting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'}`}
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
