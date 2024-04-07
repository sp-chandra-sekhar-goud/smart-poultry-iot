import { google } from 'googleapis';
import { API_KEY } from '../utils.js/API_KEY';

export default function handler(req, res) {
  if (req.method === "GET") {
    const apiKey = API_KEY;
    const sheets = google.sheets({ version: 'v4', auth: apiKey });

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
  } else if (req.method === "POST") {
    console.log("POST Method called");
    const auth = new google.auth.GoogleAuth({
      keyFile: './pages/api/actuatorsData/google.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
  
    async function writeToSheet(postData) {
      const sheets = google.sheets({ version: 'v4', auth })
      const spreadsheetId = "1oBdI6XEf7j4dw50KPNls3UueVipch0F9z8mTxqYML7s"
      const range = 'Sheet1!A1:C1'; 
      const valueInputOption = 'USER_ENTERED'
  
      const timestamp = new Date().toISOString(); 
      const resource = {
        values: [
          [timestamp, postData.fan == "On" ? 1 : 0, postData.light == "On" ? 1 : 0] 
        ]
      };
  
      try {
        const res = await sheets.spreadsheets.values.append({
          spreadsheetId, range, valueInputOption, resource
        })
  
        return res;
      } catch (e) {
        console.log("error", e);
      }
    }
  
    (async () => {
      const postData = req.body; 
      const writer = await writeToSheet(postData);
  
      console.log(writer);
    })()
  }
  else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }

  
}
