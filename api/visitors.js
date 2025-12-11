// api/visitors.js
import fs from "fs";
import path from "path";
import cors from "./_cors";

const filePath = path.join(process.cwd(), "data.json");

function handler(req, res) {
  let data = { visitors: {}, lastReset: Date.now() };

  // Load existing data
  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {}

  const now = Date.now();

  // Reset every 24 hours (86400000 ms)
  if (!data.lastReset || now - data.lastReset > 86400000) {
    data.visitors = {};
    data.lastReset = now;
  }

  // Track visitor by IP (or "unknown" if not available)
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

  // Only count if IP not already in today's visitors
  if (!data.visitors[ip]) {
    data.visitors[ip] = true;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  res.status(200).json({ totalVisitors: Object.keys(data.visitors).length });
}

export default cors(handler);
