# 第 7 章：CLAUDE.md 秘密

---

一個配置好的 CLAUDE.md，能讓你再也不用每次都重新解釋專案背景。這是投入最少、回報最穩定的配置，沒有之一。

---

## 為什麼 CLAUDE.md 被嚴重低估

想像一下，如果每次開始工作都要：

- 告訴一個新同事專案用什麼架構
- 解釋團隊的程式碼風格
- 提醒他不要碰某些關鍵檔案
- 說明怎麼跑測試

這就是沒有 CLAUDE.md 時的 Claude Code 體驗。

**CLAUDE.md 把這一切變成 Claude 的「長期記憶」。**

---

## CLAUDE.md 的層次結構

Claude Code 讀取 CLAUDE.md 的順序：

```
優先順序（從高到低）：

1. 目前目錄的 CLAUDE.md（專案根目錄）
2. 子目錄的 CLAUDE.md（可以有多個，管理不同模組）
3. ~/.claude/CLAUDE.md（全域規則，所有專案都適用）
```

**這代表你可以：**

- 在根目錄寫專案層級的規則
- 在 `Tests/` 目錄寫測試相關的規則
- 在 `~/.claude/` 寫你個人的全域偏好

---

## 一個完整的 iOS 專案 CLAUDE.md 範例

```markdown
# MyApp 專案指引

## 專案概述
電商 iOS App，Swift 5.9，最低支援 iOS 16。
架構：MVVM + Clean Architecture（三層：View/ViewModel/Repository）

## 技術棧
- SwiftUI（主要 UI，少數舊頁面仍是 UIKit）
- Combine（響應式資料流）
- Swift Concurrency（async/await，已完成 completion handler 遷移）
- TCA（The Composable Architecture）用於複雜狀態管理的頁面
- Alamofire v5 負責網路請求
- Kingfisher 負責圖片載入

## 程式碼風格規範
- 使用 Swift 5.9+ 新功能（if expression、macros 等）
- 所有非同步操作用 async/await，不用 completion handler
- 不用 force unwrap (!)，除非是 IBOutlets 或有充分的注解解釋原因
- Protocol 命名：用 `xxable` 或普通名詞（不加 "Protocol" 後綴）
- ViewModel 繼承 ObservableObject，@Published 屬性按字母排序
- 顏色/字型/間距使用 DesignSystem 裡的常數，不能寫死

## 目錄結構
- Sources/App：App 入口、AppDelegate、SceneDelegate
- Sources/Features：按功能模組組織（Home、Cart、Profile 等）
- Sources/Core：共用核心層（Network、Storage、Analytics）
- Sources/DesignSystem：UI 元件庫
- Tests/：單元測試（XCTest + Swift Testing）
- UITests/：UI 測試

## 重要規範
- 不要直接修改 APIClient.swift（這個檔案有專屬的 code generation）
- Models/ 裡的檔案是從 Schema 自動生成的，手動修改會被覆蓋
- 所有網路 API 定義在 Sources/Core/API/Endpoints.swift
- UserDefaults 統一透過 AppStorage wrapper 存取，不直接用

## 常用開發指令
```bash
# 跑單元測試
xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16'

# 跑特定測試
xcodebuild test -scheme MyApp -only-testing:MyAppTests/UserServiceTests

# 生成 API 程式碼（從 OpenAPI schema）
./scripts/generate_api.sh

# 更新 SPM 依賴
swift package update
```

## 已知問題 / 特殊情況
- NavigationStack 在 iOS 16 有已知 bug，見 issue #123
- ProfileViewController 是舊程式碼，暫時保持 UIKit，不要遷移
- 支付模組使用第三方 SDK，改動要特別小心，一定要測試
```

---

## 子目錄的 CLAUDE.md

在子目錄放更具體的規則：

**`Tests/CLAUDE.md`**：

