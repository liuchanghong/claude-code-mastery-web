# The Mental Model You Need

---

## TL;DR

> Claude Code is an AI Agent running in your local environment.
> It reads files, writes files, runs commands, and queries the internet.
> What it sees = the context you give it + what it finds itself.
> Get this right and 90% of "why is Claude behaving weird" makes sense.

---

## Ditch the ChatGPT Model

Most people's mental model when they first use Claude Code is still this:

```
Me ── ask ──> AI ── answer ──> Me
```

That's wrong. The real model is:

```
Me ── task ──> AI Agent ── reads files ──> your codebase
                          ── writes files ──> your codebase
                          ── runs commands ──> your terminal
                          ── queries ──> the internet
                          ── returns results ──> Me
```

It's an Agent, not a chatbot. This distinction changes everything about how you use it.

---

## Concept 1: The Context Window

Think of Claude's "brain" as a whiteboard with a fixed size.

```
┌──────────────────────────────────┐
│  Claude's Context Window         │
│                                  │
│  Your conversation history       │
│  Files you've shown it           │
│  Tool execution results          │
│  Contents of CLAUDE.md           │
│  ...                             │
│  [When full, old content fades]  │
└──────────────────────────────────┘
```

More precise information in = more accurate output. Dump unrelated stuff in and performance drops. Long conversations cause Claude to gradually forget what you discussed at the start.

Don't paste a 1000-line file and say "just look around." Tell it to look at lines 234–267, because that's where the problem is.

---

## Concept 2: Tool Calls

Claude Code doesn't modify your files directly. Its internal loop looks like this:

```
Think → Call tool → See result → Think → Call tool → See result → ...
```

It iterates, just like a real engineer: read the code, understand it, write it, verify it. A complex task might need a dozen tool calls. Give it time to work.

---

## Concept 3: Permission Modes

| Mode | Behavior | Best for |
|------|----------|----------|
| **Default** | Asks before writing files or running commands | Daily use |
| **Auto-approve** (`--dangerously-skip-permissions`) | No questions, fully automatic | Trusted projects, batch work |

Default mode for most things. Auto mode when you need fast iteration on trusted code. Never on a production server.

---

## Concept 4: What Claude Code Knows at Startup

It knows:
- Your current directory's file structure (it explores actively)
- Whatever's in `CLAUDE.md`
- Everything you've said in the conversation

It doesn't know:
- The requirements inside your head
- Your code's backstory
- Your team's conventions
- Why architecture decisions were made

Your first job is always: give it enough background.

---

## Concept 5: Claude Code vs. Code Completion Tools

| Dimension | Copilot / Cursor | Claude Code |
|-----------|-----------------|-------------|
| Best at | Single lines / functions | Understanding whole systems |
| Context range | Near the current file | Full repo + internet |
| Primary value | Speed | Understanding |

Best practice: use both. Claude Code for understanding and design; completion tools for fast implementation.

---

## Check Your Understanding

Can you answer these?

- Is Claude Code a chatbot or an agent? What's the practical difference?
- How does the context window limit affect how you should use it?
- When should you use auto-approve mode?
- What does Claude Code know at startup, and what doesn't it know?

If you've got those, you already understand this tool better than most people who use it.

[→ Chapter 2: Setup & First Steps](./02-setup-and-first-steps_en.md)
