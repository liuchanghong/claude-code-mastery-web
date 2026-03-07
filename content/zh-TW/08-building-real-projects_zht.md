# 第 8 章：建立真實專案

---

用 Claude Code 做一個完整功能，不是「叫它幫你寫程式碼」——而是把它當成技術協作夥伴，一起設計、一起實作、一起驗證。這章用一個完整的端到端範例，示範這種協作方式是什麼樣的。

---

## 案例：幫 iOS App 加入「離線模式」

我們走完這個功能從 0 到完成的完整生命週期。

需求：
- 沒有網路時顯示快取資料，而不是錯誤
- 顯示離線指示器
- 網路恢復後自動同步

---

## 階段一：需求釐清與技術調研

**永遠不要一開始就叫 Claude 寫程式碼。** 先做技術調研。

```bash
claude
> 我想幫這個 iOS App 加入離線模式支援。
> 先讀一下專案結構，特別是網路層和資料層。
>
> 然後告訴我：
> 1. 現有的程式碼有沒有已經支援離線的基礎設施？
> 2. 哪些資料需要快取（哪些 API 呼叫最頻繁）？
> 3. 因為「沒網路就報錯」的設計，程式碼哪些地方需要改？
>
> 只分析，不要寫程式碼
```

Claude 的分析讓你清楚現狀和改動範圍。

---

## 階段二：技術設計

```bash
claude
> 根據你的分析，給我 3 個實作離線模式的技術方案
> 每個方案說明：
> - 核心思路
> - 實作複雜度（1-5）
> - 對現有程式碼的改動範圍
> - 為什麼適合（或不適合）我們的專案
>
> 我傾向於改動最小但效果最好的方案
```

讓 Claude 給選項，你來做決定。這是正確的人機分工。

---

## 階段三：選定方案，制定實作計畫

假設我們選了「快取 + 網路監控」：

```bash
claude
> 我選方案二：URLCache + NetworkMonitor
>
> 制定詳細的實作計畫：
> - 拆成可以獨立 commit 的任務
>   （每個任務完成後程式碼還能執行）
> - 估計每個任務的複雜度
> - 標記哪些任務必須在哪些之前完成
>
> 用清單格式，我會把這個當作實作指引
```

**重要原則：大功能拆成小步驟，每步都能獨立 commit。**

好處：
- 每一步都可以測試
- 出問題容易 revert
- git 歷史更乾淨

---

## 階段四：執行第一個任務

```bash
claude
> 從第一個任務開始：建立 NetworkMonitor
>
> 要求：
> - 用 NWPathMonitor（iOS 12+）
> - Singleton，但支援 DI（方便測試）
> - 同時提供 async/await 和 Combine Publisher 介面
> - 需要單元測試
>
> 先給我程式碼方案（還不要寫到檔案），等我確認
```

看完方案、提出修改意見，然後：

```bash
> 看起來不錯，一個修改：把 singleton 換成 Environment 注入
> 不然測試會很麻煩
> 改完這個，再把程式碼寫進檔案
```

---

## 階段五：迭代驗證

完成每個模組後，立刻驗證：

```bash
claude
> NetworkMonitor 做好了。幫我：
> 1. 寫一個快速測試，驗證它在模擬器裡正常運作
> 2. 檢查記憶體洩漏的風險（特別是 NWPathMonitor 的生命週期）
> 3. 確認 SwiftUI Preview 還能用（Monitor 初始化不會 crash）
```

---

## 階段六：整合

```bash
claude
> NetworkMonitor 測試通過了
> 現在把它整合進 APIClient：
>
> 要求：
> - 網路不可用時，優先嘗試回傳快取資料
> - 快取資料要標記來源（live 還是 cached）
> - 沒有快取才回傳網路錯誤
>
> 讀一下目前 APIClient.swift 的實作，告訴我在哪裡整合，
> 不要動任何東西之前先說
```

---

## 階段七：UI 層

