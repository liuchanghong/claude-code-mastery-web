# Preface: Shattering Your AI Illusions

---

## TL;DR

> You've probably been using Claude Code to "generate code."
> Its real power is helping you think through problems, understand systems, and make decisions.
> That gap is what separates people who use the tool from people who own it.

---

## A Scene You'll Recognize

1 AM. You're staring at Swift code.

The crash is in `viewDidLoad`, but you can't see why. You open Claude, paste the code, and ask it to find the problem.

Claude gives you an analysis that sounds plausible. You make the change, run it—still crashing.

You ask again. It answers. You change it again. An hour later, you discover the real culprit: a singleton three files away, causing a memory issue under a race condition.

Claude didn't lie to you. It just never knew those three files existed.

This is how most people use Claude Code: they walk a blindfolded person into a dark room and ask them to find the light switch.

---

## The Real Problem Is Context

Claude Code only knows what you show it. Hand it one function, and that's its whole world. Hand it the full repo, and suddenly it can actually help.

Everything in this book flows from that single insight. Master context management and you've got 80% of Claude Code figured out.

---

## Three Types of Users

**Type 1: Copy-Paste**

Paste code in, copy answers out. Efficiency goes up maybe 20%, but something always feels off.

**Type 2: Conversation-Driven**

Treat Claude like a smart colleague, solve things through dialogue. 3–5x more effective—but it takes a lot of steering.

**Type 3: Systems Thinker**

Claude Code is woven into the whole workflow. It does the right thing at the right time without constant hand-holding. Not just faster—better.

This book trains you from Type 1 to Type 3.

---

## What You'll Realize

By the end, a few things will click:

- Claude Code's greatest strength isn't writing code—it's helping you understand a codebase you've never seen before
- Your prompt quality matters more than the model's capability
- CLAUDE.md is the single most underrated feature in the whole tool
- Workflow integration is the real multiplier
- An iOS developer who actually knows this tool can do the work of three people

---

## What This Book Won't Cover

How to cheat on interviews. Any technique I haven't personally shipped code with. Every technique here has been battle-tested. This is experience, not theory.

---

Open your terminal. Next chapter, we build the mental model that makes everything else click.

[→ Chapter 1: The Mental Model You Need](./01-mental-model_en.md)
