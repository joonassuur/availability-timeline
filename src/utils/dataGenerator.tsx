import { ReturnedDataTypes, DataStruct, TempStruct } from "../types/types";

const dataGenerator = (): ReturnedDataTypes => {
  // 1440 minutes for 24 hours
  const minutes: number = 1440;

  const today: any = Date.now();
  const yesterday: any = today - 86400000;

  const yesterdayMinutes = Math.floor(yesterday / 60000);

  // array of objects with minutes and an availability value corresponding to each minute
  const minutesArray: DataStruct[] = [];

  // array of availability values for colored bars matching for every 20 minutes
  const availabilityBars: string[] = [];

  // temporary array to be cleaned every 20 iterations (minutes)
  let tempArr: TempStruct[] = [];

  // generate availability
  const generateAvailability = (): string => {
    if (Math.random() < 0.999) {
      return "available";
    }
    if (Math.random() < 0.5) {
      return "partially-available";
    }
    return "unavailable";
  };

  // randomly generate availability for every minute
  for (let i = 1; i <= minutes; i++) {

    const convertToMS = (yesterdayMinutes + i) * 60000;

    const date = new Date(convertToMS);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
    const year = date.getFullYear().toString();
    const formatYear = year.substr(year.length - 2)

    const time = date.toLocaleTimeString("et-ET");

    // push the current iteration to a temporary array
    tempArr.push({
      minute: date,
      availability: generateAvailability(),
      time: `${time}Z / ${day}${month}${formatYear}`,
    });
    // chop the minutesArray into 20 minute chunks to match them up with availability status from availabilityBars array
    if (i % 20 === 0) {
      // check if any of the availability values in tempArr match with either "unavailable" or "partially". If they do, mark that entire particular bar with corresponding status, by pushing corresponding value to availabilityBars
      const unavailable: object[] = tempArr.filter(
        (a) => a.availability === "unavailable"
      );
      const partially: object[] = tempArr.filter(
        (a) => a.availability === "partially-available"
      );
      if (unavailable.length > 0) {
        availabilityBars.push("unavailable");
      } else if (partially.length > 0) {
        availabilityBars.push("partially-available");
      } else {
        availabilityBars.push("available");
      }
      const filterUnavailable = tempArr.filter(
        (x) => x.availability !== "available"
      );
      minutesArray.push({ data: tempArr, unavailable: filterUnavailable });
      tempArr = [];
    }
  }
  return { availabilityBars, minutesArray };
};

export default dataGenerator;
