# Chapter 8: Building Real Projects

---

## TL;DR

> Using Claude Code to build a complete feature isn't "letting it write code for you."
> It's making it your **technical architecture partner**—designing together, implementing together, validating together.
> This chapter walks through a complete end-to-end example of the right collaboration model.

---

## Case Study: Adding "Offline Mode" to an iOS App

We'll walk through the full lifecycle of this feature from 0 to done.

Requirements:
- Show cached data instead of an error when network is unavailable
- Display an offline indicator
- Auto-sync when connection is restored

---

## Phase 1: Requirement Clarity & Technical Research

**Never start by asking Claude to write code.** Do the technical research first.

```bash
claude
> I want to add offline mode support to this iOS app.
> First read the project structure, especially the network layer and data layer.
>
> Then tell me:
> 1. Is there any existing infrastructure that already supports offline?
> 2. What data needs to be cached (which API calls are most frequent)?
> 3. Which places in the code will need to change due to the "error on no network" design?
>
> Analysis only—no code
```

Claude's analysis gives you a clear picture of the current state and the scope of changes.

---

## Phase 2: Technical Design

```bash
claude
> Based on your analysis, give me 3 technical approaches to implementing offline mode
> Each approach should describe:
> - Core idea
> - Implementation complexity (1-5)
> - Scope of changes to existing code
> - Why it suits (or doesn't suit) our project
>
> I'm leaning toward the approach with minimum changes but best results
```

Let Claude give options; you make the decision. That's the right human-machine division of labor.

---

## Phase 3: Select Approach, Create Implementation Plan

Assuming we choose "Cache + Network Monitor":

```bash
claude
> I choose option 2: URLCache + NetworkMonitor
>
> Create a detailed implementation plan:
> - Break it down into independently committable tasks
>   (code still runs after each task is complete)
> - Estimate complexity for each task
> - Mark which tasks must come before others
>
> Format as a list—I'll use this as my implementation guide
```

**Important principle: break large features into small steps, each independently committable.**

Benefits:
- Each step can be tested
- Easy to revert if something goes wrong
- Cleaner git history

---

## Phase 4: Execute the First Task

```bash
claude
> Start with the first task: create NetworkMonitor
>
> Requirements:
> - Use NWPathMonitor (iOS 12+)
> - Singleton, but supports DI (for testing)
> - Provide both async/await and Combine Publisher interfaces
> - Needs unit tests
>
> Give me the code approach (don't write to files yet), wait for my confirmation
```

Review the approach, suggest changes, then:

```bash
> Looks good, one change: switch the singleton to Environment injection
> Otherwise testing will be painful
> Make that change, then write the files
```

---

## Phase 5: Iterative Validation

After completing each module, validate immediately:

```bash
claude
> NetworkMonitor is done. Help me:
> 1. Write a quick test to verify it works normally in the Simulator
> 2. Check for memory leak risks (especially NWPathMonitor's lifecycle)
> 3. Confirm SwiftUI Preview still works (doesn't crash on Monitor init)
```

---

## Phase 6: Integration

```bash
claude
> NetworkMonitor tests passed
> Now integrate it into APIClient:
>
> Requirements:
> - When network is unavailable, try returning cached data first
> - Cached data should be marked with its source (live vs. cached)
> - Only return a network error if there's no cache either
>
> Read the current APIClient.swift implementation and tell me where to integrate,
> before touching anything
```

---

## Phase 7: UI Layer

```bash
claude
> Now show offline status in the UI
>
> Need an OfflineBanner:
> - Slides in from the top when network is unavailable
> - Automatically slides out when connection is restored
> - Follows NavigationStack without covering the NavigationBar
>
> Reference existing Banner components in Design System, keep consistent visual style
> Write the SwiftUI component first without integrating—let me Preview it first
```

---

## Phase 8: End-to-End Testing

```bash
claude
> The entire offline mode feature is basically done
> Write a UI Test simulating these scenarios:
> 1. Normal data load
> 2. Disconnect network
> 3. Verify OfflineBanner appears
> 4. Verify data is still displayed (from cache)
> 5. Restore connection
> 6. Verify Banner disappears, data refreshes
>
> Use XCUITest + manual network control
> (can use Network Link Conditioner or mocks)
```

---

## Phase 9: Code Review

```bash
claude
> The offline mode feature is fully complete
> Do an overall code review, checking:
> 1. Does all new code follow CLAUDE.md standards?
> 2. Any missing error handling?
> 3. Any potential risks to existing functionality?
> 4. Are documentation comments complete (public API)?
>
> Output as a Code Review, sorted by priority
```

---

## The Core Logic of This Flow

```
Requirements → Technical Research → Design → Break Down Tasks
    ↓
  Execute → Validate → Integrate → Validate → ...
    ↓
  UI → End-to-End Tests → Code Review
```

**Your role at each phase:**

| Phase | You do | Claude does |
|-------|--------|-------------|
| Requirements | Describe needs, answer questions | Analyze existing code, raise questions |
| Design | Make decisions | Provide options and trade-offs |
| Task breakdown | Confirm it makes sense | Create the plan |
| Implementation | Review code, request changes | Write code |
| Validation | Run tests, judge results | Write tests, analyze issues |
| Review | Final decision | Find problems |

**You are always the decision-maker; Claude is always the executor.**

---

## Common Project Types and Specific Techniques

### Integrating a Third-Party SDK

```bash
claude
> I need to integrate the Stripe iOS SDK for payments
> Read their docs (I'll give you the URL) then:
> 1. Tell me the simplest integration approach
> 2. What places in the project need to change
> 3. What security considerations are there
```

### Migrating from Objective-C to Swift

```bash
claude
> Migrate LegacyManager.m / LegacyManager.h to Swift
> Requirements:
> - Keep the interface backward compatible (OC code still calls it)
> - Use modern Swift style (async/await, etc.)
> - Add unit tests covering the main functionality
> Analyze all the public interfaces of this class first, then start the migration
```

### Adding a Widget Extension

```bash
claude
> I want to add an iOS Widget to the app
> First read the main app's data layer, then:
> 1. Design a data sharing scheme between the Widget and main app (App Group)
> 2. Create the basic structure for the Widget Extension target
> 3. Implement a simple medium-size widget showing recent orders
```

---

## Managing Pace on Large Projects

When a feature takes multiple days:

```bash
# Start of each day
claude
> Yesterday we completed NetworkMonitor and the caching layer
> Today we're doing the UI integration
> Quick recap: what's the current code state? What's next?

# End of each day
claude
> Today I completed the OfflineBanner component and NavigationStack integration
> Write a brief progress summary—I'll save it to PROGRESS.md
> That way we have clear context to start tomorrow
```

---

[→ Chapter 9: iOS & Swift Deep Dive](./09-ios-and-swift_en.md)
