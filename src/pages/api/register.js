import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import crypto from "crypto";

export default async function handler(req, res) {
    try {
        const db_conn = new DBManager(DB_CONF.PATH);
        await db_conn.init();

        if (req.method === "POST") {
            await handleCreateUserRequest(db_conn, req, res);
            
        } else {
            res.status(200).json({ name: "Test" });
        }
    } catch (error) {
        console.error("Error initializing database:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleCreateUserRequest(db_conn, req, res) {
    try {
        
        const hashedPassword = hashPassword(req.body.password);
        let position;
        const existingUsers = await db_conn.getRegister(); 

        if (existingUsers.length === 0) {
            position = "Admin";
        } else {
            position = "Cashier ";
        }

        await db_conn.register(req.body.profile_img, req.body.full_name, req.body.permanent_address, req.body.email, hashedPassword, req.body.username, req.body.phone_num, position, req.body.branch_id, req.body.otp);

        res.redirect("/Account/Login");
    } catch (error) {
        console.error("Error during user registration:", error);
        res.status(500).send("Internal Server Error");
    }
}


function hashPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}