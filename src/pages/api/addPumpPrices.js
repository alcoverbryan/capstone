import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";
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
        await handlePostRequest(db_conn, req, res);
        console.log(req.body)
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handlePostRequest(db_conn, req, res) {
    try {
        const { user_id, pumpDay, pumpDate, rows } = req.body;

        if (!rows || !Array.isArray(rows)) {
            return res.status(400).json({ message: "Invalid data format." });
        }

        for (const row of rows) {
            await db_conn.addPumpPrices(
                user_id,
                pumpDay,
                pumpDate,
                row.pumpVpnPlus || 0,
                row.pumpFsg || 0,
                row.pumpVpnR || 0,
                row.pumpFsd || 0,
                row.pumpVpnD || 0,
            );
        }

        res.status(200).json({ message: "Data saved successfully.", userId: user_id });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


