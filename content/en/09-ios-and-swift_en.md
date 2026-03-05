# Chapter 9: iOS & Swift Deep Dive

---

## TL;DR

> There are many scenarios where Claude Code particularly excels in iOS development.
> This chapter is an iOS developer's exclusive playbook,
> covering Swift migrations, SwiftUI, Xcode config, App Store prep, and more.

---

## Claude Code's iOS Task Power Rankings

1. **Code migration**: ObjC→Swift, UIKit→SwiftUI, completion→async/await
2. **Understanding complex APIs**: UIKit lifecycle, SwiftUI data flow
3. **Generating boilerplate**: ViewModels, network layer, data models
4. **Debugging crashes**: reading crash logs, analyzing threading issues
5. **Performance optimization**: analyzing Instruments data, optimizing render paths
6. **OS version adaptation**: analyzing deprecations, providing alternatives

---

## Swift Language Migration

### Completion Handler → async/await

The most common migration task:

```swift
// Before
func fetchUser(id: String, completion: @escaping (Result<User, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        // handle result
        completion(.success(user))
    }.resume()
}

// After (Claude generates this)
func fetchUser(id: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}
```

**Prompt:**

```bash
claude
> Migrate all methods using completion handlers in UserService.swift
> to async/await
>
> Note:
> - Keep the original completion handler version (mark with @available(*, deprecated))
> - New async methods use throws instead of Result
> - Also update callers of these methods
>
> First list all methods that need migrating, then migrate one by one
```

---

### Objective-C → Swift

```bash
claude
> Migrate OrderManager.m and OrderManager.h to Swift
>
> Migration rules:
> 1. Keep @objc annotations so OC code can still call them
> 2. Replace NSDictionary/NSArray with Swift native types
> 3. Delegate pattern can stay (no need to swap to Combine)
> 4. NS_ENUM → Swift enum (maintain raw value compatibility)
>
> Analyze all interfaces of this class first, give me a migration plan to confirm before writing
```

---

## SwiftUI Deep Dive

### Analyzing Complex Views

SwiftUI data flow can be hard to understand—let Claude map it out:

```bash
claude
> Read CheckoutView.swift and related ViewModels
> Map the data flow for me:
> - Which data is @State (local state)
> - Which data is @ObservedObject (external state)
> - What triggers UI updates
> - Is there any unnecessary re-rendering
```

### Performance Optimization

```bash
claude
> My ProductListView has 100+ cells and drops frames during scrolling
> Relevant code: ProductListView.swift and ProductRowView.swift
>
> Help me analyze:
> 1. What causes unnecessary View rebuilds
> 2. How to optimize with .equatable() or EquatableView
> 3. Whether LazyVStack/LazyVGrid is being used correctly
```

### ViewModifiers and Reuse

```bash
claude
> My code has a lot of repeated style setup (shadows, rounded corners, borders)
> scattered across various Views
>
> Help me:
> 1. Find all repeated style patterns
> 2. Design a set of ViewModifiers
> 3. Replace existing code with these Modifiers
>
> Reference the style of existing components in DesignSystem/
```

---

## Lifecycle Management

One of the most common pitfall areas for iOS developers:

```bash
claude
> My app has a problem: certain data doesn't refresh when returning from background
> The relevant ViewController is DashboardViewController
>
> Help me analyze:
> 1. State changes for this ViewController in the app lifecycle
> 2. What's the right timing to refresh data
> 3. sceneDidBecomeActive vs viewWillAppear—which is more appropriate?
> 4. How to avoid double refreshing (both lifecycle methods firing)
```

---

## Xcode Configuration & Project Management

Claude Code is helpful here too, but you need to paste config file contents:

```bash
# Build Settings issues
claude
> My project crashes on Release build but fine on Debug
> What Build Setting differences could cause this?
>
> Project uses these settings: (paste relevant Build Settings text)
> Focus on: SWIFT_OPTIMIZATION_LEVEL, DEBUG_INFORMATION_FORMAT, etc.

# Provisioning Profile issues
claude
> App signing error: (paste error)
> Help me troubleshoot step by step, don't skip steps

# Swift Package Manager
claude
> I need to add [some library] as a dependency
> Read the existing format in Package.swift
> Help me add the correct dependency declaration, use the latest stable version
```

