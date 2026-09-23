// Thin wrapper around the /api/thoughts endpoints (see server/routes/thoughts.js).
// Every page component calls these functions instead of using axios directly,
// so if the API shape ever changes there's exactly one place to update.
import api from "./Axios";

// Fetch every saved thought — used by all three pages.
function getAll() {
  return api.get("/thoughts").then((response) => response.data);
}

// Create a new thought from raw text. The server assigns the id/createdAt
// and returns the full object, which we pass straight back to the caller.
function create(text) {
  return api.post("/thoughts", { text }).then((response) => response.data);
}

// Partially update a thought, e.g. update(id, { quadrant: "DO" }) when it's
// dragged into a quadrant. `patch` is merged onto the existing object
// server-side, so we only need to send the fields that changed.
function update(id, patch) {
  return api.patch(`/thoughts/${id}`, patch).then((response) => response.data);
}

function remove(id) {
  return api.delete(`/thoughts/${id}`);
}

const thoughtsService = { getAll, create, update, remove };

export default thoughtsService;
