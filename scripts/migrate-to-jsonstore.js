#!/usr/bin/env node

/**
 * One-time migration: reads all team/*.yml and rocks/**\/*.yml files,
 * converts them to JSON, and bulk-creates them in JSONStore.
 *
 * Types created:
 *   - team   (key = slug)
 *   - rocks  (key = rock id)
 *   - updates (key = {rock-id}_{week}, one per existing update entry)
 *
 * Usage:
 *   JSONSTORE_API_KEY=... node scripts/migrate-to-jsonstore.js [--dry-run]
 */

const fs = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");
const BASE_URL = "https://jsonstore.ivectormodules.co.uk";

function getApiKey() {
  const key = process.env.JSONSTORE_API_KEY;
  if (!key) throw new Error("JSONSTORE_API_KEY env var not set");
  return key;
}

function headers() {
  return {
    "X-Api-Key": getApiKey(),
    "Content-Type": "application/json",
  };
}

async function apiPost(typePath, body) {
  const url = `${BASE_URL}${typePath}`;
  const res = await fetch(url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`POST ${typePath} failed (${res.status}): ${text}`);
  }
  return res.json();
}

// ---- Minimal YAML parser (handles our simple flat/nested YAML) ----

function parseYaml(text) {
  const lines = text.split("\n");
  const result = {};
  let currentKey = null;
  let currentList = null;
  let inListOfObjects = false;
  let currentObject = null;

  for (const line of lines) {
    // Skip empty lines and comments
    if (line.trim() === "" || line.trim().startsWith("#")) continue;

    // Top-level key: value
    const topMatch = line.match(/^(\w[\w_]*)\s*:\s*(.*)/);
    if (topMatch) {
      // Save any pending list object
      if (inListOfObjects && currentObject && currentKey) {
        currentList.push(currentObject);
        currentObject = null;
      }
      if (currentKey && currentList !== null) {
        result[currentKey] = currentList;
      }

      const key = topMatch[1];
      const rawVal = topMatch[2].trim();

      if (rawVal === "" || rawVal === "[]") {
        // Start of a list or empty list
        currentKey = key;
        currentList = [];
        inListOfObjects = false;
        currentObject = null;
      } else {
        currentKey = null;
        currentList = null;
        inListOfObjects = false;
        currentObject = null;
        result[key] = parseValue(rawVal);
      }
      continue;
    }

    // List item: "  - something"
    const listItemMatch = line.match(/^  - (.+)/);
    if (listItemMatch && currentKey) {
      // Save any pending object
      if (inListOfObjects && currentObject) {
        currentList.push(currentObject);
        currentObject = null;
      }

      const itemContent = listItemMatch[1];
      // Check if it's a key: value (start of object in list)
      const kvMatch = itemContent.match(/^(\w[\w_]*)\s*:\s*(.*)/);
      if (kvMatch) {
        inListOfObjects = true;
        currentObject = {};
        currentObject[kvMatch[1]] = parseValue(kvMatch[2].trim());
      } else {
        inListOfObjects = false;
        currentList.push(parseValue(itemContent));
      }
      continue;
    }

    // Nested key in list object: "    key: value"
    const nestedMatch = line.match(/^    (\w[\w_]*)\s*:\s*(.*)/);
    if (nestedMatch && inListOfObjects && currentObject) {
      currentObject[nestedMatch[1]] = parseValue(nestedMatch[2].trim());
      continue;
    }
  }

  // Flush remaining
  if (inListOfObjects && currentObject && currentKey) {
    currentList.push(currentObject);
  }
  if (currentKey && currentList !== null) {
    result[currentKey] = currentList;
  }

  return result;
}

function parseValue(str) {
  if (str === "null" || str === "~") return null;
  if (str === "true") return true;
  if (str === "false") return false;
  if (str === "[]") return [];
  // Remove surrounding quotes
  if (
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    return str.slice(1, -1);
  }
  // Don't convert dates/numbers that look like IDs or dates to numbers
  if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str;
  if (/^\d+$/.test(str)) return parseInt(str, 10);
  if (/^\d+\.\d+$/.test(str)) return parseFloat(str);
  return str;
}

// ---- Gather data ----

function loadTeamFiles() {
  const teamDir = path.join(REPO_ROOT, "team");
  const items = [];

  for (const file of fs.readdirSync(teamDir)) {
    if (!file.endsWith(".yml")) continue;
    const slug = file.replace(".yml", "");
    const content = fs.readFileSync(path.join(teamDir, file), "utf8");
    const data = parseYaml(content);

    // Remove fields that JSONStore tracks automatically
    delete data.created_at;

    items.push({ key: slug, payload: data });
  }

  return items;
}

