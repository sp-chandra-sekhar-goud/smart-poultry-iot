import { google } from 'googleapis';
import { API_KEY } from '../utils.js/API_KEY';

const apiKey = API_KEY;
const sheets = google.sheets({ version: 'v4', auth: apiKey });

export default function handler(req, res) {
  if (req.method === "GET") {
    sheets.spreadsheets.values.get({
      spreadsheetId: "1oBdI6XEf7j4dw50KPNls3UueVipch0F9z8mTxqYML7s",
      range: 'Sheet1',
    })
    .then(response => {
      const values = response.data.values;
      const lastRowIndex = values.length - 1; // Index of the last row
      const range = `Sheet1!A${lastRowIndex + 1}:C${lastRowIndex + 1}`; // Specify the last row only

      return sheets.spreadsheets.values.get({
        spreadsheetId: "1oBdI6XEf7j4dw50KPNls3UueVipch0F9z8mTxqYML7s",
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
