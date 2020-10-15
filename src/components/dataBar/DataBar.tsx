import React, { useState } from "react";
import { DataBarProps, MouseCoords } from "../../types/types";

import "./DataBar.scss";
const DataBar: React.FC<DataBarProps> = ({
  projectName,
  minutesArray,
  availabilityBars,
}) => {
  // minutesArray = array of entire 24 hours, with every minute corresponding to availability
  // availabilityBars = colored bars chopped to 20 minute chunks, where color represents the worst event in 20 minutes
  const [hoverDetails, setHoverDetails] = useState<String>("");
  const [notAvailableTime, setNotAvailableTime] = useState<String>("");
  const [mouseLocation, setMouseLocation] = useState<MouseCoords>({});

  // latest availability value
  const lastMinute = minutesArray.slice(-1)[0];
  const currentAvailability = lastMinute.data[19].availability;

  // filter out all the "available" strings in availabilityStrings array
  const uptimeFilter = minutesArray.filter((e) => e.unavailable.length > 0);
  const downtimeLength = uptimeFilter.map((e) => e.unavailable).length;
  // calculate total uptime
  const totalUptime =
    (Math.round(((1440 - downtimeLength) / 1440) * 1000) / 1000) * 100;

  return (
    <>
      <div className="project-container">
        {/* hover details */}
        {hoverDetails && (
          <div
            style={{
              left: `calc(${mouseLocation.xCoord}px - 100px)`,
              top: `calc(${mouseLocation.yCoord}px - 110px)`,
            }}
            className="hover-container"
          >
            <div className="time-data">{hoverDetails}</div>
            {notAvailableTime ? (
              <div className="outage-data">{notAvailableTime}</div>
            ) : (
              <div className="outage-data">No outages</div>
            )}
          </div>
        )}
        {/* display total availability */}
        <div className="available-time">
          <span className="project-title">{projectName}</span>
          <span className={`current-availability ${currentAvailability}`}>
            {currentAvailability}
          </span>
        </div>
        {/* container for one project */}
        <div className="bars-container">
          {availabilityBars.map(
            (availability, i): JSX.Element => (
              <span
                key={i}
                className={`${availability} bar`}
                onMouseOver={(e): void => {
                  const xCoord = e.clientX;
                  const yCoord = e.clientY;
                  setMouseLocation({ xCoord, yCoord });

                  minutesArray[i].data.forEach(() => {
                    const beginning = minutesArray[i].data[0].time;
                    const end = minutesArray[i].data[19].time;
                    setHoverDetails(`${beginning} - ${end}`);

                    if (minutesArray[i].unavailable.length > 0) {
                      // check is any minutes have "unavailable" as status
                      const filterStatus = minutesArray[i].unavailable.filter(
                        (e: any) => e.availability === "unavailable"
                      );
                      if (filterStatus.length > 0) {
                        setNotAvailableTime(
                          `Not available for ${minutesArray[i].unavailable.length} minutes`
                        );
                      } else {
                        setNotAvailableTime(
                          `Partially unavailable for ${minutesArray[i].unavailable.length} minutes`
                        );
                      }
                    } else {
                      setNotAvailableTime("");
                    }
                  });
                }}
                onMouseLeave={() => setHoverDetails("")}
              ></span>
            )
          )}
        </div>
        {/* container for lower details of the project */}
        <div className="timeline-container">
          <span>24 hours ago</span>
          <span>{`${totalUptime}% availability`}</span>
          <span>Today</span>
        </div>
      </div>
    </>
  );
};

export default React.memo(DataBar);
