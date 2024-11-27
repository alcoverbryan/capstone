import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import crypto from "crypto";
import corsMiddleware from "../../../lib/cors/cors_middleware";
import Cors from "cors";

const cors = corsMiddleware(
    Cors({
        methods: ["POST"],
    })
);

export default async function handler(req, res) {
    await cors(req, res);

    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        await handleUpdateRequest(db_conn, req, res);
        console.log(req.body);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleUpdateRequest(db_conn, req, res) {
    try {
        const { current_password, new_password, retype_new_password, user_id } = req.body;

        if (!new_password || !retype_new_password || !current_password) {
            res.status(400).json({ message: "Please provide all required fields." });
            return;
        }

        if (new_password !== retype_new_password) {
            res.status(400).json({ message: "New password and retype new password do not match." });
            return;
        }

        const user = await db_conn.getRegisterById(user_id);

        const passwordMatch = await comparePasswords(current_password, user.password);
        if (!passwordMatch) {
            res.status(400).json({ message: "Current password is incorrect." });
            return;
        }

        const hashedNewPassword = hashPassword(new_password);
        const pendingChangeId = await db_conn.pendingPasswordChanges(user_id, hashedNewPassword);

        if (pendingChangeId > 0) {
            notifyAdmin(user_id);
            res.redirect(`/Users/${user_id}`);
        } else {
            res.status(500).json({ message: "Failed to create pending password change." });
        }
    } catch (error) {
        console.error("Error updating password:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

async function comparePasswords(plainPassword, hashedPassword) {
    if (/^[a-f0-9]{32}$/.test(hashedPassword)) {
        // MD5 hash
        const hashedInput = crypto.createHash("md5").update(plainPassword).digest("hex");
        return hashedInput === hashedPassword;
    } else if (/^[a-f0-9]{64}$/.test(hashedPassword)) {
        // SHA-256 hash
        const hashedInput = hashPassword(plainPassword);
        return hashedInput === hashedPassword;
    } else {
        console.log("Unknown hash format:", hashedPassword);
        return false;
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