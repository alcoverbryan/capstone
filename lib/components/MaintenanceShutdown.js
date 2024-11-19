import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function MaintenanceShutdown({ }) {
    // const [mode, setMode] = useState(displaySystemStatus[0]?.mode || "Disable");

    // useEffect(() => {
    //     if (displaySystemStatus[0]?.mode) {
    //         setMode(displaySystemStatus[0].mode);
    //     }
    // }, [displaySystemStatus]);

    // const handleSave = (e) => {
    //     e.preventDefault();
    //     if (mode === "Disable") {
    //         Swal.fire({
    //             title: "System Shutdown",
    //             text: "The system will now enter maintenance mode and become unavailable.",
    //             icon: "warning",
    //             showCancelButton: true,
    //             confirmButtonText: 'Yes, shut down!',
    //             cancelButtonText: 'No, keep it running',
    //             dangerMode: true,
    //             allowOutsideClick: false
    //         }).then((result) => {
    //             if (result.isConfirmed) {
    //                 fetch('/api/maintenanceMode', {
    //                     method: 'POST',
    //                     headers: {
    //                         'Content-Type': 'application/json'
    //                     },
    //                     body: JSON.stringify({ mode: 'Enable' })
    //                 }).then(response => {
    //                     if (response.ok) {
    //                         Swal.fire({
    //                             title: "System Unavailable",
    //                             text: "The system is now in maintenance mode.",
    //                             icon: "success",
    //                             allowOutsideClick: false
    //                         });
    //                     } else {
    //                         Swal.fire({
    //                             title: "Error",
    //                             text: "Failed to enter maintenance mode.",
    //                             icon: "error",
    //                             allowOutsideClick: false
    //                         });
    //                     }
    //                 });
    //             } else {
    //                 Swal.fire({
    //                     title: "Cancelled",
    //                     text: "The system remains available.",
    //                     icon: "info",
    //                     allowOutsideClick: false
    //                 });
    //             }
    //         });
    //     } else {
    //         fetch('/api/maintenanceMode', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ mode: 'Enable' })
    //         }).then(response => {
    //             if (response.ok) {
    //                 Swal.fire({
    //                     title: "Maintenance Mode Disabled",
    //                     text: "The system is now available.",
    //                     icon: "success",
    //                     allowOutsideClick: false
    //                 });
    //             } else {
    //                 Swal.fire({
    //                     title: "Error",
    //                     text: "Failed to disable maintenance mode.",
    //                     icon: "error",
    //                     allowOutsideClick: false
    //                 });
    //             }
    //         });
    //     }
    // };

    return (
        <form className="mt-10 p-6 flex flex-col items-center justify-center">
            <div className="border lg:w-9/12 bg-white shadow-lg rounded-lg p-10">
                <h1 className="text-2xl font-bold mb-10 text-center text-dark">Maintenance Mode</h1>
                <h2 className="text-lg mb-4 text-center text-gray-700 font-[500]">Set Device Management System to Maintenance Mode:</h2>
                <div className="flex flex-col items-center">
                    <select
                        // value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none lg:w-[300px] mb-4"
                    >
                        <option value="Enable">Enable</option>
                        <option value="Disable">Disable</option>
                    </select>
                </div>
            </div>
            <div className="lg:w-9/12 w-full flex justify-end">
                <button type="submit" className="mt-2 py-2 bg-accent1 text-white rounded-lg lg:w-[100px] w-full focus:outline-none">
                    Save
                </button>
            </div>
        </form>
    );
}