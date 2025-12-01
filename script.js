const API_KEY = "AIzaSyDM3HdtVzup3zlhxrcxnJ9IaQByz3pzibg"; //Jungmin Lee's Google Sheets API key
const SPREADSHEET_ID = "1-5QTUzZbeQDvmTGpdrzmdwiq6w3MhraGWBgI5EVxlJg"; //CS Rooms spreadsheet
const SHEET_NAME = "WebDevProject";


async function fetchSheetData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;


        const response = await fetch(url);
        const json = await response.json();


        return json.values || [];
    } catch (error) {
        console.error("Error fetching sheet:", error);
        return [];
    }
}
