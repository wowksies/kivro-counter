import cors from "./_cors";

let onlineUsers = 0;

function handler(req, res) {
  if (req.method === "POST") {
    const { action } = req.body || {};

    if (action === "join") onlineUsers++;
    if (action === "leave") onlineUsers--;

    onlineUsers = Math.max(onlineUsers, 0);
  }

  return res.status(200).json({ online: onlineUsers });
}

export default cors(handler);
