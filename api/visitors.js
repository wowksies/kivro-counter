// api/visitors.js
import fs from "fs";
import path from "path";
import cors from "./_cors";

const filePath = path.join(process.cwd(), "data.json");

function handler(req, res) {
  let data = { visitors: [] };

  try {
    data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (err) {}

  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || "unknown";

  if (!data.visitors.includes(ip)) {
    data.visitors.push(ip);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  res.status(200).json({ totalVisitors: data.visitors.length });
}

export default cors(handler);
