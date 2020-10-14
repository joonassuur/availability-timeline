import React from "react";
import dataGenerator from "../../utils/dataGenerator";
import { DataStruct } from "../../types/types";

import "./DataBar.scss";

const DataBar = ({ projectName }: { projectName: string }) => {
  // minutesArray = array of entire 24 hours, with every minute corresponding to availability
  // availabilityBars = colored bars chopped to 20 minute chunks, where color represents the worst event in 20 minutes
  const { minutesArray, availabilityBars } = dataGenerator();

  //availability strings for every minute
  const availabilityStrings: string[] = [];
  minutesArray.map((e) =>
    e.map((x: DataStruct) => availabilityStrings.push(x.availability))
  );
  const currentAvailability = availabilityStrings.slice(-1)[0];

  //filter out all the "available" strings in availabilityStrings array
  const uptimeFilter = availabilityStrings.filter((x) => x === "available")
    .length;
  const totalUptime = (Math.round((uptimeFilter / 1440) * 1000) / 1000) * 100;
  return (
    <div className="project-container">
      <div className="available-time">
        <span className="project-title">{projectName}</span>
        <span className={`current-availability ${currentAvailability}`}>
          {currentAvailability}
        </span>
      </div>
      <div className="bars-container">
        {availabilityBars.map((availability, i) => (
          <span
            className={`${availability} bar`}
            onMouseOver={(): React.MouseEvent<HTMLSpanElement> =>
              minutesArray[i].map((e: DataStruct) => {
                const minute = e.minute;
                const hours = minute / 60;
                const rhours = Math.floor(hours);
                const minutes = (hours - rhours) * 60;
                const rminutes = Math.round(minutes);
                console.log("h" + rhours, "m" + rminutes, e.availability);
              })
            }
            key={i}
          ></span>
        ))}
      </div>
      <div className="available-time">
        <span>24 hours ago</span>
        <span>{`${totalUptime}% availability`}</span>
        <span>Today</span>
      </div>
    </div>
  );
};

export default DataBar;
