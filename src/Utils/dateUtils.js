import { roundToTwo } from "./mathUtils";
import { add as addTime } from "timelite/time";

const componentsFromTimeString = (timeStr) => {
  const zeroedTimeStr = "00:00:00";
  const componentsArray = addTime([timeStr, zeroedTimeStr]);
  return {
    hours: componentsArray[0],
    minutes: componentsArray[1],
    seconds: componentsArray[2],
  };
};

const decimalHoursValueFromTimeComponents = (timeComponents) => {
  const { hours, minutes, seconds } = timeComponents;
  const decimalMinutes = minutes + seconds / 60;
  const decimalHours = hours + decimalMinutes / 60;
  return roundToTwo(decimalHours);
};

const decimalHoursValueFromTimeString = (timeStr) => {
  const timeComponents = componentsFromTimeString(timeStr);
  return decimalHoursValueFromTimeComponents(timeComponents);
};

const zeroTime = (originalDate) => {
  originalDate.setHours(0);
  originalDate.setMinutes(0);
  originalDate.setSeconds(0);
  originalDate.setMilliseconds(0);
};

export {
  componentsFromTimeString,
  decimalHoursValueFromTimeComponents,
  decimalHoursValueFromTimeString,
};
