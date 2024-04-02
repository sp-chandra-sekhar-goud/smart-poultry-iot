import { google } from 'googleapis';
import { API_KEY } from '../utils.js/API_KEY';

const apiKey = API_KEY;
const sheets = google.sheets({ version: 'v4', auth: apiKey });

export default function handler(req, res) {
  if (req.method === "GET") {
    sheets.spreadsheets.values.get({
      spreadsheetId: "1BD0oLF4mbVE-aO1VTPWXOURTvx4Xj73xjVfLfcxglos",
      range: 'Sheet1',
    })
    .then(response => {
      const values = response.data.values;
      const totalRows = values.length;
      const startRow = Math.max(totalRows - 100, 0);
      const endRow = totalRows - 1;
      const range = `Sheet1!A${startRow + 2}:H${endRow + 2}`; // +2 to skip the header row

      // Fetch the last 100 rows using the calculated range
      return sheets.spreadsheets.values.get({
        spreadsheetId: "1BD0oLF4mbVE-aO1VTPWXOURTvx4Xj73xjVfLfcxglos",
        range: range,
      });
    })
    .then(response => {
      const values = response.data.values;
      res.status(200).json({ message: 'Data fetched successfully', data: values });
    })
    .catch(error => {
      console.error('Error fetching data from Google Spreadsheet:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
