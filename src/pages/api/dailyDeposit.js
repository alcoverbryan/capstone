import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
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
        await handlePostRequest(db_conn, req, res);
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}

async function handlePostRequest(db_conn, req, res) {
    try {
        const deposits = req.body.deposits;

        if (!Array.isArray(deposits) || deposits.length === 0) {
            return res.status(400).json({ error: "Invalid or empty deposits array" });
        }

        for (const deposit of deposits) {
            await db_conn.addDailyDeposit(
                deposit.user_id,
                deposit.dateDeposited,
                deposit.shiftDate,
                deposit.source,
                deposit.cashier,
                deposit.type,
                deposit.bankDepositedTo,
                deposit.subtotal
            );
        }

        res.status(200).json({ message: "Data saved successfully", count: deposits.length });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
