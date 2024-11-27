import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        await handlePostRequest(db_conn, req, res);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handlePostRequest(db_conn, req, res) {
    try {
        const { user_id, rows } = req.body; // Destructure rows and user_id

        if (!Array.isArray(rows) || !user_id) {
            return res.status(400).json({ message: "Invalid input" });
        }

        // Loop through rows and insert each one
        for (const row of rows) {
            await db_conn.addChargeAccounts(
                user_id,
                row.date,
                row.soa,
                row.cust_name,
                row.volume,
                row.ammount,
                row.terms,
                row.bank || null, // Optional fields default to null
                row.check_no || null,
                row.ammount_paid,
                row.ewt || null,
                row.cr_num || null,
                row.date_collected || null
            );
        }

        res.status(200).json({ message: "Charge accounts added successfully" });
    } catch (error) {
        console.error("Error in addChargeAccounts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
