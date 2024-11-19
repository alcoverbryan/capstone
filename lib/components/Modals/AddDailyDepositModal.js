
import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";

export default function AddDailyDepositModal({ userLogIn }) {
    // Automatically generate dates
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(e.target); // Collect form data

        // Log form data for debugging
        console.log(Object.fromEntries(formData));

        fetch('/api/addFuelPrices', {
            method: 'POST',
            body: formData,
        })
            .then((response) => {
                if (response.ok) {
                    console.log("Daily deposit added successfully");
                    // Optional: Close modal or refresh the table
                } else {
                    console.error("Failed to save daily deposit");
                }
            })
            .catch((error) => console.error("Error:", error));
    };

    return (
        <Modal title="Daily Deposit" icon={<PlusCircle className="w-7 h-7" />}>
            <div className="flex">
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="flex gap-0">
                        <div className="md:w-[350px]">
                            {/* Date Deposited */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="dateDeposited">
                                    Date Deposited
                                </label>
                                <input
                                    name="dateDeposited"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="dateDeposited"
                                    type="text"
                                    value={formattedDate}
                                    readOnly
                                />
                            </div>

                            {/* Shift Date */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shiftDate">
                                    Shift Date
                                </label>
                                <input
                                    name="shiftDate"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="shiftDate"
                                    type="text"
                                    value={formattedDate}
                                    readOnly
                                />
                            </div>

                            {/* Cashier */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="cashier">
                                    Cashier
                                </label>
                                <input
                                    name="cashier"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="cashier"
                                    type="text"
                                    value={userLogIn?.full_name || "Unknown Cashier"}
                                    readOnly
                                    required
                                />
                            </div>

                            {/* Type */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="type">
                                    Type
                                </label>
                                <input
                                    name="type"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="type"
                                    type="text"
                                    placeholder="Enter type"
                                    required
                                />
                            </div>

                            {/* Bank Deposited To */}
                            <div className="mb-3">
                                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="bankDepositedTo">
                                    Bank Deposited To
                                </label>
                                <input
                                    name="bankDepositedTo"
                                    className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                                    id="bankDepositedTo"
                                    type="text"
                                    placeholder="Enter bank name"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center mb-5">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-20 py-1 mt-4 rounded-md" type="submit">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}
