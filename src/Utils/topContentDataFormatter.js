import { decimalHoursValueFromTimeComponents } from "./dateUtils";

const sortedByFormattedDuration = (items) => {
  let sortedItems = items.slice();
  sortedItems.sort((a, b) => {
    const formattedDurationA = a.duration.formattedStr;
    const formattedDurationB = b.duration.formattedStr;

    if (formattedDurationA < formattedDurationB) {
      return 1;
    }
    if (formattedDurationA > formattedDurationB) {
      return -1;
    }
    return 0;
  });

  return sortedItems;
};

const formattedTimeFromComponents = (durationComponents) => {
  let formattedComponents = [];

  const hasHours = durationComponents.hours > 0;
  if (hasHours) {
    const hours = durationComponents.hours;
    let formattedHours = hours == 1 ? `${hours} hour` : `${hours} hours`;
    formattedComponents.push(formattedHours);
  }

  const hasMinutes = durationComponents.minutes > 0;
  if (hasMinutes) {
    const minutes = durationComponents.minutes;
    let formattedMinutes =
      minutes == 1 ? `${minutes} minute` : `${minutes} minutes`;
    formattedComponents.push(formattedMinutes);
  }

  const hasSeconds = durationComponents.seconds > 0;
  if (hasMinutes && !hasHours) {
    // only show seconds value if there's no complete hour
    const seconds = durationComponents.seconds;
    let formattedSeconds =
      seconds == 1 ? `${seconds} second` : `${seconds} seconds`;
    formattedComponents.push(formattedSeconds);
  }

  return formattedComponents.join(", ");
};

const getTopContentFormattedData = (numOfTopItems, allItems) => {
  const sortedItems = sortedByFormattedDuration(allItems).slice(
    0,
    numOfTopItems
  );

  return sortedItems.reverse().map((item) => ({
    contentName: item.title ?? item.showName,
    hoursValue: decimalHoursValueFromTimeComponents(item.duration.components),
    formattedTime: formattedTimeFromComponents(item.duration.components),
  }));
};

export { getTopContentFormattedData };