```bash
claude
> 現在在 UI 顯示離線狀態
>
> 需要一個 OfflineBanner：
> - 沒有網路時從頂部滑入
> - 網路恢復時自動滑出
> - 配合 NavigationStack，不要蓋住 NavigationBar
>
> 參考 Design System 裡現有的 Banner 元件，保持一致的視覺風格
> 先寫 SwiftUI 元件不要整合，讓我先 Preview 一下
```

---

## 階段八：端到端測試

```bash
claude
> 離線模式功能基本完成了
> 寫一個 UI Test 模擬這些情境：
> 1. 正常載入資料
> 2. 斷開網路
> 3. 驗證 OfflineBanner 出現
> 4. 驗證資料還是顯示（來自快取）
> 5. 恢復網路
> 6. 驗證 Banner 消失、資料更新
>
> 用 XCUITest + 手動網路控制
> （可以用 Network Link Conditioner 或 mock）
```

---

## 階段九：Code Review

```bash
claude
> 離線模式功能全部完成了
> 做一個整體 code review，檢查：
> 1. 所有新程式碼是否符合 CLAUDE.md 規範？
> 2. 有沒有遺漏的錯誤處理？
> 3. 對現有功能有沒有潛在的影響？
> 4. 文件注解完整嗎（public API）？
>
> 輸出成 Code Review 格式，按優先順序排序
```

---

## 這個流程的核心邏輯

```
需求 → 技術調研 → 設計 → 拆解任務
    ↓
  執行 → 驗證 → 整合 → 驗證 → ...
    ↓
  UI → 端到端測試 → Code Review
```

**每個階段你的角色：**

| 階段 | 你做的事 | Claude 做的事 |
|------|---------|-------------|
| 需求 | 描述需求，回答問題 | 分析現有程式碼，提出問題 |
| 設計 | 做決策 | 提供選項和取捨 |
| 任務拆解 | 確認是否合理 | 制定計畫 |
| 實作 | Review 程式碼，要求修改 | 寫程式碼 |
| 驗證 | 執行測試，判斷結果 | 寫測試，分析問題 |
| Review | 最終決定 | 找問題 |

**你永遠是決策者；Claude 永遠是執行者。**

---

## 常見專案類型和具體技巧

### 整合第三方 SDK

```bash
claude
> 我需要整合 Stripe iOS SDK 做支付
> 讀一下他們的文件（我給你 URL），然後：
> 1. 告訴我最簡單的整合方式
> 2. 專案哪些地方需要改
> 3. 有哪些安全性要注意
```

### 從 Objective-C 遷移到 Swift

```bash
claude
> 把 LegacyManager.m / LegacyManager.h 遷移成 Swift
> 要求：
> - 保持介面向後相容（OC 程式碼還能呼叫）
> - 用現代 Swift 風格（async/await 等）
> - 加入單元測試覆蓋主要功能
> 先分析這個 class 的所有 public 介面，再開始遷移
```

### 加入 Widget Extension

```bash
claude
> 我想幫 App 加入 iOS Widget
> 先讀主 App 的資料層，然後：
> 1. 設計 Widget 和主 App 的資料共享方案（App Group）
> 2. 建立 Widget Extension target 的基本結構
> 3. 實作一個顯示最近訂單的中型 Widget
```

---

## 大型專案的節奏管理

功能橫跨多天時：

```bash
# 每天開始時
claude
> 昨天完成了 NetworkMonitor 和快取層
> 今天要做 UI 整合
> 快速確認一下：目前程式碼的狀態是什麼？接下來要做什麼？

# 每天結束時
claude
> 今天完成了 OfflineBanner 元件和 NavigationStack 整合
> 寫一個簡短的進度摘要，我會存到 PROGRESS.md
> 這樣明天開始有清楚的 context
```

---

[→ 第 9 章：iOS 與 Swift 深度整合](./09-ios-and-swift_zht.md)
