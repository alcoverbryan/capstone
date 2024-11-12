import { useState } from "react";

export default function ConfirmOTP() {
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");  // Assume email is known or stored in client state

    const handleVerifyOtp = async () => {
        const response = await fetch("/api/verifyOtp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, otp }),
        });

        const result = await response.json();

        if (response.ok) {
            // Redirect to login on successful registration
            window.location.href = "/Account/Login";
        } else {
            console.error("OTP verification failed:", result.message);
        }
    };

    return (
        <div>
            <h1>Confirm OTP</h1>
            <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter your OTP"
            />
            <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
    );
}
