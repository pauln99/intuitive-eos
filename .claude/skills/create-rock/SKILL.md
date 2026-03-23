---
name: create-rock
description: Create a new EOS Rock with guided coaching. Use when the user wants to create, define, or set a new quarterly rock. Triggers on "new rock", "create a rock", "set a rock", "add a rock".
---

# Create Rock — EOS Rock Definition Skill

Guide the user through creating a well-defined EOS Rock. Rock creation is **iterative and conversational** — it may take multiple sessions to get right. Start with exploration, then tighten up the definition when the thinking is solid.

## Prerequisites

Before starting, you need these from the project context (CLAUDE.md or config):
- The user's identity (name, slug, department)
- Their **coaching style** (tough_love, socratic, or gentle)
- The current quarter and year
- Where rocks are stored (file path pattern)
- Maximum rocks per person per quarter

## Philosophy

Rocks emerge from conversation, not forms. A leader often starts with a fuzzy sense of what matters — "we need to sort out finance" or "hiring is killing us." Your job is to help them think it through, not to rush them into filling in fields.

- **Start loose, tighten gradually.** Don't ask for milestones before the outcome is clear. Don't ask for E/C/D before they've articulated what they actually want.
- **Multiple sessions are normal.** A rock might start as a conversation in one session, get refined in the next, and only get saved in a third. That's fine.
- **Challenge the thinking, not the format.** Push on whether this is the right priority, whether it's achievable, whether it's exciting — not on whether they've filled in every field.

## Process

### Step 0: Check Rock Limit
- Count the user's existing rocks for the current quarter
- If at the maximum, stop: they must complete or cancel one before creating another

### Phase 1: Explore (conversational)

Start with open questions. The goal is to understand what they're really trying to achieve.

- "What's on your mind for this quarter? What feels like it matters most?"
- "Tell me about this — what's the situation right now and where do you want to get to?"
- "Why does this matter? What happens if you don't do it?"

Let them talk. Reflect back what you're hearing. Ask follow-up questions. Use their coaching style (see below) but keep it conversational — this isn't an interrogation.

**Signs you're ready to move to Phase 2:**
- They can articulate a clear "from → to" (current state → desired state)
- They have conviction this is a real priority, not just a nice-to-have
- The scope feels roughly right for a quarter

**Signs you're NOT ready:**
- They're describing a broad area ("improve ops") rather than a specific outcome
- They're listing multiple unrelated things — might be more than one rock
- They seem uncertain whether this is the right focus

If they're not ready, that's fine. Summarise what you've discussed, note the open questions, and suggest they think on it. Offer to pick it up again next time.

### Phase 2: Shape the Rock

Once the thinking is clear, start shaping it into a rock. Work through these **in conversation, not as a checklist:**

**Outcome statement:** Work with them to craft a specific, measurable outcome that passes the **Binary Test**: on the last day of the quarter, can you answer **yes or no** — is this done?

