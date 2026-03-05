# Chapter 10: Advanced Techniques — Join the 1%

---

## TL;DR

> This chapter is the dividing line: previous techniques help you use Claude Code well.
> These techniques put you beyond 99% of users.
> Custom commands, Hooks, MCP, parallel tasks—each one changes how you work.

---

## Advanced Technique 1: Custom Slash Commands

Slash commands are your most personal productivity tool.

### What Are Custom Commands

Create Markdown files in `~/.claude/commands/` or `.claude/commands/` (project-level), and you can call them in Claude Code with `/command-name`.

### Creating Your First Command

```bash
mkdir -p ~/.claude/commands
```

**`~/.claude/commands/review.md`**

```markdown
Do a Code Review of the current git diff --staged content:

1. Run git diff --staged to see changes
2. Check for these issues (graded by severity):
   - P0 (must fix): security vulnerabilities, data loss risk, obvious bugs
   - P1 (should fix): performance issues, missing error handling
   - P2 (optional): code style, readability
3. Output as a list, each item including: filename, line number, issue description, suggested fix
4. End with a pass/fail recommendation

Be concise. No positive feedback like "great job."
```

Usage:

```bash
claude
/review
```

---

### More Useful Custom Commands

**`~/.claude/commands/explain.md`**:

```markdown
Explain $ARGUMENTS in the clearest possible way:

1. First describe in 1-2 sentences what this code **does** (for non-technical readers)
2. Then explain **how** it does it (for developers)
3. Point out any technical details or potential issues worth noting
4. If there's a more concise way to write it, mention it briefly
```

Usage: `/explain the fetchUserData method`

---

**`.claude/commands/test-gen.md`** (project-level):

```markdown
Generate unit tests for $ARGUMENTS:

1. First read the file/function
2. Identify all scenarios that need testing:
   - Happy path
   - Boundary conditions
   - Error cases
3. Generate test code using XCTest + Swift Testing (project standard)
4. Mock strategy: reference existing Mocks in Tests/MockObjects/
5. Test file goes in the corresponding Tests/ directory

Test function naming: test_[methodName]_[scenario]_[expectedResult]
```

Usage: `/test-gen Sources/Features/Cart/CartViewModel.swift`

---

**`~/.claude/commands/standup.md`**:

```markdown
Based on today's git activity, prepare my standup material:

1. Run git log --since="yesterday" --author="$(git config user.name)" --oneline
2. Run git diff HEAD~5..HEAD --stat (see scope of changes)
3. Summarize:
   - What was completed yesterday (concise, 1-3 items)
   - What's planned for today (based on unfinished work)
   - Any blockers (if git history shows a task being repeatedly changed)

Output format: suitable for direct copy-paste to Slack
```

---

## Advanced Technique 2: Hooks — Making Claude Code Respond to Your Actions

Hooks are Claude Code's event system, letting you execute custom logic before/after specific operations.

### When Hooks Fire

```
PreToolUse:  Before a tool is called
PostToolUse: After a tool is called
Notification: When a notification is received
Stop:         When a task ends
```

### Configuring Hooks

In `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && swift build 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

This hook's effect: **every time Claude writes a file, automatically run swift build to check if it compiles.**

---

### Practical Hook Examples

**Auto-format on write:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "swiftformat $CLAUDE_TOOL_RESULT_FILE_PATH 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

**Auto-test after code change:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16' 2>&1 | tail -20"
          }
        ]
      }
    ]
  }
}
```

**Task completion notification:**

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code finished the task\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

---

## Advanced Technique 3: MCP (Model Context Protocol)

MCP is Claude Code's extension system, letting you plug in custom data sources and tools.

### What MCP Can Do

- Connect to internal company Wiki or documentation
- Connect to databases so Claude can query directly
- Connect to Jira, Linear, or other project management tools
- Connect to Figma so Claude can understand design specs
- Connect to monitoring systems so Claude can analyze production issues

### Configuring MCP

In `~/.claude.json`:

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### Useful MCP Servers

