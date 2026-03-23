---
name: weekly-review
description: Run a weekly EOS Rock status review. Use when the user wants to do their weekly review, update rock status, or check in on progress. Triggers on "weekly review", "check in", "update my rocks", "rock review".
---

# Weekly Review — EOS Rock Status Update Skill

Guide the user through a structured weekly review of all their active rocks.

## Prerequisites

From the project context (CLAUDE.md or config):
- The user's identity and coaching style
- The current quarter
- Where rocks are stored
- Any integration targets (e.g. Google Sheets, dashboards)

## Process

### Step 1: Load Active Rocks
Load all the user's rocks for the current quarter. Filter to those that are NOT `done` or `cancelled`.

### Step 2: Review Each Rock
For each active rock, in sequence:

1. **Display context** using the standard rock view format:

```
### {Rock ID}

# {Title}

Owner      : {Name}
Department : {Department}
Quarter    : Q{n} {Year}
Status     : {Status}

**Outcome**
{Outcome statement}

**Two-week milestone**
{Two-week milestone}

**Latest update** ({date})
{Commentary}
```
2. **Ask for status**: Present the options:
   - Off Track
   - Behind, should deliver
   - On Track
   - Done
   - Cancelled
3. **Ask for commentary**: "What's your update?"
4. **Challenge weak updates** using their coaching style:
   - "Just 'going well' isn't enough. What specifically happened this week?"
   - "What changed since last week? What's the next concrete step?"
5. **Acknowledge status changes** from last week:
   - Improved: "Nice, moved from {old} to {new}. Good progress."
   - Declined: "Moved from {old} to {new}. What happened? What's the plan to recover?"

### Step 3: Save Updates
- Append updates to each rock's data file (date, status, commentary)
- If there's an integration target (sheets, API), write updates there too
- **Git: commit to GitHub** — run:
  ```bash
  cd /Users/paulnixon/Dropbox/Agents/IntuitiveEOS
  git pull --rebase
  node scripts/github-commit.js --message "Weekly review: {slug} W{week}" rocks/Q{n}_{year}/{slug}/rock1.yml rocks/Q{n}_{year}/{slug}/rock2.yml
  ```
  Pass ALL updated rock files as arguments (the script batches them into one commit). Check the output — if it fails, report the error to the user.

### Step 4: Summary
Display a clean summary table of all rocks with their updated statuses and commentary.

## Coaching During Reviews

### Tough Love
- "That update tells me nothing. What actually happened?"
- "Two weeks behind and you're saying 'on track'? Let's be honest about where this is."
- "Good. Now what's the ONE thing that needs to happen this week?"

### Socratic
- "What's different from last week?"
- "If you had to bet money on this being done by end of quarter, how confident are you?"
- "What would need to be true for this to move to 'on track'?"

### Gentle
- "Thanks for the update. Could you add a bit more detail on what happened this week?"
- "I notice this moved to behind — what support would help get it back on track?"
- "Good progress. What's the priority for next week?"

## Non-Negotiable Rules
- Every update must have both a status AND substantive commentary
- Empty or generic updates ("fine", "going well") must be challenged
- Git commit and push must happen after saving updates — never skip this
