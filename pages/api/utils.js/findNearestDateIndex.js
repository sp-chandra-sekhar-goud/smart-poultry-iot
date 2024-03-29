import parseCustomDate from "./parseCustomDate";

function findNearestDateIndex(values, targetDate, isEndDate = false) {
  let nearestIndex = -1;

  // Convert the target date to a Date object
  const targetDateObj = new Date(targetDate);

  // Iterate through the rows to find the nearest date index
  for (let i = 0; i < values.length; i++) {
    const rowDate = parseCustomDate(values[i][0]);

    if (
      (!isEndDate && rowDate >= targetDateObj) ||
      (isEndDate && rowDate > targetDateObj)
    ) {
      nearestIndex = i;
      break;
    }
  }

  // If no exact or nearest date found, set it to the last index
  if (nearestIndex === -1) {
    nearestIndex = values.length - 1;
  }

  return nearestIndex;
}

export default findNearestDateIndex;
