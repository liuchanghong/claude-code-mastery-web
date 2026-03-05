# Chapter 7: The CLAUDE.md Secret

---

## TL;DR

> CLAUDE.md is the file that makes Claude Code remember your rules.
> Without it, you re-explain the project context every single time.
> With it, Claude Code acts like a seasoned employee who knows your project.
> This is the lowest-effort, highest-return configuration you can make.

---

## Why CLAUDE.md Is Severely Underrated

Imagine having to do this every time you start work:

- Tell a new colleague what architecture the project uses
- Explain the team's code style
- Remind them not to touch certain critical files
- Explain how to run tests

That's the Claude Code experience without CLAUDE.md.

**CLAUDE.md turns all of this into Claude's "long-term memory."**

---

## The CLAUDE.md Hierarchy

Claude Code reads CLAUDE.md in this order:

```
Priority (highest to lowest):

1. CLAUDE.md in current directory (project root)
2. CLAUDE.md in subdirectories (can have multiple, managing different modules)
3. ~/.claude/CLAUDE.md (global rules, apply to all projects)
```

**This means you can:**

- Write project-level rules in the root directory
- Write test-specific rules in the `Tests/` directory
- Write your personal global preferences in `~/.claude/`

---

## A Complete Real-World iOS Project CLAUDE.md

```markdown
# MyApp Project Guide

## Project Overview
An e-commerce iOS app, Swift 5.9, minimum iOS 16.
Architecture: MVVM + Clean Architecture (3 layers: View/ViewModel/Repository)

## Tech Stack
- SwiftUI (main UI, some legacy pages still UIKit)
- Combine (reactive data flow)
- Swift Concurrency (async/await, migration from completion handlers complete)
- TCA (The Composable Architecture) for complex state management pages
- Alamofire v5 for network requests
- Kingfisher for image loading

## Code Style Guidelines
- Use Swift 5.9+ new features (if expression, macros, etc.)
- All async operations use async/await, not completion handlers
- No force unwraps (!), except IBOutlets or with sufficient commentary explaining why
- Protocol naming: use `xxable` or plain nouns (no "Protocol" suffix)
- ViewModels inherit ObservableObject, @Published properties sorted alphabetically
- Colors/fonts/spacing use constants from DesignSystem, no hardcoding

## Directory Structure
- Sources/App: App entry, AppDelegate, SceneDelegate
- Sources/Features: organized by feature module (Home, Cart, Profile, etc.)
- Sources/Core: shared core layer (Network, Storage, Analytics)
- Sources/DesignSystem: UI component library
- Tests/: unit tests (XCTest + Swift Testing)
- UITests/: UI tests

## Important Conventions
- Never directly modify APIClient.swift (this file has dedicated code generation)
- Files in Models/ are auto-generated from Schema—edits will be overwritten
- All network API definitions are in Sources/Core/API/Endpoints.swift
- UserDefaults is accessed exclusively through AppStorage wrappers, never directly

## Common Development Commands
```bash
# Run unit tests
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'

# Run specific tests
xcodebuild test -scheme MyApp -only-testing:MyAppTests/UserServiceTests

# Generate API code (from OpenAPI schema)
./scripts/generate_api.sh

# Update SPM dependencies
swift package update
```

## Known Issues / Special Cases
- NavigationStack has a known bug on iOS 16, see issue #123
- ProfileViewController is legacy code, stay UIKit for now—don't migrate
- The payment module uses a third-party SDK—be extra careful, always test changes
```

---

## Per-Module CLAUDE.md Files

Put more specific rules in subdirectories:

**`Tests/CLAUDE.md`**:

```markdown
# Testing Guide

## Test Frameworks
- Unit tests: XCTest + Swift Testing (new tests use the new framework)
- Mock framework: handwritten mocks (not Mockingbird, for historical reasons)
- Async tests: async/await + expectation

## Naming Conventions
- Test function naming: test_[feature]_[scenario]_[expectedResult]
  Example: test_fetchUser_withValidID_returnsUser

## Mock Directory
- MockObjects/ contains ready-made Mock classes
- When adding new Mocks, follow the pattern in MockNetworkService.swift

## Coverage Requirements
- Core layer: 80%+
- Feature ViewModels: 70%+
- View layer: not required
```

**`Sources/Core/Network/CLAUDE.md`**:

```markdown
# Network Layer Rules

This directory is critical—be extra careful with changes.

## Architecture
- APIClient is a singleton, injected via DI
- All requests go through RequestInterceptor for token refresh
- Errors handled uniformly via APIError enum

## Notes
- Never use force try in this directory
- All new Endpoints must be added to EndpointTests
- Discuss before modifying token refresh logic (add a reminder comment)
```

---

## Let Claude Code Write Your CLAUDE.md

Don't start from scratch—let Claude help:

```bash
claude
> Analyze this project and write a comprehensive CLAUDE.md
>
> Should include:
> 1. Automatically analyzed: tech stack, directory structure, code patterns
> 2. Things to ask me:
>    - Are there any files I shouldn't modify?
>    - What coding standards does the team follow?
>    - What are the common development commands?
>    - Are there any traps/gotchas to be aware of?
>
> Ask me these questions first, then generate the file after I answer
```

---

## Keeping CLAUDE.md Up to Date

**Triggers for an update:**

- Adding a new dependency/framework
- Changing an architecture decision
- Discovering a new "trap"
- Adding new script commands

**How to update:**

```bash
claude
> We just decided to migrate all Combine to Swift Concurrency
> Update CLAUDE.md with the relevant standards and notes
```

---

## Global CLAUDE.md: Your Personal Working Style

`~/.claude/CLAUDE.md` is your personal global configuration:

```markdown
# My Personal Preferences

## Communication Style
- Answer in English (except for code)
- Be concise, no rambling
- Lead with the conclusion, then the details
- When making suggestions, explain the reasoning

## Code Style
- Prefer functional style
- Avoid over-abstraction, YAGNI principle
- Prefer language built-ins over third-party libraries
- Comments only when logic isn't self-evident, no filler comments

## Work Habits
- Tell me what you're going to change before changing it, wait for my confirmation
- Do one thing at a time
- If there are multiple approaches, give me 2-3 options with their trade-offs

## Things I Don't Like
- Excessive positive feedback ("Great! Of course!")
- Recommending refactors when I didn't ask
- Long explanations when I only want code
```

---

## CLAUDE.md Best Practices

### What to write

- Project architecture and tech decisions
- Files/modules that can't be modified (and why)
- Naming conventions
- Common commands
- Known special cases and workarounds

### What not to write

- Obvious information ("this is an iOS app" if the directory structure already makes it clear)
- Long explanations (CLAUDE.md should be a reference, not a tutorial)
- Frequently changing information (better as comments in code)

### Length recommendation

- Project CLAUDE.md: 100-300 lines is the ideal range
- Too short: no value
- Too long: Claude may miss important parts

---

## Verify Your CLAUDE.md Is Working

```bash
claude
> Without reading any source code, using only CLAUDE.md,
> tell me about this project:
> 1. Overall architecture
> 2. The 3 most important code standards
> 3. Things I absolutely must not do
```

If Claude can answer correctly, your CLAUDE.md is well-written.

---

[→ Chapter 8: Building Real Projects](./08-building-real-projects_en.md)
