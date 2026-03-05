# 第 2 章：安装与最重要的第一步

---

## TL;DR

> 安装只需 2 分钟。真正的配置需要 20 分钟但值 20 倍。
> 这章最重要的部分不是"怎么装"，而是"装完之后先做什么"。

---

## 安装（快速搞定）

### 前置要求

```bash
# 检查 Node.js 版本（需要 18+）
node --version

# 如果没有或版本太低，用 nvm 安装
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### 安装 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 验证安装

```bash
claude --version
```

### 登录

```bash
claude
# 首次运行会引导你登录 Anthropic 账号
# 按照提示完成 OAuth 认证
```

**就这样。** 安装完成。

---

## 你的第一个命令（别犯这个错误）

大多数人装完 Claude Code 之后，做的第一件事是：

```bash
claude
> 帮我写一个排序算法
```

这是浪费。

**更好的第一件事：**

进入你正在做的项目目录，然后：

```bash
cd /path/to/your/project
claude
> 帮我理解这个项目的整体架构，从入口文件开始，给我一个概述
```

这一个命令，就能让你感受到 Claude Code 和普通 AI 的区别。它会主动去读文件、探索目录，然后给你一个真正有价值的分析。

---

## 启动方式的选择

### 交互模式（最常用）

```bash
claude
```

进入 REPL 环境，可以持续对话。适合大部分日常任务。

### 单次命令模式

```bash
claude -p "给我列出这个项目里所有的 TODO 注释"
```

适合脚本化、一次性任务。

### 继续上次对话

```bash
claude --continue
# 或者
claude -c
```

继续上一个会话，保留之前的上下文。**这个很有用，不要忘记。**

### 恢复特定会话

```bash
claude --resume
```

会列出你的历史会话，可以选择恢复。

---

## 关键设置：权限模式

```bash
# 默认模式（推荐大多数情况）
claude

# 自动批准所有操作（适合信任的项目，快速迭代）
claude --dangerously-skip-permissions
```

> **警告：** `--dangerously-skip-permissions` 意味着 Claude 可以不经你确认直接修改文件、执行命令。
> 在你熟悉项目、明确知道它要做什么之前，不要用这个。

---

## 你的第一个真正配置：创建 CLAUDE.md

这是**最被低估的配置步骤**。

在你的项目根目录创建 `CLAUDE.md` 文件：

```bash
touch CLAUDE.md
```

然后用 Claude Code 本身来帮你填充它：

```bash
claude
> 分析我这个项目，然后帮我写一个 CLAUDE.md 文件，包含：
> 1. 项目概述和技术栈
> 2. 代码风格约定
> 3. 常用的开发命令
> 4. 需要注意的特殊规则
```

Claude Code 会读你的代码库，然后帮你生成一个项目记忆文件。

**这个文件之后每次启动 Claude Code 都会自动加载。** 也就是说，你不需要每次都解释项目背景。

---

## 全局配置：~/.claude/CLAUDE.md

除了项目级别的 `CLAUDE.md`，你还可以配置全局规则：

```bash
# 创建全局配置目录（如果不存在）
mkdir -p ~/.claude

# 编辑全局 CLAUDE.md
claude
> 帮我创建 ~/.claude/CLAUDE.md，写入我的通用代码风格偏好：
> - 我喜欢函数式编程风格
> - 变量命名用驼峰式
> - 不要生成多余的注释
> - 代码要简洁，避免过度工程化
> （根据你自己的偏好调整）
```

**全局 CLAUDE.md 在所有项目里都会生效。**

---

## 界面快捷键（背下来，省时间）

| 快捷键 | 功能 |
|-------|------|
| `Ctrl+C` | 取消当前操作 |
| `Ctrl+D` | 退出 Claude Code |
| `↑` / `↓` | 翻历史命令 |
| `Ctrl+R` | 搜索历史命令 |
| `/help` | 显示帮助 |
| `/clear` | 清空对话历史（但不重置上下文） |
| `/compact` | 压缩对话历史，节省上下文空间 |
| `/status` | 查看当前状态 |

---

## 10 分钟上手实验

装好之后，做这个实验：

### 步骤 1：进入一个你熟悉的项目

```bash
cd ~/your-ios-project
claude
```

### 步骤 2：让 Claude 分析项目

```
> 帮我分析这个项目的架构，告诉我：
> 1. 项目用了什么设计模式
> 2. 入口在哪里
> 3. 最核心的几个模块是什么
```

### 步骤 3：让 Claude 找一个潜在问题

```
> 从代码质量的角度，告诉我这个项目里最可能有问题的地方
```

### 步骤 4：让它实际修改

```
> 找到最明显的一个代码质量问题，告诉我在哪里，然后问我是否要修复
```

完成这 4 步，你就对 Claude Code 的实际能力有了真实感受。

---

## 常见安装问题

**问题：`claude: command not found`**

```bash
# 检查 npm 全局安装路径
npm config get prefix
# 确保 ~/.npm-global/bin 或类似路径在 PATH 里
export PATH="$HOME/.npm-global/bin:$PATH"
```

**问题：认证失败 / 登录问题**

```bash
# 强制重新认证
claude auth login
```

**问题：网络超时（国内用户常见）**

```bash
# 设置代理（根据你的代理地址调整）
export HTTPS_PROXY=http://127.0.0.1:7890
claude
```

---

[→ 第 3 章：指令的艺术](./03-art-of-instructions.md)
