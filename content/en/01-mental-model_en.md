# Chapter 1: The Mental Model You Need

---

## TL;DR

> Claude Code is an **AI Agent running in your local environment**.
> It can read files, write files, run commands, and query the internet.
> What it sees = the context you give it + what it finds itself.
> Understand this, and you understand 90% of "why Claude behaves inconsistently."

---

## From ChatGPT to Claude Code: A Mental Shift

Most people's first mental model when using Claude Code is still the ChatGPT model:

```
Me ──ask──> AI ──answer──> Me
```

This model is **wrong for Claude Code**.

The real model is:

```
Me ──task──> AI Agent ──read files──> your codebase
                       ──write files──> your codebase
                       ──execute commands──> your terminal
                       ──query──> the internet
                       ──return results──> Me
```

**It's an Agent, not just a chatbot.**

This difference determines how you use it.

---

## Core Concept 1: The Context Window

Imagine Claude Code's "brain" as a whiteboard of finite size.

```
┌─────────────────────────────────┐
│                                 │
│   Claude's Context Window       │
│                                 │
│  Your conversation history      │
│  Files you've opened            │
│  Tool execution results         │
│  Contents of CLAUDE.md          │
│  ...                            │
│                                 │
│  [Limited capacity—old content  │
│   gets "forgotten" when full]   │
│                                 │
└─────────────────────────────────┘
```

**Key principles:**

- The more precise the information in context, the more accurate the response
- Piling in irrelevant information degrades performance
- Long conversations cause Claude to gradually "forget" early content

**Practical implication:**

Don't dump a 1000-line file and tell it to "just look around."
Tell it to look at lines 234-267, because the problem is there.

---

## Core Concept 2: Tool Use

Claude Code doesn't modify your files directly.

It will:
1. Think about what needs to be done
2. Call a tool (read file, write file, run command, etc.)
3. See what the tool returns
4. Continue thinking
5. Call the next tool
6. …until the task is complete

```
Claude's internal loop:
THINK → ACT → OBSERVE → THINK → ACT → OBSERVE → ...
```

**This means:**

Claude doesn't "write out" your code all at once. It **iterates**, just like a real programmer: reads the code first, understands it, writes, then verifies.

So give it enough time. Don't rush it. A complex task may require a dozen tool calls.

---

## Core Concept 3: The Permission Model

Before taking any action, Claude Code decides whether to ask for your confirmation based on your permission settings.

Three modes:

| Mode | Behavior | Best for |
|------|----------|----------|
| **Default** | Sensitive operations (write files, execute commands) require confirmation | Daily use |
| **Auto-approve (--dangerously-skip-permissions)** | Fully automatic, no questions | Trusted projects, batch operations |
| **Manual review** | Confirm every step | Critical code, production environments |

**Recommendation:**

Use default mode most of the time. For rapid iteration scenarios (writing tests, generating boilerplate), temporarily enable auto mode.
**Never enable auto mode on production servers.**

---

## Core Concept 4: What Claude Code Knows

At startup, Claude Code knows by default:

1. The **file structure** of your current directory (it will actively explore)
2. The contents of `CLAUDE.md` (if it exists)
3. Everything you've said in the conversation

It won't automatically know:

- The requirements in your head
- Your code's "backstory"
- Your team's conventions
- Your project's architecture decisions

**So your first job is always: give it enough background.**

---

## Core Concept 5: Claude Code vs. Code Completion Tools

Many people compare Claude Code with Copilot or Cursor. That's the wrong comparison.

| Dimension | Code completion tools | Claude Code |
|-----------|----------------------|-------------|
| Best for | Writing single lines/functions | Understanding and modifying entire systems |
| Input method | Embedded in editor | Conversation + command line |
| Context range | Near current file | Entire repo + internet |
| Best work granularity | Micro (line/function) | Macro (module/feature) |
| Greatest value | Speed | Understanding |

**Best practice:** Use both together. Use Claude Code to understand and design; use code completion tools to implement quickly.

---

## Mental Model Checklist

Before continuing, make sure you can answer:

- [ ] Is Claude Code a chatbot or an agent? What's the difference?
- [ ] How does the context window limitation affect how I use it?
- [ ] What are the three permission modes and when is each appropriate?
- [ ] What does Claude Code know by default at startup, and what doesn't it know?

If you can answer all of these, congratulations—you already understand it more deeply than 70% of Claude Code users.

---

[→ Chapter 2: Setup & Your First Critical Steps](./02-setup-and-first-steps_en.md)
