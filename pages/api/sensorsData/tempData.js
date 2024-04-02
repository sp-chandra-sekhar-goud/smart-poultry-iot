// Import required modules and functions
import { google } from "googleapis";
import parseCustomDate from "../utils.js/parseCustomDate";
import findNearestDateIndex from "../utils.js/findNearestDateIndex";
import { API_KEY } from "../utils.js/API_KEY";

// Define spreadsheet ID as a constant
const apiKey = API_KEY;
const SPREADSHEET_ID = "1BD0oLF4mbVE-aO1VTPWXOURTvx4Xj73xjVfLfcxglos";
const sheets = google.sheets({ version: "v4", auth: apiKey });
const endCol = "B";
const endCol_num = 1;

// Function to handle API request
export default async function handler(req, res) {
  try {
    // Validate request method
    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    // Extract start and end dates from query parameters
    let startDate = req.query.startDate.toString();
    let endDate = req.query.endDate.toString();

    startDate = startDate.split("T")[0];
    endDate = endDate.split("T")[0];

    startDate = new Date(startDate);
    endDate = new Date(endDate);

    // Fetch data within specified date range
    const values = await fetchDataInRange(startDate, endDate);

    // Return response with fetched data
    res.status(200).json({ message: "Data fetched successfully", data: values });
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Function to fetch data within specified date range
async function fetchDataInRange(startDate, endDate) {
  // Fetch all data from Google Sheets
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:"+endCol,
  });
  const values = response.data.values;

  // Filter data within specified date range
  const filteredValues = values.filter((row) => {
    const date = parseCustomDate(row[0]);
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    
    return date >= startDateObj && date <= endDateObj;
  });

  // If no data found, return 404 response
  if (filteredValues.length === 0) {
    return {
      status: 404,
      message: "No data found for the specified date range",
    };
  }

  // Find start and end indices
  const startIndex = findNearestDateIndex(values, startDate);
  const endIndex = findNearestDateIndex(values, endDate, true);

  // If start or end index is not found, return 404 response
  if (startIndex === -1 || endIndex === -1) {
    return {
      status: 404,
      message: "No data found for the specified date range",
    };
  }

  // Construct the range based on the start and end indices
  const range = `Sheet1!A${startIndex + 1}:${endCol}${endIndex + 1}`;

  // Fetch the data within the specified range
  const rangeResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  // Extract values from the range response
  const rangeValues = rangeResponse.data.values.map((row) => [row[0], row[endCol_num]]);

  // Return fetched values
  return {
    status: 200,
    message: "Data fetched successfully",
    data: rangeValues,
  };
}
