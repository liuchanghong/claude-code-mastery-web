# 第 10 章：高级技巧——成为 1%

---

## TL;DR

> 这章是分水岭：前面的技巧让你用好 Claude Code，
> 这章的技巧让你超越 99% 的用户。
> 自定义命令、Hooks、MCP、并行任务——每一个都能改变你的工作方式。

---

## 高级技巧 1：自定义 Slash 命令

Slash 命令是你最个人化的生产力工具。

### 什么是自定义命令

在 `~/.claude/commands/` 或 `.claude/commands/`（项目级）创建 Markdown 文件，就能在 Claude Code 里用 `/命令名` 调用。

### 创建你的第一个命令

```bash
mkdir -p ~/.claude/commands
```

**`~/.claude/commands/review.md`**

```markdown
对当前 git diff --staged 的内容做 Code Review：

1. 运行 git diff --staged 查看改动
2. 检查以下问题（按严重程度分级）：
   - P0（必须修复）：安全漏洞、数据丢失风险、明显 bug
   - P1（建议修复）：性能问题、错误处理缺失
   - P2（可选）：代码风格、可读性
3. 用列表格式输出，每条包含：文件名、行号、问题描述、建议修复
4. 最后给一个通过/不通过的建议

简洁，不要给我"做得好"之类的正面反馈。
```

使用：

```bash
claude
/review
```

---

### 更多有用的自定义命令

**`~/.claude/commands/explain.md`**：

```markdown
用最清晰的方式解释 $ARGUMENTS 这段代码：

1. 先用 1-2 句话说这段代码**做什么**（面向非技术人）
2. 然后解释**怎么做**（面向开发者）
3. 指出任何值得注意的技术细节或潜在问题
4. 如果有更简洁的写法，可以提一下

语言：中文
```

使用：`/explain fetchUserData 这个方法`

---

**`.claude/commands/test-gen.md`**（项目级命令）：

```markdown
为 $ARGUMENTS 生成单元测试：

1. 先读取这个文件/函数
2. 识别所有需要测试的场景：
   - 正常情况（happy path）
   - 边界条件
   - 错误情况
3. 用 XCTest + Swift Testing（项目标准）生成测试代码
4. Mock 策略：参考 Tests/MockObjects/ 里的现有 Mock
5. 测试文件放在对应的 Tests/ 目录

测试函数命名：test_[方法名]_[场景]_[预期结果]
```

使用：`/test-gen Sources/Features/Cart/CartViewModel.swift`

---

**`~/.claude/commands/standup.md`**：

```markdown
基于今天的 git 活动，帮我准备站会材料：

1. 运行 git log --since="yesterday" --author="$(git config user.name)" --oneline
2. 运行 git diff HEAD~5..HEAD --stat（看改动范围）
3. 总结：
   - 昨天完成了什么（简洁，1-3 条）
   - 今天计划做什么（基于未完成的工作）
   - 有什么 blocker（如果 git 历史显示某个任务反复改动）

输出格式：适合直接复制粘贴到 Slack
中文输出
```

---

## 高级技巧 2：Hooks——让 Claude Code 响应你的操作

Hooks 是 Claude Code 的事件系统，允许你在特定操作前后执行自定义逻辑。

### Hook 的触发时机

```
PreToolUse：工具被调用前
PostToolUse：工具被调用后
Notification：收到通知时
Stop：任务结束时
```

### 配置 Hooks

在 `~/.claude/settings.json` 里配置：

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

这个 Hook 的效果：**每次 Claude 写入文件后，自动运行 swift build 检查是否编译通过。**

---

### 实用 Hook 示例

**自动格式化**：

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

**自动测试**（改完代码立即跑测试）：

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

**任务完成通知**：

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code 完成了任务\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

---

## 高级技巧 3：MCP（Model Context Protocol）

MCP 是 Claude Code 的扩展系统，让你可以接入自定义数据源和工具。

### MCP 能做什么

- 接入公司内部 Wiki 或文档系统
- 连接数据库，让 Claude 直接查询
- 接入 Jira、Linear 等项目管理工具
- 连接 Figma，让 Claude 理解设计规范
- 接入监控系统，让 Claude 分析线上问题

### 配置 MCP

在 `~/.claude.json` 里添加：

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

### 实用 MCP Server

