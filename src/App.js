import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Nav } from "./components/Nav";
import { BrainDump } from "./pages/BrainDump";
import { Elaborate } from "./pages/Elaborate";
import { Sort } from "./pages/Sort";

// App is now just the shell: a nav bar plus whichever of the three stage
// pages matches the current URL. Each page owns its own data-fetching and
// state — App doesn't need to know anything about thoughts.
function App() {
  return (
    <div>
      <Nav />
      <Routes>
        {/* Visiting "/" sends you straight to the first stage. `replace`
            means it doesn't leave "/" itself in the browser history. */}
        <Route path="/" element={<Navigate to="/dump" replace />} />
        <Route path="/dump" element={<BrainDump />} />
        <Route path="/elaborate" element={<Elaborate />} />
        <Route path="/sort" element={<Sort />} />
      </Routes>
    </div>
  );
}

export default App;
