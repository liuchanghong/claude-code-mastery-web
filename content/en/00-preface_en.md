# Chapter 0: Preface — Shattering Your AI Assistant Illusions

---

## TL;DR

> You've probably been using Claude Code to "write code."
> But what it can actually do is help you "think through problems, understand systems, and make decisions."
> That difference determines whether you're a user of the tool, or its master.

---

## A Real Scenario

1 AM. You're staring at a piece of Swift code.

The crash is in `viewDidLoad`, but no matter how hard you look, you can't see the problem. You open Claude, paste the code, and say: "Help me find what's wrong with this code."

Claude gives you an analysis that sounds reasonable. You change it accordingly, run it again—still crashing.

You ask again. It answers again. You change it again.

An hour later, you discover the real problem: a singleton three files away causing a memory issue under a race condition.

**Claude didn't lie to you. It just didn't know those three files existed.**

This is how most people use Claude Code: **leading a blind man into a dark room and asking him to find the light switch.**

---

## Where the Real Problem Lies

It's not that Claude isn't smart enough.

The problem is **context**.

Claude Code only knows what you tell it. Give it one function, it only sees that function. Give it the whole repo, and it can truly help you analyze.

**The first thing this book does is make you fully understand the concept of "context."** Because mastering context management is mastering 80% of Claude Code.

---

## Three Types of Claude Code Users

**Type 1: Copy-Paste Users**

Copy code in, copy answers out.

Result: 20% efficiency gain, but always feels like something's missing.

**Type 2: Conversation-Driven Users**

Treat Claude Code like a smart colleague, solve problems conversationally.

Result: 3-5x efficiency gain, but requires lots of guidance.

**Type 3: Systems Thinkers**

Integrate Claude Code into the entire workflow, letting it do the right thing at the right time.

Result: Not just efficiency—overall development quality jumps to a new level.

**This book trains you from Type 1 to Type 3.**

---

## What You'll Discover

After reading this book, you'll realize:

1. **Claude Code's greatest strength isn't writing code**—it's helping you understand an unfamiliar codebase
2. **Your prompt quality matters more than the model itself**
3. **The CLAUDE.md file is the most underrated feature**—without exception
4. **Workflow integration** is the true multiplier
5. **An iOS developer who knows Claude Code well** can do the work of three people

---

## What This Book Won't Teach You

- How to use Claude Code to cheat (interviews, exams)
- How to use it for bad purposes
- Any technique I haven't personally used

Every technique in this book has been battle-tested. Not theory—experience.

---

## Now, Begin

Open your terminal.

Next chapter, we build the core mental model you need.

Without this model, everything else is a castle built on sand.

[→ Chapter 1: The Mental Model You Need](./01-mental-model_en.md)
