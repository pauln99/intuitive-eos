#!/usr/bin/env node

/**
 * Commits files to GitHub via the REST API (no git push required).
 *
 * Usage:
 *   node scripts/github-commit.js --message "Add rock: DEV_Q2_2026_ABC" file1.yml file2.yml
 *
 * Auth (checked in order):
 *   1. GITHUB_PAT env var
 *   2. github_pat field in ~/.teamtraction/config.yml
 *
 * Repo is read from the local git remote origin.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const REPO_ROOT = path.resolve(__dirname, "..");
const BRANCH = "main";

function getToken() {
  // 1. Environment variable
  if (process.env.GITHUB_PAT) return process.env.GITHUB_PAT;

  // 2. User-level config
  const userConfig = path.join(process.env.HOME, ".teamtraction", "config.yml");
  if (fs.existsSync(userConfig)) {
    const match = fs.readFileSync(userConfig, "utf8").match(/github_pat:\s*(.+)/);
    if (match) return match[1].trim();
  }

  throw new Error(
    "No GitHub PAT found. Set GITHUB_PAT env var (via .claude/settings.local.json) or add github_pat to ~/.teamtraction/config.yml"
  );
}

function getRepoOwnerAndName() {
  const remote = execSync("git remote get-url origin", {
    cwd: REPO_ROOT,
    encoding: "utf8",
  }).trim();

  // Handle both HTTPS and SSH formats
  const match = remote.match(/github\.com[/:]([\w.-]+)\/([\w.-]+?)(?:\.git)?$/);
  if (!match) throw new Error(`Cannot parse GitHub repo from remote: ${remote}`);
  return { owner: match[1], repo: match[2] };
}

async function api(token, endpoint, method = "GET", body = null) {
  const { owner, repo } = getRepoOwnerAndName();
  const url = `https://api.github.com/repos/${owner}/${repo}${endpoint}`;

  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (body) headers["Content-Type"] = "application/json";

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${endpoint} failed (${res.status}): ${text}`);
  }

  return res.json();
}

async function commitFiles(filePaths, message) {
  const token = getToken();
  const { owner, repo } = getRepoOwnerAndName();

  // 1. Get current commit SHA on main
  const ref = await api(token, `/git/ref/heads/${BRANCH}`);
  const latestCommitSha = ref.object.sha;

  // 2. Get the tree SHA from that commit
  const commit = await api(token, `/git/commits/${latestCommitSha}`);
  const baseTreeSha = commit.tree.sha;

  // 3. Create blobs for each file
  const treeItems = [];
  for (const filePath of filePaths) {
    const absPath = path.resolve(REPO_ROOT, filePath);
    if (!fs.existsSync(absPath)) {
      console.error(`Warning: ${filePath} does not exist locally, skipping`);
      continue;
    }

    const content = fs.readFileSync(absPath, "utf8");
    const blob = await api(token, "/git/blobs", "POST", {
      content,
      encoding: "utf-8",
    });

    // Path relative to repo root — normalise to forward slashes for GitHub API
    const repoRelPath = path.relative(REPO_ROOT, absPath).split(path.sep).join("/");
    treeItems.push({
      path: repoRelPath,
      mode: "100644",
      type: "blob",
      sha: blob.sha,
    });
  }

  if (treeItems.length === 0) {
    throw new Error("No files to commit");
  }

  // 4. Create a new tree
  const tree = await api(token, "/git/trees", "POST", {
    base_tree: baseTreeSha,
    tree: treeItems,
  });

  // 5. Create the commit
  const newCommit = await api(token, "/git/commits", "POST", {
    message,
    tree: tree.sha,
    parents: [latestCommitSha],
  });

  // 6. Update the ref
  await api(token, `/git/refs/heads/${BRANCH}`, "PATCH", {
    sha: newCommit.sha,
  });

  console.log(`Committed to GitHub: ${newCommit.sha.slice(0, 7)} — ${message}`);
  console.log(`Files: ${treeItems.map((t) => t.path).join(", ")}`);

  // 7. Pull locally to sync
  try {
    execSync("git pull --rebase", { cwd: REPO_ROOT, encoding: "utf8" });
  } catch {
    console.warn("Warning: local git pull failed — run 'git pull' manually");
  }
}

// CLI entry point
const args = process.argv.slice(2);
const msgIdx = args.indexOf("--message");
if (msgIdx === -1 || msgIdx + 1 >= args.length) {
  console.error(
    'Usage: node github-commit.js --message "commit message" file1 [file2 ...]'
  );
  process.exit(1);
}

const message = args[msgIdx + 1];
const files = [...args.slice(0, msgIdx), ...args.slice(msgIdx + 2)];

if (files.length === 0) {
  console.error("Error: no files specified");
  process.exit(1);
}

commitFiles(files, message).catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
