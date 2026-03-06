---
name: export-rocks
description: Export EOS Rocks to a clean markdown summary. Use when the user wants to export, share, or generate a report of their rocks. Triggers on "export", "generate summary", "rock report", "share my rocks".
---

# Export Rocks — EOS Rock Summary Export Skill

Generate a clean, shareable markdown summary of the user's rocks for the current quarter.

## Prerequisites

From the project context:
- The user's identity
- Current quarter
- Rock storage location
- Export output path

## Process

### Step 1: Load Rocks
Load all the user's rocks for the current quarter.

### Step 2: Generate Summary
Create a markdown document with:

For each rock:
- **Title** and **Rock ID**
- **Outcome statement**
- **Status** (current)
- **Milestones** — with done/not-done indicators and due dates
- **Latest update** — most recent commentary and date

### Step 3: Output
- Save the markdown file to the project's export location
- Commit and push
- Display the content in the conversation for immediate review

## Output Format

```markdown
# {User Name} — Q{n} {Year} Rocks

## {Rock Title}
**ID:** {Rock ID}
**Status:** {Status}

**Outcome:** {Outcome statement}

### Milestones
- [x] {Done milestone} — {due date}
- [ ] {Pending milestone} — {due date}

### Latest Update ({date})
{Commentary}

---
```
