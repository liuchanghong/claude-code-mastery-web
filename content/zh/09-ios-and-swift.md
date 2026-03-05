# 第 9 章：iOS & Swift 专项

---

## TL;DR

> iOS 开发有很多 Claude Code 特别擅长的场景。
> 这章是写给 iOS 开发者的专属攻略，
> 涵盖 Swift 迁移、SwiftUI、Xcode 配置、App Store 准备等。

---

## Claude Code 最擅长的 iOS 任务排行榜

1. **代码迁移**：ObjC→Swift、UIKit→SwiftUI、completion→async/await
2. **理解复杂 API**：UIKit 的生命周期、SwiftUI 的数据流
3. **生成模板代码**：ViewModels、网络层、数据模型
4. **调试崩溃**：读 crash log、分析线程问题
5. **性能优化**：分析 Instruments 数据、优化渲染路径
6. **适配新 OS**：分析 deprecation、提供替代方案

---

## Swift 语言迁移

### Completion Handler → async/await

这是最常见的迁移任务：

```swift
// 迁移前
func fetchUser(id: String, completion: @escaping (Result<User, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        // 处理结果
        completion(.success(user))
    }.resume()
}

// 迁移后（Claude 帮你生成）
func fetchUser(id: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}
```

**指令：**

```bash
claude
> 把 UserService.swift 里所有使用 completion handler 的方法
> 迁移到 async/await
>
> 注意：
> - 保留原来的 completion handler 版本（加 @available(*, deprecated) 标注）
> - 新的 async 方法用 throws 而不是 Result
> - 调用这些方法的地方也要更新
>
> 先列出所有需要迁移的方法，然后逐个迁移
```

---

### Objective-C → Swift

```bash
claude
> 把 OrderManager.m 和 OrderManager.h 迁移到 Swift
>
> 迁移规则：
> 1. 保持 @objc 注解，让 OC 代码还能调用
> 2. NSDictionary/NSArray 换成 Swift 原生类型
> 3. delegate 模式可以保留（不需要换成 Combine）
> 4. NS_ENUM 换成 Swift enum（保持原始值兼容）
>
> 先分析这个类的所有接口，然后给我迁移方案确认后再写
```

---

## SwiftUI 专项

### 复杂 View 分析

SwiftUI 的数据流有时很难理解，让 Claude 帮你梳理：

```bash
claude
> 读 CheckoutView.swift 和相关的 ViewModel
> 帮我画出数据流：
> - 哪些数据是 @State（本地状态）
> - 哪些数据是 @ObservedObject（外部状态）
> - 触发 UI 更新的路径是什么
> - 有没有不必要的重新渲染
```

### 性能优化

```bash
claude
> 我的 ProductListView 里有 100+ 个 cell，滑动时掉帧
> 相关代码在 ProductListView.swift 和 ProductRowView.swift
>
> 帮我分析：
> 1. 哪些地方会导致不必要的 View 重建
> 2. 如何用 .equatable()、EquatableView 优化
> 3. LazyVStack/LazyVGrid 的使用是否正确
```

### ViewModifier 和复用

```bash
claude
> 我的代码里有很多重复的样式设置（阴影、圆角、边框）
> 分散在各个 View 里
>
> 帮我：
> 1. 找出所有重复的样式模式
> 2. 设计一套 ViewModifier
> 3. 用这些 Modifier 替换现有代码
>
> 参考 DesignSystem/ 目录里现有的组件风格
```

---

## 生命周期管理

这是 iOS 开发者最容易踩坑的地方：

```bash
claude
> 我的 App 有一个问题：从后台回到前台后，某些数据不刷新
> 相关的 ViewController 是 DashboardViewController
>
> 帮我分析：
> 1. 这个 ViewController 在 App 生命周期里的状态变化
> 2. 什么时机应该刷新数据
> 3. sceneDidBecomeActive vs viewWillAppear 哪个更合适
> 4. 如何避免重复刷新（两个生命周期方法都触发的情况）
```

---

## Xcode 配置和工程管理

Claude Code 在这方面也很有帮助，但需要你把配置文件内容粘贴出来：

```bash
# Build Settings 问题
claude
> 我的项目在 Release build 时 crash，Debug 正常
> 相关的 Build Setting 差异可能是什么？
>
> 项目用了以下设置：（粘贴相关 Build Settings 截图或文字）
> 重点检查：SWIFT_OPTIMIZATION_LEVEL、DEBUG_INFORMATION_FORMAT 等

# Provisioning Profile 问题
claude
> App 签名报错：（粘贴错误信息）
> 帮我一步步排查，不要跳步骤

# Swift Package Manager
claude
> 我需要添加 [某个库] 依赖
> 读一下 Package.swift 现有的格式
> 帮我添加正确的依赖声明，版本用最新的稳定版
```

