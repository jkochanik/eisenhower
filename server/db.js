// This module is the only place that touches db.json directly. Everything
// else (the route handlers) goes through readDb()/writeDb() so there's one
// place to change if we ever swap the JSON file for a real database.
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "db.json");

// The shape every fresh install starts from: one array of "thought" objects.
const EMPTY_DB = { thoughts: [] };

// If db.json doesn't exist yet (fresh clone, or first run), create it so the
// rest of the server can assume the file is always there.
function ensureDbFile() {
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify(EMPTY_DB, null, 2));
  }
}

function readDb() {
  ensureDbFile();
  const raw = fs.readFileSync(DB_PATH, "utf-8");
  return JSON.parse(raw);
}

function writeDb(data) {
  // Pretty-printed (2-space indent) so db.json stays human-readable if you
  // want to peek at it directly while developing.
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

module.exports = { readDb, writeDb };
