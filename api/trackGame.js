res.setHeader("Access-Control-Allow-Origin", "https://kivro-games.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
    return res.status(200).end();
}


// api/trackGame.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
    const { gameId } = req.query;

    if (!gameId) {
        return res.status(400).json({ error: "Missing gameId" });
    }

    const file = path.join(process.cwd(), "data.json");

    let data = { visitors: [], games: {} };

    try {
        data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (err) {}

    if (!data.games[gameId]) data.games[gameId] = 0;

    data.games[gameId] += 1;

    fs.writeFileSync(file, JSON.stringify(data, null, 2));

    res.status(200).json({ gameId, totalPlays: data.games[gameId] });
}
