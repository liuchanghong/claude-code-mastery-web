# Chapter 3: The Art of Instructions

---

## TL;DR

> What you say matters more than how smart Claude Code is.
> A bad question + a smart AI = a bad answer.
> A good question + an average AI = a stunning answer.
> This chapter has the highest ROI of anything in this book.

---

## The Nature of Instructions: What Are You Doing?

When you talk to Claude Code, you're doing three things:

1. **Conveying a goal**: what result you want
2. **Conveying context**: what background it needs to know
3. **Conveying constraints**: what can't be done, what must be done

Most people only do the first one.

---

## Comparison: Same Task, Two Approaches

### The Bad Approach

```
> Help me optimize this function's performance
```

Claude's internal monologue:
- Which function?
- What performance issue? Memory? Speed? Battery?
- How much optimization?
- What constraints can't be changed?

Result: A generic answer that may be completely inapplicable.

---

### The Good Approach

```
> Look at the loadUserData() function in UserProfileViewController.swift.
> This function is called every viewDidAppear, causing noticeable lag during scrolling.
>
> I want to:
> - Add caching so the same userID doesn't re-request within 10 minutes
> - Not change the function signature (other places call it)
> - Keep the existing error handling logic
>
> First read this file to understand the current implementation, then tell me your approach.
> Wait for my confirmation before making changes.
```

Claude's internal monologue: Clear.

Result: A precise, immediately usable solution.

---

## The Golden Formula: Goal + Context + Constraints + Action Request

Every good instruction contains these four elements (you don't need to write them all out every time, but think through them):

```
[Goal] I want X
[Context] The background is Y, the relevant files are Z
[Constraints] Can't change A, must maintain B
[Action] First [do what], then [wait for my confirmation / make the change directly / give me suggestions]
```

---

## Six Core Instruction Patterns

### Pattern 1: Exploration & Understanding

For: understanding unfamiliar code, analyzing architecture

```
> Help me understand [filename/module name].
> I especially want to know: [specific question]
> Explain in plain language, assume I'm unfamiliar with this module's history
```

Example:
```
> Help me understand NetworkManager.swift.
> I especially want to know: how the retry logic is implemented and the error handling strategy.
> Use plain language, assume I just joined this project.
```

---

### Pattern 2: Fix a Problem

For: fixing bugs, resolving crashes

```
> I'm getting this error: [exact error message]
> It happens when: [specific scenario]
> The relevant file is: [filename]
> I've already tried: [what you tried], with no effect
> Help me find the cause and fix it
```

**Key principle: paste the full error message, don't just say "there's an error."**

---

### Pattern 3: Implement a Feature

For: adding new functionality

```
> I need to implement [feature description]
> The existing related code is in [filename]
> It should conform to the project's [architecture pattern/coding style]
> First give me an implementation plan, wait for my confirmation before writing code
```

**Make it a habit to see the plan before writing code.** Avoid going halfway and realizing the direction was wrong.

---

### Pattern 4: Refactor & Improve

For: improving code quality

```
> The [function/class] in [filename] needs refactoring
> Main problems: [problem description]
> Refactoring goals: [easier to maintain / better performance / more idiomatic Swift / etc.]
> Constraint: the external interface can't change (or: it can change)
> First analyze the problems with the current code, then give me a refactoring plan
```

---

### Pattern 5: Generate Boilerplate

For: quickly generating repetitive code

```
> Following the pattern of [existing example file], help me generate boilerplate for [new feature]
> Follow the naming conventions of existing code
> Should include: [specific contents]
```

**Always give an existing example.** Let Claude imitate your style rather than inventing its own.

---

### Pattern 6: Analyze & Review

For: code review, quality checks

```
> Review the code in [filename], focusing on:
> 1. Potential memory leaks
> 2. Thread safety issues
> 3. Boundary condition handling
>
> Give the issues as a list, sorted by severity
> Don't modify the code, just give recommendations
```

---

## Magic Words for Instructions

These words significantly improve Claude's behavior:

| Word/phrase | Effect |
|-------------|--------|
| "First...then..." | Controls execution order, prevents Claude from skipping steps |
| "Wait for my confirmation before modifying" | Prevents Claude from diving into code changes |
| "Only change X, don't touch Y" | Precise control of modification scope |
| "Give me 3 options" | Get multiple choices, don't get locked into the first answer |
| "Assume I am..." | Controls depth of explanation |
| "Answer in [language]" | Controls output language |
| "Concise, no explanation needed" | Have it go straight to code, no fluff |

---

## The Art of Context: How Much Is Just Right

**Too little**: Claude guesses your intent, answer goes off track

**Too much**: Context gets filled with irrelevant info, core question gets lost

**Just right**:

```
Precision > Volume
```

Don't say "my whole project is like this... (1000 words)"
Say "the key is that this class inherits UIViewController instead of UITableViewController,
so dequeueReusableCell isn't available"

---

## Multi-Turn Conversation Strategy

Claude Code's multi-turn conversations are stateful—use that well.

**Wrong approach: restart from scratch every time**

```
Turn 1: Help me look at the issues in UserService.swift
Turn 2: Help me look at UserService.swift again, I mentioned before that performance is bad,
        now I want to use caching...
```

**Right approach: build progressively on what came before**

```
Turn 1: Read UserService.swift and tell me your understanding of this class
Turn 2: OK, how is the performance of the fetchUser method?
Turn 3: I want to add caching—what options do you have?
Turn 4: Use the second option, but change the cache time to 5 minutes
```

In this conversation, Claude's context **progressively accumulates**—each turn builds on the previous understanding.

---

## When Claude Gives a Wrong Answer

**Don't:**
```
> You're wrong, try again
```

**Do:**
```
> Your last solution has a problem: [specifically state what the problem is]
> The correct understanding should be: [your understanding]
> Based on this, give me a new approach
```

**Correcting Claude is the same as correcting a human colleague: be specific about the problem, provide the correct context, then ask it to retry.**

---

## Practical: iOS Developer Prompt Templates

```bash
# Analyzing a crash
> Here's the crash log: [paste log]
> App version iOS 17, device iPhone 15
> Help me find the crash cause and fix

# SwiftUI preview issues
> SwiftUI Preview gives this error: [paste error]
> The relevant file is [filename]
> Fix it without changing the actual View logic

# Memory leak
> Instruments found a memory leak in [class name]
> Related code is in [filename]
> Find the leak location, focus on self references in closures

# iOS version compatibility
> [feature] needs to support iOS 15-17
> Current code only considers iOS 17
> Add version checks and backward-compatible implementation
```

---

## Chapter Summary: 5 Principles

1. **Goal + Context + Constraints + Action**: the four elements of a good instruction
2. **Precision over volume**: more isn't better, more accurate is better
3. **Plan before code**: confirm direction on complex tasks before starting
4. **Progressive multi-turn**: make good use of conversation continuity
5. **Specific corrections**: when it's wrong, say specifically what's wrong, not just "incorrect"

---

[→ Chapter 4: Code Operations Mastery](./04-file-and-code-operations_en.md)
