let onlineUsers = 0;

export default function handler(req, res) {

  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Respond to preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    const { action } = req.body;

    if (action === "join") onlineUsers++;
    if (action === "leave") onlineUsers--;

    onlineUsers = Math.max(onlineUsers, 0);

    return res.status(200).json({ online: onlineUsers });
  }

  return res.status(200).json({ online: onlineUsers });
}
