# Chapter 2: Setup & Your First Critical Steps

---

## TL;DR

> Installation takes 2 minutes. Real configuration takes 20 minutes but pays back 20x.
> The most important part of this chapter isn't "how to install"—it's "what to do after installing."

---

## Installation (Quick)

### Prerequisites

```bash
# Check Node.js version (needs 18+)
node --version

# If missing or outdated, install with nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### Install Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### Verify Installation

```bash
claude --version
```

### Login

```bash
claude
# First run will guide you through Anthropic account login
# Follow the prompts to complete OAuth authentication
```

**That's it.** Installation complete.

---

## Your First Command (Don't Make This Mistake)

Most people, after installing Claude Code, do this first:

```bash
claude
> Write me a sorting algorithm
```

This is a waste.

**A better first thing:**

Go into a project you're actively working on, then:

```bash
cd /path/to/your/project
claude
> Help me understand the overall architecture of this project. Starting from the entry file, give me an overview.
```

This one command lets you feel the difference between Claude Code and a regular AI. It will actively read files, explore directories, and give you a genuinely valuable analysis.

---

## Choosing Your Launch Mode

### Interactive Mode (Most Common)

```bash
claude
```

Enters a REPL environment for continuous conversation. Suitable for most daily tasks.

### Single Command Mode

```bash
claude -p "List all TODO comments in this project"
```

Good for scripted, one-off tasks.

### Continue Last Conversation

```bash
claude --continue
# or
claude -c
```

Resumes the last session, keeping previous context. **This is useful—don't forget it.**

### Resume a Specific Session

```bash
claude --resume
```

Lists your session history so you can choose which to restore.

---

## Key Setting: Permission Mode

```bash
# Default mode (recommended for most situations)
claude

# Auto-approve all operations (for trusted projects, rapid iteration)
claude --dangerously-skip-permissions
```

> **Warning:** `--dangerously-skip-permissions` means Claude can modify files and execute commands without your confirmation.
> Don't use this until you're familiar with the project and know what it's going to do.

---

## Your First Real Configuration: Create CLAUDE.md

This is the **most underrated configuration step**.

Create a `CLAUDE.md` file in your project root:

```bash
touch CLAUDE.md
```

Then use Claude Code itself to help you fill it in:

```bash
claude
> Analyze my project, then write a CLAUDE.md file for me that includes:
> 1. Project overview and tech stack
> 2. Code style conventions
> 3. Common development commands
> 4. Any special rules to be aware of
```

Claude Code will read your codebase and generate a project memory file.

**This file is automatically loaded every time Claude Code starts.** Which means you don't need to explain the project background every time.

---

## Global Config: ~/.claude/CLAUDE.md

Beyond project-level CLAUDE.md, you can configure global rules:

```bash
# Create global config directory (if it doesn't exist)
mkdir -p ~/.claude

# Set up global CLAUDE.md
claude
> Help me create ~/.claude/CLAUDE.md with my general code style preferences:
> - I prefer functional programming style
> - Variable naming in camelCase
> - Don't generate unnecessary comments
> - Code should be concise, avoid over-engineering
> (adjust to your own preferences)
```

**Global CLAUDE.md applies to all projects.**

---

## Interface Shortcuts (Memorize These)

| Shortcut | Function |
|---------|---------|
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit Claude Code |
| `↑` / `↓` | Navigate command history |
| `Ctrl+R` | Search command history |
| `/help` | Show help |
| `/clear` | Clear conversation history |
| `/compact` | Compress conversation history to free context space |
| `/status` | View current status |

---

## 10-Minute Hands-On Experiment

After installation, run this experiment:

### Step 1: Enter a project you know well

```bash
cd ~/your-ios-project
claude
```

### Step 2: Have Claude analyze the project

```
> Analyze this project's architecture and tell me:
> 1. What design patterns the project uses
> 2. Where the entry point is
> 3. What the most core modules are
```

### Step 3: Have Claude find a potential issue

```
> From a code quality perspective, where are the most likely problem areas in this project?
```

### Step 4: Have it actually make a change

```
> Find the most obvious code quality issue, tell me where it is, and ask whether I want to fix it
```

Completing these 4 steps gives you a real feel for Claude Code's actual capabilities.

---

## Common Installation Issues

**Issue: `claude: command not found`**

```bash
# Check npm global install path
npm config get prefix
# Make sure ~/.npm-global/bin or similar is in PATH
export PATH="$HOME/.npm-global/bin:$PATH"
```

**Issue: Authentication failure / login problems**

```bash
# Force re-authentication
claude auth login
```

**Issue: Network timeout**

```bash
# Set proxy (adjust to your proxy address)
export HTTPS_PROXY=http://127.0.0.1:7890
claude
```

---

[→ Chapter 3: The Art of Instructions](./03-art-of-instructions_en.md)
