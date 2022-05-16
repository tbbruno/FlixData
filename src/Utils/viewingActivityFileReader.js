import papa from "papaparse";
import rawFile from "../Assets/ViewingActivity.csv";

async function readViewingRawDataToJSON() {
  const file = await fetch(rawFile);
  const rawData = await file.text();

  return new Promise((resolve, reject) => {
    papa.parse(rawData, {
      delimiter: ",",
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        resolve(results.data);
      },
    });
  });
}

const itemsFilteredByProfile = (
  items,
  profileName,
  shouldRemoveSupplementalContent
) => {
  return items.filter((item) => {
    const isItemOfChosenProfile = item["Profile Name"] === profileName;

    if (shouldRemoveSupplementalContent) {
      // videos other than a TV show or movie, such as trailers and montages
      const supplementalVideoType = item["Supplemental Video Type"];
      return isItemOfChosenProfile && !supplementalVideoType;
    }

    return isItemOfChosenProfile;
  });
};

export { readViewingRawDataToJSON, itemsFilteredByProfile };