function loadRockFiles() {
  const rocksDir = path.join(REPO_ROOT, "rocks");
  const rockItems = [];
  const updateItems = [];

  if (!fs.existsSync(rocksDir)) return { rockItems, updateItems };

  // Walk rocks/Q*/{slug}/*.yml
  for (const quarterDir of fs.readdirSync(rocksDir)) {
    const qPath = path.join(rocksDir, quarterDir);
    if (!fs.statSync(qPath).isDirectory()) continue;

    for (const slugDir of fs.readdirSync(qPath)) {
      const sPath = path.join(qPath, slugDir);
      if (!fs.statSync(sPath).isDirectory()) continue;

      for (const file of fs.readdirSync(sPath)) {
        if (!file.endsWith(".yml")) continue;

        const content = fs.readFileSync(path.join(sPath, file), "utf8");
        const data = parseYaml(content);
        const rockId = data.id;

        if (!rockId) {
          console.warn(`Warning: no id in ${quarterDir}/${slugDir}/${file}, skipping`);
          continue;
        }

        // Extract updates into separate items
        const updates = data.updates || [];
        delete data.updates;
        delete data.created_at;
        delete data.id; // Key is the rock ID

        rockItems.push({ key: rockId, payload: data });

        // Create update items
        for (const update of updates) {
          if (!update.date) continue;
          const weekStr = getISOWeek(update.date);
          const updateKey = `${rockId}_${weekStr}`;
          updateItems.push({
            key: updateKey,
            payload: {
              rock_id: rockId,
              owner: data.owner,
              quarter: data.quarter,
              week: weekStr,
              status: update.status || data.status,
              commentary: update.commentary || "",
            },
          });
        }
      }
    }
  }

  return { rockItems, updateItems };
}

function getISOWeek(dateStr) {
  const d = new Date(dateStr);
  // ISO week calculation
  const jan4 = new Date(d.getFullYear(), 0, 4);
  const daysSinceJan4 =
    Math.floor((d - jan4) / 86400000) + jan4.getDay() - 1;
  const weekNum = Math.ceil((daysSinceJan4 + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

// ---- Main ----

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log("Loading team files...");
  const teamItems = loadTeamFiles();
  console.log(`  Found ${teamItems.length} team members`);

  console.log("Loading rock files...");
  const { rockItems, updateItems } = loadRockFiles();
  console.log(`  Found ${rockItems.length} rocks`);
  console.log(`  Found ${updateItems.length} updates`);

  if (dryRun) {
    console.log("\n--- DRY RUN ---\n");
    console.log("Team items:");
    for (const item of teamItems) {
      console.log(`  ${item.key}: ${JSON.stringify(item.payload).slice(0, 80)}...`);
    }
    console.log("\nRock items:");
    for (const item of rockItems) {
      console.log(`  ${item.key}: ${item.payload.title}`);
    }
    console.log("\nUpdate items:");
    for (const item of updateItems) {
      console.log(`  ${item.key}: ${item.payload.commentary.slice(0, 60)}...`);
    }
    console.log("\nDry run complete. Run without --dry-run to migrate.");
    return;
  }

  // Migrate team
  if (teamItems.length > 0) {
    console.log("\nMigrating team...");
    const result = await apiPost("/team/bulk", { items: teamItems });
    console.log(`  Created ${result.created} team members`);
  }

  // Migrate rocks
  if (rockItems.length > 0) {
    console.log("Migrating rocks...");
    const result = await apiPost("/rocks/bulk", { items: rockItems });
    console.log(`  Created ${result.created} rocks`);
  }

  // Migrate updates
  if (updateItems.length > 0) {
    console.log("Migrating updates...");
    const result = await apiPost("/updates/bulk", { items: updateItems });
    console.log(`  Created ${result.created} updates`);
  }

  // Verify
  console.log("\nVerifying...");
  const typesRes = await fetch(`${BASE_URL}/types`, { headers: headers() });
  const types = await typesRes.json();
  console.log("Types in store:");
  for (const t of types.types) {
    console.log(`  ${t.type}: ${t.count} items`);
  }

  console.log("\nMigration complete!");
}

main().catch((err) => {
  console.error(`Migration failed: ${err.message}`);
  process.exit(1);
});
