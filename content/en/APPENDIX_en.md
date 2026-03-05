# Appendix: Quick Reference

> Everything you need: commands, shortcuts, flags, and templates.
> Come here first when you hit a problem.

---

## A. Launch Commands

```bash
# Basic launch
claude                              # Interactive mode
claude -p "your question"           # Single question
claude -c / --continue              # Continue last session
claude --resume                     # Restore a specific historical session

# Directory control
claude --add-dir /path/to/dir       # Add extra accessible directory

# Permission control
claude --dangerously-skip-permissions  # Auto-approve all operations (use carefully)

# Model selection
claude --model claude-opus-4-6      # Use Opus (most powerful but slower)
claude --model claude-haiku-4-5     # Use Haiku (fastest but less powerful)

# Output control
claude -p "question" --output-format json         # JSON output
claude -p "question" --output-format stream-json  # Streaming JSON output
```

---

## B. Interactive Mode Shortcuts

| Shortcut | Function |
|---------|---------|
| `Ctrl+C` | Cancel current operation (without exiting) |
| `Ctrl+D` | Exit Claude Code |
| `↑` / `↓` | Navigate command history |
| `Escape` twice | Clear current input |
| `Shift+Enter` | Multi-line input |

---

## C. Slash Commands

| Command | Function |
|---------|---------|
| `/help` | Show help |
| `/clear` | Clear conversation history |
| `/compact` | Compress conversation history to free context space |
| `/status` | View current status (model, context usage, etc.) |
| `/cost` | View current session cost |
| `/model` | Switch model |
| `/vim` | Toggle Vim keybinding mode |
| `/doctor` | Diagnose Claude Code configuration issues |
| `/bug` | Report a bug |

---

## D. Environment Variables

```bash
# API configuration
ANTHROPIC_API_KEY=sk-ant-xxx          # API Key (usually auto-configured via OAuth)
ANTHROPIC_BASE_URL=https://...        # Custom API endpoint

# Behavior control
CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096   # Control output length
DISABLE_AUTOUPDATER=1                # Disable auto-update

# Proxy
HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1
```

---

## E. Config Files Reference

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | Project root | Project-level rules and context |
| `CLAUDE.md` | Subdirectory | Module-level rules |
| `~/.claude/CLAUDE.md` | Global | Personal preferences and global rules |
| `~/.claude.json` | Global | Claude Code settings (including MCP config) |
| `.claude/settings.json` | Project | Project-level settings (including Hooks) |
| `~/.claude/settings.json` | Global | Global settings |
| `~/.claude/commands/` | Global | Custom slash commands (global) |
| `.claude/commands/` | Project | Custom slash commands (project-level) |

---

## F. CLAUDE.md Template

```markdown
# [Project Name] Development Guide

## Project Overview
[One-sentence description]

## Tech Stack
- Language: [Swift 5.9 / TypeScript / Python, etc.]
- Framework: [SwiftUI / React / Django, etc.]
- Minimum version: [iOS 16 / Node 18 / Python 3.11, etc.]

## Architecture
[Brief description of architecture pattern: MVVM / Clean Architecture / MVC, etc.]

## Directory Structure
[Descriptions of key directories]

## Code Standards
- [Rule 1]
- [Rule 2]
- [Rule 3]

## Files/Directories That Must Not Be Modified
- [filename]: [reason]

## Common Commands
```bash
# Run tests
[command]

# Build
[command]

# Lint
[command]
```

## Known Issues / Special Cases
- [issue description]: [explanation or workaround]

## Related Docs
- [link or description]
```

---

## G. Common Prompt Templates

### Code Analysis

```
Read [filename] and tell me:
1. What is this [class/function/module] responsible for?
2. What's notable about the design?
3. What are the potential issues or areas for improvement?
```

### Bug Fix

```
I'm getting this problem:
[error message]

Reproduction scenario:
[steps]

Relevant code is in [filename].

First analyze the root cause—wait for my confirmation before fixing.
```

### Feature Implementation

```
I need to implement [feature description].

Constraints:
- [constraint 1]
- [constraint 2]

Reference: look at [similar existing feature file] and implement in a similar pattern.

Give me the design approach first; write code after I confirm.
```

### Refactoring

```
Refactor the [function/class] in [filename].

Problems: [current issues]
Goals: [refactoring objectives]
Constraints: [things that can't change]

Implement step by step—project still runs after each step.
```

### Code Review

```
Review this code, focusing on:
1. [concern 1]
2. [concern 2]
3. [concern 3]

Output as a list, sorted by severity.
No positive feedback—issues only.
```

---

## H. iOS Development Common Commands

```bash
# Run unit tests
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16'

# Run specific tests
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -only-testing:[TestTarget]/[TestClass]/[testMethod]

# Clean build
xcodebuild clean -scheme [SchemeName]

# Archive
xcodebuild archive \
  -scheme [SchemeName] \
  -archivePath ./build/[SchemeName].xcarchive

# SwiftLint
swiftlint lint --reporter json

# SwiftFormat
swiftformat . --config .swiftformat

# Generate Xcode project (if using Swift Package Manager)
swift package generate-xcodeproj

# Update dependencies
swift package update

# Fix SPM cache issues
rm -rf ~/Library/Caches/org.swift.swiftpm
```

---

## I. Debugging Quick Reference

### Common Crash Types and Analysis Direction

| Crash type | Common cause | Investigation direction |
|-----------|-------------|------------------------|
| `EXC_BAD_ACCESS` | Dangling pointer, over-release | Check weak/unowned references, multi-threaded access |
| `SIGABRT` | Assert failure, force-unwrap nil | Look at force unwrap at the crash location |
| `EXC_CRASH (SIGKILL)` | Memory over limit | Check Instruments Memory, find large allocations |
| `com.apple.main-thread-checker` | UI operation on non-main thread | Check DispatchQueue.main usage |
| `NSInvalidArgumentException` | Illegal argument passed | Check nil inputs, wrong object types |

### Instruments Quick Guide

| Scenario | Use this Instrument |
|----------|-------------------|
| Slow launch time | App Launch |
| High CPU at runtime | Time Profiler |
| Growing memory | Leaks + Allocations |
| Scrolling frame drops | Core Animation |
| High battery drain | Energy Log |
| Network issues | Network |

---

## J. Troubleshooting

**Issue: Claude Code not responding**
```bash
# Check network
curl -I https://api.anthropic.com

# Check authentication
claude auth status

# Re-authenticate
claude auth login
```

**Issue: Long context causing slow responses**
```
/compact
```
Or `Ctrl+C` and start a new session.

**Issue: Claude's output is cut off**
```
> Continue
```
Or:
```
> Your previous output was cut off—continue from [last content]
```

**Issue: Claude keeps giving the same wrong answer**
```
> Let's approach this from a different angle.
> Forget the previous analysis—start fresh from [different starting point]
```

**Issue: CLAUDE.md not taking effect**
- Check the file is in the right directory (project root, or `~/.claude/`)
- Check the filename is exactly `CLAUDE.md` (case-sensitive)
- Use `/status` to confirm which config files Claude Code has loaded

---

## K. Learning Resources

- [Claude Code Official Documentation](https://docs.anthropic.com/claude-code)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

*This book is based on Claude Code (claude-sonnet-4-6), as of March 2026*
*Some features and commands may change with version updates—refer to official docs for the latest*
