import React from "react";
import { HoverElementProps } from "../../../types/types";
import { WarningIcon, AlertIcon } from "../../icons/Icons";

const HoverElement: React.FC<HoverElementProps> = ({
  mouseLocation,
  hoverDetails,
  notAvailableTime,
  notAvailableDetails,
}) => {
  return (
    <div
      style={{
        left: `calc(${mouseLocation.xCoord}px - 150px)`,
        top: `calc(${mouseLocation.yCoord}px - 130px)`,
      }}
      className="hover-container"
    >
      <div className="time-data">{hoverDetails}</div>
      {notAvailableTime ? (
        <>
          <div className="outage-data">
            <span className="icon">
              {notAvailableTime.includes("Partial")
                ? AlertIcon()
                : WarningIcon()}
            </span>
            <span className="text">{notAvailableTime}:</span>
          </div>
          <div className="outage-data">
            {notAvailableDetails.map((e) => e.time)}
          </div>
        </>
      ) : (
        <div className="outage-data">No outages</div>
      )}
    </div>
  );
};

export default HoverElement;
