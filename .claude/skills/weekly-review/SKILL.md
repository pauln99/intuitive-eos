---
name: weekly-review
description: Run a weekly EOS Rock status review. Use when the user wants to do their weekly review, update rock status, or check in on progress. Triggers on "weekly review", "check in", "update my rocks", "rock review".
---

# Weekly Review — EOS Rock Status Update Skill

Guide the user through a coaching-driven weekly review of all their active rocks.

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

1. **Create an update record** — saves the weekly status snapshot:
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

### Step 4: Summary
Display a clean summary table of all rocks with their updated statuses and pack commentary.

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
