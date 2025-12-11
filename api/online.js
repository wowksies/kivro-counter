res.setHeader("Access-Control-Allow-Origin", "https://kivro-games.vercel.app");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

// api/online.js
let onlineUsers = 0;

export default function handler(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "https://kivro-games.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    if (req.method === "OPTIONS") return res.status(200).end();

    if (req.method === "POST") {
        onlineUsers++;
        return res.status(200).json({ online: onlineUsers });
    }

    if (req.method === "GET") {
        return res.status(200).json({ online: onlineUsers });
    }
}
