import { DB_CONF } from "../../../lib/db/DBConf";
import DBManager from "../../../lib/db/DBManager";

export default async function handler(req, res) {
    let db_conn = new DBManager(DB_CONF.PATH);
    await db_conn.init();

    // Check the request method and handle accordingly
    if (req.method === "POST") {
        // Handle the delete request
        handleDeleteRequest(db_conn, req, res);
    } else {
        res.status(200).json({ name: "Test" });
    }
}

async function handleDeleteRequest(db_conn, req, res) {
    const { user_login_id, id } = req.body; // Get the user and id from the request body

    try {
        console.log(`Deleting user with ID: ${id}`); // Log the ID to ensure it's correct
        await db_conn.deleteUser(id); // Call the DB method to delete the user

        res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        res.status(500).json({ error: "Failed to delete user." });
    }
}
