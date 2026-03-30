#!/usr/bin/env node

/**
 * JSONStore API helper for TeamTraction.
 *
 * Usage (CLI):
 *   node scripts/jsonstore.js get <type> <key>
 *   node scripts/jsonstore.js list <type> [--field <f> --value <v>]
 *   node scripts/jsonstore.js save <type> <key> <json-payload>
 *   node scripts/jsonstore.js delete <type> <key>
 *   node scripts/jsonstore.js bulk <type> <json-items-array>
 *
 * All output is JSON to stdout. Errors go to stderr with non-zero exit.
 *
 * Auth: reads JSONSTORE_API_KEY from env.
 */

const BASE_URL = "https://jsonstore.ivectormodules.co.uk";

function getApiKey() {
  const key = process.env.JSONSTORE_API_KEY;
  if (!key) {
    throw new Error(
      "JSONSTORE_API_KEY env var not set. Add it to .claude/settings.local.json"
    );
  }
  return key;
}

function headers() {
  return {
    "X-Api-Key": getApiKey(),
    "Content-Type": "application/json",
  };
}

async function request(method, path, body = null) {
  const url = `${BASE_URL}${path}`;
  const opts = { method, headers: headers() };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(url, opts);

  if (!res.ok) {
    const text = await res.text();
    let detail;
    try {
      detail = JSON.parse(text);
    } catch {
      detail = text;
    }
    const err = new Error(
      `JSONStore ${method} ${path} failed (${res.status}): ${typeof detail === "string" ? detail : JSON.stringify(detail)}`
    );
    err.status = res.status;
    throw err;
  }

  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// --- Public API ---

/** Get a single item */
async function get(type, key) {
  return request("GET", `/${type}/${encodeURIComponent(key)}`);
}

/** List all items of a type (paginated, fetches all pages) */
async function list(type) {
  const PAGE_SIZE = 500;
  let page = 1;
  let allItems = [];

  while (true) {
    const result = await request(
      "GET",
      `/${type}?page=${page}&pageSize=${PAGE_SIZE}`
    );
    allItems = allItems.concat(result.items);
    if (allItems.length >= result.count) break;
    page++;
  }

  return allItems;
}

/** Search items by field value */
async function search(type, field, value) {
  const PAGE_SIZE = 500;
  let page = 1;
  let allItems = [];

  while (true) {
    const result = await request(
      "GET",
      `/${type}/search?field=${encodeURIComponent(field)}&value=${encodeURIComponent(value)}&page=${page}&pageSize=${PAGE_SIZE}`
    );
    allItems = allItems.concat(result.items);
    if (allItems.length >= result.count) break;
    page++;
  }

  return allItems;
}

/** Create or update an item (upsert: tries PUT, falls back to POST) */
async function save(type, key, payload) {
  try {
    return await request("PUT", `/${type}/${encodeURIComponent(key)}`, {
      payload,
    });
  } catch (err) {
    if (err.status === 404) {
      return await request("POST", `/${type}`, { key, payload });
    }
    throw err;
  }
}

/** Delete an item */
async function del(type, key) {
  return request("DELETE", `/${type}/${encodeURIComponent(key)}`);
}

/** Bulk create items */
async function bulkCreate(type, items) {
  return request("POST", `/${type}/bulk`, { items });
}

// --- CLI ---

async function cli() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "get": {
      const [, type, key] = args;
      if (!type || !key) {
        console.error("Usage: jsonstore.js get <type> <key>");
        process.exit(1);
      }
      const item = await get(type, key);
      console.log(JSON.stringify(item, null, 2));
      break;
    }

    case "list": {
      const type = args[1];
      if (!type) {
        console.error("Usage: jsonstore.js list <type> [--field <f> --value <v>]");
        process.exit(1);
      }
      const fieldIdx = args.indexOf("--field");
      const valueIdx = args.indexOf("--value");
      let items;
      if (fieldIdx !== -1 && valueIdx !== -1) {
        items = await search(type, args[fieldIdx + 1], args[valueIdx + 1]);
      } else {
        items = await list(type);
      }
      console.log(JSON.stringify(items, null, 2));
      break;
    }

    case "save": {
      const [, type, key, ...rest] = args;
      const jsonStr = rest.join(" ");
      if (!type || !key || !jsonStr) {
        console.error("Usage: jsonstore.js save <type> <key> <json-payload>");
        process.exit(1);
      }
      const payload = JSON.parse(jsonStr);
      const result = await save(type, key, payload);
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    case "delete": {
      const [, type, key] = args;
      if (!type || !key) {
        console.error("Usage: jsonstore.js delete <type> <key>");
        process.exit(1);
      }
      const result = await del(type, key);
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    case "bulk": {
      const [, type, ...rest] = args;
      const jsonStr = rest.join(" ");
      if (!type || !jsonStr) {
        console.error("Usage: jsonstore.js bulk <type> <json-items-array>");
        process.exit(1);
      }
      const items = JSON.parse(jsonStr);
      const result = await bulkCreate(type, items);
      console.log(JSON.stringify(result, null, 2));
      break;
    }

    default:
      console.error(
        "Usage: jsonstore.js <get|list|save|delete|bulk> [args...]"
      );
      process.exit(1);
  }
}

cli().catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
