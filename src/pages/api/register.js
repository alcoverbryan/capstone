import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import crypto from "crypto";
import nodemailer from "nodemailer";

// Temporary storage for OTPs and user data (consider using a database for persistence in production)
let tempOtpStorage = {};
let tempUserDataStorage = {};

export default async function handler(req, res) {
    try {
        const db_conn = new DBManager(DB_CONF.PATH);
        await db_conn.init();

        if (req.method === "POST") {
            if (req.body.otp) {
                // If OTP is provided, handle OTP verification
                await handleOTPVerification(db_conn, req, res);
            } else {
                // If OTP is not provided, handle user registration request
                await handleCreateUserRequest(db_conn, req, res);
            }
        } else {
            res.status(200).json({ name: "Test" });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
}

// Handle user registration and OTP sending
async function handleCreateUserRequest(db_conn, req, res) {
    try {
        const { email, password, first_name, last_name, gender, permanent_address, username, phone_num, branch_id } = req.body;

        // Store the user data temporarily
        tempUserDataStorage[email] = { first_name, last_name, gender, permanent_address, email, username, phone_num, branch_id, password };

        // Generate OTP
        const otp = generateOTP();
        const expirationTime = Date.now() + 600000;  // OTP expires in 10 minutes

        // Store OTP temporarily with expiration time
        tempOtpStorage[email] = { otp, expirationTime };

        // Log the generated OTP (for debugging purposes)
        console.log("Generated OTP for", email, ":", otp);

        // Send OTP email
        await sendOTPEmail(email, otp);

        // Respond to the user
        res.status(200).json({ message: "OTP sent to email. Please verify." });

    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleOTPVerification(db_conn, req, res) {
    try {
        const { email, otp } = req.body;

        console.log('Request Body for OTP Verification:', req.body);

        if (tempOtpStorage[email]) {
            const storedOtpData = tempOtpStorage[email];

            console.log("Stored OTP for", email, ":", storedOtpData.otp);  
            console.log("Entered OTP by user:", otp); 

            const trimmedOtp = otp.trim();
            if (Date.now() > storedOtpData.expirationTime) {
                console.log('OTP expired for', email);
                delete tempOtpStorage[email];
                return res.status(400).json({ error: "OTP expired. Please request a new one." });
            }

            if (storedOtpData.otp === trimmedOtp) {
                console.log("OTP matched. Proceeding with registration...");

                const { first_name, last_name, gender, permanent_address, username, phone_num, branch_id, password } = tempUserDataStorage[email];

                const hashedPassword = hashPassword(password);

                let position;
                const existingUsers = await db_conn.getRegister();
                if (existingUsers.length === 0) {
                    position = "Admin";
                } else {
                    position = "User";
                }

                await db_conn.register(
                    first_name,
                    last_name,
                    gender,
                    permanent_address,
                    email,
                    hashedPassword,
                    username,
                    phone_num,
                    position,
                    branch_id,
                    otp,
                );

                delete tempOtpStorage[email];
                delete tempUserDataStorage[email];

                res.status(200).json({ message: "User registered successfully." });

            } else {
                console.error("Invalid OTP entered:", otp);  
                res.status(400).json({ error: "Invalid OTP. Please try again." });
            }
        } else {
            console.error("No OTP found for email:", email);  
            res.status(400).json({ error: "OTP not found. Please request a new one." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        res.status(500).send("Internal Server Error");
    }
}

function hashPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}

function generateOTP() {
    return crypto.randomBytes(3).toString('hex'); 
}

async function sendOTPEmail(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "bryanalcover04@gmail.com", 
            pass: "lyye jsnb rjdh zcur",
        },
    });

    try {
        let info = await transporter.sendMail({
            from: {
                address: "donotreply@yourdomain.com",
                name: "Your App Name",
            },
            to: email,
            subject: "Your OTP for Registration",
            text: `Your OTP for registration is: ${otp}`,
        });
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
