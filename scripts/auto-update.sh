#!/usr/bin/env bash
# Auto-update TeamTraction from origin/main on session start.
# Fast-forwards when clean and behind; warns on dirty tree, divergence,
# or network failure. Silent when already up to date.

set -u

REPO_DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/.." && pwd)}"
cd "$REPO_DIR" || exit 0

BRANCH="main"

current_branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ "$current_branch" != "$BRANCH" ]; then
  exit 0
fi

if ! git fetch --quiet origin "$BRANCH" 2>/dev/null; then
  echo "TeamTraction warning: could not reach origin (offline?). Skipping update check."
  exit 0
fi

local_sha=$(git rev-parse HEAD)
remote_sha=$(git rev-parse "origin/$BRANCH")

if [ "$local_sha" = "$remote_sha" ]; then
  exit 0
fi

if git merge-base --is-ancestor "$local_sha" "$remote_sha"; then
  if [ -n "$(git status --porcelain)" ]; then
    echo "TeamTraction warning: behind origin/$BRANCH but you have local changes. Commit or stash, then run: git pull"
    exit 0
  fi

  count=$(git rev-list --count "$local_sha..$remote_sha")
  if git pull --ff-only --quiet origin "$BRANCH" 2>/dev/null; then
    new_sha=$(git rev-parse --short HEAD)
    echo "TeamTraction: updated to $new_sha ($count new commit(s)):"
    git log --format='  - %s' "$local_sha..HEAD" | head -10
  else
    echo "TeamTraction warning: fast-forward pull failed unexpectedly. Update manually."
  fi
else
  echo "TeamTraction warning: local $BRANCH has diverged from origin/$BRANCH. Update manually."
fi
