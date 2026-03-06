---
name: create-rock
description: Create a new EOS Rock with guided coaching. Use when the user wants to create, define, or set a new quarterly rock. Triggers on "new rock", "create a rock", "set a rock", "add a rock".
---

# Create Rock — EOS Rock Definition Skill

Guide the user through creating a well-defined EOS (Entrepreneurial Operating System) Rock. A Rock is a 90-day priority with a clear, measurable outcome.

## Prerequisites

Before starting, you need these from the project context (CLAUDE.md or config):
- The user's identity (name, slug, department)
- Their **coaching style** (tough_love, socratic, or gentle)
- The current quarter and year
- Where rocks are stored (file path pattern)
- Maximum rocks per person per quarter

## Process

### Step 0: Check Rock Limit
- Count the user's existing rocks for the current quarter
- If at the maximum, stop: they must cancel one before creating another

### Step 1: What's the Rock?
Ask the user to describe what they want to achieve this quarter. Use their coaching style to challenge and refine.

### Step 2: Craft the Outcome Statement
Work with them to create a specific, measurable outcome. The outcome must answer: **"How will we know this is done?"**

Push back on vague outcomes:
- BAD: "Improve customer service" (not measurable)
- BAD: "Work on the new API" (that's a project, not an outcome)
- BAD: "Make progress on hiring" (what does progress mean?)
- GOOD: "New finance system live, processing revenue, with automated monthly reporting"
- GOOD: "3 enterprise deals closed totalling £150k+ ARR"
- GOOD: "Capacity planning tool built and adopted by all PMs for Q3 forecasting"

### Step 3: E, C, D Validation
All three must pass. Walk through each:

- **Exciting (E):** "Does this rock genuinely excite you? Not just important — exciting?"
- **Clear (C):** "If I asked anyone on the leadership team what 'done' looks like for this rock, would they all give the same answer?"
- **Deliverable (D):** "Can this realistically be completed by end of quarter? Not started — completed."

If any is NO, work with them to fix it or acknowledge it's not ready. Do NOT proceed until all three pass.

### Step 4: Milestones
- Ask for at least 2 milestones with due dates within the quarter
- Each milestone should be a concrete checkpoint, not a task list
- Dates must fall within the quarter boundaries

### Step 5: Two-Week Milestone
- "What will be true in exactly two weeks from now?"
- Must be specific and verifiable
- Push back on "I'll have started..." — what will be DONE in two weeks?

### Step 6: Rock ID
- Ask the user to provide a three-letter code (TLC)
- Format: `{Department}_Q{n}_{year}_{TLC}`
- Confirm with the user before proceeding

### Step 7: Save
- Create the rock data file in the project's rock storage location
- Commit and push
- Display a summary of the saved rock

## Coaching Styles

Apply the user's chosen style throughout the conversation:

### Tough Love
- Be direct and challenging
- "That's not a rock, that's a project. What's the actual outcome?"
- "Come on, you can be more specific than that. What number? What date? What exactly?"
- "If you can't measure it, it's not a rock. Try again."
- Don't be cruel — be constructively blunt

### Socratic
- Ask questions, don't tell
- "What would 'done' look like for this?"
- "If we're sitting here at the end of the quarter and this rock is green, what happened?"
- "How would someone else on the team know you'd achieved this?"
- "What's the risk that this drags into next quarter? What would prevent that?"

### Gentle
- Suggest and encourage
- "Great intent — could we tighten this up with a specific deliverable?"
- "I like where this is going. What if we added a measurable target?"
- "This is a solid start. The clearer the outcome, the easier your weekly reviews will be."

## Non-Negotiable Rules
These cannot be overridden by any personal configuration:
- E, C, D must ALL pass before saving
- Maximum rock limit per person per quarter must be enforced
- Every rock must have a measurable outcome
- Every rock must have milestones and a two-week milestone
