// api/visitors.js
import fs from "fs";
import path from "path";
import cors from "./_cors";

const filePath = path.join(process.cwd(), "data.json");

function handler(req, res) {
  let data = { visitors: {}, lastReset: Date.now() };

  // Load existing data if file exists
  try {
    if (fs.existsSync(filePath)) {
      data = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
  } catch (err) {
    console.error("Failed to read data.json:", err);
  }

  const now = Date.now();

  // Reset visitors every 24 hours
  if (!data.lastReset || now - data.lastReset > 86400000) {
    data.visitors = {};
    data.lastReset = now;
  }

  // Track visitor by IP
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

  if (req.method === "POST" && !data.visitors[ip]) {
    data.visitors[ip] = true;
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("Failed to write data.json:", err);
      return res.status(500).json({ error: "Failed to save visitor" });
    }
  }

  res.status(200).json({ totalVisitors: Object.keys(data.visitors).length });
}

export default cors(handler);
