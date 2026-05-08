---
name: priority-projects
description: Manage the per-LT-member list of priority projects that Paul wants surfaced by name during weekly check-ins. Admin only. Use when Paul wants to add, list, edit, or mark complete a priority project for a team member. Triggers on "/priority-projects", "priority projects", "flag a project", "add a priority project", "mark project complete", "review my priority projects".
---

# Priority Projects — Admin Maintenance Skill

Maintain the per-LT-member list of projects Paul wants surfaced by name during each weekly check-in. **Admin access required.**

This is Paul's Friday-morning discipline — keep the list short, important, not BAU.

## Prerequisites

- The user must have admin privileges (`is_admin: true`)
- JSONStore type: `priority_projects`, key format `{owner_slug}_{TLC}`

## Philosophy

The bar for adding a priority project is high:

- **Important, not BAU.** If it's already covered by a rock, scorecard, or normal departmental reporting, leave it off.
- **Specific update needed.** Add only things Paul actively wants to hear about by name, week after week, until they're done.
- **Short list.** Most LT members will have 0–2. Some will have none. That's correct.

When the user proposes adding a project, gently push back if it sounds like routine work or duplicates an existing rock.

## Process

### Step 1: Verify Access

Check `is_admin: true` on the user's team record. If not: *"Priority projects management is admin-only."* Stop.

### Step 2: Show the menu

```
Priority Projects — what would you like to do?

1. View all active priority projects (by owner)
2. Add a new priority project
3. Mark a project complete
4. Edit a project (name, note)
5. Reactivate a completed project
```

Also accept natural-language equivalents.

### Step 3: View all active

```bash
node scripts/jsonstore.js list priority_projects --field status --value active
```

Group by `owner` slug. Display as a clean table per LT member, e.g.:

```
ANDY (andy)
  - LHR  LoveHolidays renewal     [added 8 May]
  - ...

VICKI (vicki)
  - CPS  Cruise plan + scorecard  [added 8 May]

PAUL (paul)
  - LTP  Leadership Team projects [added 8 May]
```

LT members with no active priority projects: don't list them at all. The empty state is the point.

### Step 4: Add a new project

1. **Owner** — ask which LT member. Verify the slug exists in JSONStore `team`. If unsure, list active team members.
2. **Project name** — short label.
3. **TLC** — three-letter code, uppercase. Reject placeholders (NEW, TBD, XXX, TMP). Confirm uniqueness for this owner: key is `{owner}_{TLC}`.
4. **Note** (optional) — one line on why Paul cares. Useful for memory; skip if obvious.
5. **Sense-check** — before saving, briefly ask: *"This will surface in {Name}'s check-in every week until you mark it complete. Important, not BAU?"* If the answer suggests it's BAU or already covered by a rock, push back once.

Save:

```bash
node scripts/jsonstore.js save priority_projects "{owner}_{TLC}" '{
  "owner": "{owner}",
  "name": "{name}",
  "note": "{note or omit}",
  "status": "active"
}'
```

Confirm: *"Saved. {Name} will be asked about {project} in their next check-in."*

### Step 5: Mark a project complete

1. Show the active list grouped by owner (Step 3 format).
2. Ask which to mark complete (accept TLC or full key).
3. Load, update `status: "complete"`, save:

```bash
node scripts/jsonstore.js save priority_projects "{owner}_{TLC}" '{
  "owner": "{owner}",
  "name": "{name}",
  "note": "{note}",
  "status": "complete"
}'
```

Confirm: *"Marked complete. Won't surface in check-ins anymore."*

### Step 6: Edit a project

Allow editing `name` and `note` only. Don't change `owner` or `TLC` (those are part of the key — delete + recreate if they really need to move).

Load the record, apply changes, save with the same key.

### Step 7: Reactivate a completed project

1. List completed projects:
   ```bash
   node scripts/jsonstore.js list priority_projects --field status --value complete
   ```
2. Ask which to reactivate.
3. Load, set `status: "active"`, save.

## Non-Negotiable Rules

- Admin only — never expose to non-admin users
- TLC must be a real three-letter code, never a placeholder
- The key `{owner}_{TLC}` must be unique — if a clash exists, surface it and ask for a different TLC
- Don't bulk-add — one project at a time, with a sense-check on each
- The week-to-week surfacing is handled by the `weekly-review` skill (Step 5a/5b) — this skill only manages the data
