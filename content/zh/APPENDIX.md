# 附录：快速参考手册

> 这里是所有命令、快捷键、Flags 的速查表。
> 遇到问题先查这里。

---

## A. 启动命令速查

```bash
# 基础启动
claude                              # 交互模式
claude -p "你的问题"                 # 单次问题
claude -c / --continue              # 继续上次会话
claude --resume                     # 恢复特定历史会话

# 目录控制
claude --add-dir /path/to/dir       # 添加额外可访问目录

# 权限控制
claude --dangerously-skip-permissions  # 自动批准所有操作（谨慎使用）

# 模型选择
claude --model claude-opus-4-6      # 指定使用 Opus（最强但慢）
claude --model claude-haiku-4-5     # 指定使用 Haiku（最快但弱）

# 输出控制
claude -p "问题" --output-format json   # JSON 格式输出
claude -p "问题" --output-format stream-json  # 流式 JSON 输出
```

---

## B. 交互模式快捷键

| 快捷键 | 功能 |
|-------|------|
| `Ctrl+C` | 取消当前操作（不退出） |
| `Ctrl+D` | 退出 Claude Code |
| `↑` / `↓` | 历史命令导航 |
| `Escape` 两次 | 清空当前输入 |
| `Shift+Enter` | 多行输入 |

---

## C. Slash 命令速查

| 命令 | 功能 |
|------|------|
| `/help` | 显示帮助 |
| `/clear` | 清空对话历史 |
| `/compact` | 压缩对话历史，节省上下文 |
| `/status` | 查看当前状态（模型、上下文使用量等） |
| `/cost` | 查看当前会话费用 |
| `/model` | 切换模型 |
| `/vim` | 切换 Vim 键位模式 |
| `/doctor` | 诊断 Claude Code 配置问题 |
| `/bug` | 报告 bug |
| `/review` | （如果配置了）运行自定义 review 命令 |

---

## D. 环境变量

```bash
# API 配置
ANTHROPIC_API_KEY=sk-ant-xxx          # API Key（通常通过 oauth 自动配置）
ANTHROPIC_BASE_URL=https://...        # 自定义 API endpoint

# 行为控制
CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096   # 控制输出长度
DISABLE_AUTOUPDATER=1                # 禁用自动更新

# 代理（国内用户常用）
HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1
```

---

## E. 配置文件速查

| 文件 | 位置 | 作用 |
|-----|------|------|
| `CLAUDE.md` | 项目根目录 | 项目级规则和上下文 |
| `CLAUDE.md` | 子目录 | 模块级规则 |
| `~/.claude/CLAUDE.md` | 全局 | 个人偏好和全局规则 |
| `~/.claude.json` | 全局 | Claude Code 设置（包括 MCP 配置） |
| `.claude/settings.json` | 项目 | 项目级设置（包括 Hooks） |
| `~/.claude/settings.json` | 全局 | 全局设置 |
| `~/.claude/commands/` | 全局 | 自定义 Slash 命令（全局） |
| `.claude/commands/` | 项目 | 自定义 Slash 命令（项目级） |

---

## F. CLAUDE.md 模板

```markdown
# [项目名] 开发指南

## 项目概述
[一句话描述项目]

## 技术栈
- 语言：[Swift 5.9 / TypeScript / Python 等]
- 框架：[SwiftUI / React / Django 等]
- 最低版本要求：[iOS 16 / Node 18 / Python 3.11 等]

## 架构
[简要描述架构模式：MVVM / Clean Architecture / MVC 等]

## 目录结构
[关键目录的说明]

## 代码规范
- [规则 1]
- [规则 2]
- [规则 3]

## 不可修改的文件/目录
- [文件名]：[原因]

## 常用命令
```bash
# 运行测试
[命令]

# 构建
[命令]

# 代码检查
[命令]
```

## 已知问题 / 特殊情况
- [问题描述]：[说明或 workaround]

## 相关文档
- [链接或说明]
```

---

## G. 常用提示词模板

### 代码分析

