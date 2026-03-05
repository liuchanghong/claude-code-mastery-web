# Chapter 12: Common Mistakes & Fixes

---

## TL;DR

> Most people fall into the same traps.
> This chapter distills hard-won experience so you avoid months of stumbling.
> Every mistake has a concrete fix.

---

## Mistake 1: Using Claude Code as a Code-Generation Machine

### Symptoms

```
"Write me a user login feature"
→ Claude generates some code
→ Directly copy-pasted into project
→ Doesn't match existing code style or architecture at all
→ Massive rework
→ Would've been faster to write it yourself
```

### Why This Happens

Claude Code doesn't know your project's architecture. Generated code is generic, not tailored to you.

### Fix

```
# Give it context, have it match your patterns
> Read the code in Sources/Features/Profile/
> I want to add similar login checking logic to the Cart module
> Follow the Profile module's pattern—don't invent a new one
```

**Principle: let Claude imitate, not invent.**

---

## Mistake 2: Asking for Code at the Wrong Time

### Symptoms

```
Problem appears → immediately ask Claude to fix code → more problems → revert → ask Claude again → loop
```

### Why This Happens

Diving in without understanding the problem first. Fixing symptoms, not the cause.

### Fix

```
Iron rule: always have Claude explain the root cause before any change

> Analyze the root cause of this problem
> Tell me possible solutions and their trade-offs
> After I choose an approach, then write code
```

**"Diagnose first, prescribe later"—this principle applies to both debugging and feature development.**

---

## Mistake 3: Describing Code in Natural Language

### Symptoms

```
"I have a Manager class that has some methods handling user data, I want to refactor it into..."
→ Claude generates code based on your description
→ Very different from the actual code
→ Should have just shown it the code
```

### Fix

**Don't describe code—give it the code.**

```bash
# Bad
> I have a UserManager with fetchUser, updateUser, deleteUser methods...

# Good
> Read Sources/Core/UserManager.swift
> I want to refactor it into the Repository pattern
```

---

## Mistake 4: Excessively Long Single Sessions

### Symptoms

- Using the same Claude session for 2+ hours
- Claude starts forgetting decisions made early in the session
- Same question getting different answers
- Responses becoming increasingly vague

### Why This Happens

Context window is full; early information is compressed or forgotten.

### Fix

```bash
# Every 30-40 minutes, save the current state
> Save the key decisions and conclusions from our session to CONTEXT.md

# Opening a new session
> Read CONTEXT.md, continue our previous work
> What we need to do now is [next step]
```

---

## Mistake 5: Blindly Trusting Claude's Answers

### Symptoms

```
Claude says "the problem is X" → you fix X → problem not solved
Claude says "use this API" → you use it → API deprecated in iOS 17
Claude gives code → you use it directly → has a subtle bug
```

### Why This Happens

Claude makes mistakes. Especially in these situations:
- Vague input
- Version-specific questions
- Decisions requiring your personal preference
- Complex multi-file dependency relationships

### Fix

**Be critical of everything Claude outputs.**

Build a "verify before acting" habit:

```bash
# Verify a new API
> Is the API you mentioned available on iOS 16? What's the minimum version?

# Verify logic
> Walk through your logic with this test case: [specific case]
> The result should be [expected result]—can your approach handle this correctly?

# Verify impact
> Will this change affect [related feature]? Why?
```

---

## Mistake 6: Making "Saving Time" the Only Goal

### Symptoms

```
Let Claude write all the code
→ You don't understand the code
→ When problems occur, you don't know how to debug
→ Future changes break previous logic
→ Technical debt accumulates
```

### Fix

**Claude Code should help you do things you understand faster—not help you skip understanding.**

When Claude generates complex code:

```bash
> Before you write code, explain your implementation approach
> I need to confirm I understand the plan before continuing

> After writing, explain the 3 most critical points in this code
> I need to be able to maintain this code later
```

---

## Mistake 7: Not Maintaining CLAUDE.md

### Symptoms

- Re-explaining project background every time
- Claude's code style doesn't match the project
- Always correcting the same issues

### Fix

Make maintaining CLAUDE.md a habit:

```bash
# When you discover a new project rule
> Add this convention to CLAUDE.md: [describe the convention]

# When you find a wrong rule
> Update CLAUDE.md, change the rule about X to Y

# Every Friday, spend 5 minutes
> Review the corrections I made to Claude this week
> See which ones need to be written into CLAUDE.md
```

---

## Mistake 8: Giving Claude a Task That's Too Complex at Once

### Symptoms

```
> Help me migrate the entire app from UIKit to SwiftUI,
> while changing the architecture from MVC to MVVM,
> and add unit tests, and optimize performance while you're at it...
→ Claude starts, runs out of context halfway through
→ Changes are messy, can't revert
→ Project is in a half-changed state
```

### Fix

**Do one thing at a time.**

Any task that looks "complex"—decompose first:

```bash
> I want to do [big task]
> Help me break it into:
> - Each step is independently committable
> - Project still runs after each step is done
> - Ordered by dependencies
>
> List all steps, then we start from step one
```

---

## Mistake 9: Ignoring Uncertainty Claude Expresses

### Symptoms

```
Claude: "This might be issue X, but I'm not sure—need more info to verify..."
You: directly go fix X
→ Fix was wrong
```

### Fix

When Claude expresses uncertainty, **eliminate the uncertainty before acting**:

```bash
> You said it "might" be problem X. Help me design a validation approach.
> If it is X, what observable symptoms would there be?
> If it's not X, what would look different?
```

---

## Mistake 10: Using Claude Code to Look Up Documentation

### Symptoms

```
> What does @MainActor mean in Swift?
→ Get an explanation
→ Official docs would've been more accurate
```

### Fix

For pure Swift/iOS API reference, go directly to [Apple's official docs](https://developer.apple.com) or Dash—it's more accurate.

Claude Code's advantage is analyzing and applying things **in the context of your specific code**:

```bash
# Not worth using Claude for
> What is @MainActor in Swift?

# More valuable use of Claude
> Should this code (paste code) use @MainActor or
> DispatchQueue.main.async? Analyze my specific situation and advise
```

---

## Quick Reference: Common Problem Diagnosis

| Problem | Most Likely Cause | Fix |
|---------|------------------|-----|
| Claude generated code that doesn't match project style | No example given / no CLAUDE.md | Give similar existing code as a reference |
| Claude's analysis is inaccurate | Insufficient context | Give more related files |
| Claude keeps giving the same wrong answer | Question phrasing is misleading | Ask from a different angle |
| Quality degrades mid-session | Context window full | /compact or start a new session |
| Claude missed a critical dependency | Didn't communicate file relationships | Explicitly explain how files are connected |
| Claude gave buggy code | Edge cases not fully described | Explicitly state edge cases in the requirements |

---

[→ Chapter 13: The Expert Mindset](./13-expert-mindset_en.md)
