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
        handleupdateRequest(db_conn, req, res, query);
        console.log(req.body)
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleupdateRequest(db_conn, req, res, query) {
    try {
        const user_id = req.body.user_id;
        const Register_id = req.body.user_id;
        console.log(`Hello ${Register_id}`)
        const registerDetailsData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            gender: req.body.gender,
            permanent_address: req.body.permanent_address,
            email: req.body.email,
            username: req.body.username,
            phone_num: req.body.phone_num,
            position: req.body.position,
            branch_id: req.body.branch_id,
        };

        await db_conn.updateRegisterDetails(user_id, registerDetailsData);


        res.status(200).json({ message: "User details updated successfully", user_id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
