# 第 7 章：CLAUDE.md 的秘密

---

## TL;DR

> CLAUDE.md 是让 Claude Code 记住你的规则的文件。
> 没有它，你每次都要重新解释项目背景。
> 有了它，Claude Code 就像一个熟悉你项目的老员工。
> 这是投入最少、回报最高的配置。

---

## 为什么 CLAUDE.md 被严重低估

想象你每次开始工作都要：

- 告诉新同事项目用什么架构
- 解释团队的代码风格
- 提醒他不要动某些关键文件
- 说明测试怎么跑

这就是没有 CLAUDE.md 的 Claude Code 体验。

**CLAUDE.md 把这些内容变成 Claude 的"长期记忆"。**

---

## CLAUDE.md 的层级系统

Claude Code 按这个顺序读取 CLAUDE.md：

```
优先级（从高到低）：

1. 当前目录的 CLAUDE.md（项目根目录）
2. 子目录的 CLAUDE.md（可以有多个，分别管理不同模块）
3. ~/.claude/CLAUDE.md（全局规则，所有项目生效）
```

**这意味着你可以：**

- 在根目录写项目级规则
- 在 `Tests/` 目录写测试特定的规则
- 在 `~/.claude/` 写你个人的全局偏好

---

## 一个真实的 iOS 项目 CLAUDE.md 完整示例

```markdown
# MyApp 项目指南

## 项目概述
一个电商 iOS App，Swift 5.9，最低支持 iOS 16。
架构：MVVM + Clean Architecture（3层：View/ViewModel/Repository）

## 技术栈
- SwiftUI（主 UI，部分旧页面还是 UIKit）
- Combine（响应式数据流）
- Swift Concurrency（async/await，已从 completion handler 迁移完成）
- TCA（The Composable Architecture）用于复杂状态管理页面
- Alamofire v5 用于网络请求
- Kingfisher 用于图片加载

## 代码风格规范
- 使用 Swift 5.9+ 的新特性（if expression、macro 等）
- 所有异步操作用 async/await，不用 completion handler
- 不用 force unwrap（！），除非是 IBOutlet 或者有充分注释说明理由
- Protocol 命名用 `xxable` 或者直接名词（不加 Protocol 后缀）
- ViewModel 继承 ObservableObject，@Published 属性按字母排序
- 颜色/字体/间距使用 DesignSystem 里的常量，不硬编码

## 目录结构
- Sources/App：App 入口、AppDelegate、SceneDelegate
- Sources/Features：按功能模块划分（Home、Cart、Profile 等）
- Sources/Core：共享的核心层（Network、Storage、Analytics）
- Sources/DesignSystem：UI 组件库
- Tests/：单元测试（XCTest + Swift Testing）
- UITests/：UI 测试

## 重要约定
- 永远不要直接修改 APIClient.swift（这个文件有专门的代码生成）
- Models/ 里的文件是从 Schema 自动生成的，修改会被覆盖
- 所有网络 API 定义在 Sources/Core/API/Endpoints.swift
- UserDefaults 统一通过 AppStorage 封装，不直接用 UserDefaults

## 常用开发命令
```bash
# 运行单元测试
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'

# 运行特定测试
xcodebuild test -scheme MyApp -only-testing:MyAppTests/UserServiceTests

# 生成 API 代码（从 OpenAPI schema）
./scripts/generate_api.sh

# 更新 SPM 依赖
swift package update
```

## 当前已知问题/特殊情况
- iOS 16 上 NavigationStack 有一个已知 bug，见 #123
- ProfileViewController 是遗留代码，暂时保持 UIKit 不迁移
- 支付模块使用第三方 SDK，改动需要格外小心，总是要测试
```

---

## 分模块的 CLAUDE.md

在子目录放更具体的规则：

**`Tests/CLAUDE.md`**：

