import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res, query) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        handleupdateRequest(db_conn, req, res, query);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleupdateRequest(db_conn, req, res, query) {
    try {
        const user_id = req.body.user_id;
        const Register_id = req.body.id;
        const registerDetailsData = {
            full_name: req.body.full_name,
            permanent_address: req.body.permanent_address,
            email: req.body.email,
            username: req.body.username,
            phone_num: req.body.phone_num,
            position: req.body.position,
            branch_id: req.body.branch_id,
        };

        await db_conn.updateRegisterDetails(Register_id, registerDetailsData);


        res.redirect(`/Users/${user_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
