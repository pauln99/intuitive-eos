---
name: review-rocks
description: Review and sign off team members' rocks. Admin only. Use when the user wants to review rocks, sign off, give feedback on rocks, or approve rocks. Triggers on "review rocks", "sign off", "approve rocks", "check new rocks", "review unsigned rocks".
---

# Review Rocks — Admin Rock Sign-Off Skill

Review unsigned rocks from team members, provide feedback, and sign off when they're ready. **Admin access required.**

## Prerequisites

From the project context:
- The user must have admin privileges
- Current quarter
- All team members and their rocks (from JSONStore)
- Team member email addresses (from JSONStore team type)

## Process

### Step 1: Verify Access
Check that the user has admin privileges. If not, decline: "Rock review is only available to admins."

### Step 2: Load Unsigned Rocks
Load unsigned rocks from JSONStore:
```bash
node scripts/jsonstore.js list rocks --field signed_off --value false
```
Filter to the current quarter. Group by owner.

If there are no unsigned rocks, say so: "All rocks are signed off. Nothing to review."

### Step 3: Present Rocks for Review
For each unsigned rock, show:
- **Owner** and **Rock ID**
- **Title**
- **Outcome statement**
- **Two-week milestone**
- **E, C, D** status

### Step 4: Review Each Rock
For each rock, ask Paul:

**"What do you think?"**

Three options:

#### Sign Off
Paul is happy with the rock.
- Update the rock in JSONStore with `signed_off: true`:
  ```bash
  node scripts/jsonstore.js save rocks "{rock_id}" '{...rock payload with signed_off: true...}'
  ```
- Move to the next rock

#### Request Changes
Paul wants changes. Ask what the feedback is, then:
- Use the `/delegate` skill to draft a Gmail to the rock owner with:
  - Which rock needs changes
  - What specifically needs to change
  - A clear ask: "Please update this and commit — I'll review again"
- OR if Paul prefers Slack, summarise the feedback clearly so he can copy-paste it
- Do NOT change the rock file — the owner makes the changes themselves

#### Skip
Paul wants to come back to this one later. Move to the next rock.

### Step 5: Summary
After reviewing all unsigned rocks, show a summary:
```
Signed off:        {count}
Changes requested: {count}
Skipped:           {count}
Still unsigned:    {count remaining}
```

## What to Look For

When presenting rocks, flag potential issues to help Paul's review:
- **Outcome fails the binary test** — multiple conditions, vague language, can't answer yes/no
- **Outcome is too ambitious or too easy** for a single quarter
- **Two-week milestone is weak** — "started X" instead of a concrete deliverable
- **E, C, D concerns** — is this really exciting? Is it truly clear?

Don't block or reject — just flag. Paul makes the call.

## Data Operations

Each sign-off is saved individually to JSONStore via `scripts/jsonstore.js save`. No batching needed — each save is atomic and immediate.
