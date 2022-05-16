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

const parseGroupedContentInfo = (items, includeSessionsInfo = false) => {
  let processedItemsDict = {};

  for (const item of items) {
    const title = item.Title;
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
      ...aggregatedDurationInfoForItem(item, itemKey, processedItemsDict),
    };

    if (includeSessionsInfo) {
      const newSessionInfo = individualSessionInfoForItem(
        item,
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

    processedItemsDict[itemKey] = formattedItem;
  }

  return Object.values(processedItemsDict);
};

const parseIndividualSessionsContentInfo = (items) => {
  const parsedItems = [];
  for (const item of items) {
    const title = item.Title;
    const possibleTVShowInfo = extractTVShowInfoIfPossible(title);

    let formattedItem = {};

    if (possibleTVShowInfo) {
      const { showName } = possibleTVShowInfo;

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
      ...individualSessionInfoForItem(item, possibleTVShowInfo),
    };

    parsedItems.push(formattedItem);
  }

  return parsedItems;
};

export { parseGroupedContentInfo, parseIndividualSessionsContentInfo };