---

## Core Data / SwiftData

```bash
claude
> I want to migrate UserData from UserDefaults to SwiftData
> The data model is: (describe or paste the User struct)
>
> Help me:
> 1. Create the SwiftData @Model
> 2. Write migration code (transfer existing UserDefaults data)
> 3. Update all places that read/write UserData
>
> Note: minimum iOS 17 support (SwiftData requirement)

# Core Data debugging
claude
> Core Data reporting a merge conflict error: (paste error)
> Help me understand what this is and how to choose the right merge policy
```

---

## Network Layer Deep Dive

```bash
# Design an API client
claude
> Help me design an iOS network layer with these requirements:
> - Supports REST API (JSON)
> - Auto token refresh (on 401)
> - Request queuing (hold requests during token refresh, resume after)
> - Testable (mock via URLProtocol)
> - async/await interface
>
> Give me the architecture design first, no code

# SSL Pinning
claude
> I need to add SSL Pinning to the app
> The existing network layer uses URLSession
> Implement certificate pinning in URLSessionDelegate
> Support both certificate pinning and public key pinning
```

---

## Push Notifications

```bash
claude
> Help me implement the full push notification flow:
> 1. Register for APNs
> 2. Get device token
> 3. Send to server
> 4. Handle notification in foreground / background / not running states
> 5. Graceful permission request (explain before requesting)
>
> Code should target iOS 16+, use Swift Concurrency
> Step by step—let me confirm each step before continuing
```

---

## App Store Submission Prep

```bash
# Privacy permission strings
claude
> My app uses these permissions: Camera, Photo Library, Location (while in use)
> Write NSUsageDescription strings for each permission
> Need both, clearly explain the purpose, can't be too vague
> Follow Apple's review guidelines

# Privacy Manifest
claude
> Check my project and generate the required PrivacyInfo.xcprivacy
> I use: UserDefaults, URLSession, FileManager
> Find all APIs that need to be declared

# Release Notes
claude
> Based on the git changes for this version (run git log v2.2.0..HEAD --oneline)
> Write App Store release notes
> Use language users can understand, no technical jargon
```

---

## iOS-Specific Performance Optimization

```bash
# Launch time optimization
claude
> My app cold launch time exceeds 2 seconds, analyzed with Instruments App Launch
> Data as follows: (paste data)
>
> Analyze possible causes:
> - Blocking operations on the main thread
> - Too many +load methods
> - Excessive dylib loading
> Give me a step-by-step optimization plan

# Battery optimization
claude
> Users report my app drains battery
> Instruments Energy Log data: (describe high-energy operations)
>
> Focus on:
> - Whether background location is too frequent
> - Opportunities for batching network requests
> - CPU wake count
```

---

## Applying Swift 5.9+ New Features

```bash
claude
> I want to refactor this code using Swift 5.9 new features: (paste code)
>
> Applicable new features include:
> - if/switch expression
> - Macros (if appropriate)
> - Parameter packs (if generalization is needed)
> - @Observable (replacing ObservableObject)
>
> Tell me which new features suit this code, then show me the refactored version
```

---

## Chapter Summary: iOS Developer's Claude Code Checklist

In daily work, prioritize Claude Code for these scenarios:

- [ ] Wrote a completion handler? Let Claude migrate to async/await
- [ ] Got a Crash Log? Paste it straight to Claude for analysis
- [ ] Need to write a new ViewModel? Let Claude generate following project pattern
- [ ] Adding a new permission? Let Claude write the usage description
- [ ] Doing a Code Review? Let Claude scan first
- [ ] Renaming a class? Let Claude handle all references

---

[→ Chapter 10: Advanced Techniques](./10-advanced-techniques_en.md)
