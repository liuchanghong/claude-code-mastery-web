# 第 9 章：iOS 與 Swift 深度整合

---

iOS 開發裡有些任務特別適合交給 Claude Code：遷移、理解複雜 API、生成樣板、分析 crash。這章是 iOS 開發者的專屬攻略。

---

## Claude Code 在 iOS 開發中最有價值的場景

1. **程式碼遷移**：ObjC→Swift、UIKit→SwiftUI、completion→async/await
2. **理解複雜 API**：UIKit 生命週期、SwiftUI 資料流
3. **產生樣板**：ViewModel、網路層、資料模型
4. **除錯 Crash**：讀 crash log、分析執行緒問題
5. **效能優化**：分析 Instruments 資料、優化渲染路徑
6. **OS 版本適配**：分析 deprecated API、提供替代方案

---

## Swift 語言遷移

### Completion Handler → async/await

最常見的遷移任務：

```swift
// 之前
func fetchUser(id: String, completion: @escaping (Result<User, Error>) -> Void) {
    URLSession.shared.dataTask(with: url) { data, response, error in
        // handle result
        completion(.success(user))
    }.resume()
}

// 之後（Claude 生成的）
func fetchUser(id: String) async throws -> User {
    let (data, _) = try await URLSession.shared.data(from: url)
    return try JSONDecoder().decode(User.self, from: data)
}
```

**提示詞：**

```bash
claude
> 把 UserService.swift 裡所有用 completion handler 的方法
> 遷移成 async/await
>
> 注意：
> - 保留原本的 completion handler 版本（加 @available(*, deprecated) 標記）
> - 新的 async 方法用 throws 而不是 Result
> - 同時更新呼叫這些方法的地方
>
> 先列出所有需要遷移的方法，再逐一遷移
```

---

### Objective-C → Swift

```bash
claude
> 把 OrderManager.m 和 OrderManager.h 遷移成 Swift
>
> 遷移規則：
> 1. 保留 @objc 標注，OC 程式碼還能呼叫
> 2. NSDictionary/NSArray 換成 Swift 原生型別
> 3. Delegate 模式可以留著（不用換成 Combine）
> 4. NS_ENUM → Swift enum（保持 raw value 相容性）
>
> 先分析這個 class 的所有介面，給我遷移計畫確認後再動手
```

---

## SwiftUI 深度應用

### 分析複雜 View

SwiftUI 的資料流有時很難搞清楚，讓 Claude 幫你梳理：

```bash
claude
> 讀 CheckoutView.swift 和相關的 ViewModel
> 幫我梳理資料流：
> - 哪些資料是 @State（本地狀態）
> - 哪些是 @ObservedObject（外部狀態）
> - 什麼會觸發 UI 更新
> - 有沒有不必要的重新渲染
```

### 效能優化

```bash
claude
> 我的 ProductListView 有 100+ 個 cell，滑動時掉幀
> 相關程式碼：ProductListView.swift 和 ProductRowView.swift
>
> 幫我分析：
> 1. 什麼造成了不必要的 View 重建
> 2. 怎麼用 .equatable() 或 EquatableView 優化
> 3. LazyVStack/LazyVGrid 有沒有用對
```

### ViewModifier 和複用

```bash
claude
> 我的程式碼裡有很多重複的樣式設定（陰影、圓角、邊框）
> 分散在各個 View 裡
>
> 幫我：
> 1. 找出所有重複的樣式模式
> 2. 設計一組 ViewModifier
> 3. 用這些 Modifier 取代現有程式碼
>
> 參考 DesignSystem/ 裡現有元件的風格
```

---

## 生命週期管理

iOS 開發者最常踩到的坑之一：

```bash
claude
> 我的 App 有一個問題：從背景回來的時候，某些資料不會刷新
> 相關的 ViewController 是 DashboardViewController
>
> 幫我分析：
> 1. 這個 ViewController 在 App 生命週期裡的狀態變化
> 2. 適合刷新資料的時機是哪裡
> 3. sceneDidBecomeActive 和 viewWillAppear 哪個更合適？
> 4. 怎麼避免雙重刷新（兩個生命週期方法都觸發）
```

---

## Xcode 設定與專案管理

Claude Code 在這方面也有幫助，但你需要把設定檔內容貼給它：

