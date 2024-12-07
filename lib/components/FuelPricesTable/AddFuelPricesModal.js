import { PlusCircle } from "../HeroIcons";
import Modal from "../Modal";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Import the useRouter hook

export default function AddFuelPricesModal({ userLogIn, handleFuelPricesSave }) {
  const [formData, setFormData] = useState({
    date: "",
    rows: [
      { fuel_type: "", rsop: "", app_benross: "", petron_highway: "", caltex: "", total: "", rephil: "", shell_affinis: "" }
    ] // Initial row setup
  });

  const router = useRouter(); // Initialize the router

  // Set the default date to today's date when the component mounts
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setFormData((prevState) => ({
      ...prevState,
      date: currentDate,
    }));
  }, []);

  const handleAddRow = () => {
    setFormData((prevState) => ({
      ...prevState,
      rows: [
        ...prevState.rows,
        { fuel_type: "", rsop: "", app_benross: "", petron_highway: "", caltex: "", total: "", rephil: "", shell_affinis: "" }
      ]
    }));
  };

  const handleRemoveRow = (index) => {
    setFormData((prevState) => ({
      ...prevState,
      rows: prevState.rows.filter((_, rowIndex) => rowIndex !== index) // Remove row at the specified index
    }));
  };

  const handleRowChange = (index, field, value) => {
    const updatedRows = [...formData.rows];
    updatedRows[index][field] = value;
    setFormData((prevState) => ({
      ...prevState,
      rows: updatedRows
    }));
  };

  const [saved, setSaved] = useState(false); // Add a new state

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { rows } = formData;
    
    // Log the form data to be sent for debugging
    const formDataToSend = rows.map((row) => ({
      user_id: userLogIn?.id,
      ...row,
    }));
  
    try {
      const response = await fetch("/api/addFuelPrices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userLogIn?.id,  // Send the user ID directly
          date: formData.date,     // Send the date directly
          rows: formData.rows      // Send the rows directly
        }),
      });
  
      if (response.ok) {
        alert("Daily deposits saved successfully!");
        
        // Set the saved state to trigger rerender
        setSaved(!saved);  // Toggle saved state
  
        // Reset the form after success
        setFormData({
          date: "",
          rows: [{ fuel_type: "", rsop: "", app_benross: "", petron_highway: "", caltex: "", total: "", rephil: "", shell_affinis: "" }]
        });
  
        handleFuelPricesSave();
      } else {
        const errorData = await response.json();
        alert(`Failed to save daily deposits: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      alert("Error occurred while saving daily deposits. Please try again later.");
      console.error("Error occurred while saving daily deposits:", error);
    }
  };  

  return (
    <Modal title="Fuel Prices" icon={<PlusCircle className="w-7 h-7" />}>
      <div className="flex justify-evenly max-w-full">
        <form className="w-full max-w-full" onSubmit={handleSubmit}>
            <table className="table-auto w-full text-center">
                <thead>
                    <tr className="">
                        <td className="border border-black px-1 py-1 bg-white text-black font-semibold">Date</td>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Fuel Type</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">RSOP</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Bennros Shell</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Petron Highway</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Caltex</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Total</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Rephil</th>
                        <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Shell Affinis</th>
                        {formData.rows.length > 1 && <th className="border border-black px-1 py-1 bg-white text-black font-semibold">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {formData.rows.map((row, index) => (
                        <tr key={index} className={`row-${index}`}>
                            <td className="border border-black">
                                <input
                                name="date"
                                className="w-full border-none focus:ring-0 focus: outline-none px-1 py-2"
                                id="date"
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="fuel_type"
                                className="w-56 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                id="fuel_type"
                                type="text"
                                value={row.fuel_type}
                                onChange={(e) => handleRowChange(index, 'fuel_type', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="rsop"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.rsop}
                                onChange={(e) => handleRowChange(index, 'rsop', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="app_benross"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.app_benross}
                                onChange={(e) => handleRowChange(index, 'app_benross', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="petron_highway"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.petron_highway}
                                onChange={(e) => handleRowChange(index, 'petron_highway', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="caltex"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.caltex}
                                onChange={(e) => handleRowChange(index, 'caltex', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="total"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.total}
                                onChange={(e) => handleRowChange(index, 'total', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="rephil"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-1 py-2"
                                type="number"
                                value={row.rephil}
                                onChange={(e) => handleRowChange(index, 'rephil', e.target.value)}
                                />
                            </td>
                            <td className="border border-black">
                                <input
                                name="shell_affinis"
                                className="w-24 border-none focus:ring-0 focus: outline-none px-2 py-2"
                                type="number"
                                value={row.shell_affinis}
                                onChange={(e) => handleRowChange(index, 'shell_affinis', e.target.value)}
                                />
                            </td>
                            <td className={`bg-white font-semibold ${formData.rows.length > 1 ? 'border border-black' : ''}`}>
                                {formData.rows.length > 1 && (
                                    <button
                                    type="button"
                                    className="text-red-500 w-full border-none focus:ring-0 focus:outline-none px-2"
                                    onClick={() => handleRemoveRow(index)}
                                    >
                                    Remove
                                    </button>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex items-center justify-center mt-5 mb-5">
                <button className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md" type="button" onClick={handleAddRow}>
                    Add Row
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-20 py-2 rounded-md ml-4" type="submit">
                Save
                </button>
            </div>
        </form>
      </div>
    </Modal>
  );
}
