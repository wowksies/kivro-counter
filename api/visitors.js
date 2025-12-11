import fs from 'fs';
import path from 'path';

export default function handler(req, res) {

  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Respond to preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const filePath = path.join(process.cwd(), 'visitors.json');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ total: 0 }), 'utf8');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.total++;
  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');

  res.status(200).json({ total: data.total });
}
