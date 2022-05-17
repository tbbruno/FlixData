import { add as addTime, str as timeString } from "timelite/time";
import { roundToTwo } from "../Utils/mathUtils";
import { decimalHoursValueFromTimeString } from "../Utils/dateUtils";

const formatterLocale = "en-US";
const weekDayFormat = "short";
const hourFormat = "numeric";

const getWeekDays = (locale) => {
  var baseDate = new Date(Date.UTC(2017, 0, 1)); // just a Sunday
  var weekDays = [];
  for (let i = 0; i < 7; i++) {
    weekDays.push(
      baseDate.toLocaleDateString(locale, {
        timeZone: "UTC",
        weekday: weekDayFormat,
      })
    );
    baseDate.setDate(baseDate.getDate() + 1);
  }
  return weekDays;
};

const generateEmptyHourBlock = (hourStr) => {
  const days = getWeekDays(formatterLocale).map((dayStr, i) => ({
    dayStr,
    addedDuration: "00:00:00",
    accountedDatesCount: 0,
    accountedDates: {},
  }));

  return { hourStr, days };
};

const generateAllHoursInitialBlocks = () => {
  const numberOfHours = 24;
  const hourBlocks = [];
  for (let hour = 0; hour < numberOfHours; hour++) {
    const baseDate = new Date(Date.UTC(2017, 0, 1, hour));
    const hourStr = baseDate.toLocaleTimeString(formatterLocale, {
      timeZone: "UTC",
      hour: hourFormat,
    });
    hourBlocks[hour] = generateEmptyHourBlock(hourStr);
  }
  return hourBlocks;
};

const aggregateAccountedDatesInfoForHourDayBlock = (
  hourIndex,
  weekDayIndex,
  currentDate,
  currentHourBlocks
) => {
  const currentHourDayBlock = currentHourBlocks[hourIndex].days[weekDayIndex];

  let accountedDates = currentHourDayBlock.accountedDates ?? {};
  let accountedDatesCount = currentHourDayBlock.accountedDatesCount ?? 0;

  const currentDateStr = currentDate.toString();
  if (!accountedDates[currentDateStr]) {
    accountedDatesCount = accountedDatesCount + 1;
    accountedDates[currentDateStr] = true;
  }

  return { accountedDates, accountedDatesCount };
};

const addedDurationForHourDayBlock = (
  newItemDuration,
  hourIndex,
  weekDayIndex,
  currentHourBlocks
) => {
  const previousAddedDuration =
    currentHourBlocks[hourIndex].days[weekDayIndex].addedDuration ?? "00:00:00";

  const addedDuration = addTime([newItemDuration, previousAddedDuration]);
  return timeString(addedDuration);
};

const aggregateHourDayBlocksDuration = (items) => {
  const hourDayBlocks = generateAllHoursInitialBlocks();
  let fullWatchedDuration = "00:00:00";

  for (const item of items) {
    const dateStr = item.startDate;
    const date = new Date(dateStr);

    const hourIndex = date.getHours();
    const hourStr = date.toLocaleTimeString(formatterLocale, {
      hour: hourFormat,
    });

    const weekDayIndex = date.getDay();
    const weekDayStr = date.toLocaleDateString(formatterLocale, {
      weekday: weekDayFormat,
    });

    const addedDuration = addedDurationForHourDayBlock(
      item.duration,
      hourIndex,
      weekDayIndex,
      hourDayBlocks
    );
    const accountedDatesInfo = aggregateAccountedDatesInfoForHourDayBlock(
      hourIndex,
      weekDayIndex,
      date,
      hourDayBlocks
    );

    hourDayBlocks[hourIndex].days[weekDayIndex] = {
      ...hourDayBlocks[hourIndex].days[weekDayIndex],
      addedDuration,
      ...accountedDatesInfo,
    };

    fullWatchedDuration = timeString(
      addTime([fullWatchedDuration, addedDuration])
    );
  }

  return hourDayBlocks;
};

const getWeekHeatMapFormattedData = (items) => {
  const hourDayBlocks = aggregateHourDayBlocksDuration(items);

  const mapDayBlock = (dayBlock) => {
    const addedDurationNumber = decimalHoursValueFromTimeString(
      dayBlock.addedDuration
    );

    return {
      x: dayBlock.dayStr,
      y: addedDurationNumber,
    };
  };

  const returnValue = hourDayBlocks.map((hourBlock) => ({
    id: hourBlock.hourStr,
    data: hourBlock.days.map(mapDayBlock),
  }));

  return returnValue;
};

export { getWeekHeatMapFormattedData };

/*
[
  {
    "hourStr": "12 AM",
    "days": [
      {
        "dayStr": "Sun",
        "addedDuration": "00:12:43",
        "accountedDatesCount": 1,
        "accountedDates": {
          "some-date-string-without-time": true
        }
      },
      {
        "dayStr": "Mon",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Tue",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Wed",
        "addedDuration": "01:38:07",
        "accountedDatesCount": 1
      },
      {
        "dayStr": "Thu",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Fri",
        "addedDuration": "00:00:03",
        "accountedDatesCount": 1
      },
      {
        "dayStr": "Sat",
        "addedDuration": 0,
        "accountedDatesCount": 0
      }
    ]
  },
  {
    "hourStr": "12 AM",
    "days": [
      {
        "dayStr": "Sun",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Mon",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Tue",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Wed",
        "addedDuration": "01:38:07",
        "accountedDatesCount": 1
      },
      {
        "dayStr": "Thu",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Fri",
        "addedDuration": "00:00:03",
        "accountedDatesCount": 1
      },
      {
        "dayStr": "Sat",
        "addedDuration": 0,
        "accountedDatesCount": 0
      }
    ]
  },
  {
    "hourStr": "2 AM",
    "days": [
      {
        "dayStr": "Sun",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Mon",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Tue",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Wed",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Thu",
        "addedDuration": 0,
        "accountedDatesCount": 0
      },
      {
        "dayStr": "Fri",
        "addedDuration": "00:28:12",
        "accountedDatesCount": 1
      },
      {
        "dayStr": "Sat",
        "addedDuration": 0,
        "accountedDatesCount": 0
      }
    ]
  }
]
*/
