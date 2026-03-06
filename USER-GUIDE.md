# TeamTraction — Getting Started

Welcome to TeamTraction, your EOS leadership companion. It runs inside Claude Code and helps you define sharp quarterly Rocks, stay on track with weekly reviews, and think through problems using proven EOS tools.

This guide will get you up and running in about 5 minutes.

---

## What you'll need

1. **Claude Code CLI** — installed and working ([install guide](https://claude.ai/code))
2. **Git access** to the `intuitive-eos` repo (ask Paul if you don't have this)
3. **Your Anthropic licence** (you should already have this)

## Setting up (one-time)

### 1. Clone the repo

```bash
git clone git@github.com:pauln99/intuitive-eos.git
cd intuitive-eos
```

### 2. Install dependencies

```bash
cd scripts && npm install && cd ..
```

### 3. Google Sheets access

Ask Paul for the service account key file, then add this to your `~/.zshrc`:

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY=/path/to/your/service-account-key.json
```

### 4. Launch

```bash
cd intuitive-eos
claude
```

That's it. Claude picks up the project config automatically.

## Your first session

The agent will ask you three things:

1. **Your email** — must be your @intuitivesystems.co.uk address
2. **Your coaching style** — how you want to be challenged when defining rocks:
   - **Tough love** — Direct and blunt. If your rock is weak, you'll hear about it.
   - **Socratic** — Thoughtful questions that help you sharpen your own thinking.
   - **Gentle** — Encouraging nudges toward clearer, stronger rocks.
3. **Your review day** — Friday or Monday, for your weekly rock check-in.

After that, you're set. Every future session opens with your rocks and the menu.

---

## What you can do

TeamTraction has a set of slash commands (skills) for different EOS activities. You can type them directly or just describe what you want — the agent will figure it out.

### Rock management

| Command | What it does |
|---|---|
| `/create-rock` | Walk through creating a new quarterly Rock — outcome, E/C/D check, milestones, the lot. Max 3 per quarter. |
| `/weekly-review` | Update status and commentary on each of your active rocks. Syncs to the team Google Sheet. |
| `/work-on-rock` | Pick a rock and go deep — review progress against milestones, plan next steps, or strategise through blockers. |
| `/export-rocks` | Generate a clean markdown summary of your rocks for sharing or review. |

### Leadership tools

| Command | What it does |
|---|---|
| `/quarterly-planning` | End-of-quarter session. Score last quarter's rocks (done/not done), reflect on what happened, then set next quarter's rocks. |
| `/l10-prep` | Prepare for your weekly Level 10 meeting — pulls your rock status, gathers scorecard flags, headlines, actions, and issues into a ready-to-go prep doc. |
| `/ids` | Structured problem-solving using Identify, Discuss, Solve. Works in two modes: **meeting mode** (facilitating a group issue) or **personal mode** (thinking through a problem on your own with coaching). |
| `/people-analyser` | Assess someone using the EOS People Analyser — core values alignment and GWC (Get it, Want it, Capacity). Confidential — nothing is saved to shared files. |

### Admin only

| Command | What it does |
|---|---|
| `/team-overview` | See all rocks across the whole team for the current quarter, with status and latest updates. |

---

## Quick tips

**Writing good rocks**
- Think outcomes, not activities. What will be TRUE at the end of the quarter?
- "Improve customer service" is not a rock. "Average ticket response under 4 hours with new triage process live" is.
- If you can't measure it, it's not a rock. The agent will push you on this.

**The E, C, D test**
Every rock must pass three checks before it's saved:
- **Exciting** — Does it genuinely excite you?
- **Clear** — Would everyone on the leadership team agree on what "done" looks like?
- **Deliverable** — Can it realistically be finished this quarter?

**The two-week milestone**
You'll be asked: "What will be true in exactly two weeks?" This creates early momentum and catches bad rocks before it's too late. "I'll have started..." doesn't count — what will be DONE?

**Weekly reviews**
- Update every week. Consistency is what makes this useful.
- The agent will push back on vague updates. "Going well" isn't enough — what specifically happened?
- Be honest about status. The point is visibility, not a green dashboard.

**Rock IDs**
Each rock gets a unique ID: `{Department}_Q{n}_{year}_{TLC}`
- Example: `Company_Q2_2026_FIN`
- You choose the three-letter code (TLC) when creating the rock

**Your coaching style**
The agent adapts to your style throughout — during rock creation, weekly reviews, IDS sessions, everything. If you want to change it, just ask.

---

## Personalisation

Want the agent to behave differently for you? You can create a personal config file at `team/{your-slug}.claude.md`. This lets you:

- Change the tone or response style
- Add custom menu options
- Include context about your role ("I'm covering HR until we hire")
- Add entirely new capabilities

The only things you can't override are the core rock rules (E/C/D, max 3 rocks, measurable outcomes, etc.).

---

## Troubleshooting

**"I can't find you in the team"**
Your email doesn't match anyone in the `team/` directory. Ask Paul to add you.

**Google Sheets update fails**
Check that `GOOGLE_SERVICE_ACCOUNT_KEY` is set in your shell and points to the right file.

**Git push fails**
Make sure you have write access to the repo and your SSH key is configured.

**A skill doesn't trigger**
Type the slash command directly (e.g. `/ids`) or just describe what you want in plain English.

---

## Questions?

Ask Paul. This is a living system — feedback and ideas welcome.
