import React from "react";
import DataBar from "../dataBar/DataBar";

import "./App.scss";

function App() {
  return (
    <div className="App">
      <DataBar projectName="Project A" />
      <DataBar projectName="Project B" />
      <DataBar projectName="Project C" />
      <DataBar projectName="Project D" />
    </div>
  );
}

export default App;