```markdown
# 测试指南

## 测试框架
- 单元测试：XCTest + Swift Testing（新的测试用新框架）
- Mock 框架：手写 Mock（不用 Mockingbird，历史原因）
- 异步测试：用 async/await + expectation

## 命名规范
- 测试函数命名：test_[功能]_[场景]_[预期结果]
  例如：test_fetchUser_withValidID_returnsUser

## Mock 目录
- MockObjects/ 里有现成的 Mock 类
- 新加 Mock 时参考 MockNetworkService.swift 的模式

## 测试覆盖率要求
- Core 层：80%+
- Feature ViewModel：70%+
- View 层：不强制要求
```

**`Sources/Core/Network/CLAUDE.md`**：

```markdown
# 网络层规则

这个目录很关键，修改要格外小心。

## 架构
- APIClient 是单例，通过 DI 注入
- 所有请求走 RequestInterceptor 做 token 刷新
- 错误统一用 APIError enum 处理

## 注意事项
- 永远不要在这个目录用 force try
- 所有新的 Endpoint 必须加到 EndpointTests 里
- 修改 token 刷新逻辑前先找我（添加注释提醒）
```

---

## 让 Claude Code 帮你写 CLAUDE.md

不要从零开始写，让 Claude 帮你：

```bash
claude
> 分析这个项目，帮我写一个全面的 CLAUDE.md
>
> 需要包含：
> 1. 自动分析出来的：技术栈、目录结构、代码模式
> 2. 询问我的：
>    - 有没有不能修改的文件？
>    - 团队有哪些编码规范？
>    - 常用的开发命令是什么？
>    - 有没有需要注意的坑？
>
> 先问我这些问题，我回答后再生成文件
```

---

## 让 CLAUDE.md 保持更新

**触发更新的场景：**

- 引入新的依赖/框架
- 改变了架构决策
- 发现了新的"坑"
- 添加了新的脚本命令

**更新方式：**

```bash
claude
> 我们刚决定把 Combine 全部迁移到 Swift Concurrency
> 更新 CLAUDE.md，把相关的规范和注意事项改掉
```

---

## 全局 CLAUDE.md：你的个人工作方式

`~/.claude/CLAUDE.md` 是属于你个人的全局配置：

```markdown
# 我的个人偏好

## 沟通风格
- 用中文回答（除非是代码）
- 回答要简洁，不要啰嗦
- 先给结论，再给细节
- 给建议时说明理由

## 代码风格
- 偏好函数式风格
- 避免过度抽象，YAGNI 原则
- 优先使用语言内置特性，少用第三方库
- 注释只在逻辑不明显时加，不写废话注释

## 工作习惯
- 修改代码前先告诉我改什么，等我确认
- 一次只做一件事
- 如果有多个方案，给我 2-3 个选项和它们的权衡

## 我不喜欢的
- 过度的正面反馈（"好的！当然！"）
- 在我没问的情况下推荐重构
- 生成超长的解释，当我只要代码时
```

---

## CLAUDE.md 的最佳实践

### 该写什么

- 项目架构和技术决策
- 不能修改的文件/模块（以及为什么）
- 命名规范
- 常用命令
- 已知的特殊情况和 workaround

### 不该写什么

- 显而易见的信息（"这是一个 iOS app"，如果目录结构已经很明显）
- 太长的解释（CLAUDE.md 应该是参考，不是教程）
- 频繁变化的信息（放在注释里更合适）

### 长度建议

- 项目 CLAUDE.md：100-300 行是理想范围
- 太短：没有价值
- 太长：Claude 可能忽略重要部分

---

## 验证你的 CLAUDE.md 是否有效

```bash
claude
> 在不读任何源代码的情况下，只根据 CLAUDE.md
> 告诉我这个项目的：
> 1. 整体架构
> 2. 代码规范的 3 个最重要点
> 3. 我应该绝对不能做的事情
```

如果 Claude 能正确回答，说明你的 CLAUDE.md 写得很好。

---

[→ 第 8 章：构建真实项目](./08-building-real-projects.md)
