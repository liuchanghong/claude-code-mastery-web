# Chapter 6: The Art of Debugging

---

## TL;DR

> Debugging is the most time-consuming part of development.
> Claude Code can reduce your problem-localization time by 60-80%.
> The key is giving it the right information, not letting it "guess."

---

## The First Principle of Debugging: Information Completeness

The most common reason Claude debugging fails: **incomplete information**.

Information checklist you need to give Claude when debugging:

```
Must provide:
  [ ] Complete error message / crash log
  [ ] The exact scenario where the error occurs (reproduction steps)
  [ ] Relevant code files

Strongly recommended:
  [ ] Methods you've already tried
  [ ] When this problem started appearing
  [ ] iOS version / device type (for iOS dev)

Provide if available:
  [ ] Network requests and responses involved
  [ ] Related logs
  [ ] Data collected from Instruments or other tools
```

---

## Debugging Scenario 1: App Crash

### Standard Format to Give Claude

```
> My app crashes in this scenario:
> [Reproduction steps]
> 1. Open the Profile page
> 2. Tap "Edit Avatar"
> 3. Choose a photo from the album
> 4. Crash
>
> Crash Log:
> [Paste the full crash log, including thread stacks]
>
> The relevant code is the handleImagePick() function in ProfileViewController.swift
>
> Help me analyze the crash cause—don't change code yet, just tell me your assessment
```

### Reading Crash Logs

```
> Here's an EXC_BAD_ACCESS crash:
> [Paste crash log]
>
> Help me interpret:
> 1. Which line of code did the crash occur on
> 2. What type of memory issue this is
> 3. What the call stack looked like at the time
> 4. What the most likely cause is
```

---

## Debugging Scenario 2: UI Not Matching Expectations

### SwiftUI Layout Issues

```
> My SwiftUI View has layout issues on iPad, looks fine on iPhone
> Screenshot attached: [attach screenshot]
> Relevant code is in ProductGridView.swift
>
> Problem: Grid only shows 2 items per row on iPad, but I expect 4
>
> Help me find the cause and fix it
```

### UIKit Auto Layout Issues

```
> There's a constraint giving a runtime warning:
> [Paste warning]
>
> This warning is in UserProfileHeaderView.swift
> Read this file, tell me which constraint has a conflict, and how to fix it
```

---

## Debugging Scenario 3: Performance Issues

### Using Claude to Analyze Bottlenecks

```
> My list has noticeable lag when scrolling
> Using Instruments Time Profiler, found UICollectionViewCell's configure()
> method is taking 34% of CPU time
>
> Relevant code: [paste configure() code]
>
> Analyze the cause, give me optimization options, requirements:
> - Keep the code clean
> - Rough estimate of improvement from each optimization
```

### Memory Issues

```
> Instruments shows memory grows by ~2MB each time I navigate to
> DetailViewController and doesn't get released
>
> Relevant code: DetailViewController.swift and DetailViewModel.swift
>
> Help me find the memory leak, focus on:
> - self references in closures
> - weak/strong on delegates
> - Whether NotificationCenter listeners are removed
```

---

## Debugging Scenario 4: Network Issues

```
> API requests are failing, but only in certain situations
>
> Network request code is in APIClient.swift
> Error: NSURLError -1001 (timeout)
>
> Pattern:
> - First time opening the app: fine
> - After going to background and returning: first request always times out
> - Subsequent requests: back to normal
>
> This pattern makes me suspect a URLSession socket reuse issue
> Help me validate this hypothesis and provide a solution
```

---

## Debugging Scenario 5: Threading Issues

These are the hardest to locate. Claude can help you systematically analyze.

```
> I have an intermittent data race that's hard to reproduce
> Symptoms: list data occasionally displays garbled, or has duplicate/missing items
>
> Data layer code: DataStore.swift
> UI update code: HomeViewController.swift
>
> Help me:
> 1. Find all possible thread safety hazards
> 2. Analyze my data flow, mark which accesses need protection
> 3. Suggest the most appropriate concurrency protection approach
>    (considering Swift actor or DispatchQueue)
```

---

## The Debugging Toolbox

### Tool 1: Let Claude Write Diagnostic Code

```
> Add detailed logging to the syncUserData() method,
> recording execution time and result at each step
> Format: [timestamp] [step name] [result/duration]
> This way I can quickly pinpoint which step failed
```

### Tool 2: Let Claude Write a Reproducing Test

```
> I have a bug: search crashes when the username contains special characters
> Write an XCTest unit test to reproduce this bug
> The test should fail first (verifying the bug exists), then pass after the fix
```

### Tool 3: Hypothesis-Driven Debugging

```
> I have three hypotheses about this crash:
> A. UIImagePickerController delegate crashes on dismiss
> B. Image is too large, causing memory overflow
> C. UI is being updated off the main thread
>
> Help me analyze:
> 1. How likely is each hypothesis?
> 2. How to quickly verify each one?
> 3. Which to verify first (eliminate the fastest)?
```

---

## When Claude Can't Find the Bug

This happens. Here are strategies to get unstuck:

### Strategy 1: Expand the Context

```
> Your previous analysis didn't find the problem. Let me give you more context:
> [Paste more relevant code]
> Here's how this code connects: [explanation]
> Re-analyze
```

### Strategy 2: Change the Angle

```
> Different approach: instead of looking for "where's the bug"
> Help me fully trace this code's execution path
> From the user tapping the button to the final result appearing, what happens at each step
> I'll judge for myself where the problem might be
```

### Strategy 3: Let Claude Admit Its Limits

```
> How confident are you in this analysis?
> What are the areas you don't have enough information to judge?
```

Claude will tell you what it's uncertain about, which is more valuable than a wrong answer.

---

## iOS-Specific Debugging Quick Reference

| Issue type | Key info to give Claude |
|-----------|------------------------|
| EXC_BAD_ACCESS | Full crash log + suspicious pointer/memory operation code |
| Main Thread Checker | Warning message + related UI update code |
| Memory Leak | Instruments screenshot/data + relevant class code |
| UIKit Constraint Warning | Full warning text + layout code for related Views |
| Keychain issues | Error code + calling code + entitlements config description |
| Push Notification not arriving | Describe registration flow + server config + certificate situation |

---

## Chapter Summary

Golden principles of debugging:

1. **Complete > concise**: when debugging, give more rather than let Claude guess
2. **Analyze before modify**: let Claude tell you its assessment, you confirm, then change
3. **Hypothesis-driven**: give Claude your own hypotheses, let it help validate them
4. **Admit limits**: when Claude is uncertain, have it say so—that's valuable
5. **Write tests to reproduce**: a test that reproduces the bug beats guessing every time

---

[→ Chapter 7: The CLAUDE.md Secret](./07-claude-md-mastery_en.md)
