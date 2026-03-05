# 第 6 章：调试的艺术

---

## TL;DR

> 调试是开发里最耗时的部分。
> Claude Code 能帮你把定位问题的时间减少 60-80%。
> 关键在于：给它正确的信息，而不是让它"猜"。

---

## 调试的第一原则：信息完整性

Claude 调试失败的最常见原因：**信息不完整**。

调试时你需要给 Claude 的信息清单：

```
必须提供：
  [ ] 完整的错误信息 / crash log
  [ ] 发生错误的具体场景（复现步骤）
  [ ] 相关的代码文件

强烈建议提供：
  [ ] 你已经尝试过的方法
  [ ] 这个问题是什么时候开始出现的
  [ ] iOS 版本 / 设备类型（iOS 开发）

有的话提供：
  [ ] 涉及的网络请求和响应
  [ ] 相关的日志
  [ ] 用 Instruments 或其他工具收集的数据
```

---

## 调试场景一：App Crash

### 给 Claude 的标准格式

```
> 我的 app 在以下场景 crash：
> [复现步骤]
> 1. 打开 Profile 页面
> 2. 点击"编辑头像"
> 3. 选择相册里的图片
> 4. Crash
>
> Crash Log：
> [粘贴完整的 crash log，包括线程栈]
>
> 相关代码在 ProfileViewController.swift 的 handleImagePick() 函数
>
> 帮我分析 crash 原因，不要直接改代码，先告诉我你的判断
```

### 读懂 Crash Log

```
> 这是一个 EXC_BAD_ACCESS crash：
> [粘贴 crash log]
>
> 帮我解读：
> 1. crash 发生在哪一行代码
> 2. 是什么类型的内存问题
> 3. 当时的调用栈是什么样的
> 4. 最可能的原因是什么
```

---

## 调试场景二：UI 不符合预期

### SwiftUI 布局问题

```
> 我的 SwiftUI View 在 iPad 上布局错乱，iPhone 上正常
> 上传截图：[附上截图]
> 相关代码在 ProductGridView.swift
>
> 问题表现：Grid 在 iPad 上每行只显示 2 个，但我期望 4 个
>
> 帮我找出原因并修复
```

### UIKit Auto Layout 问题

```
> 有一个 constraint 在运行时报警告：
> [粘贴警告信息]
>
> 这个警告在 UserProfileHeaderView.swift 里
> 读一下这个文件，告诉我是哪个 constraint 有冲突，以及怎么修
```

---

## 调试场景三：性能问题

### 使用 Claude 分析性能瓶颈

```
> 我的列表滑动时有明显卡顿
> 用 Instruments 的 Time Profiler 发现 UICollectionViewCell 的
> configure() 方法占了 34% 的 CPU 时间
>
> 相关代码：[粘贴 configure() 的代码]
>
> 分析原因，给我优化方案，要求：
> - 保持代码简洁
> - 说明每个优化能带来多少改善（大致估计）
```

### 内存问题

```
> Instruments 显示内存在每次导航到 DetailViewController 后
> 都会增加约 2MB 且不释放
>
> 相关代码：DetailViewController.swift 和 DetailViewModel.swift
>
> 帮我找出内存泄漏点，重点检查：
> - closure 里的 self 引用
> - delegate 的 weak/strong
> - NotificationCenter 的监听是否被移除
```

---

## 调试场景四：网络问题

```
> API 请求失败，但只在某些情况下
>
> 网络请求代码在 APIClient.swift
> 错误信息：NSURLError -1001 (timeout)
>
> 情况：
> - 第一次打开 App 正常
> - 切到后台再回来后，第一次请求必然 timeout
> - 后续请求又恢复正常
>
> 这个模式让我怀疑是 URLSession 的 socket 复用问题
> 帮我验证这个假设，并给出解决方案
```

---

## 调试场景五：多线程问题

这类问题最难定位，Claude 可以帮你系统分析。

```
> 我有一个偶发的数据竞争问题，不容易复现
> 症状：列表数据偶尔显示错乱，或者有重复/缺失的 item
>
> 数据层代码在 DataStore.swift
> UI 更新代码在 HomeViewController.swift
>
> 帮我：
> 1. 找出所有可能的线程安全隐患
> 2. 分析我的数据流，标记出哪些访问需要加保护
> 3. 建议最合适的并发保护方案（考虑 Swift actor 或者 DispatchQueue）
```

---

## 高效调试的工具箱

### 工具 1：让 Claude 写诊断代码

```
> 帮我在 syncUserData() 方法里加入详细的日志，
> 记录每一步的执行时间和结果
> 格式：[时间戳] [步骤名] [结果/耗时]
> 完成后我可以快速定位哪一步出了问题
```

### 工具 2：让 Claude 写复现用的测试

```
> 我有一个 bug：当用户名包含特殊字符时，搜索崩溃
> 帮我写一个 XCTest 单元测试来复现这个 bug
> 测试要先失败（验证 bug 存在），修复后才能通过
```

### 工具 3：假设驱动调试

```
> 关于这个 crash，我有三个假设：
> A. 是 UIImagePickerController delegate 在 dismiss 时 crash
> B. 是图片太大导致内存溢出
> C. 是在非主线程更新 UI
>
> 帮我分析：
> 1. 每个假设的可能性有多大
> 2. 怎么快速验证每个假设
> 3. 先验证哪个（排除最快的）
```

---

## 当 Claude 找不到 Bug 时

这种情况会发生。以下是脱困策略：

### 策略 1：扩大上下文

```
> 你之前的分析没有找到问题。让我给你更多上下文：
> [粘贴更多相关代码]
> 这些代码是如何联系的：[解释]
> 重新分析
```

### 策略 2：换个角度

```
> 换个思路：不要找"哪里有 bug"
> 而是帮我完整梳理这段代码的执行路径
> 从用户点击按钮，到最终结果显示，每一步是什么
> 我自己来判断哪里可能出问题
```

### 策略 3：让 Claude 承认边界

```
> 你有多大把握这个分析是正确的？
> 有哪些你没有足够信息来判断的地方？
```

Claude 会告诉你它的不确定性，这比一个错误的答案更有价值。

---

## iOS 专属调试速查表

| 问题类型 | 给 Claude 的关键信息 |
|---------|------------------|
| EXC_BAD_ACCESS | 完整 crash log + 可疑的指针/内存操作代码 |
| Main Thread Checker | 警告信息 + 涉及的 UI 更新代码 |
| Memory Leak | Instruments 截图或数据 + 相关类的代码 |
| UIKit Constraint Warning | 完整警告文字 + 相关 View 的布局代码 |
| Keychain 问题 | 错误码 + 调用代码 + 描述 entitlements 配置 |
| Push Notification 不到达 | 描述注册流程 + 服务端配置 + 证书情况 |

---

## 本章总结

调试的黄金原则：

1. **信息完整 > 信息精简**：调试时宁可多给，不要让 Claude 猜
2. **先分析后修改**：让 Claude 先告诉你它的判断，你确认后再改
3. **假设驱动**：给 Claude 你自己的假设，让它帮你验证
4. **承认边界**：当 Claude 不确定时，让它说出来，这很有价值
5. **写测试复现**：复现 bug 的测试比猜测更可靠

---

[→ 第 7 章：CLAUDE.md 的秘密](./07-claude-md-mastery.md)
