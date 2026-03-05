# TeamTraction — User Guide

## What is this?

TeamTraction is your AI-powered EOS Rock management tool. It runs inside Claude Code CLI and helps you:

- Create sharp, measurable quarterly Rocks
- Track progress with weekly reviews
- Push updates to the team's Google Sheet automatically

## Prerequisites

1. **Claude Code CLI** installed and working
2. **Git** access to the `intuitive-eos` repo
3. **Anthropic licence** (you should already have this)

## Getting Started

### 1. Clone the repo

```bash
git clone git@github.com:intuitive/intuitive-eos.git
cd intuitive-eos
```

### 2. Install the Google Sheets dependency (one-time)

```bash
cd scripts && npm install && cd ..
```

### 3. Set up Google Sheets access (one-time)

Ask Paul for the service account key file, then:

```bash
export GOOGLE_SERVICE_ACCOUNT_KEY=/path/to/your/service-account-key.json
```

Add this to your shell profile (`~/.zshrc` or `~/.bashrc`) so it persists.

### 4. Launch TeamTraction

```bash
cd intuitive-eos
claude
```

That's it. Claude will detect the `CLAUDE.md` in the repo and become your TeamTraction agent.

## First Run

On your first launch, the agent will:

1. Ask for your **email address** (must be your @intuitivesystems.co.uk email)
2. Match you to the team roster
3. Ask you to pick a **coaching style**:
   - **Tough love** — Direct, challenging, no fluff
   - **Socratic** — Questions that help you think sharper
   - **Gentle** — Encouraging nudges toward better rocks
4. Ask your preferred **weekly review day** (Friday or Monday)
5. Set up your local config at `~/.teamtraction/`

After that, you'll see the menu every time you launch.

## What You Can Do

### List my rocks
See your current quarter's rocks at a glance — title, status, last update.

### Create a new rock
The agent will guide you through creating a rock step by step:
- What do you want to achieve?
- What's the measurable outcome?
- Is it Exciting? Clear? Deliverable?
- What are your milestones?
- What will be true in two weeks?
- Pick a three-letter code for your Rock ID

You can have a **maximum of 3 rocks** per quarter. Quality over quantity.

### Work on a rock
Pick a rock and:
- Review progress against milestones
- Plan your next steps
- Strategise and think through risks

### Weekly review
Run through each of your active rocks:
- Set a status (Off Track / Behind, should deliver / On Track / Done / Cancelled)
- Add a short commentary on what happened this week
- The agent will push you for substance — "going well" isn't enough
- Updates are saved to the repo AND written to the Google Sheet

### Export my rocks
Generate a clean markdown summary of your rocks. Useful for sharing or reviewing.

## Rock ID Format

Each rock gets a unique ID: `{Department}_Q{n}_{year}_{TLC}`

- **Department**: Company, Operations, Sales & Marketing, etc.
- **Quarter**: Q1, Q2, Q3, Q4
- **Year**: 2026
- **TLC**: A three-letter code you choose (e.g. FIN for Finance System)

Example: `Company_Q2_2026_FIN`

## Tips

- **Be specific.** "Improve customer service" is not a rock. "Reduce average ticket response time to under 4 hours with new triage process live" is.
- **Think outcomes, not activities.** What will be TRUE at the end of the quarter, not what you'll be DOING.
- **The two-week milestone matters.** It creates early momentum and catches bad rocks before it's too late.
- **Update weekly.** The more consistently you update, the more useful this becomes for you and the team.
- **Don't game the status.** If it's off track, say so. The point is visibility, not a green dashboard.

## Troubleshooting

**"I can't find you in the team"**
Your email slug doesn't match a file in `team/`. Ask Paul to add you.

**Google Sheets update fails**
Check that `GOOGLE_SERVICE_ACCOUNT_KEY` is set in your environment and points to a valid key file.

**Git push fails**
Make sure you have write access to the repo and your SSH key is set up.

## Questions?

Ask Paul. This is a living system — feedback welcome.
