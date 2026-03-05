# 第 5 章：Git 工作流集成

---

## TL;DR

> Claude Code 能理解 Git 历史、写 commit message、做 code review。
> 把它融入 Git 工作流，是让效率翻倍最简单的方法之一。

---

## Claude Code 的 Git 能力

Claude Code 可以直接运行 Git 命令，理解 diff 和历史，这意味着它能：

- 分析 Git 历史，理解一个功能是怎么演化的
- 帮你写有意义的 commit message
- 在 commit 之前做 pre-commit review
- 分析 PR 差异，给出 code review 意见
- 帮你解决 merge conflict
- 生成 changelog

---

## Commit Message 的正确姿势

**不要：**

```
git commit -m "fix bugs and update ui"
```

这个 commit message 5 年后看不知道改了什么。

**用 Claude Code 来写：**

```bash
# 先 stage 你的改动
git add -p  # 或者 git add 特定文件

# 然后让 Claude 写 message
claude
> 我做了以下改动（运行 git diff --staged 看看）
> 帮我写一个符合 Conventional Commits 规范的 commit message
> 要包含：类型（fix/feat/refactor等）、影响范围、简洁描述
> 如果改动复杂，加一段 body 说明"为什么"这样改
```

**Conventional Commits 格式：**

```
feat(auth): add biometric authentication for iOS 16+

Implement Face ID / Touch ID authentication as an alternative
to password login. Falls back gracefully to password on devices
without biometric hardware.

Closes #234
```

---

## Pre-commit Code Review（最被忽视的工作流）

在每次 commit 之前，让 Claude 快速检查一遍：

```bash
claude
> 运行 git diff --staged 看看我准备提交的改动
> 给我一个快速 review，关注：
> 1. 有没有明显的 bug 或者边界条件遗漏
> 2. 有没有遗留的 debug 代码（print、TODO、FIXME）
> 3. 有没有硬编码的值应该用常量
> 只列出重要问题，不需要优化建议
```

这个习惯可以在 PR review 之前就抓住 70% 的问题。

---

## 理解 Git 历史：代码考古

```bash
# 场景：搞清楚一个神秘函数为什么存在
claude
> 运行 git log -p --follow -- Sources/Network/RetryPolicy.swift
> 分析这个文件的修改历史，告诉我：
> 1. 这个文件经历了哪些重要变化
> 2. 最近一次重大修改是为了解决什么问题
> 3. 现在的实现有没有当初设计时遗留的 workaround
```

```bash
# 场景：找出是谁、什么时候引入了这个 bug
claude
> 用 git log 找出 UserSessionManager.swift 在最近 3 个月的改动
> 我们在 2026年2月初开始出现 session 超时的问题
> 分析哪次提交最可能引入了这个问题
```

---

## Merge Conflict 的处理

Merge conflict 是开发者最烦的事情之一。

**场景：一个复杂的冲突**

```bash
# 遇到冲突时
claude
> 我在 git merge 时遇到了冲突，在 PaymentViewController.swift
> 运行 cat PaymentViewController.swift 看看冲突内容
>
> 背景：
> - main 分支的改动是：重构了 UI 布局，用 Auto Layout 替换了 frame-based
> - 我的分支的改动是：加入了 Apple Pay 支持
>
> 帮我解决冲突，保留两边的改动，并确保逻辑上是正确的
```

**Claude 会：**
1. 读取冲突文件
2. 理解两边的意图
3. 给出合并方案（而不是直接选一边）
4. 解释它为什么这样合并

---

## 生成 PR Description

```bash
claude
> 运行 git log main..HEAD --oneline 查看这个分支的所有提交
> 再运行 git diff main...HEAD --stat 查看改动概况
>
> 帮我写一个 GitHub PR Description：
> - 用中文写
> - 包含：目的、改动概要、测试建议
> - 提到有哪些已知的局限或者后续工作
```

生成的 PR description 会让你的 reviewer 非常感激你。

---

## 生成 Changelog

```bash
claude
> 我要发布新版本 v2.3.0
> 运行 git log v2.2.0..HEAD --oneline 看看这个版本的所有改动
>
> 帮我生成一个用户友好的 Changelog：
> - 分类：新功能、Bug 修复、性能改进、Breaking Changes
> - 用非技术人员能理解的语言
> - 中英文各一份
```

---

## 回溯和比较

### 理解两个版本的差异

```bash
claude
> git diff v2.0.0 v2.1.0 -- Sources/Core/ 的结果是什么？
> 告诉我 Core 模块在这两个版本之间发生了哪些架构层面的变化
```

### 找出 regression 的来源

```bash
claude
> 用 git bisect 策略帮我找出引入这个问题的 commit
>
> 问题描述：用户登出后再登录，头像不刷新
>
> 我知道：
> - v2.0.0 没有这个问题
> - v2.1.0 有这个问题
> - 中间有 23 个 commit
>
> 告诉我应该怎么用 git bisect 来定位，以及每一步怎么判断好坏
```

---

## Branch 管理策略建议

```bash
claude
> 看一下我现在的 git 状态：git branch -a 和 git log --oneline --all --graph
>
> 我的项目用 GitHub Flow，但发现有几个问题：
> 1. 长期运行的功能分支经常和 main 冲突严重
> 2. 紧急 hotfix 和功能开发混在一起
>
> 给我一个改进分支策略的建议，不要过度复杂
```

---

## Git Hooks 的自动化

把 Claude Code 集成到 Git Hooks 里：

```bash
# 在 .git/hooks/prepare-commit-msg 里加入 AI 辅助
#!/bin/bash
# 如果 commit message 是空的，让 Claude 建议一个
if [ -z "$(grep -v '^#' $1)" ]; then
    echo "# Claude Code 建议的 message（可修改）：" > /tmp/claude_suggestion
    claude -p "根据 git diff --staged 的内容，建议一个简洁的 commit message" >> /tmp/claude_suggestion
    cat /tmp/claude_suggestion >> $1
fi
```

---

## 实用 Git + Claude 组合命令

```bash
# 一键 review 并提交
claude
> 1. 先运行 git status 看看我改了什么
> 2. 运行 git diff 看具体改动
> 3. 做一个简短的 code review
> 4. 如果没有重大问题，帮我 stage 所有改动并写一个好的 commit message
> 5. 等我确认 message 后再 commit

# 快速理解别人的 PR
claude
> 运行 git fetch origin && git diff origin/main origin/feature/payment-v2
> 给我一个 5 分钟能看完的 code review 总结

# 清理废弃分支
claude
> 列出所有已经合入 main 的分支
> 建议哪些可以删除
```

---

## 本章总结

Git 集成的价值排序：

1. **Pre-commit review**：最高 ROI，养成习惯
2. **让 Claude 写 commit message**：省时间，历史更清晰
3. **Merge conflict 处理**：省大量时间和痛苦
4. **代码考古**：理解陌生代码库的利器
5. **PR description 生成**：让团队协作更顺畅

---

[→ 第 6 章：调试的艺术](./06-debugging.md)