```
读 [文件名]，告诉我：
1. 这个 [类/函数/模块] 的职责是什么
2. 设计上有什么值得注意的地方
3. 有什么潜在的问题或改进空间
```

### Bug 修复

```
我遇到了这个问题：
[错误信息]

发生场景：
[复现步骤]

相关代码在 [文件名]。

先分析根本原因，等我确认后再修复。
```

### 功能实现

```
我需要实现 [功能描述]。

约束：
- [约束 1]
- [约束 2]

参考：看一下 [类似现有功能的文件]，按类似的模式实现。

先给我设计方案，我确认后再写代码。
```

### 重构

```
重构 [文件名] 里的 [函数/类]。

问题：[现有问题]
目标：[重构目标]
约束：[不能改的东西]

分步骤实现，每步完成后代码仍然可运行。
```

### 代码审查

```
审查这段代码，关注：
1. [关注点 1]
2. [关注点 2]
3. [关注点 3]

用列表输出，按严重程度排序。
不需要正面反馈，只给问题。
```

---

## H. iOS 开发常用命令

```bash
# 运行单元测试
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16'

# 运行特定测试
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -only-testing:[TestTarget]/[TestClass]/[testMethod]

# 清理构建
xcodebuild clean -scheme [SchemeName]

# Archive
xcodebuild archive \
  -scheme [SchemeName] \
  -archivePath ./build/[SchemeName].xcarchive

# SwiftLint
swiftlint lint --reporter json

# SwiftFormat
swiftformat . --config .swiftformat

# 生成 Xcode 项目（如果用 Swift Package Manager）
swift package generate-xcodeproj

# 更新依赖
swift package update

# 解决 SPM 缓存问题
rm -rf ~/Library/Caches/org.swift.swiftpm
```

---

## I. 调试速查

### 常见 Crash 类型和分析方向

| Crash 类型 | 常见原因 | 排查方向 |
|-----------|---------|---------|
| `EXC_BAD_ACCESS` | 野指针、过度释放 | 检查 weak/unowned 引用，检查多线程访问 |
| `SIGABRT` | 断言失败、强制解包 nil | 看 crash 位置的 force unwrap |
| `EXC_CRASH (SIGKILL)` | 内存超限 | 查 Instruments Memory，找大内存分配 |
| `com.apple.main-thread-checker` | 非主线程 UI 操作 | 查 DispatchQueue.main 使用 |
| `NSInvalidArgumentException` | 传入了非法参数 | 检查 nil 传入、错误的对象类型 |

### Instruments 快速指南

| 场景 | 用什么 Instrument |
|------|----------------|
| 启动时间慢 | App Launch |
| 运行时 CPU 高 | Time Profiler |
| 内存增长 | Leaks + Allocations |
| 滑动掉帧 | Core Animation |
| 耗电量大 | Energy Log |
| 网络问题 | Network |

---

## J. 故障排除

**问题：Claude Code 不响应**
```bash
# 检查网络
curl -I https://api.anthropic.com

# 检查认证
claude auth status

# 重新认证
claude auth login
```

**问题：上下文太长导致响应变慢**
```
/compact
```
或者 `Ctrl+C` 后开新会话。

**问题：Claude 的输出被截断**
```
> 继续
```
或者：
```
> 你刚才的输出被截断了，从 [最后的内容] 继续
```

**问题：Claude 反复给同样的错误答案**
```
> 我们换个角度来看这个问题。
> 忘掉之前的分析，重新从 [不同的起点] 开始分析
```

**问题：CLAUDE.md 没有生效**
- 检查文件是否在正确的目录（项目根目录，或 `~/.claude/`）
- 检查文件名是否完全是 `CLAUDE.md`（区分大小写）
- 用 `/status` 确认 Claude Code 加载了哪些配置文件

---

## K. 学习资源

- [Claude Code 官方文档](https://docs.anthropic.com/claude-code)
- [Anthropic Prompt Library](https://docs.anthropic.com/claude/prompt-library)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

*本书基于 Claude Code (claude-sonnet-4-6) 版本，截至 2026 年 3 月*
*部分功能和命令可能随版本更新有所变化，以官方文档为准*
