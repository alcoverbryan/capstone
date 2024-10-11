import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res, query) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        handlePostRequest(db_conn, req, res, query);
        console.log(req.body)
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handlePostRequest(db_conn, req, res, query) {
    try {
        await db_conn.addDailySales(
            req.body.user_id,
            req.body.date,
            req.body.shift,
            req.body.credit,
            req.body.charge,
            req.body.grab,
            req.body.coins,
            req.body.bills,
            req.body.checks,
            req.body.card,
            req.body.gcash,
            req.body.vouchers,
            req.body.subtotal,
        );


        res.redirect(`/Users/${req.body.user_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}