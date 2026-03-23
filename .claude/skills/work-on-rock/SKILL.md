---
name: work-on-rock
description: Deep dive into a specific EOS Rock to review progress, plan next steps, or strategise. Use when the user wants to work on, discuss, plan, or think through a specific rock. Triggers on "work on a rock", "plan my rock", "strategise", "review a rock", "rock deep dive".
---

# Work on a Rock — EOS Rock Strategy & Planning Skill

Help the user think deeply about a specific rock — reviewing progress, planning actions, or strategising approaches.

## Prerequisites

From the project context:
- The user's identity and coaching style
- Their current rocks for the quarter

## Process

### Step 1: Select the Rock
List the user's active rocks and ask which one they want to work on.

### Step 2: Show Full Detail
Display the rock using the standard rock view format:

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

**Risks**
- {Risk 1}
- {Risk 2}

**Milestones**
- [ ] {Milestone} — {due date}
(or *None defined yet* if empty)

**Latest update** ({date})
{Commentary}
(or *No updates yet* if empty)
```

### Step 3: Choose a Mode
Offer three modes:

#### Review Progress
- Walk through each milestone: is it on track? Any slipping?
- Compare current state to where they should be at this point in the quarter
- Highlight upcoming deadlines
- Flag any milestones that are overdue or at risk

#### Plan Next Steps
- Ask: "What needs to happen in the next two weeks?"
- Help break the next milestone into concrete actions
- Identify dependencies, blockers, and who else is involved
- Challenge vague plans — push for specifics

#### Strategise
- Brainstorm approaches to challenges or blockers
- Think through risks: "What could derail this? What's the contingency?"
- Explore trade-offs and priorities
- Help the user think about what they'd do differently if they're behind

### Step 4: Save Changes
If milestones are updated or added during the session, save changes to the rock file, then **commit to GitHub**:
```bash
cd /Users/paulnixon/Dropbox/Agents/IntuitiveEOS
git pull --rebase
node scripts/github-commit.js --message "Update rock: {rock_id}" rocks/Q{n}_{year}/{slug}/{rock-slug}.yml
```
Check the output — if it fails, report the error to the user.

## Coaching Application
Use the user's coaching style throughout. The "strategise" mode especially benefits from style-appropriate questioning:

- **Tough love**: "You're halfway through the quarter and milestone 1 isn't done. What's the real problem here?"
- **Socratic**: "What would you tell a direct report who was in this position with their rock?"
- **Gentle**: "Let's think about what's worked so far and build on that. What's been the biggest win?"
