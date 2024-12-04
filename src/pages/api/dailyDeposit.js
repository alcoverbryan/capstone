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
        await db_conn.addDailyDeposit(
            req.body.user_id,
            req.body.dateDeposited,
            req.body.shiftDate,
            req.body.cashier,
            req.body.type,
            req.body.bankDepositedTo,
            req.body.subtotal,
        );

        // res.redirect(`/Users/${req.body.user_id}`);
        res.status(200).json({ message: "Are you sure you want to save this data?", userId: req.body.user_id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
