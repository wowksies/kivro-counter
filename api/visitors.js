res.setHeader("Access-Control-Allow-Origin", "https://kivro-games.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// api/visitors.js
import fs from "fs";
import path from "path";

export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://kivro-games.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    const file = path.join(process.cwd(), "data.json");

    let data = { visitors: [] };

    try {
        data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (err) {}

    const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

    if (!data.visitors.includes(ip)) {
        data.visitors.push(ip);
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }

    res.status(200).json({ totalVisitors: data.visitors.length });
}
