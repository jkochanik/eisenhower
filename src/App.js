import {Grid} from "./components/Grid";
import {Quadrant} from "./components/Quadrant";
import React from "react";


function App() {
  return (
    <div>
        <Grid></Grid>
        <Quadrant name="Unsorted"       color="black"></Quadrant>
    </div>
  );
}

export default App;
