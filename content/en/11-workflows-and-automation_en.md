# Chapter 11: Workflows & Automation

---

## TL;DR

> Using Claude Code ad-hoc can get you 2-3x efficiency gains.
> Systematically weaving it into your daily workflow delivers 5-10x.
> This chapter presents real, copy-ready workflows.

---

## A Typical Workday for a 10x Developer

### 9:00 AM: Start Work

Don't check email first. Do this instead:

```bash
cd your-project
claude
> Quick status check:
> 1. git status — what unfinished work did I leave yesterday?
> 2. git log --since="yesterday" --oneline — what did I do yesterday?
> 3. Read PROGRESS.md (if it exists) — are there any to-dos?
>
> Give me a "where to pick up today" summary in 3 minutes
```

### 9:10 AM: Get Into Flow

```bash
> Good, continuing work on [feature name]
> We stopped yesterday at [context]
> Next step is [what's next]
> Let's go
```

### Midday: Quick Check-In

```bash
> Quick look at my code changes today (git diff HEAD~3..HEAD)
> Any issues that need immediate attention?
```

### Before Leaving: Wrap Up

```bash
> About to finish for the day. Help me:
> 1. Write the unfinished work list into PROGRESS.md
> 2. Write commit messages for all today's changes
> 3. Quick review of all staged changes—any debug code left over?
```

---

## Workflow 1: New Feature Development

```
1. Requirement confirmation (5 min)
   > I want to build [feature], describe the implementation in plain terms, let me confirm understanding

2. Technical research (10 min)
   > Read relevant code, tell me what infrastructure exists and what needs to be built

3. Design (15 min)
   > Give me an implementation approach, broken into independently testable steps

4. Step-by-step implementation (N loops)
   > Implement step 1 → review → confirm → next step

5. Testing (20 min)
   > Generate unit tests → run tests → fix issues

6. Wrap up (10 min)
   > Pre-commit review → write commit message → commit
```

---

## Workflow 2: Bug Fix

```
1. Gather information (5 min)
   > Collect: crash log + reproduction steps + relevant code + tried methods

2. Root cause analysis (10 min)
   > Give Claude all info, have it analyze root cause (analysis first, no code changes)

3. Hypothesis validation (10 min)
   > If needed, write diagnostic code to confirm the hypothesis

4. Fix (depends on complexity)
   > Confirm approach → implement fix → write regression test

5. Validate (10 min)
   > Verify fix in same scenario → test that related features still work
```

---

## Workflow 3: Code Review

### As the Author

```bash
# Self-review before committing
claude
> Run git diff --staged
> Review these changes as a strict reviewer
> Apply Apple engineer standards
> No encouragement—only issues

# Polish and commit
claude
> Write commit message following Conventional Commits
> Concise, focus on the "why" not the "what"
```

### As the Reviewer

```bash
# Quick understanding of a PR
claude
> This PR changes the following: (paste diff or file list)
> I only have 15 minutes to review
> Help me quickly identify the top 3-5 most important issues
> Skip style issues, focus on functionality and security

# Deep review
claude
> Do a full review of this PR, paying special attention to:
> - Correctness of state management
> - Thread safety
> - Whether error handling is complete
> - Test coverage
```

---

## Workflow 4: Understanding a Codebase (Taking Over a Legacy Project)

One of the most underrated use cases for Claude Code.

### Day 1: Big Picture

```bash
claude
> I just took over this project. Help me build overall understanding.
> In order:
> 1. Read README and main docs (if any)
> 2. Explore directory structure
> 3. Find entry points and core modules
> 4. Give me "5 things a new employee needs to know on day one"
```

### Day 2: Go Deep on the Core

```bash
claude
> Today I want to deeply understand the business core: the payment flow
> Trace the full code path from user tapping "Buy Now" to payment completion
> Draw a text flowchart (use indentation for hierarchy), marking each key decision point
```

### Day 3: Find the Risks

```bash
claude
> Based on your knowledge of this project, tell me:
> 1. Where is the most fragile code (change one line and it might explode)
> 2. What critical paths are most lacking in tests
> 3. Which module carries the most technical debt
> 4. What "traps" should I know about as early as possible in the handover
```

---

## Workflow 5: Refactoring

```
Strategy: don't refactor a large module all at once. Use the Strangler Fig pattern:

1. Create the correct new implementation (parallel to the old one)
2. Gradually migrate callers to the new implementation
3. Delete the old implementation once it's an empty shell

Example prompt:
> I want to refactor NetworkManager but can't break anything currently running
> Use the Strangler Fig pattern:
> 1. Create a new NetworkClient (same functionality but with async/await)
> 2. Have the old NetworkManager internally call NetworkClient
> 3. List everywhere that directly uses NetworkManager (give me a migration plan)
> 4. We migrate in batches
```

---

## Workflow 6: Documentation Generation

```bash
# Generate docs for a module
claude
> Generate README.md for Sources/Core/Network/:
> - Module responsibilities and design decisions
> - Main classes and interface descriptions
> - Usage examples (real code examples)
> - Common issues / notes

# Generate doc comments for APIs
claude
> Add DocComments to all public interfaces in APIClient.swift
> Style: Apple official documentation style
> Content: parameters, return values, throw conditions, at least one usage example

# Update CHANGELOG
claude
> Based on git log v2.4.0..HEAD
> Update CHANGELOG.md
> Format: Keep a Changelog spec
> Describe each change in non-technical language
```

---

## Workflow 7: Performance Optimization

```
1. Measure first (measure before optimizing)
   > Help me design a benchmark to measure the current performance of [feature]

2. Analyze
   > Here's the Instruments data: [paste data]
   > Find the biggest performance bottleneck

3. Optimize
   > Only optimize the biggest bottleneck (don't optimize prematurely)
   > Give me an approach, I confirm before implementation

4. Validate
   > Validate the optimization with the same benchmark
   > Make sure no functional regression
```

---

## Turning Workflows Into Team Standards

If your team also uses Claude Code, standardize the workflows:

### Team CLAUDE.md Template

```markdown
# Team Workflow Standards

## Code Review Standards
Use `/review` command for pre-commit reviews. All P0 issues must be fixed before committing.

## Commit Message Standards
Use Conventional Commits. Use `/standup` command to help generate them.

## Bug Fix Standards
All bug fixes must include a regression test.

## New Feature Development Standards
Features must go through a technical design phase. The approach is documented in the PR description.
```

---

## Automation Scripts: One-Command Workflows

Wrap common Claude Code operations into shell scripts:

```bash
# ~/bin/cc-morning — morning status check
#!/bin/bash
cd $1 || exit 1
claude -p "
Check project status:
1. git status
2. git log --since=yesterday --oneline
3. Read PROGRESS.md if it exists

Give me a summary of where to pick up today (3 sentences max)
"
```

```bash
# ~/bin/cc-review — pre-commit review
#!/bin/bash
claude -p "
Review everything in git diff --staged
If P0 issues exist, output BLOCKED: [issue description]
Otherwise output OK
Only output this one line, nothing else
"
```

---

[→ Chapter 12: Common Mistakes & Fixes](./12-mistakes-and-fixes_en.md)
