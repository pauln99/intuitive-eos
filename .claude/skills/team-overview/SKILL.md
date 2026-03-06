---
name: team-overview
description: Show a leadership team overview of all EOS Rocks across the organisation. Admin only. Use when the user wants to see all rocks, team status, or a department summary. Triggers on "team overview", "all rocks", "team status", "how's the team doing".
---

# Team Overview — EOS Rock Dashboard Skill

Display a leadership-level dashboard of all rocks across the team for the current quarter. **Admin access required.**

## Prerequisites

From the project context:
- The user must have admin privileges
- Current quarter
- All team members and their rocks

## Process

### Step 1: Verify Access
Check that the user has admin privileges. If not, decline: "Team overview is only available to admins."

### Step 2: Load All Rocks
Load every rock for the current quarter across all team members.

### Step 3: Display Dashboard

Show a summary table:

```
Department       | Owner    | Rock                    | Status                  | Latest Update
-----------------+----------+-------------------------+-------------------------+------------------
Company          | Paul     | Finance System          | On Track                | Model built...
Operations       | Alan     | Deliver £10k savings    | Behind, should deliver  | Est. £8k Feb...
```

### Step 4: Offer Analysis
After showing the table, offer:
- **Department view** — filter by department
- **Risk view** — show only off-track or behind rocks
- **Stale view** — show rocks with no update in the last 2+ weeks
- **Summary stats** — count by status across the team

## Coaching for the Leader
When reviewing team rocks as admin:
- Flag patterns: "3 of 5 ops rocks are behind — is there a systemic issue?"
- Prompt action: "Who needs support this week?"
- Celebrate wins: "Engineering has all rocks on track — worth calling out."
