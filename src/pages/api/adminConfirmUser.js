import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res) {
    const db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    if (req.method === "POST") {
        await handleUpdateRequest(db_conn, req, res);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleUpdateRequest(db_conn, req, res) {
    try {
        const user_login_id = req.body.user_login_id; // User Login ID for redirection
        const userId = req.body.id; 
        const { first_name, last_name, gender, permanent_address, email, password, username, phone_num, position, branch_id, otp } = req.body;

        // Register the user in the main database
        const registerResult = await db_conn.register(
            first_name,
            last_name,
            gender,
            permanent_address,
            email,
            password,
            username,
            phone_num,
            position,
            branch_id,
            otp
        );

        await db_conn.deletePendingUser(userId);

        res.redirect(303, `/Users/${user_login_id}`);
     
    } catch (error) {
        console.error("Error in handleUpdateRequest:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}
