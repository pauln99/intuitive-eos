---
name: weekly-review
description: Run a weekly EOS Rock status review followed by a lightweight LT check-in. Use when the user wants to do their weekly review, update rock status, or check in on progress. Triggers on "weekly review", "check in", "update my rocks", "rock review".
---

# Weekly Review — EOS Rock Status Update + LT Check-in

Guide the user through a coaching-driven weekly review of all their active rocks, then a short, lightweight check-in on the rest of their week.

## Two parts

1. **Rocks review** — coaching-driven, uses the user's `coaching_style`, pushes for substance and accountability. Steps 1–4 below.
2. **LT check-in** — a six-prompt narrative layer. **Neutral, relaxed tone — not coaching-style-driven.** Step 5 below.

When starting, set expectations up front:

> *"We're going to review your rocks first, then your week more generally. Let's go with the rocks."*

## Prerequisites

From the project context (CLAUDE.md or config):
- The user's identity and coaching style
- The current quarter
- Where rocks are stored

## Process

### Step 1: Load Active Rocks
Load the user's rocks from JSONStore:
```bash
node scripts/jsonstore.js list rocks --field owner --value {slug}
```
Filter results to the current quarter and exclude `done` or `cancelled` status.

### Step 1a: Compute the Week Tag

Updates are keyed by `{rock_id}_{YYYY-Www}` where `Www` is the ISO week. Intuitive's operating week runs **Tuesday → Monday** (the office is closed Mondays), so the week tag is computed as follows:

- **Monday updates** → previous ISO week (the operating week that just ended). Compute: ISO week of (today − 1 day), or equivalently `ISO_week(today) − 1` (with year rollover handled correctly).
- **Tuesday through Sunday updates** → current ISO week.

This means a Friday update and the following Monday update both tag the **same** operating week, and re-saving on either day overwrites cleanly.

Before saving, double-check the computed week against the latest existing update for the rock:
- If the computed tag matches an existing update from earlier in the same operating week (e.g. Tue/Wed write, then a Fri review), overwriting is correct — same week.
- If the computed tag matches an update from a *different* operating week (this should not happen with the rule above, but can if cadence has drifted historically), surface this to the user before saving rather than silently overwriting.

Use this command to get the ISO week as a sanity check (zsh/bash on macOS):
```bash
date +"%Y-W%V"   # current ISO week
date -v-1d +"%Y-W%V"   # previous ISO week (use on Mondays)
```

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
{Outcome bullets}

**Two-week milestone**
{Two-week milestone}

**Milestones**
{Milestone table with due dates}

