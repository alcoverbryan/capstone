import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useState } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook

export default function AddBranchModal({ userLogIn, handleFuelPricesSave }) {

  const [formData, setFormData] = useState({
    date: "",
    fuel_type: "",
    rsop: "",
    app_benross: "",
    petron_highway: "",
    caltex: "",
    total: "",
    rephil: "",
    shell_affinis: "",
  });

  const router = useRouter(); // Initialize the router

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/addFuelPrices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          user_id: userLogIn.id, // Add user ID to the request payload
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      alert("Are you sure you want to save this data?");
      handleFuelPricesSave(); 
      router.push(`/Users/${userLogIn.id}?view=fuel_prices`); // Corrected router push
    } catch (error) {
      console.error(error);
      alert("Failed to save fuel prices.");
    }
  };

  return (
    <Modal title="Fuel Prices" icon={<PlusCircle className="w-7 h-7" />}>
      <div className="flex justify-center">
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Form Fields */}
            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="date">
                Date
              </label>
              <input
                name="date"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <input type="hidden" id="user_id" name="user_id" required value={userLogIn.id} />

            <div className="mb-3">
                <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="fuel_type">
                    Fuel Type
                </label>
                <input
                    name="fuel_type"
                    className="w-full px-8 py-1 border-b-2 font-semibold text-gray-700 focus:outline-none focus:border-b-red-300 rounded-md"
                    id="fuel_type"
                    type="text"
                    value={formData.fuel_type}  
                    onChange={(e) => setFormData({ ...formData, fuel_type: e.target.value })}
                />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rsop">
                RSOP
              </label>
              <input
                name="rsop"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="rsop"
                type="number"
                required
                value={formData.rsop}
                onChange={(e) => setFormData({ ...formData, rsop: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="app_benross">
                App
              </label>
              <input
                name="app_benross"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="app_benross"
                type="number"
                required
                value={formData.app_benross}
                onChange={(e) => setFormData({ ...formData, app_benross: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="petron_highway">
                Petron Highway
              </label>
              <input
                name="petron_highway"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="petron_highway"
                type="number"
                required
                value={formData.petron_highway}
                onChange={(e) => setFormData({ ...formData, petron_highway: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="caltex">
                Caltex
              </label>
              <input
                name="caltex"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="caltex"
                type="number"
                required
                value={formData.caltex}
                onChange={(e) => setFormData({ ...formData, caltex: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="total">
                Total
              </label>
              <input
                name="total"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="total"
                type="number"
                required
                value={formData.total}
                onChange={(e) => setFormData({ ...formData, total: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="rephil">
                Rephil
              </label>
              <input
                name="rephil"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="rephil"
                type="number"
                required
                value={formData.rephil}
                onChange={(e) => setFormData({ ...formData, rephil: e.target.value })}
              />
            </div>

            <div className="mb-3">
              <label className="block text-gray-500 text-sm mb-1 text-start" htmlFor="shell_affinis">
                Shell Affinis
              </label>
              <input
                name="shell_affinis"
                className="w-full px-8 py-1 border-b-2 font-semibold focus:outline-none focus:border-b-red-300 rounded-md"
                id="shell_affinis"
                type="number"
                required
                value={formData.shell_affinis}
                onChange={(e) => setFormData({ ...formData, shell_affinis: e.target.value })}
              />
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
