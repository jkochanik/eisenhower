// The "background JSON database" server. It's a plain Express app that
// reads/writes server/db.json on disk — no external database engine needed.
// It runs as its own process (see the "start:server" npm script) alongside
// the React dev server.
const express = require("express");
const thoughtsRouter = require("./routes/thoughts");

const app = express();
const PORT = process.env.SERVER_PORT || 4000;

// Parse incoming JSON request bodies into req.body (needed for POST/PATCH).
app.use(express.json());

// Every thought-related endpoint lives under /api/thoughts, e.g.
// GET /api/thoughts, POST /api/thoughts, PATCH /api/thoughts/:id
app.use("/api/thoughts", thoughtsRouter);

app.listen(PORT, () => {
  console.log(`JSON database server listening on http://localhost:${PORT}`);
});
