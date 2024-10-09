import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res, query) {
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
        const account_id = req.body.id;
        const fuelPriccesData = {
            date: req.body.date,
            soa: req.body.soa,
            cust_name: req.body.cust_name,
            volume: req.body.volume,
            ammount: req.body.ammount,
            terms: req.body.terms,
            bank: req.body.bank,
            check_no: req.body.check_no,
            ammount_paid: req.body.ammount_paid,
            ewt: req.body.ewt,
            cr_num: req.body.cr_num,
            date_collected: req.body.date_collected,
        };

        await db_conn.updateChargeAccount(account_id, fuelPriccesData);


        res.redirect(`/Users/${user_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
