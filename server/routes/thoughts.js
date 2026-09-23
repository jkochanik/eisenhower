// REST routes for "thoughts" — the individual objects captured on the Brain
// Dump page, later elaborated on and sorted into an Eisenhower quadrant.
//
// A thought looks like:
//   {
//     id: "b3f1...",        // uuid, assigned by the server
//     text: "call the bank",
//     createdAt: "2026-09-20T18:04:11.203Z",
//     quadrant: null,       // null/unset = not sorted yet ("Unsorted" bucket).
//                           // Once sorted: "DO" | "PLAN" | "DELEGATE" | "PUT OFF"
//     details: undefined,   // optional answers to the guided elaboration
//                           // prompts (what/actionable/why/doing looks
//                           // like/done looks like/next), set via the task
//                           // detail popup on the Sort/Elaborate pages —
//                           // see QUESTIONS in TaskDetailModal
//   }
const express = require("express");
const { randomUUID } = require("crypto");
const { readDb, writeDb } = require("../db");

const router = express.Router();

// GET /api/thoughts — list every thought. Used by all three pages.
router.get("/", (req, res) => {
  const db = readDb();
  res.json(db.thoughts);
});

// POST /api/thoughts — create one thought from { text }.
// This is what the Brain Dump page calls every time you hit "save".
router.post("/", (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: "text is required" });
  }

  const thought = {
    id: randomUUID(),
    text: text.trim(),
    createdAt: new Date().toISOString(),
    quadrant: null, // brand new thoughts always start unsorted
  };

  const db = readDb();
  db.thoughts.push(thought);
  writeDb(db);

  // 201 Created, and hand back the full object (with its new id) so the
  // client doesn't have to guess what the server generated.
  res.status(201).json(thought);
});

// PATCH /api/thoughts/:id — partial update, e.g. { quadrant: "DO" } when a
// thought is dragged into a quadrant on the Sort page, or later, elaboration
// fields from the Elaborate page. We merge the given fields onto the
// existing object rather than replacing it, so callers only send what changed.
router.patch("/:id", (req, res) => {
  const db = readDb();
  const thought = db.thoughts.find((t) => t.id === req.params.id);

  if (!thought) {
    return res.status(404).json({ error: "thought not found" });
  }

  Object.assign(thought, req.body);
  writeDb(db);

  res.json(thought);
});

// DELETE /api/thoughts/:id — remove a thought entirely.
router.delete("/:id", (req, res) => {
  const db = readDb();
  db.thoughts = db.thoughts.filter((t) => t.id !== req.params.id);
  writeDb(db);
  res.status(204).end(); // 204 No Content: deleted, nothing to send back
});

module.exports = router;
