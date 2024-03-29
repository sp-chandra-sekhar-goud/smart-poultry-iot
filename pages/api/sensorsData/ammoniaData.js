import { google } from "googleapis";
import parseCustomDate from "../utils.js/parseCustomDate";
import findNearestDateIndex from "../utils.js/findNearestDateIndex";

const apiKey = "AIzaSyBQ1y9WawkhdP42aLje6VP0bAMMqTuNmUk";
const sheets = google.sheets({ version: "v4", auth: apiKey });

export default function handler(req, res) {
  if (req.method === "GET") {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    
    startDate = startDate.split("T")[0];
    endDate = endDate.split("T")[0];

    sheets.spreadsheets.values
      .get({
        spreadsheetId: "1T7ZjJ-Ha8QK0-PqBoCWUsIPVQJryVcRsrLd2xsYoJdk",
        range: "Sheet1!A:E",
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
          const range = `Sheet1!A${startIndex + 1}:E${endIndex + 1}`;

          // Fetch the data within the specified range
          return sheets.spreadsheets.values
            .get({
              spreadsheetId: "1T7ZjJ-Ha8QK0-PqBoCWUsIPVQJryVcRsrLd2xsYoJdk",
              range: range,
            })
            .then((response) => {
              const values = response.data.values.map((row) => [row[0], row[4]]);;
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