---

## Core Data / SwiftData

```bash
claude
> 我想把 UserData 从 UserDefaults 迁移到 SwiftData
> 数据模型是：（描述或粘贴 User struct）
>
> 帮我：
> 1. 创建 SwiftData @Model
> 2. 写迁移代码（现有的 UserDefaults 数据要转移过来）
> 3. 更新所有读写 UserData 的地方
>
> 注意最低支持 iOS 17（SwiftData 的要求）

# Core Data 调试
claude
> Core Data 报 merge conflict 错误：（粘贴错误）
> 帮我理解这是什么问题，以及正确的 merge policy 选择
```

---

## 网络层专项

```bash
# 设计 API 客户端
claude
> 帮我设计一个 iOS 网络层，要求：
> - 支持 REST API（JSON）
> - 自动 token 刷新（401 时）
> - 请求队列（刷新 token 期间的请求 hold 住，刷新后继续）
> - 可测试（通过 URLProtocol mock）
> - async/await 接口
>
> 先给我架构设计，不写代码

# 解决 SSL Pinning 问题
claude
> 我需要给 App 加 SSL Pinning
> 现有的网络层用的是 URLSession
> 帮我实现 URLSessionDelegate 的证书 pinning
> 需要同时支持证书 pinning 和 public key pinning
```

---

## 通知（Push Notifications）

```bash
claude
> 帮我实现推送通知完整流程：
> 1. 注册 APNs
> 2. 获取 device token
> 3. 发送到服务器
> 4. 处理前台 / 后台 / 未启动三种状态下的通知
> 5. 通知权限的优雅请求（先解释再请求）
>
> 代码要适配 iOS 16+，用 Swift Concurrency
> 分步骤来，每步我确认后再继续
```

---

## App Store 提交准备

```bash
# 隐私权限说明
claude
> 我的 App 用到了以下权限：相机、相册、定位（使用中）
> 帮我写每个权限的 NSUsageDescription 字符串
> 要求：中英文各一份，说明清楚用途，不能太泛
> 参考 Apple 的审核指南标准

# Privacy Manifest
claude
> 检查我的项目，生成需要的 PrivacyInfo.xcprivacy
> 我用到了：UserDefaults、URLSession、FileManager
> 找出所有需要声明的 API 使用

# Release Notes
claude
> 根据这次版本的 git 改动（运行 git log v2.2.0..HEAD --oneline）
> 帮我写 App Store 的版本更新说明
> 中英文各一份
> 用用户能理解的语言，不要用技术术语
```

---

## iOS 特有的性能优化

```bash
# 启动时间优化
claude
> 我的 App 冷启动时间超过 2 秒，用 Instruments 的 App Launch 模板分析
> 截图/数据如下：（粘贴数据）
>
> 分析可能的原因：
> - 主线程的阻塞操作
> - 过多的 +load 方法
> - 大量的 dylib 加载
> 给我一个分步骤的优化计划

# 电量优化
claude
> 用户反馈我的 App 耗电量大
> Instruments Energy Log 数据：（描述高耗电的操作）
>
> 重点分析：
> - 后台定位是否过于频繁
> - 网络请求合并的机会
> - CPU 唤醒次数
```

---

## Swift 5.9+ 新特性应用

```bash
claude
> 我想用 Swift 5.9 的新特性重构这段代码：（粘贴代码）
>
> 可以应用的新特性包括：
> - if/switch expression
> - Macros（如果适合）
> - Parameter packs（如果需要泛化）
> - @Observable（替换 ObservableObject）
>
> 告诉我哪些新特性适合这段代码，然后展示重构后的版本
```

---

## 本章总结：iOS 开发者的 Claude Code 使用清单

每天工作中，这些场景优先用 Claude Code：

- [ ] 写了 completion handler？让 Claude 迁移到 async/await
- [ ] 遇到 Crash Log？直接粘给 Claude 分析
- [ ] 要写新的 ViewModel？让 Claude 按照项目模式生成
- [ ] 引入新的权限？让 Claude 写 usage description
- [ ] 要做 Code Review？让 Claude 先扫一遍
- [ ] 要重命名一个类？让 Claude 处理所有引用

---

[→ 第 10 章：高级技巧](./10-advanced-techniques.md)
