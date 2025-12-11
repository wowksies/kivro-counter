import cors from "./_cors";
import fs from "fs";
import path from "path";

function handler(req, res) {
  const filePath = path.join(process.cwd(), "visitors.json");

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ total: 0 }), "utf8");
  }

  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

  // Only count when frontend says increase:true
  if (req.method === "POST" && req.body?.increase === true) {
    data.total++;
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
  }

  return res.status(200).json({ total: data.total });
}

export default cors(handler);
