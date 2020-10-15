import React from "react";
import dataGenerator from "../../utils/dataGenerator";

import DataBar from "../dataBar/DataBar";

import "./App.scss";

function App() {
  const projects = ["Project A", "Project B", "Project C", "Project D"];
  return (
    <div className="App">
      {projects.map((project) => {
        const { minutesArray, availabilityBars } = dataGenerator();
        return (
          <DataBar
            key={project}
            minutesArray={minutesArray}
            availabilityBars={availabilityBars}
            projectName={project}
          />
        );
      })}
    </div>
  );
}

export default App;