| MCP Server | Function | Use case |
|-----------|---------|----------|
| `@modelcontextprotocol/server-filesystem` | File system access | Expand file access scope |
| `@modelcontextprotocol/server-github` | GitHub operations | Issue, PR management |
| `@modelcontextprotocol/server-postgres` | Database queries | Backend dev, data analysis |
| `@modelcontextprotocol/server-brave-search` | Web search | Technical research |

---

## Advanced Technique 4: Parallel Work (Subagents)

The most underrated advanced technique: **handling multiple independent tasks simultaneously**.

### When to Use Parallel

When tasks are independent of each other:

```bash
# Don't do this (serial):
claude
> Analyze the issues in module A (wait for Claude to finish)
> Analyze the issues in module B (wait for Claude to finish)
> Analyze the issues in module C

# Do this instead (parallel):
claude
> I need three things done simultaneously—please handle in parallel:
>
> Task 1: Analyze code quality in Sources/Features/Home/
> Task 2: Generate unit tests for Sources/Core/Network/
> Task 3: Check all TODO comments in Sources/Features/Cart/
>
> These three tasks are independent and can run concurrently
```

---

## Advanced Technique 5: The Art of Context Management

When a session gets long, the context window fills up with old content.

### When You Need to Manage

- Conversation is 30+ turns long
- Claude starts "forgetting" things discussed earlier
- Responses become vague and imprecise

### Management Strategies

**Strategy 1: /compact command**

```bash
/compact
```

Compresses conversation history into a summary, freeing context space.

**Strategy 2: New session + summary handoff**

```bash
# Before ending the current session
claude
> Summarize the key points of what we discussed—I'll use it in a new session

# Open a new session
claude
> Background: [paste the summary above]
> Continuing from before, now need to do [next step]
```

**Strategy 3: Save state to a file**

```bash
claude
> Save the current task state to PROGRESS.md:
> - What's been completed
> - Current decisions and chosen approaches
> - What to do next
> - Any special situations to be aware of
```

---

## Advanced Technique 6: Building a Prompt Library

Build your own prompt library to save effective instructions for reuse.

```bash
mkdir -p ~/.claude/prompts

# Create a general Swift code review prompt
cat > ~/.claude/prompts/swift-review.md << 'EOF'
Review this Swift code, focusing on:
1. Memory management (ARC, retain cycles)
2. Thread safety (main thread UI updates, data races)
3. Error handling (try-catch, Result, optional handling)
4. Performance (unnecessary computation, excessive memory allocation)
5. Swift idiomatic patterns (using modern Swift features)

Output format: list of issues sorted by severity
EOF
```

Reference these prompts in CLAUDE.md or create corresponding slash commands.

---

## Advanced Technique 7: CI/CD Integration

Integrate Claude Code into your automation pipeline:

```bash
# Use Claude Code in a CI script
# .github/workflows/pr-review.yml

- name: Claude Code Review
  run: |
    claude -p "
      Review the code changes in this PR (git diff origin/main HEAD)
      If P0 issues are found, output REVIEW_FAILED followed by the issues
      Otherwise output REVIEW_PASSED
      Only output this one line, nothing else
    " > review_result.txt
    cat review_result.txt
    if grep -q "REVIEW_FAILED" review_result.txt; then
      exit 1
    fi
```

---

## Chapter Summary: The Advanced Techniques Pyramid

```
                    /\
                   /  \
                  / MCP  \        ← Connect external systems, break Claude's boundaries
                 /________\
                /          \
               /   Hooks    \     ← Automated event responses, reduce manual steps
              /______________\
             /                \
            /  Custom Commands  \ ← Personalized workflow, complex tasks in one command
           /____________________\
          /                      \
         /   Context Management   \ ← Maintain quality through long sessions
        /________________________\
       /                          \
      /       Parallel Tasks        \ ← Do multiple things at once, multiplied efficiency
     /____________________________\
```

Each level up requires more setup but delivers exponential efficiency gains.

---

[→ Chapter 11: Workflows & Automation](./11-workflows-and-automation_en.md)
