import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'visitors.json');

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ total: 0 }), 'utf8');
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  data.total++;

  fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');

  res.status(200).json({ total: data.total });
}
