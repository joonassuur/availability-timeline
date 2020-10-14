import React from "react";
import dataGenerator from "../../utils/dataGenerator";
import { DataStruct } from "../../types/types";

const DataBar = () => {
  const { minutesArray, availabilityBars } = dataGenerator();

  const availabilityStrings: string[] = [];
  minutesArray.map((e) => {
    e.map((x: DataStruct) => availabilityStrings.push(x.availability));
  });
  console.log("strings", availabilityStrings)

  const aa = availabilityStrings.filter((x) => x === "available").length;
  const totalUptime = (Math.round((aa / 1440) * 1000) / 1000);
  console.log(totalUptime * 100)
  return (
    <div>
      {availabilityBars.map((availability, i) => (
        <span
          className={availability}
          onMouseOver={(): React.MouseEvent<HTMLSpanElement> =>
            minutesArray[i].map((e: DataStruct) => {
              const minute = e.minute;
              const hours = minute / 60;
              const rhours = Math.floor(hours);
              const minutes = (hours - rhours) * 60;
              const rminutes = Math.round(minutes);
              console.log("h" + rhours, "m" + rminutes);
            })
          }
          key={i}
        ></span>
      ))}
    </div>
  );
};

export default DataBar;
