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
- Save the markdown file to the project's export location (local only — no GitHub commit needed)
- Display the content in the conversation for immediate review

## Output Format

Use the standard rock view format for each rock:

```markdown
# {User Name} — Q{n} {Year} Rocks

---

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

**Risks**
- {Risk 1}

**Milestones**
- [x] {Done milestone} — {due date}
- [ ] {Pending milestone} — {due date}
(or *None defined yet* if empty)

**Latest update** ({date})
{Commentary}

---
```
