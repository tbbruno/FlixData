import { add as addTime, str as timeString } from "timelite/time";
import { extractTVShowInfoIfPossible } from "./tvShowInfoParser";

const aggregatedSessionsInfo = (
  newSessionInfo,
  processedItemKey,
  processedItemsDict
) => {
  const previousSessionsInfo =
    processedItemsDict[processedItemKey]?.sessionsInfo ?? {};
  const sessions = previousSessionsInfo.sessions ?? [];
  sessions.push(newSessionInfo);

  const previousSessionsCount = previousSessionsInfo.sessionsCount ?? 0;
  const sessionsCount = previousSessionsCount + 1;

  return { sessionsCount, sessions };
};

const aggregatedDurationInfoForItem = (
  item,
  processedItemKey,
  processedItemsDict
) => {
  const previousDurationStr =
    processedItemsDict[processedItemKey]?.duration.formattedStr ?? "00:00:00";
  const duration = addTime([item["Duration"], previousDurationStr]);
  const durationStr = timeString(duration);

  return {
    duration: {
      components: {
        hours: duration[0],
        minutes: duration[1],
        seconds: duration[2],
      },
      formattedStr: durationStr,
    },
  };
};

const individualSessionInfoForItem = (item, possibleTVShowInfo) => {
  let sessionInfo = {
    startDate: `${item["Start Time"]} GMT`,
    duration: item["Duration"],
  };

  if (possibleTVShowInfo) {
    sessionInfo.episode = {
      ...possibleTVShowInfo,
    };
  }

  return sessionInfo;
};

const parseGroupedContentInfo = (
  rawItems,
  includeSessionsInfo,
  shouldFilterItemOutFunction
) => {
  let processedItemsDict = {};

  for (const rawItem of rawItems) {
    const title = rawItem.Title;
    const possibleTVShowInfo = extractTVShowInfoIfPossible(title);

    let formattedItem = {};
    let itemKey = title;

    if (possibleTVShowInfo) {
      const { showName } = possibleTVShowInfo;
      itemKey = showName;

      formattedItem = {
        type: "tvShow",
        title: showName,
      };
    } else {
      formattedItem = {
        type: "movie",
        title,
      };
    }

    formattedItem = {
      ...formattedItem,
      ...aggregatedDurationInfoForItem(rawItem, itemKey, processedItemsDict),
    };

    if (includeSessionsInfo) {
      const newSessionInfo = individualSessionInfoForItem(
        rawItem,
        possibleTVShowInfo
      );
      const sessionsInfo = aggregatedSessionsInfo(
        newSessionInfo,
        itemKey,
        processedItemsDict
      );

      formattedItem = {
        ...formattedItem,
        sessionsInfo,
      };
    }

    if (shouldFilterItemOutFunction(rawItem, formattedItem)) {
      continue;
    }
    processedItemsDict[itemKey] = formattedItem;
  }

  return Object.values(processedItemsDict);
};

const parseIndividualSessionsContentInfo = (
  rawItems,
  shouldFilterItemOutFunction
) => {
  const parsedItems = [];
  for (const rawItem of rawItems) {
    const title = rawItem.Title;
    const possibleTVShowInfo = extractTVShowInfoIfPossible(title);

    let parsedItem = {};

    if (possibleTVShowInfo) {
      const { showName } = possibleTVShowInfo;

      parsedItem = {
        type: "tvShow",
        title: showName,
      };
    } else {
      parsedItem = {
        type: "movie",
        title,
      };
    }

    parsedItem = {
      ...parsedItem,
      ...individualSessionInfoForItem(rawItem, possibleTVShowInfo),
    };

    if (shouldFilterItemOutFunction(rawItem, parsedItem)) {
      continue;
    }
    parsedItems.push(parsedItem);
  }

  return parsedItems;
};

export { parseGroupedContentInfo, parseIndividualSessionsContentInfo };
