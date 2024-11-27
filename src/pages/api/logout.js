import corsMiddleware from "../../../lib/cors/cors_middleware";
import Cors from "cors";
import { getIronSession } from "iron-session";
import { SESSION_OPTION } from "../../../lib/session/session_option";

const cors = corsMiddleware(
    Cors({
        methods: ["GET"],
    })
);

export default async function handler(req, res) {
    await cors(req, res);

    let session = await getIronSession(req, res, SESSION_OPTION);
    await session.destroy();

    res.redirect("/", 308);
}