```markdown
# 測試指引

## 測試框架
- 單元測試：XCTest + Swift Testing（新測試用新框架）
- Mock 框架：手寫 mock（不用 Mockingbird，歷史原因）
- 非同步測試：async/await + expectation

## 命名規範
- 測試函數命名：test_[功能]_[情境]_[預期結果]
  範例：test_fetchUser_withValidID_returnsUser

## Mock 目錄
- MockObjects/ 裡有現成的 Mock class
- 新增 Mock 時，參考 MockNetworkService.swift 的模式

## 覆蓋率要求
- 核心層：80%+
- Feature ViewModel：70%+
- View 層：不要求
```

**`Sources/Core/Network/CLAUDE.md`**：

```markdown
# 網路層規則

這個目錄很關鍵，改動要特別謹慎。

## 架構
- APIClient 是 singleton，透過 DI 注入
- 所有請求都經過 RequestInterceptor 做 token 刷新
- 錯誤統一透過 APIError enum 處理

## 注意事項
- 這個目錄裡不要用 force try
- 所有新的 Endpoint 一定要加到 EndpointTests
- 修改 token 刷新邏輯前先討論（加提醒注解）
```

---

## 讓 Claude Code 幫你寫 CLAUDE.md

不要從頭寫，讓 Claude 幫你：

```bash
claude
> 分析這個專案，幫我寫一個完整的 CLAUDE.md
>
> 應該包含：
> 1. 自動分析到的：技術棧、目錄結構、程式碼模式
> 2. 需要問我的事情：
>    - 有哪些檔案我不應該修改？
>    - 團隊遵循什麼程式碼規範？
>    - 常用的開發指令有哪些？
>    - 有哪些坑/特殊情況要注意？
>
> 先問我這些問題，我回答後再生成檔案
```

---

## 讓 CLAUDE.md 保持最新

**需要更新的時機：**

- 加入新的依賴/框架
- 改變架構決策
- 發現新的「坑」
- 加入新的腳本指令

**怎麼更新：**

```bash
claude
> 我們剛決定把所有 Combine 遷移到 Swift Concurrency
> 更新 CLAUDE.md，加入相關的規範和注意事項
```

---

## 全域 CLAUDE.md：你的個人工作風格

`~/.claude/CLAUDE.md` 是你的個人全域配置：

```markdown
# 我的個人偏好

## 溝通風格
- 用繁體中文回答（程式碼除外）
- 簡潔，不要廢話
- 結論先說，再說細節
- 給建議時說明理由

## 程式碼風格
- 偏好函數式風格
- 避免過度抽象，YAGNI 原則
- 優先用語言內建功能，而不是第三方函式庫
- 注解只在邏輯不明顯時寫，不寫廢話注解

## 工作習慣
- 改動前先告訴我要改什麼，等我確認
- 一次只做一件事
- 如果有多種方案，給我 2-3 個選項和各自的取捨

## 我不喜歡的事
- 過度的正向回饋（「太棒了！當然可以！」）
- 我沒問的情況下推薦重構
- 我只要程式碼的時候給一長串解釋
```

---

## CLAUDE.md 最佳實踐

### 該寫什麼

- 專案架構和技術決策
- 不能修改的檔案/模組（以及原因）
- 命名規範
- 常用指令
- 已知的特殊情況和 workaround

### 不該寫什麼

- 顯而易見的資訊（目錄結構已經說明的事不用重複說）
- 長篇大論的解釋（CLAUDE.md 是參考文件，不是教學）
- 頻繁變動的資訊（改寫在程式碼注解裡比較好）

### 長度建議

- 專案 CLAUDE.md：100-300 行是理想範圍
- 太短：沒有價值
- 太長：Claude 可能漏掉重要的部分

---

## 驗證你的 CLAUDE.md 有沒有效

```bash
claude
> 不讀任何源碼，只用 CLAUDE.md，
> 告訴我這個專案：
> 1. 整體架構
> 2. 最重要的 3 個程式碼規範
> 3. 絕對不能做的事
```

如果 Claude 能正確回答，你的 CLAUDE.md 就寫好了。

---

[→ 第 8 章：建立真實專案](./08-building-real-projects_zht.md)