**Latest update** ({date})
{Commentary}
{Detail}
```

2. **Relevance check**: "Is this outcome still clear and relevant? Has anything changed since you set it?" Challenge if the outcome feels stale or if circumstances have shifted.

3. **Last week accountability**: Pull the previous week's update from JSONStore:
   ```bash
   node scripts/jsonstore.js list updates --field rock_id --value {rock_id}
   ```
   Find the most recent update and surface what they committed to:
   - "Last week you said you'd do X. Did that happen?"
   - If it didn't happen, dig into why — don't let it slide
   - If there's no previous update, note this is the first check-in

4. **Ask for status**: Present the options:
   - Off Track
   - Behind, should deliver
   - On Track
   - Done
   - Cancelled

5. **Acknowledge status changes** from last week:
   - Improved: "Nice, moved from {old} to {new}. What drove that?"
   - Declined: "Moved from {old} to {new}. What happened? What's the plan to recover?"
   - Unchanged and behind: "That's {n} weeks at {status} now. What's actually going to change?"

6. **Milestone check**: If a milestone is due soon or overdue, call it out:
   - "Your next milestone is due {date} — are you on track for that specifically?"
   - "This milestone was due {date} and isn't marked done. What's the situation?"

7. **Next week commitment**: "What specifically will you deliver in the next 7 days?" Push for concrete, verifiable actions — not vague intentions.

8. **Provide coaching and challenge throughout** — adapted to their coaching style. Don't wait until the end; challenge in the moment as things come up.

9. **Produce the two outputs**:
   - **Commentary** (for the management pack): Ask the user to give you a one or two sentence summary, or propose one based on the conversation. Keep it tight.
   - **Detail**: You write this — a structured summary of the coaching conversation covering:
     - Outcome relevance: still valid / adjusted
     - Last week's commitments: delivered / missed (and why)
     - Current status and rationale
     - Next week's commitments
     - Risks or blockers surfaced
     - Any coaching points or actions agreed

### Step 3: Save Updates
For each rock reviewed, save two things to JSONStore:

1. **Create an update record** — saves the weekly status snapshot. Use the week tag computed in Step 1a:
   ```bash
   node scripts/jsonstore.js save updates "{rock_id}_{YYYY-Www}" '{
     "rock_id": "{rock_id}",
     "owner": "{slug}",
     "quarter": "{quarter}",
     "week": "{YYYY-Www}",
     "status": "{status}",
     "commentary": "{commentary}",
     "detail": "{detail}"
   }'
   ```

2. **Update the rock's current status** — re-save the rock with the new status:
   ```bash
   node scripts/jsonstore.js save rocks "{rock_id}" '{...updated rock payload with new status...}'
   ```

Check all outputs — if any fail, report the error to the user.

### Step 4: Rocks Summary
Display a clean summary table of all rocks with their updated statuses and pack commentary.

### Step 5: LT Check-in

After the rocks are saved and summarised, transition into the wider weekly check-in. Say something like:

> *"Good — rocks done. Let's do the week more generally now. Six quick prompts, should take about five minutes. Skip any with a one-word answer if there's nothing to say."*

**Tone for this section:** neutral and relaxed. Do NOT use the user's `coaching_style` here — this is a lower-temperature conversation than rock coaching. Acknowledge briefly, move on. You can softly nudge if an answer looks like a status dump, drift, or avoidance — but don't push hard. The point is honesty in five minutes, not a coaching session.

#### Step 5a: Load priority projects

Pull this user's active priority projects from JSONStore — Paul-flagged projects that need a specific named update each week:

```bash
node scripts/jsonstore.js list priority_projects --field owner --value {slug}
```

Filter to `status: active` only. Keep the list — used in Q2 below.

#### Step 5b: Walk the six prompts

Ask one prompt at a time, in order. Wait for an answer before moving on.

**Q1 — How was your week?**
> "How was your week? Just a quick summary."

Capture as `summary` (freeform text).

**Q2 — Priority projects**

If the user has any active priority projects, walk them one by one:

> "You've got [N] priority project[s] flagged. Let's go through them."
>
> For each: *"**{Project name} ({TLC})**. On track / off track, plus a line of commentary?"*

For each project, capture: `tlc`, `name`, `status` (`on_track` | `off_track`), `commentary`.

If the user has no active priority projects, skip Q2 entirely with a single line: *"No priority projects flagged for you this week — moving on."*

Capture all answers as the `priority_updates` array.

**Q3 — Other important projects**
> "Any other important projects you want to flag? You don't have to list every project, just the 2 or 3 that are most important. The right answer might also be zero."

Parse the freeform answer into a `[{ name, commentary }]` array. If the user lists items inline ("Stopsales — Ed is making progress"), structure them yourself. If ambiguous, ask a single clarifying question before saving. Empty answer → empty array `[]`.

**Q4 — Any issue you want me to weigh in on?**
> "Any issue you want me to weigh in on?"

Capture as `issue_to_weigh_in` (freeform). Empty answer is fine — store as empty string.

**Q5 — Anything else I should know?**
> "Anything else I should know?"

Capture as `other` (freeform). Empty answer is fine.

**Q6 — Rate your week 1-10**
> "Rate your week 1-10 (1=terrible, 10=awesome)."

Capture as `rating` (integer 1-10). If they give a non-integer or qualitative answer, prompt once for a number.

#### Step 5c: Save the check-in

Use the same week tag computed in Step 1a — the LT check-in tags the same operating week as the rock updates.

```bash
node scripts/jsonstore.js save checkin "{slug}_{YYYY-Www}" '{
  "owner": "{slug}",
  "week": "{YYYY-Www}",
  "summary": "{Q1 text}",
  "priority_updates": [ { "tlc": "...", "name": "...", "status": "...", "commentary": "..." } ],
  "other_projects": [ { "name": "...", "commentary": "..." } ],
  "issue_to_weigh_in": "{Q4 text}",
  "other": "{Q5 text}",
  "rating": <1-10>,
  "shared_with_lt": false
}'
```

Re-saving in the same operating week overwrites cleanly.

#### Step 5d: Close out

Acknowledge briefly:

> *"Got it — saved. Have a good week."*

Don't summarise the check-in back to them — it's their data, they don't need it read back.

## Coaching During Reviews

Use the coaching style throughout the conversation, not just for weak updates. Challenge the substance of the rock, not just the reporting.

### Tough Love
- "That update tells me nothing. What actually happened?"
- "Two weeks behind and you're saying 'on track'? Let's be honest about where this is."
- "You said you'd do X last week and it didn't happen. What's different this time?"
- "Good. Now what's the ONE thing that needs to happen this week?"

### Socratic
- "What's different from last week?"
- "If you had to bet money on this being done by end of quarter, how confident are you?"
- "What would need to be true for this to move to 'on track'?"
- "You committed to X last week — what got in the way?"
- "Is this outcome still the right target, or has the landscape shifted?"

### Gentle
- "Thanks for the update. Could you add a bit more detail on what happened this week?"
- "I notice this moved to behind — what support would help get it back on track?"
- "Good progress. What's the priority for next week?"
- "Last week's plan didn't quite land — no problem, but let's make sure this week's is realistic."

## Non-Negotiable Rules
- Every update must have both a status AND substantive commentary
- Empty or generic updates ("fine", "going well") must be challenged
- Last week's commitments must be reviewed — no skipping accountability
- The `commentary` field stays short and pack-ready
- The `detail` field captures the full coaching conversation summary
- Save to JSONStore must happen after each rock — never skip this
