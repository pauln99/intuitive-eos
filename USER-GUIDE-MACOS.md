# TeamTraction — Getting Started (macOS)

Welcome to TeamTraction, your EOS leadership companion. It runs inside Claude Code and helps you define sharp quarterly Rocks, stay on track with weekly reviews, and think through problems using proven EOS tools.

This guide will get you up and running in about 10 minutes. No programming experience needed.

---

## What you'll need

1. **An Anthropic account** — Paul will send you an invite if you don't have one
2. **About 10 minutes** for the one-time setup below

---

## Setting up (one-time)

### Step 1: Install a terminal

We recommend **Ghostty** — it's free, fast, and works well with Claude Code.

1. Go to [https://ghostty.org](https://ghostty.org)
2. Click **Download** and choose the macOS installer
3. Open the downloaded file and drag Ghostty to your Applications folder

Once installed, open Ghostty from your Applications folder or Spotlight (Cmd + Space, type "Ghostty"). You'll see a terminal window — this is where you'll type commands.

### Step 2: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the big green **LTS** download button and choose the macOS installer
3. Run the installer — click through the defaults
4. When it's done, **close and reopen Ghostty**

### Step 3: Install Git

Git is usually pre-installed on macOS. To check, paste this into Ghostty and press Enter:

```
git --version
```

If you see a version number, you're good — skip to Step 4.

If you get a popup asking to install developer tools, click **Install** and wait for it to finish, then close and reopen Ghostty.

### Step 4: Install Claude Code

Paste this into Ghostty and press Enter:

```
npm install -g @anthropic-ai/claude-code
```

When it finishes, close and reopen Ghostty.

### Step 5: Download the TeamTraction project

Paste this and press Enter:

```
cd ~/Desktop && git clone https://github.com/pauln99/intuitive-eos.git
```

This creates a folder called `intuitive-eos` on your Desktop.

### Step 6: Install dependencies

```
cd ~/Desktop/intuitive-eos/scripts && npm install && cd ..
```

### Step 7: Launch TeamTraction

```
cd ~/Desktop/intuitive-eos
claude
```

That's it! The agent will check if you have GitHub access configured — if not, it'll walk you through it. Paul will give you the token you need via Slack.

From now on, to start TeamTraction, just open Ghostty and run:

```
cd ~/Desktop/intuitive-eos && claude
```

---

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

You can type these commands directly, or just describe what you want in plain English — the agent will figure it out.

### Rock management

| Command | What it does |
|---|---|
| `/create-rock` | Create a new quarterly Rock through conversation. The agent will coach you through defining a clear, measurable outcome. Max 3 per quarter. |
| `/weekly-review` | Update status and commentary on each of your active rocks. |
| `/work-on-rock` | Pick a rock and go deep — review progress, plan next steps, or strategise through blockers. |
| `/export-rocks` | Generate a clean markdown summary of your rocks for sharing or review. |

### Leadership tools

| Command | What it does |
|---|---|
| `/quarterly-planning` | End-of-quarter session. Score last quarter's rocks (done/not done), reflect on what happened, then set next quarter's rocks. |
| `/l10-prep` | Prepare for your weekly Level 10 meeting — pulls your rock status, gathers headlines, actions, and issues into a ready-to-go prep doc. |
| `/ids` | Structured problem-solving using Identify, Discuss, Solve. Works in two modes: **meeting mode** (facilitating a group issue) or **personal mode** (thinking through a problem on your own with coaching). |

---

## Quick tips

**Writing good rocks**
- Good rocks come from good conversations. Start by talking about what matters — the definition will follow.
- Think outcomes, not activities. What will be TRUE at the end of the quarter?
- Your outcome must pass the **binary test**: on the last day of the quarter, can you answer YES or NO — is this done? No caveats.
- If you can't measure it, it's not a rock. The agent will push you on this.
- It's fine to take multiple sessions. A rock might start as a loose idea and get sharpened over a few conversations.

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
- Example: `Development_Q2_2026_API`
- You choose the three-letter code (TLC) when creating the rock

**Your coaching style**
The agent adapts to your style throughout — during rock creation, weekly reviews, IDS sessions, everything. If you want to change it, just ask.

---

## Personalisation

Want the agent to behave differently for you? Ask Paul to set up a personal config. This can:

- Change the tone or response style
- Add custom menu options
- Include context about your role
- Add entirely new capabilities

The only things that can't be changed are the core rock rules (E/C/D, max 3 rocks, measurable outcomes, etc.).

---

## Keeping things up to date

Each time you launch TeamTraction, it automatically pulls the latest updates. You don't need to do anything.

If you ever need to manually update, open Ghostty and run:

```
cd ~/Desktop/intuitive-eos && git pull
```

---

## Troubleshooting

**"I need a GitHub token" or rocks aren't saving**
The agent will walk you through this on first launch. If it keeps asking, check with Paul.

**"I can't find you in the team"**
Your email doesn't match anyone in the team directory. Ask Paul to add you.

**"npm: command not found" or "node: command not found"**
Node.js isn't installed. Follow Step 2 above and restart Ghostty.

**"git: command not found"**
Follow Step 3 above and restart Ghostty.

**"claude: command not found"**
Close Ghostty and open a new one. If it still doesn't work, re-run Step 4.

**Nothing happens when I type a command**
Make sure you're in the `intuitive-eos` folder before running `claude`. The agent needs to be in the project folder to pick up the configuration.

---

## Questions?

Ask Paul. This is a living system — feedback and ideas welcome.
