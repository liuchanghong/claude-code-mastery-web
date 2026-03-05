# 第 4 章：代码操作精通

---

## TL;DR

> Claude Code 可以读任何文件、写任何文件、在整个 repo 里搜索。
> 大多数人只用了"帮我改这段代码"。
> 这章告诉你剩下的 80% 怎么用。

---

## Claude Code 能做的文件操作全景

```
读操作：
  - 读单个文件
  - 读多个文件并关联分析
  - 在 repo 里按关键词搜索
  - 查找特定模式（正则）
  - 读目录结构

写操作：
  - 修改现有文件的某几行
  - 创建新文件
  - 批量修改多个文件
  - 重命名/移动文件（通过命令）

分析操作：
  - 分析文件之间的依赖关系
  - 找出所有使用某个方法的地方
  - 分析代码的复杂度和质量
```

---

## 让 Claude 主动探索（而不是你指路）

**低效做法：**

```
> 读 AppDelegate.swift，然后读 SceneDelegate.swift，然后读 MainViewController.swift
```

**高效做法：**

```
> 从入口文件开始，自己探索这个项目的启动流程，告诉我：
> 1. App 启动的完整路径
> 2. 第一个出现的 ViewController 是什么，如何被创建的
```

区别：你在告诉它**目标**，让它自己决定**路径**。这才是 Agent 的正确用法。

---

## 精准定位修改

不要让 Claude 猜你要改什么，要精准。

### 基于函数名

```
> 修改 NetworkManager.swift 里的 request() 函数：
> 加入超时处理，超时时间 30 秒
```

### 基于行号

```
> UserViewController.swift 的第 124-156 行是 setupUI() 函数
> 把硬编码的颜色值换成 UIColor.systemBackground 等系统颜色
```

### 基于特征

```
> 找到所有 completion handler 还在用 @escaping closure 的方法
> 把它们改成 async/await 风格（Swift 5.5+）
```

---

## 多文件协同修改

这是 Claude Code 真正的超能力。

### 场景：重命名一个类

```
> 我要把 UserManager 重命名为 UserService
> 需要：
> 1. 重命名类定义文件
> 2. 更新所有引用这个类的文件
> 3. 更新相关的测试文件
>
> 先告诉我涉及多少文件，让我确认后再修改
```

Claude 会：
1. 用 Grep 搜索所有 `UserManager` 的引用
2. 列出所有需要修改的文件
3. 等你确认
4. 逐一修改

**这个任务手动做可能需要 30 分钟，Claude 做需要 30 秒。**

---

### 场景：统一错误处理模式

```
> 这个项目里有些地方用 try-catch，有些地方用 Result<>,
> 有些地方直接返回 nil。
>
> 我决定统一用 Result<Success, AppError>。
>
> 1. 先帮我找出所有不一致的地方
> 2. 给我一个迁移计划
> 3. 从最核心的 NetworkLayer 开始实施
```

---

## 代码搜索的威力

### 找到所有潜在问题

```
> 搜索整个项目里所有 force unwrap（!）的使用
> 排除测试文件
> 按文件分组列出，并对每一个判断是否危险
```

```
> 找出所有在主线程上可能做网络请求的地方
> 这些代码可能造成 UI 卡顿
```

```
> 找出所有超过 200 行的文件
> 这些文件可能需要拆分
```

### 理解依赖关系

```
> 找出所有依赖 UserDefaults 的代码
> 我想把 UserDefaults 替换成加密存储
> 先让我了解影响范围
```

---

## 批量生成代码

### 生成测试

```
> 为 UserService.swift 里的每个 public 方法生成单元测试
> 测试文件放在 Tests/UserServiceTests.swift
> 使用 XCTest，遵循 Given-When-Then 模式
> 对于网络请求，使用 mock
```

### 生成文档

```
> 为 APIClient.swift 里的所有 public API 生成 Swift DocComment
> 格式要符合 Swift 官方文档风格
> 包含参数说明、返回值说明、可能的 throws
```

### 生成样板代码

```
> 我需要一个新的 ViewModel：ProductViewModel
> 参照 UserViewModel.swift 的模式
> 数据模型是 Product（见 Models/Product.swift）
> 需要：列表加载、搜索过滤、单个产品详情
```

---

## 读代码的高级用法

### 理解复杂逻辑

```
> 读 PaymentProcessor.swift，这段代码逻辑很复杂
> 用流程图的文字形式（用缩进表示层级）描述整个处理流程
> 重点说明各种边界条件的处理
```

### 找出"为什么"

```
> 这段代码（[行号范围]）看起来很奇怪，有很多 workaround
> 帮我理解：为什么会有这些特殊处理？
> 可能是什么历史原因或者 iOS 版本兼容问题？
```

### 评估风险

```
> 我要修改 DatabaseManager.swift 里的 migrate() 函数
> 先帮我分析：修改这个函数可能影响哪些地方？
> 有什么潜在风险？
```

---

## 实战：重构一个真实文件的完整流程

```
# 第一步：理解现状
> 读 LegacyUserController.swift，告诉我这个文件的问题

# 第二步：制定计划
> 给我一个重构计划，把这个 MVC 的"胖 Controller" 拆分成
> MVVM 模式，要求：
> - 不改变任何 UI 行为
> - 可以分多次提交，每次都是可运行的状态

# 第三步：执行第一步
> 开始第一步：把数据处理逻辑提取到 UserViewModel

# 第四步：验证
> 检查修改后的代码，有没有遗漏的情况？

# 第五步：继续
> 好，继续第二步
```

这种**计划-执行-验证-继续**的循环，是处理复杂重构的标准模式。

---

## 文件操作的边界

Claude Code **能做但要小心**的操作：

- 删除文件（会询问确认）
- 修改配置文件（.plist、.xcconfig 等）
- 修改 Package.swift 依赖

Claude Code **不会主动做**的操作：

- Push 到 remote（需要你运行 git push）
- 提交 App Store
- 任何不可逆的云端操作

---

## 本章总结

- 让 Claude 自主探索，给目标而不是路径
- 精准指定修改位置（文件名 + 函数名 + 行号）
- 多文件协同修改是 Claude Code 最大的效率优势
- 批量操作（生成测试、文档、样板代码）省去大量重复工作
- 大任务用**计划-执行-验证-继续**循环

---

[→ 第 5 章：Git 工作流集成](./05-git-workflow.md)
