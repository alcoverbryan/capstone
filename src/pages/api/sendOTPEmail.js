import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import nodemailer from "nodemailer";
const { MailtrapTransport } = require("mailtrap");
import crypto from "crypto";

export default async function handler(req, res, query) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        await handleFindRequest(db_conn, req, res, query);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleFindRequest(db_conn, req, res, query) {
    try {
        const { email } = req.body;

        if (!email) {
            res.redirect("/Account/User_error");
            return;
        }
        const user = await db_conn.users.findOne({ where: { email: email } });
        if (user) {
            try {
                const otp = generateOTP();
                console.log("Generated OTP:", otp);
                
                await sendOTPEmail(user.email, otp);
                console.log("OTP email sent to:", user.email);
                
                await db_conn.users.update({ otp: otp }, { where: { email: email } });
                console.log("OTP updated in database for email:", email);
                
                res.redirect(`/OTP/${user.id}`);
            } catch (error) {
                console.error("Error in OTP process:", error);
                res.status(500).json({ message: "Internal server error." });
            }
        } else {
            console.log("User not found for email:", email);
            res.redirect("/Account/User_error");
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
}

function generateOTP() {
    return crypto.randomBytes(3).toString('hex');
}

async function sendOTPEmail(email, otp) {
    var transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "d8a9105e1cf771",
          pass: "80e3451ccc64e2"
        }
    });

    const sender = {
        address: "donotreply@yourdomain.com",
        name: "Mailtrap",
    };
    const recipients = [
        email,
    ];

    try {
        let info = await transporter.sendMail({
            from: sender,
            to: recipients,
            subject: "Your OTP for Password Reset",
            text: `Your OTP for password reset is: ${otp}`,
            headers: {
                'Date': new Date().toUTCString(),
            }
        });
        console.log('Email sent: ' + info);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}