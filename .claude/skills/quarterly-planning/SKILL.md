---
name: quarterly-planning
description: Run an EOS quarterly planning session — retrospective on the closing quarter and rock-setting for the next. Use when the user wants to plan the quarter, review last quarter, set next quarter's rocks, or do quarterly planning. Triggers on "quarterly planning", "plan the quarter", "end of quarter", "set next quarter", "quarterly review".
---

# Quarterly Planning — EOS Quarter Transition Skill

Facilitate the end-of-quarter retrospective and next-quarter rock-setting process. This is the most important EOS rhythm — the bridge between quarters.

## Prerequisites

From the project context:
- The user's identity, department, and coaching style
- The closing quarter's rocks
- The upcoming quarter dates
- Rock storage and creation config

## Process

### Part 1: Retrospective (Closing the Quarter)

#### Step 1: Score Each Rock
For each of the user's rocks in the closing quarter, ask for a binary score:
- **Done** — the outcome was achieved as defined
- **Not Done** — it wasn't

No partial credit. Per EOS, a rock is done or it isn't. Push back on "mostly done" or "90% there":
- "Did the outcome happen as stated? Yes or no."
- "If you have to explain why it's 'kind of done', it's not done."

#### Step 2: Reflect on Not Done
For each rock scored Not Done:
- "What got in the way?"
- "Was the rock poorly defined, or was it execution?"
- "What would you do differently?"

Look for patterns across multiple Not Done rocks — same blocker appearing twice is a systemic issue, not bad luck.

#### Step 3: Celebrate Done
Acknowledge completed rocks. This matters — leaders move fast and rarely pause to recognise wins.
- "That's a solid quarter on {rock}. What made the difference?"

#### Step 4: Quarter Summary
Display a scorecard:
```
Q{n} {year} — {Name}
Done:     {count}/{total}
Rate:     {percentage}%

Done:      {list}
Not Done:  {list}
```

EOS target is 80%+ completion rate. Comment on where they landed.

### Part 2: Forward Planning (Next Quarter)

#### Step 5: Carry-Forward Check
For each Not Done rock:
- "Is this still a priority? Should it carry into Q{next}?"
- If yes, should the outcome be revised? Was it too ambitious, or is it the same rock continuing?
- If no, acknowledge and close it

#### Step 6: Identify New Rocks
- "What else needs to be a rock next quarter?"
- "What's the most important thing your department needs to achieve in the next 90 days?"
- "Is there anything from the issues list that's been waiting and needs to become a rock?"

#### Step 7: Create Rocks
For each rock (carry-forward or new), trigger the `/create-rock` flow. All the same rules apply — E, C, D, measurable outcome, milestones.

Remind them of the limit: max rocks per person per quarter.

#### Step 8: Cross-Check (Admin/Team Context)
If in a team planning context:
- Are there dependencies between people's rocks?
- Any gaps — departments with no rocks?
- Any overload — someone with 3 ambitious rocks?
- "Looking at all rocks together, is this a realistic quarter?"

### Part 3: Close

#### Step 9: Save & Confirm
- Update closing quarter rocks with final scores
- New quarter rocks created via `/create-rock`
- **Git: commit to GitHub** — run:
  ```bash
  cd /Users/paulnixon/Dropbox/Agents/IntuitiveEOS
  git pull --rebase
  node scripts/github-commit.js --message "Quarterly planning: {slug} Q{closing} → Q{next}" rocks/Q{closing}_{year}/{slug}/*.yml rocks/Q{next}_{year}/{slug}/*.yml
  ```
  Pass ALL changed rock files. Check the output — if it fails, report the error to the user.
- Display the full picture: last quarter scorecard + next quarter rocks

## Coaching Application

### Tough Love
- "Two out of five. That's 40%. What's going on?"
- "You're carrying this forward for the second time. What's actually going to be different?"
- "Don't set a rock you're not going to finish. Be honest about capacity."

### Socratic
- "What pattern do you see across the rocks that didn't get done?"
- "If you could only do ONE rock next quarter, which would it be? Why?"
- "What would need to change in your week-to-week for this to be done by end of quarter?"

### Gentle
- "Three out of four done — strong quarter. Let's build on that momentum."
- "This one didn't land. That's OK — what did you learn from it?"
- "Let's make sure next quarter's rocks feel achievable. Quality over quantity."

## Timing
Ideally run in the last 2-3 weeks of the current quarter, so the new quarter starts with rocks already defined. Prompt for this if the date is approaching.
