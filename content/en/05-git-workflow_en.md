# Chapter 5: Git Workflow Integration

---

## TL;DR

> Claude Code can understand Git history, write commit messages, and do code reviews.
> Integrating it into your Git workflow is one of the simplest ways to double your efficiency.

---

## Claude Code's Git Capabilities

Claude Code can run Git commands directly and understand diffs and history, which means it can:

- Analyze Git history to understand how a feature evolved
- Write meaningful commit messages
- Do pre-commit reviews before you commit
- Analyze PR diffs and give code review feedback
- Help you resolve merge conflicts
- Generate changelogs

---

## The Right Way to Write Commit Messages

**Don't:**

```
git commit -m "fix bugs and update ui"
```

This commit message tells you nothing five years later.

**Use Claude Code instead:**

```bash
# Stage your changes first
git add -p  # or git add specific files

# Then let Claude write the message
claude
> I've made some changes (run git diff --staged to see them)
> Help me write a commit message following Conventional Commits
> Include: type (fix/feat/refactor etc.), scope, concise description
> If the changes are complex, add a body explaining the "why"
```

**Conventional Commits format:**

```
feat(auth): add biometric authentication for iOS 16+

Implement Face ID / Touch ID authentication as an alternative
to password login. Falls back gracefully to password on devices
without biometric hardware.

Closes #234
```

---

## Pre-Commit Code Review (The Most Overlooked Workflow)

Before every commit, let Claude do a quick check:

```bash
claude
> Run git diff --staged to see my staged changes
> Give me a quick review, focusing on:
> 1. Any obvious bugs or missing edge cases
> 2. Any leftover debug code (print, TODO, FIXME)
> 3. Any hardcoded values that should be constants
> Only list important issues, skip optimization suggestions
```

This habit catches 70% of problems before PR review.

---

## Understanding Git History: Code Archaeology

```bash
# Scenario: figure out why a mysterious function exists
claude
> Run git log -p --follow -- Sources/Network/RetryPolicy.swift
> Analyze this file's modification history and tell me:
> 1. What major changes this file has gone through
> 2. What the last major change was trying to solve
> 3. Whether the current implementation has leftover workarounds from the original design
```

```bash
# Scenario: find who introduced a bug and when
claude
> Use git log to find changes to UserSessionManager.swift in the last 3 months
> We started getting session timeout issues in early February 2026
> Analyze which commit most likely introduced this problem
```

---

## Handling Merge Conflicts

Merge conflicts are one of the most frustrating things in development.

**Scenario: a complex conflict**

```bash
# When you hit a conflict
claude
> I got a conflict during git merge, in PaymentViewController.swift
> Run cat PaymentViewController.swift to see the conflict content
>
> Background:
> - The main branch changes: refactored UI layout, replaced frame-based with Auto Layout
> - My branch changes: added Apple Pay support
>
> Help me resolve the conflict, keeping changes from both sides,
> and ensure the logic is correct
```

**Claude will:**
1. Read the conflict file
2. Understand the intent of both sides
3. Provide a merged solution (not just pick one side)
4. Explain why it merged this way

---

## Generating PR Descriptions

```bash
claude
> Run git log main..HEAD --oneline to see all commits on this branch
> Then run git diff main...HEAD --stat to see the change overview
>
> Write a GitHub PR Description:
> - Include: purpose, change summary, testing suggestions
> - Mention any known limitations or follow-up work
```

A well-written PR description makes your reviewers very grateful.

---

## Generating Changelogs

```bash
claude
> I'm releasing a new version v2.3.0
> Run git log v2.2.0..HEAD --oneline to see all changes in this version
>
> Generate a user-friendly Changelog:
> - Categories: New Features, Bug Fixes, Performance Improvements, Breaking Changes
> - Use language non-technical people can understand
```

---

## Looking Back and Comparing

### Understanding the difference between two versions

```bash
claude
> What's the result of git diff v2.0.0 v2.1.0 -- Sources/Core/?
> Tell me what architectural-level changes happened in the Core module between these versions
```

### Finding the source of a regression

```bash
claude
> Use a git bisect strategy to help me find the commit that introduced this problem
>
> Problem: after a user logs out and logs back in, the avatar doesn't refresh
>
> I know:
> - v2.0.0 doesn't have this problem
> - v2.1.0 does
> - There are 23 commits in between
>
> Tell me how to use git bisect to locate it, and how to judge good/bad at each step
```

---

## Branch Management Strategy Advice

```bash
claude
> Look at my current git state: git branch -a and git log --oneline --all --graph
>
> My project uses GitHub Flow, but I've found a few problems:
> 1. Long-running feature branches conflict badly with main
> 2. Emergency hotfixes and feature development get mixed together
>
> Give me advice for improving the branch strategy—don't overcomplicate it
```

---

## Git Hooks Automation

Integrate Claude Code into Git Hooks:

```bash
# In .git/hooks/prepare-commit-msg, add AI assistance
#!/bin/bash
# If commit message is empty, let Claude suggest one
if [ -z "$(grep -v '^#' $1)" ]; then
    echo "# Claude Code suggested message (editable):" > /tmp/claude_suggestion
    claude -p "Based on git diff --staged contents, suggest a concise commit message" >> /tmp/claude_suggestion
    cat /tmp/claude_suggestion >> $1
fi
```

---

## Practical Git + Claude Combination Commands

```bash
# One-step review and commit
claude
> 1. First run git status to see what I've changed
> 2. Run git diff to see the specific changes
> 3. Do a brief code review
> 4. If there are no major issues, help me stage all changes and write a good commit message
> 5. Wait for me to confirm the message before committing

# Quickly understand someone else's PR
claude
> Run git fetch origin && git diff origin/main origin/feature/payment-v2
> Give me a code review summary I can read in 5 minutes

# Clean up stale branches
claude
> List all branches that have been merged into main
> Suggest which ones can be deleted
```

---

## Chapter Summary

Git integration value ranking:

1. **Pre-commit review**: highest ROI, make it a habit
2. **Let Claude write commit messages**: saves time, cleaner history
3. **Merge conflict resolution**: saves huge time and frustration
4. **Code archaeology**: the killer tool for understanding unfamiliar codebases
5. **PR description generation**: makes team collaboration smoother

---

[→ Chapter 6: The Art of Debugging](./06-debugging_en.md)
