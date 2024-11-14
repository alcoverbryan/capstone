import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
import crypto from "crypto";

export default async function handler(req, res) {
    try {
        const db_conn = new DBManager(DB_CONF.PATH);
        await db_conn.init();

        if (req.method === "POST") {
            await handleLoginRequest(db_conn, req, res);
        } else {
            res.status(405).send("Method Not Allowed");
        }
    } catch (error) {
        console.error("Error initializing database:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleLoginRequest(db_conn, req, res) {
    try {
        const { username, password } = req.body;
        const user = await db_conn.users.findOne({ where: { username: username } });

        if (!user) {
            // Username does not exist
            res.status(401).json({ error: "Username does not exist" });
        } else {
            // Username exists, check password
            const passwordMatch = comparePasswords(password, user.password);
            if (passwordMatch) {
                res.status(200).json({ userId: user.id });
            } else {
                // Password does not match
                res.status(401).json({ error: "Incorrect password" });
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

function comparePasswords(plainPassword, hashedPassword) {
    const hashedInput = encryptPassword(plainPassword);
    return hashedInput === hashedPassword;
}

function encryptPassword(password) {
    const hash = crypto.createHash("sha256");
    hash.update(password);
    return hash.digest("hex");
}
