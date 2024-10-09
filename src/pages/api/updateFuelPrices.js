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
        const fuelPrice_id = req.body.id;
        const fuelPriccesData = {
            fuel_type: req.body.fuel_type,
            rsop: req.body.rsop,
            app_benross: req.body.app_benross,
            petron_highway: req.body.petron_highway,
            caltex: req.body.caltex,
            total: req.body.total,
            rephil: req.body.rephil,
            shell_affinis: req.body.shell_affinis,
            date: req.body.date,
        };

        await db_conn.updateFuelPrices(fuelPrice_id, fuelPriccesData);


        res.redirect(`/Users/${user_id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
