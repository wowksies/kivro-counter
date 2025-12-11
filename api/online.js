import cors from "./_cors";
import fs from "fs";
import path from "path";

let online = {}; // live online players stored in memory

const filePath = path.join(process.cwd(), "games.json");

function loadData() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}), "utf8");
  }
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function saveData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
}

function handler(req, res) {
  const { gameId, action, playerId } = req.body ?? {};
  if (!gameId) return res.status(400).json({ error: "Missing gameId" });

  const data = loadData();

  // Initialize game object
  if (!data[gameId]) {
    data[gameId] = { totalPlayers: 0, uniquePlayers: [] };
  }

  // Restore Set
  const uniqueSet = new Set(data[gameId].uniquePlayers);

  if (!online[gameId]) online[gameId] = 0;

  // Count online players
  if (action === "join") online[gameId]++;
  if (action === "leave") online[gameId] = Math.max(0, online[gameId] - 1);

  // Count unique player
  if (action === "unique" && playerId) {
    if (!uniqueSet.has(playerId)) {
      uniqueSet.add(playerId);
      data[gameId].totalPlayers++;
      data[gameId].uniquePlayers = [...uniqueSet];
      saveData(data);
    }
  }

  return res.status(200).json({
    online: online[gameId],
    totalPlayers: data[gameId].totalPlayers
  });
}

export default cors(handler);
