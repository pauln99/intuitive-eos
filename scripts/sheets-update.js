#!/usr/bin/env node

/**
 * Appends a rock status update to the Google Sheets "Rock updates" tab.
 *
 * Usage:
 *   node scripts/sheets-update.js <RockID> <RockName> <Status> <Commentary>
 *
 * Example:
 *   node scripts/sheets-update.js "Company_Q2_2026_FIN" "Finance System" "On Track" "Going great guns"
 *
 * Requires:
 *   - GOOGLE_SERVICE_ACCOUNT_KEY env var pointing to the JSON key file path
 *     OR the JSON content itself
 */

const { google } = require("googleapis");

const SPREADSHEET_ID = "1uAi5obiyxKdgqueyPLgNcmzi3ccaj9Xl6g__nGf-hzA";
const SHEET_NAME = "Rock updates";

async function getAuth() {
  const keyEnv = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyEnv) {
    throw new Error(
      "GOOGLE_SERVICE_ACCOUNT_KEY env var not set. Set it to the path of your service account JSON key file or the JSON content."
    );
  }

  let credentials;
  try {
    // Try parsing as JSON content first
    credentials = JSON.parse(keyEnv);
  } catch {
    // Fall back to reading as file path
    const fs = require("fs");
    credentials = JSON.parse(fs.readFileSync(keyEnv, "utf8"));
  }

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return auth;
}

function formatDate(date) {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const d = date.getDate();
  const mon = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const mins = String(date.getMinutes()).padStart(2, "0");
  return `${d} ${mon} ${year} ${hours}:${mins}`;
}

async function appendUpdate(rockId, rockName, status, commentary) {
  const auth = await getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const now = formatDate(new Date());

  const values = [[rockId, rockName, status, commentary, now]];

  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: `${SHEET_NAME}!A:E`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values },
  });

  console.log(`Updated: ${rockId} — ${status} — ${now}`);
}

// CLI entry point
const args = process.argv.slice(2);
if (args.length < 4) {
  console.error(
    "Usage: node sheets-update.js <RockID> <RockName> <Status> <Commentary>"
  );
  process.exit(1);
}

appendUpdate(args[0], args[1], args[2], args[3]).catch((err) => {
  console.error("Error updating sheet:", err.message);
  process.exit(1);
});