Push back on vague or wordy outcomes:
- BAD: "Improve customer service" (not measurable)
- BAD: "Work on the new API" (that's a project, not an outcome)
- BAD: "Make progress on hiring" (what does progress mean?)
- BAD: "Month-end financials completed by 10th, adjustments <5% budget EBITDA, reporting suite built (P&L vs budget vs reforecast, delta analysis, monthly FY reforecast)" (too many conditions — split into separate rocks or pick the ONE that matters)
- GOOD: "3 enterprise deals closed totalling £150k+ ARR"
- GOOD: "New finance system live and processing all revenue"
- GOOD: "MI v1.0 live with one customer using it"
- GOOD: "All three dev workstreams delivered to spec"

**The binary test — apply this explicitly:**
> "Imagine it's the last day of the quarter. Can you look at this and answer yes or no, with no judgement calls or caveats?"

If the outcome has commas, "and"s, or multiple conditions, challenge it:
- Can it be split into separate rocks?
- If not, which single condition is the one that really matters?
- Aim for ONE sentence, ONE measurable thing

**E, C, D check:** Walk through each naturally:
- **Exciting (E):** "Does this rock genuinely excite you? Not just important — exciting?"
- **Clear (C):** "If I asked anyone on the leadership team what 'done' looks like for this rock, would they all give the same answer?"
- **Deliverable (D):** "Can this realistically be completed by end of quarter? Not started — completed."

If any fails, work with them to fix it. Maybe the scope needs adjusting, or the outcome needs sharpening. This is iterative — don't treat a failed E/C/D as a blocker, treat it as useful signal.

**Milestones:** Do NOT generate or suggest milestones during rock creation. Milestones should be defined by the people doing the work, not invented top-down. The rock will be saved with an empty milestones list. Milestones can be added later via `/work-on-rock` once the team has defined them.

**Two-week milestone:**
- "What will be true in exactly two weeks from now?"
- Must be specific and verifiable
- Push back on "I'll have started..." — what will be DONE in two weeks?

### Phase 3: Save the Rock

Only when all of the following are true:
- Outcome is specific and measurable
- E, C, D all pass
- Two-week milestone is set

Then:
1. Ask the user to provide a three-letter code (TLC)
2. Format the Rock ID: `{Department}_Q{n}_{year}_{TLC}`
3. Confirm the full rock summary with the user
4. Create the rock YAML file at the correct path
5. **Git: commit and push** (see Git Operations below)
6. Display the saved rock using the standard rock view format:

```
### {Rock ID}

# {Title}

Owner      : {Name}
Department : {Department}
Quarter    : Q{n} {Year}
Status     : On Track

**Outcome**
{Outcome statement}

**Two-week milestone**
{Two-week milestone}

**Risks**
- {Risk 1}

**Milestones**
*None defined yet*
```

## Git Operations

After ANY file change (rock creation, update), you MUST commit to GitHub using the API script:

```bash
cd /Users/paulnixon/Dropbox/Agents/IntuitiveEOS
git pull --rebase
node scripts/github-commit.js --message "Add rock: {id}" rocks/Q{n}_{year}/{slug}/{rock-slug}.yml
```

This commits directly via the GitHub API — no `git push` needed. The script handles blob creation, tree updates, and ref advancement, then pulls locally to sync.

**Do not skip this.** Run the command and check the output. If it fails, report the full error to the user — do not silently move on.

### If they're not ready to save

This is perfectly fine. Summarise where you got to:
- What the rock is about
- The current thinking on the outcome
- What still needs to be resolved

Suggest they come back when they've had time to think. They can use `/create-rock` again to pick up where they left off, or `/work-on-rock` if a draft has been saved.

## Coaching Styles

Apply the user's chosen style throughout — but especially in Phase 1 where the conversation is most open:

### Tough Love
- Be direct and challenging
- "That's not a rock, that's a project. What's the actual outcome?"
- "Come on, you can be more specific than that. What number? What date? What exactly?"
- "If you can't measure it, it's not a rock. Try again."
- "Is this really the most important thing you could do this quarter? Convince me."
- Don't be cruel — be constructively blunt

### Socratic
- Ask questions, don't tell
- "What would 'done' look like for this?"
- "If we're sitting here at the end of the quarter and this rock is green, what happened?"
- "How would someone else on the team know you'd achieved this?"
- "What's the risk that this drags into next quarter? What would prevent that?"
- "What would you drop to make room for this?"

### Gentle
- Suggest and encourage
- "Great intent — could we tighten this up with a specific deliverable?"
- "I like where this is going. What if we added a measurable target?"
- "This is a solid start. The clearer the outcome, the easier your weekly reviews will be."
- "No rush to nail this down today — sometimes rocks need a bit of thinking time."

## Non-Negotiable Rules
These cannot be overridden by any personal configuration:
- E, C, D must ALL pass before saving
- Maximum rock limit per person per quarter must be enforced
- Every rock must have a measurable outcome
- Every rock must have a two-week milestone (milestones are added later by the team, not generated during creation)
- Rock ID format must be followed
- Outcome must pass the binary test (yes/no on last day of quarter, no caveats)
- Git commit to GitHub (via `scripts/github-commit.js`) must happen after every file change
