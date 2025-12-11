// api/online.js
import cors from "./_cors";

let onlineUsers = 0;

function handler(req, res) {
  if (req.method === "POST") {
    onlineUsers++;
    return res.status(200).json({ online: onlineUsers });
  }

  if (req.method === "GET") {
    return res.status(200).json({ online: onlineUsers });
  }

  res.status(405).json({ error: "Method not allowed" });
}

export default cors(handler);
