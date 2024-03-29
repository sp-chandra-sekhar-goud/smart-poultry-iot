import { google } from "googleapis";

const apiKey = "AIzaSyBQ1y9WawkhdP42aLje6VP0bAMMqTuNmUk";
const sheets = google.sheets({ version: "v4", auth: apiKey });

function parseCustomDate(dateString) {
  // Split the dateString into day, month, and year parts
  const parts = dateString.split("-");
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed in JavaScript Date
  const year = parseInt(parts[2], 10);

  // Assuming the time is not provided, set time to midnight (00:00:00)
  return new Date(Date.UTC(year, month, day));
}

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
export default function handler(req, res) {
  if (req.method === "GET") {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    
    startDate = startDate.split("T")[0];
    endDate = endDate.split("T")[0];

    sheets.spreadsheets.values
      .get({
        spreadsheetId: "1T7ZjJ-Ha8QK0-PqBoCWUsIPVQJryVcRsrLd2xsYoJdk",
        range: "Sheet1",
      })
      .then((response) => {
        const values = response.data.values;
        const filteredValues = values.filter((row) => {
          const date = parseCustomDate(row[0]);
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);

          return date >= startDateObj && date <= endDateObj;
        });

        if (filteredValues.length === 0) {
          return res
            .status(404)
            .json({ message: "No data found for the specified date range" });
        } else {
          const startIndex = findNearestDateIndex(values, startDate);
          const endIndex = findNearestDateIndex(values, endDate, true);

          if (startIndex === -1 || endIndex === -1) {
            return res
              .status(404)
              .json({ message: "No data found for the specified date range" });
          }
          // Construct the range based on the start and end indices
          const range = `Sheet1!A${startIndex + 1}:B${endIndex + 1}`;

          // Fetch the data within the specified range
          return sheets.spreadsheets.values
            .get({
              spreadsheetId: "1T7ZjJ-Ha8QK0-PqBoCWUsIPVQJryVcRsrLd2xsYoJdk",
              range: range,
            })
            .then((response) => {
              const values = response.data.values;
              res
                .status(200)
                .json({ message: "Data fetched successfully", data: values });
            });
        }
      });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
