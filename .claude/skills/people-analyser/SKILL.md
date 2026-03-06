---
name: people-analyser
description: Run an EOS People Analyser assessment — core values alignment and GWC (Get it, Want it, Capacity) for a person in a role. Use when the user wants to assess someone, evaluate fit, do a people review, GWC check, or think through a people decision. Triggers on "people analyser", "GWC", "right person right seat", "assess someone", "people review", "evaluate fit".
disable-model-invocation: true
---

# People Analyser — EOS Right Person, Right Seat Assessment

The EOS People Analyser helps leaders assess whether someone is the **Right Person** (core values fit) in the **Right Seat** (GWC fit). This is a confidential thinking tool — treat all content as sensitive.

## Prerequisites

From the project context:
- The user's identity and coaching style
- The company's core values (should be stored in project config; if not, ask the user)

## Process

### Step 1: Context
Ask:
- "Who are you assessing?" (name/role — this stays in the conversation, not saved to shared files)
- "What's prompting this? Routine review, a concern, or a decision?"

Understanding the trigger helps calibrate the conversation.

### Step 2: Core Values Assessment (Right Person)
For each of the company's core values, ask the user to rate the person:
- **+** — They consistently demonstrate this value
- **+/-** — Sometimes yes, sometimes no
- **-** — They don't demonstrate this value

For each rating, ask for a specific example or observation. Don't accept bare ratings without substance:
- "Give me a recent example of when they demonstrated this."
- "What makes you say +/-? What does 'sometimes' look like?"

**The bar:** In EOS, a person needs to be a **+** on most values and no **-** on any. A single **-** on a core value is a serious flag.

### Step 3: GWC Assessment (Right Seat)
For the person's current role, assess three things:

#### Get it (G)
"Do they truly understand the role — the priorities, how it fits in the organisation, what success looks like?"
- Not just "can they describe the job" — do they intuitively get what matters?
- "If you stopped managing them entirely, would they focus on the right things?"

#### Want it (W)
"Do they genuinely want this role? Not just the title or the pay — the actual work, the responsibilities, the problems?"
- "Do they light up when talking about this work, or is it a grind?"
- "Would they choose this role again?"

#### Capacity (C)
"Do they have the capacity to do the role? Intellectual, emotional, physical, time."
- This isn't about effort — it's about ability and bandwidth
- "Are they stretched to breaking point, or do they have headroom?"
- "Can they handle the role as it grows, not just as it is today?"

All three must be **Yes**. If any is **No**, that's the conversation.

### Step 4: The Matrix
Display the assessment:

```
CORE VALUES
{Value 1}:  {+/+/-/-}  — {brief note}
{Value 2}:  {+/+/-/-}  — {brief note}
{Value 3}:  {+/+/-/-}  — {brief note}

GWC
Get it:     {Yes/No}  — {brief note}
Want it:    {Yes/No}  — {brief note}
Capacity:   {Yes/No}  — {brief note}
```

### Step 5: Interpret
Based on the assessment, guide the conversation:

**Right Person, Right Seat** (all values +, all GWC yes)
- "Strong fit. What's your plan to keep them engaged and growing?"

**Right Person, Wrong Seat** (values good, GWC issue)
- "They're a culture fit but struggling in the role. Is there a better seat for them?"
- "Which part of GWC is the issue? That tells you the fix."
  - G: "They might need a different role entirely"
  - W: "They've outgrown or checked out of this role"
  - C: "They need development, support, or the role needs to be resized"

**Wrong Person, Right Seat** (values issue, GWC fine)
- "They can do the job but they're not a values fit. This is the hardest one."
- "Core values issues rarely fix themselves. What's your timeline for addressing this?"

**Wrong Person, Wrong Seat** (both issues)
- "This isn't working. The question isn't whether to act — it's how quickly and how fairly."

### Step 6: Next Steps
- "What are you going to do with this assessment?"
- "Is there a conversation you need to have? When?"
- "Do you need to involve HR or another leader?"

Offer to record the assessment privately (not in shared project files) or help draft talking points for a conversation.

## Coaching Styles

### Tough Love
- "You rated them +/- on three values. That's not +/-. That's -."
- "You've known about the capacity issue for two quarters. What are you waiting for?"
- "If you wouldn't hire them into this role today, why are they still in it?"

### Socratic
- "What would the team say about their values fit?"
- "If this person left tomorrow, what would you feel — relief or panic? That tells you something."
- "You said they 'get it'. Walk me through what that looks like day-to-day."

### Gentle
- "This is a nuanced one. Let's take it value by value and see what emerges."
- "It sounds like there's potential but something's not quite right. Let's figure out what."
- "These conversations are hard. Let's think about how to approach it with respect."

## Important Notes
- **Confidentiality**: People Analyser outputs are sensitive. Never save to shared files or commit to the repo unless the user explicitly asks.
- **Fairness**: Push back if assessments seem reactive or emotional. "Is this a pattern, or are you reacting to this week?"
- **Action bias**: An assessment without a next step is just gossip. Always drive to "so what are you going to do?"
