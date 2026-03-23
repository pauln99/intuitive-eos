# TeamTraction — Getting Started

Welcome to TeamTraction, your EOS leadership companion. It runs inside Claude Code and helps you define sharp quarterly Rocks, stay on track with weekly reviews, and think through problems using proven EOS tools.

This guide will get you up and running in about 10 minutes. No programming experience needed.

---

## What you'll need

1. **An Anthropic account** — Paul will send you an invite if you don't have one
2. **About 10 minutes** for the one-time setup below

---

## Setting up (one-time)

Follow the steps for your computer — **Mac** or **Windows**.

### Mac setup

#### Step 1: Open Terminal

Press **Cmd + Space**, type **Terminal**, and hit Enter. A black/white window will appear — this is where you'll type commands.

#### Step 2: Install Claude Code

Paste this into Terminal and press Enter:

```bash
curl -fsSL https://claude.ai/code/install | bash
```

Follow the prompts. It will install everything needed automatically. When it's done, **close and reopen Terminal**.

#### Step 3: Download the TeamTraction project

Paste this into Terminal and press Enter:

```bash
cd ~/Desktop && git clone https://github.com/pauln99/intuitive-eos.git
```

> **If you see "git: command not found"**, paste the following first, then try again:
> ```bash
> xcode-select --install
> ```
> A popup will appear — click **Install** and wait for it to finish.

This creates a folder called `intuitive-eos` on your Desktop.

#### Step 4: Install dependencies

```bash
cd ~/Desktop/intuitive-eos/scripts && npm install && cd ..
```

#### Step 5: Google Sheets access

Ask Paul for the service account key file. Save it somewhere safe (e.g. your Documents folder), then paste this into Terminal, replacing the path:

```bash
echo 'export GOOGLE_SERVICE_ACCOUNT_KEY=/Users/YOUR_NAME/Documents/service-account-key.json' >> ~/.zshrc
source ~/.zshrc
```

#### Step 6: Set up GitHub access

This lets TeamTraction save your rocks to the shared repo. Paste this into Terminal and press Enter:

```bash
cd ~/Desktop/intuitive-eos && mkdir -p .claude && echo '{"env":{"GITHUB_PAT":"PASTE_TOKEN_HERE"}}' > .claude/settings.local.json
```

**Replace `PASTE_TOKEN_HERE` with the token Paul gives you.** Keep it on one line.

#### Step 7: Launch TeamTraction

```bash
cd ~/Desktop/intuitive-eos
claude
```

That's it! From now on, to start TeamTraction, just open Terminal and run:

```bash
cd ~/Desktop/intuitive-eos && claude
```

> **Tip:** You can drag the `intuitive-eos` folder from your Desktop into Terminal after typing `cd ` to avoid typing the path.

---

### Windows setup

#### Step 1: Install Node.js

1. Go to [https://nodejs.org](https://nodejs.org)
2. Click the big green **LTS** download button
3. Run the installer — click Next through each step, keeping the defaults
4. When it's done, **restart your computer**

#### Step 2: Install Git

1. Go to [https://git-scm.com/downloads/win](https://git-scm.com/downloads/win)
2. Click **Click here to download**
3. Run the installer — click Next through each step, keeping the defaults

#### Step 3: Open a terminal

Press **Windows key**, type **cmd**, and click **Command Prompt**. A black window will appear.

#### Step 4: Install Claude Code

Paste this into the Command Prompt and press Enter:

```cmd
npm install -g @anthropic-ai/claude-code
```

When it finishes, close and reopen Command Prompt.

#### Step 5: Download the TeamTraction project

Paste this and press Enter:

```cmd
cd %USERPROFILE%\Desktop && git clone https://github.com/pauln99/intuitive-eos.git
```

This creates a folder called `intuitive-eos` on your Desktop.

#### Step 6: Install dependencies

```cmd
cd %USERPROFILE%\Desktop\intuitive-eos\scripts && npm install && cd ..
```

#### Step 7: Google Sheets access

Ask Paul for the service account key file. Save it somewhere safe (e.g. your Documents folder), then paste this into Command Prompt, replacing the path:

```cmd
setx GOOGLE_SERVICE_ACCOUNT_KEY "C:\Users\YOUR_NAME\Documents\service-account-key.json"
```

Close and reopen Command Prompt for this to take effect.

#### Step 8: Set up GitHub access

This lets TeamTraction save your rocks to the shared repo. Paste this into Command Prompt and press Enter:

```cmd
cd %USERPROFILE%\Desktop\intuitive-eos && mkdir .claude 2>nul && echo {"env":{"GITHUB_PAT":"PASTE_TOKEN_HERE"}} > .claude\settings.local.json
```

**Replace `PASTE_TOKEN_HERE` with the token Paul gives you.**

#### Step 9: Launch TeamTraction

```cmd
cd %USERPROFILE%\Desktop\intuitive-eos
claude
```

That's it! From now on, to start TeamTraction, just open Command Prompt and run:

```cmd
cd %USERPROFILE%\Desktop\intuitive-eos && claude
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
| `/create-rock` | Create a new quarterly Rock through conversation. Starts by exploring what matters, then shapes the outcome and milestones when the thinking is solid. No rush — it's fine to take multiple sessions. Max 3 per quarter. |
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
- Good rocks come from good conversations. Start by talking about what matters — the definition will follow.
- Think outcomes, not activities. What will be TRUE at the end of the quarter?
- "Improve customer service" is not a rock. "Average ticket response under 4 hours with new triage process live" is.
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
- Example: `Company_Q2_2026_FIN`
- You choose the three-letter code (TLC) when creating the rock

**Your coaching style**
The agent adapts to your style throughout — during rock creation, weekly reviews, IDS sessions, everything. If you want to change it, just ask.

---

## Personalisation

Want the agent to behave differently for you? Ask Paul to set up a personal config. This can:

- Change the tone or response style
- Add custom menu options
- Include context about your role ("I'm covering HR until we hire")
- Add entirely new capabilities

The only things that can't be changed are the core rock rules (E/C/D, max 3 rocks, measurable outcomes, etc.).

---

## Keeping things up to date

Each time you launch TeamTraction, it automatically pulls the latest updates. You don't need to do anything.

If you ever need to manually update, open your terminal and run:

**Mac:**
```bash
cd ~/Desktop/intuitive-eos && git pull
```

**Windows:**
```cmd
cd %USERPROFILE%\Desktop\intuitive-eos && git pull
```

---

## Troubleshooting

**"I need a GitHub token" or rocks aren't saving**
You're missing the GitHub PAT setup. Follow the "Set up GitHub access" step for your platform above. Ask Paul for the token.

**"I can't find you in the team"**
Your email doesn't match anyone in the team directory. Ask Paul to add you.

**Google Sheets update fails**
Check that you set up the service account key in the setup steps above. If unsure, ask Paul.

**"git: command not found" (Mac)**
Run `xcode-select --install` in Terminal, then try again.

**"npm: command not found" or "node: command not found"**
Node.js isn't installed. Follow Step 1 (Windows) or re-run the Claude Code installer (Mac).

**"claude: command not found"**
Close your terminal and open a new one. If it still doesn't work, re-run the Claude Code install step.

**Nothing happens when I type a command**
Make sure you're in the `intuitive-eos` folder before running `claude`. The agent needs to be in the project folder to pick up the configuration.

---

## Questions?

Ask Paul. This is a living system — feedback and ideas welcome.
