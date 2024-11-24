import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res) {
    let db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        handleDeleteRequest(db_conn, req, res);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleDeleteRequest(db_conn, req, res) {
    const user_login_id = req.body.user_login_id;
    const pending_id = req.body.id;

    try {
        await db_conn.deletePendingUser(pending_id);
        res.redirect(`/Users/${user_login_id}`);
    } catch (error) {
        console.error("Error deleting project:", error.message);
        res.status(500).json({ error: "Failed to delete project." });
    }
}