import axios from "axios";

// A pre-configured axios instance shared by every service file.
//
// baseURL is "/api" instead of "http://localhost:4000/api" on purpose: the
// "proxy" field in package.json tells the React dev server (localhost:3000)
// to forward any request it doesn't recognize (like /api/thoughts) to the
// Express server on localhost:4000. That means the browser only ever talks
// to one origin, so we never have to deal with CORS.
const api = axios.create({
  baseURL: "/api",
});

export default api;
