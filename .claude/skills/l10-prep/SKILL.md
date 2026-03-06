---
name: l10-prep
description: Prepare for an EOS Level 10 meeting. Gathers rock status, scorecard items, headlines, and issues into a ready-to-go prep doc. Use when the user wants to prep for their L10, prepare for the weekly meeting, or get ready for the leadership meeting. Triggers on "L10 prep", "meeting prep", "prepare for L10", "weekly meeting", "level 10".
---

# L10 Prep — EOS Level 10 Meeting Preparation Skill

Help the user prepare for their weekly Level 10 meeting by gathering status, flagging issues, and producing a structured prep document.

## Prerequisites

From the project context:
- The user's identity and current rocks
- Current quarter
- Any scorecard/metrics config (if available)

## Process

Follow the standard EOS L10 agenda to gather prep inputs.

### Step 1: Segue
Skip — this happens live in the meeting (personal/professional good news).

### Step 2: Scorecard
Ask: "Any metrics off track this week? Anything to flag on the scorecard?"

If the project has defined scorecard metrics, pull and display them. Otherwise, ask the user to note any numbers that need discussing.

### Step 3: Rock Review
Pull the user's current rock statuses automatically from their rock files.

Display each rock with current status. Ask:
- "Any changes since your last update?"
- "Anything the team needs to know about?"

Flag any rocks that are off track or behind — these will likely generate issues for IDS.

### Step 4: Customer & Employee Headlines
Ask: "Any notable customer or employee headlines this week? Good or bad."
- Keep it to headlines, not full stories — the detail comes in the meeting
- Prompt for both positive and negative

### Step 5: Actions Review
Ask: "How did last week's actions go?"
- For each action from the previous meeting: Done or Not Done
- If tracking actions in the project, pull them automatically
- Flag overdue actions — these often become IDS issues

### Step 6: Issues List
This is the most important prep step. Ask:
- "What issues need to go on the IDS list this week?"
- "Anything bubbling up from your rocks, your team, or cross-department?"
- Help them prioritise: "If we only get to three issues in IDS, which three?"

### Step 7: Generate Prep Doc
Compile everything into a clean, structured document:

```markdown
# L10 Prep — {Name} — {date}

## Scorecard
{flagged metrics or "All on track"}

## Rock Review
| Rock | Status | Note |
|------|--------|------|
| {title} | {status} | {note} |

## Headlines
- {headline 1}
- {headline 2}

## Actions from Last Week
- [x] {done action}
- [ ] {not done action}

## Issues for IDS (prioritised)
1. {issue 1}
2. {issue 2}
3. {issue 3}
```

### Step 8: Output
- Display the prep doc in the conversation
- Offer to copy to clipboard or export (for pasting into meeting notes, Google Docs, etc.)
- Save to the project if there's a designated location

## Coaching Application

### Tough Love
- "You've got two rocks off track and no issues listed. Those ARE your issues."
- "Three actions not done from last week. What's the pattern?"

### Socratic
- "Looking at your rocks and scorecard together, what's the story this week?"
- "If you were running the L10, what would you want to IDS first?"

### Gentle
- "Good prep. Your rocks look solid — the headlines will be useful for the team."
- "Worth flagging that action carry-over. The team can help unblock it."
