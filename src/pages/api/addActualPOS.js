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
        await db_conn.addActualPOS(
            req.body.user_id,
            req.body.date,
            req.body.time,
            req.body.reference_id,
            req.body.actualPOS,
            req.body.overShortage,
        );

        // Send a JSON response back
        res.status(200).json({
            message: "Are you sure you want to save this data?                          ",
            userId: req.body.user_id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
