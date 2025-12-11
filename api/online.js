let onlineUsers = 0;

export default function handler(req, res) {
  if (req.method === "POST") {
    const { action } = req.body;

    if (action === "join") onlineUsers++;
    if (action === "leave") onlineUsers--;

    onlineUsers = Math.max(onlineUsers, 0);

    res.status(200).json({ online: onlineUsers });
  } else {
    res.status(200).json({ online: onlineUsers });
  }
}
