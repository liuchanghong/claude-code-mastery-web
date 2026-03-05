# Chapter 4: Code Operations Mastery

---

## TL;DR

> Claude Code can read any file, write any file, and search across the entire repo.
> Most people only use "help me fix this piece of code."
> This chapter covers the remaining 80%.

---

## Full Panorama of File Operations

```
Read operations:
  - Read a single file
  - Read multiple files and analyze them together
  - Search across the repo by keyword
  - Find specific patterns (regex)
  - Read directory structure

Write operations:
  - Modify specific lines in an existing file
  - Create new files
  - Batch modify multiple files
  - Rename/move files (via commands)

Analysis operations:
  - Analyze dependencies between files
  - Find all usages of a method
  - Analyze code complexity and quality
```

---

## Let Claude Explore on Its Own (Instead of You Directing Every Step)

**Inefficient approach:**

```
> Read AppDelegate.swift, then read SceneDelegate.swift, then read MainViewController.swift
```

**Efficient approach:**

```
> Starting from the entry file, explore this project's startup flow yourself and tell me:
> 1. The complete path of the app startup
> 2. What the first ViewController is and how it's created
```

The difference: you're telling it the **goal** and letting it decide the **path**. That's the correct way to use an Agent.

---

## Precise Targeting for Modifications

Don't let Claude guess what you want to change—be precise.

### By Function Name

```
> Modify the request() function in NetworkManager.swift:
> Add timeout handling, 30-second timeout
```

### By Line Number

```
> Lines 124-156 of UserViewController.swift is the setupUI() function
> Replace hardcoded color values with UIColor.systemBackground and other system colors
```

### By Pattern

```
> Find all methods still using @escaping closure completion handlers
> Convert them to async/await style (Swift 5.5+)
```

---

## Multi-File Coordinated Changes

This is Claude Code's true superpower.

### Scenario: Renaming a Class

```
> I want to rename UserManager to UserService
> Need to:
> 1. Rename the class definition file
> 2. Update all files that reference this class
> 3. Update related test files
>
> First tell me how many files are involved, let me confirm before making changes
```

Claude will:
1. Use Grep to search all `UserManager` references
2. List all files that need changes
3. Wait for your confirmation
4. Modify them one by one

**This task would take 30 minutes by hand. Claude does it in 30 seconds.**

---

### Scenario: Unifying Error Handling Patterns

```
> This project uses try-catch in some places, Result<> in others,
> and some places just return nil directly.
>
> I've decided to standardize on Result<Success, AppError>.
>
> 1. First help me find all inconsistent places
> 2. Give me a migration plan
> 3. Start with the most critical NetworkLayer
```

---

## The Power of Code Search

### Find All Potential Issues

```
> Search the entire project for all force unwrap (!) uses
> Exclude test files
> Group by file, and assess whether each is dangerous
```

```
> Find all places where network requests might be happening on the main thread
> This code could cause UI lag
```

```
> Find all files over 200 lines
> These files might need to be split
```

### Understand Dependencies

```
> Find all code that depends on UserDefaults
> I want to replace UserDefaults with encrypted storage
> First let me understand the impact scope
```

---

## Bulk Code Generation

### Generate Tests

```
> Generate unit tests for every public method in UserService.swift
> Test file goes in Tests/UserServiceTests.swift
> Use XCTest, follow Given-When-Then pattern
> Use mocks for network requests
```

### Generate Documentation

```
> Generate Swift DocComments for all public APIs in APIClient.swift
> Style: Apple official documentation style
> Include parameter descriptions, return value, possible throws
```

### Generate Boilerplate

```
> I need a new ViewModel: ProductViewModel
> Following the pattern of UserViewModel.swift
> The data model is Product (see Models/Product.swift)
> Needs: list loading, search filtering, single product detail
```

---

## Advanced Uses for Reading Code

### Understanding Complex Logic

```
> Read PaymentProcessor.swift—this code logic is complex
> Describe the entire processing flow in a text flowchart (use indentation for hierarchy)
> Emphasize the handling of edge cases
```

### Finding the "Why"

```
> This code (lines [range]) looks strange, with a lot of workarounds
> Help me understand: why do these special cases exist?
> What historical reasons or iOS version compatibility issues might explain them?
```

### Assessing Risk

```
> I'm going to modify the migrate() function in DatabaseManager.swift
> First help me analyze: what might be affected by changing this function?
> What are the potential risks?
```

---

## Practical: Full Refactoring Flow for a Real File

```
# Step 1: Understand the current state
> Read LegacyUserController.swift and tell me the problems with this file

# Step 2: Make a plan
> Give me a refactoring plan to break this MVC "fat controller" into MVVM,
> requirements:
> - No change to any UI behavior
> - Can be done in multiple commits, each one in a runnable state

# Step 3: Execute the first step
> Start with step 1: extract data handling logic into UserViewModel

# Step 4: Validate
> Check the modified code—are there any missed cases?

# Step 5: Continue
> Good, continue to step 2
```

This **Plan → Execute → Verify → Continue** cycle is the standard pattern for handling complex refactors.

---

## Boundaries of File Operations

Claude Code **can do but be careful with**:

- Deleting files (will ask for confirmation)
- Modifying config files (.plist, .xcconfig, etc.)
- Modifying Package.swift dependencies

Claude Code **won't proactively do**:

- Push to remote (you need to run git push)
- Submit to the App Store
- Any irreversible cloud operations

---

## Chapter Summary

- Let Claude explore autonomously—give goals, not paths
- Precisely specify change locations (filename + function name + line numbers)
- Multi-file coordinated changes are Claude Code's biggest efficiency advantage
- Bulk operations (generating tests, docs, boilerplate) eliminate huge amounts of repetitive work
- Use the **Plan → Execute → Verify → Continue** loop for large tasks

---

[→ Chapter 5: Git Workflow Integration](./05-git-workflow_en.md)