```bash
# Build Settings 問題
claude
> 我的專案 Release build 會 crash，Debug 正常
> 什麼 Build Setting 差異可能造成這個？
>
> 專案目前的設定：（貼上相關 Build Settings 文字）
> 重點關注：SWIFT_OPTIMIZATION_LEVEL、DEBUG_INFORMATION_FORMAT 等

# Provisioning Profile 問題
claude
> App 簽名錯誤：（貼上錯誤）
> 幫我一步步排查，不要跳過步驟

# Swift Package Manager
claude
> 我需要加入 [某個函式庫] 作為依賴
> 讀一下 Package.swift 現有的格式
> 幫我加入正確的依賴宣告，用最新的穩定版本
```

---

## Core Data / SwiftData

```bash
claude
> 我想把 UserData 從 UserDefaults 遷移到 SwiftData
> 資料模型是：（描述或貼上 User struct）
>
> 幫我：
> 1. 建立 SwiftData @Model
> 2. 寫遷移程式碼（把現有 UserDefaults 資料轉移過去）
> 3. 更新所有讀寫 UserData 的地方
>
> 注意：最低支援 iOS 17（SwiftData 要求）

# Core Data 除錯
claude
> Core Data 出現 merge conflict 錯誤：（貼上錯誤）
> 幫我理解這是什麼情況，以及怎麼選擇正確的 merge policy
```

---

## 網路層深度應用

```bash
# 設計 API Client
claude
> 幫我設計一個 iOS 網路層，要求：
> - 支援 REST API（JSON）
> - 自動 token 刷新（401 時）
> - 請求排隊（token 刷新時 hold 住請求，刷新後繼續）
> - 可測試（透過 URLProtocol mock）
> - async/await 介面
>
> 先給我架構設計，不要寫程式碼

# SSL Pinning
claude
> 我需要幫 App 加入 SSL Pinning
> 現有網路層用 URLSession
> 在 URLSessionDelegate 實作 certificate pinning
> 同時支援憑證固定和公鑰固定
```

---

## 推播通知

```bash
claude
> 幫我實作完整的推播通知流程：
> 1. 向 APNs 註冊
> 2. 取得 device token
> 3. 傳送給 server
> 4. 在前景/背景/未開啟三種狀態下處理通知
> 5. 優雅地請求權限（請求前說明用途）
>
> 程式碼針對 iOS 16+，使用 Swift Concurrency
> 一步一步來，每步讓我確認後再繼續
```

---

## App Store 提交準備

```bash
# 隱私權限說明
claude
> 我的 App 用到這些權限：相機、照片、位置（使用中）
> 幫我寫每個權限的 NSUsageDescription 字串
> 要有中英文兩版，清楚說明用途，不能太模糊
> 符合 Apple 審查指南

# Privacy Manifest
claude
> 檢查我的專案，生成需要的 PrivacyInfo.xcprivacy
> 我用了：UserDefaults、URLSession、FileManager
> 找出所有需要宣告的 API

# 版本說明
claude
> 根據這個版本的 git 改動（執行 git log v2.2.0..HEAD --oneline）
> 寫 App Store 版本說明
> 用使用者能看懂的語言，不要用技術術語
```

---

## iOS 特定效能優化

```bash
# 啟動時間優化
claude
> 我的 App 冷啟動超過 2 秒，用 Instruments App Launch 分析了
> 資料如下：（貼上資料）
>
> 分析可能的原因：
> - 主執行緒上的阻塞操作
> - 太多 +load 方法
> - 過多的 dylib 載入
> 給我分步驟的優化計畫

# 電池優化
claude
> 使用者回報我的 App 很耗電
> Instruments Energy Log 資料：（描述高耗能操作）
>
> 重點關注：
> - 背景定位是否太頻繁
> - 網路請求能否批次處理
> - CPU 喚醒次數
```

---

## 應用 Swift 5.9+ 新功能

```bash
claude
> 我想用 Swift 5.9 新功能重構這段程式碼：（貼上程式碼）
>
> 可以用的新功能包括：
> - if/switch expression
> - Macros（如果合適）
> - Parameter packs（如果需要泛化）
> - @Observable（取代 ObservableObject）
>
> 告訴我這段程式碼適合用哪些新功能，然後給我重構後的版本
```

---

## iOS 開發者的日常參考清單

日常工作中，這些情境優先考慮用 Claude Code：

- [ ] 寫了 completion handler？讓 Claude 遷移成 async/await
- [ ] 拿到 Crash Log？直接貼給 Claude 分析
- [ ] 需要寫新 ViewModel？讓 Claude 按專案模式生成
- [ ] 加入新的權限？讓 Claude 寫用途說明
- [ ] 要做 Code Review？讓 Claude 先掃一遍
- [ ] 要重新命名 Class？讓 Claude 處理所有引用

---

[→ 第 10 章：進階技巧](./10-advanced-techniques_zht.md)
