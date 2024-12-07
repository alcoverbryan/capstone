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
        const { user_id, date, rows } = req.body;

        // Validate the data
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ error: "No rows provided" });
        }

        // Iterate over rows and save them to the database
        for (const row of rows) {
            const {
                fuel_type,
                rsop,
                app_benross,
                petron_highway,
                caltex,
                total,
                rephil,
                shell_affinis,
            } = row;

            await db_conn.addFuelPrices(
                user_id,
                fuel_type,
                rsop,
                app_benross,
                petron_highway,
                caltex,
                total,
                rephil,
                shell_affinis,
                date
            );
        }

        // Respond with success message
        res.status(200).json({ message: "Fuel prices saved successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
 