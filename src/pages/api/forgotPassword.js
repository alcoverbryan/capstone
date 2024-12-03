import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import crypto from "crypto";
import corsMiddleware from "../../../lib/cors/cors_middleware";
import Cors from "cors";

const cors = corsMiddleware(
    Cors({
        methods: ["POST"]
    })
);

export default async function handler(req, res) {
    await cors(req, res);
    
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        await handleUpdateRequest(db_conn, req, res);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleUpdateRequest(db_conn, req, res) {
    try {
        const { new_password, retype_new_password } = req.body;

        if (!new_password || !retype_new_password) {
            res.status(400).json({ message: "Please provide the new password." });
            return;
        }

        if (new_password !== retype_new_password) {
            res.status(400).json({ message: "New password and retype new password do not match." });
            return;
        }
        const hashedPassword = hashPassword(new_password);
        const userId = req.body.register_id;

        const pendingChangeId = await db_conn.pendingPasswordChanges(userId, hashedPassword);
        
        if (pendingChangeId > 0) {
            notifyAdmin(userId);
            res.redirect("/Account/Login");
        } else {
            res.status(500).json({ message: "Failed to create pending password change." });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

function hashPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}

function notifyAdmin(userId) {
    console.log(`Admin notified for password change request for user ID: ${userId}`);
}