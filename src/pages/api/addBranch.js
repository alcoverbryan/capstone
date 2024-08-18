import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res, query) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        handlePostRequest(db_conn, req, res, query);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handlePostRequest(db_conn, req, res, query) {
    try {
        await db_conn.addBranch(
            req.body.user_id,
            req.body.branch_name,
            req.body.location,
        );


        res.redirect(`/Users/${req.body.user_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