| MCP Server | 功能 | 适用场景 |
|-----------|------|---------|
| `@modelcontextprotocol/server-filesystem` | 访问文件系统 | 扩大文件访问范围 |
| `@modelcontextprotocol/server-github` | GitHub 操作 | Issue、PR 管理 |
| `@modelcontextprotocol/server-postgres` | 数据库查询 | 后端开发、数据分析 |
| `@modelcontextprotocol/server-brave-search` | 网络搜索 | 技术调研 |

---

## 高级技巧 4：并行工作（Subagents）

这是最被低估的高级技巧：**同时处理多个独立任务**。

### 何时使用并行

任务之间相互独立，没有依赖关系时：

```bash
# 不要这样做（串行）：
claude
> 帮我分析 A 模块的问题（等 Claude 完成）
> 帮我分析 B 模块的问题（等 Claude 完成）
> 帮我分析 C 模块的问题

# 要这样做（并行）：
claude
> 我需要同时做三件事，请并行处理：
>
> 任务1：分析 Sources/Features/Home/ 目录的代码质量
> 任务2：为 Sources/Core/Network/ 生成单元测试
> 任务3：检查 Sources/Features/Cart/ 里所有的 TODO 注释
>
> 三个任务相互独立，可以同时进行
```

---

## 高级技巧 5：上下文管理的艺术

当会话变长时，上下文窗口会被旧内容占满。

### 何时需要管理

- 对话进行了 30+ 轮
- Claude 开始"忘记"之前讨论的内容
- 回答变得笼统，不再精准

### 管理策略

**策略 1：/compact 命令**

```bash
/compact
```

这会把对话历史压缩成摘要，释放上下文空间。

**策略 2：新会话 + 总结交接**

```bash
# 在当前会话结束前
claude
> 把我们讨论的关键内容总结成一段话，我要在新会话里用

# 开启新会话
claude
> 背景：[粘贴上面的总结]
> 接着上面的工作，现在要做 [下一步]
```

**策略 3：用文件保存状态**

```bash
claude
> 把当前任务的状态保存到 PROGRESS.md：
> - 已完成的部分
> - 当前的决策和选择的方案
> - 下一步要做什么
> - 任何需要注意的特殊情况
```

---

## 高级技巧 6：Prompt 库管理

建立你自己的 Prompt 库，把有效的指令保存起来重复使用。

```bash
mkdir -p ~/.claude/prompts

# 创建一个通用代码审查 prompt
cat > ~/.claude/prompts/swift-review.md << 'EOF'
审查这个 Swift 代码，关注：
1. 内存管理（ARC、循环引用）
2. 线程安全（主线程 UI 更新、数据竞争）
3. 错误处理（try-catch、Result、optional 处理）
4. 性能（不必要的计算、过度内存分配）
5. Swift 惯用写法（是否使用了现代 Swift 特性）

输出格式：按严重程度排列的问题列表
EOF
```

然后在 CLAUDE.md 里引用这些 prompts，或者创建对应的 slash 命令。

---

## 高级技巧 7：与 CI/CD 集成

把 Claude Code 融入你的自动化流程：

```bash
# 在 CI 脚本里使用 Claude Code
# .github/workflows/pr-review.yml

- name: Claude Code Review
  run: |
    claude -p "
      审查这个 PR 的代码改动（git diff origin/main HEAD）
      如果发现 P0 问题，输出 REVIEW_FAILED 并列出问题
      否则输出 REVIEW_PASSED
    " > review_result.txt
    cat review_result.txt
    if grep -q "REVIEW_FAILED" review_result.txt; then
      exit 1
    fi
```

---

## 本章总结：高级技巧金字塔

```
                    /\
                   /  \
                  /MCP  \        ← 接入外部系统，打破 Claude 的边界
                 /______\
                /        \
               / Hooks    \      ← 自动化事件响应，减少手动操作
              /____________\
             /              \
            / 自定义命令      \   ← 个性化工作流，一键完成复杂任务
           /________________\
          /                  \
         /  上下文管理         \  ← 保持高质量的长期工作
        /____________________\
       /                      \
      /      并行任务            \ ← 同时做多件事，效率倍增
     /________________________\
```

每上升一层，需要更多配置但带来指数级的效率提升。

---

[→ 第 11 章：工作流与自动化](./11-workflows-and-automation.md)
