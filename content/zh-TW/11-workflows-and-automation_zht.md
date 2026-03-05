# 第 11 章：工作流與自動化

---

## TL;DR

> 臨時用 Claude Code 能帶來 2-3 倍的效率提升。
> 把它系統性地融入日常工作流，能帶來 5-10 倍。
> 這章提供真實、可以直接複製使用的工作流。

---

## 10x 開發者的一個典型工作日

### 早上 9:00：開始工作

不要先看郵件。改成這樣：

```bash
cd your-project
claude
> 快速狀態確認：
> 1. git status——昨天有什麼未完成的工作？
> 2. git log --since="yesterday" --oneline——昨天做了什麼？
> 3. 讀 PROGRESS.md（如果有的話）——有什麼待辦事項？
>
> 用 3 分鐘給我一個「今天從哪裡繼續」的摘要
```

### 9:10：進入狀態

```bash
> 好，繼續做 [功能名稱]
> 昨天停在 [context]
> 下一步是 [要做什麼]
> 開始吧
```

### 中午：快速確認

```bash
> 快速看一下今天的程式碼改動（git diff HEAD~3..HEAD）
> 有沒有需要立刻注意的問題？
```

### 離開前：收尾

```bash
> 快要結束今天的工作了。幫我：
> 1. 把未完成的工作清單寫進 PROGRESS.md
> 2. 為今天所有的改動寫 commit 訊息
> 3. 快速 review 所有 staged 的改動，有沒有殘留的 debug code？
```

---

## 工作流一：新功能開發

```
1. 需求確認（5 分鐘）
   > 我要做 [功能]，用白話描述實作方式，讓我確認理解是否正確

2. 技術調研（10 分鐘）
   > 讀相關程式碼，告訴我有什麼現成的基礎設施，需要新建什麼

3. 設計（15 分鐘）
   > 給我一個實作方案，拆成可以獨立測試的步驟

4. 逐步實作（N 個循環）
   > 實作步驟 1 → review → 確認 → 下一步

5. 測試（20 分鐘）
   > 生成單元測試 → 跑測試 → 修問題

6. 收尾（10 分鐘）
   > pre-commit review → 寫 commit 訊息 → commit
```

---

## 工作流二：Bug 修復

```
1. 蒐集資訊（5 分鐘）
   > 收集：crash log + 重現步驟 + 相關程式碼 + 已試過的方法

2. 根因分析（10 分鐘）
   > 把所有資訊給 Claude，讓它分析根本原因（先分析，不要改程式碼）

3. 假設驗證（10 分鐘）
   > 如果需要，寫診斷程式碼確認假設

4. 修復（視複雜度而定）
   > 確認方案 → 實作修復 → 寫 regression test

5. 驗證（10 分鐘）
   > 在相同情境下驗證修復 → 確認相關功能還能正常運作
```

---

## 工作流三：Code Review

### 身為作者

```bash
# commit 前自我 review
claude
> 執行 git diff --staged
> 以嚴格 reviewer 的角度 review 這些改動
> 套用 Apple 工程師的標準
> 不要鼓勵，只說問題

# 整理後 commit
claude
> 按 Conventional Commits 格式寫 commit 訊息
> 簡潔，重點說「為什麼」而不是「做了什麼」
```

### 身為 Reviewer

```bash
# 快速理解一個 PR
claude
> 這個 PR 改動了以下內容：（貼上 diff 或檔案列表）
> 我只有 15 分鐘做 review
> 幫我快速找出最重要的 3-5 個問題
> 跳過風格問題，重點放在功能和安全性

# 深度 review
claude
> 對這個 PR 做完整 review，特別注意：
> - 狀態管理的正確性
> - 執行緒安全
> - 錯誤處理是否完整
> - 測試覆蓋率
```

---

## 工作流四：理解 Codebase（接手舊專案）

Claude Code 最被低估的使用場景之一。

### 第一天：大局觀

```bash
claude
> 我剛接手這個專案。幫我建立整體理解。
> 依序：
> 1. 讀 README 和主要文件（如果有的話）
> 2. 探索目錄結構
> 3. 找出入口和核心模組
> 4. 給我「新員工第一天需要知道的 5 件事」
```

### 第二天：深入核心

```bash
claude
> 今天我想深入理解業務核心：支付流程
> 從使用者點「立即購買」到支付完成，追蹤完整的程式碼路徑
> 畫一個文字流程圖（用縮排表示層次），標出每個關鍵決策點
```

### 第三天：找出風險

```bash
claude
> 根據你對這個專案的了解，告訴我：
> 1. 哪裡的程式碼最脆弱（改一行可能爆炸）
> 2. 哪些關鍵路徑最缺測試
> 3. 哪個模組的技術債最重
> 4. 交接時越早知道越好的「坑」有哪些
```

---

## 工作流五：重構

```
策略：不要一次重構整個大模組。用 Strangler Fig 模式：

1. 建立正確的新實作（和舊實作並行）
2. 逐漸把呼叫者遷移到新實作
3. 舊實作變成空殼後刪除

範例提示詞：
> 我想重構 NetworkManager，但不能影響目前正在執行的功能
> 用 Strangler Fig 模式：
> 1. 建立新的 NetworkClient（功能相同但用 async/await）
> 2. 讓舊的 NetworkManager 內部呼叫 NetworkClient
> 3. 列出所有直接用 NetworkManager 的地方（給我遷移計畫）
> 4. 我們分批遷移
```

---

## 工作流六：文件生成

```bash
# 生成模組文件
claude
> 為 Sources/Core/Network/ 生成 README.md：
> - 模組職責和設計決策
> - 主要 class 和介面說明
> - 使用範例（真實的程式碼範例）
> - 常見問題 / 注意事項

# 生成 API 注解
claude
> 為 APIClient.swift 所有 public 介面加上 DocComments
> 風格：Apple 官方文件風格
> 內容：參數、回傳值、throw 條件、至少一個使用範例

# 更新 CHANGELOG
claude
> 根據 git log v2.4.0..HEAD
> 更新 CHANGELOG.md
> 格式：Keep a Changelog 規範
> 用非技術語言描述每個改動
```

---

## 工作流七：效能優化

```
1. 先測量（優化前先量）
   > 幫我設計一個 benchmark，測量 [功能] 目前的效能

2. 分析
   > 這是 Instruments 資料：[貼上資料]
   > 找出最大的效能瓶頸

3. 優化
   > 只優化最大的瓶頸（不要過早優化）
   > 給我方案，我確認後再實作

4. 驗證
   > 用同樣的 benchmark 驗證優化效果
   > 確認功能沒有 regression
```

---

## 把工作流變成團隊標準

如果你的團隊也用 Claude Code，把工作流標準化：

### 團隊 CLAUDE.md 範本

```markdown
# 團隊工作流標準

## Code Review 標準
commit 前用 `/review` 指令做 pre-commit review。所有 P0 問題必須在 commit 前修復。

## Commit 訊息標準
用 Conventional Commits 格式。可以用 `/standup` 指令輔助生成。

## Bug 修復標準
所有 bug 修復必須包含 regression test。

## 新功能開發標準
功能必須經過技術設計階段，方案記錄在 PR 描述裡。
```

---

## 自動化腳本：一個指令搞定工作流

把常用的 Claude Code 操作包成 shell 腳本：

```bash
# ~/bin/cc-morning — 早上狀態確認
#!/bin/bash
cd $1 || exit 1
claude -p "
確認專案狀態：
1. git status
2. git log --since=yesterday --oneline
3. 如果有 PROGRESS.md 就讀一下

給我一個「今天從哪裡繼續」的摘要（最多 3 句話）
"
```

```bash
# ~/bin/cc-review — commit 前 review
#!/bin/bash
claude -p "
Review git diff --staged 裡的所有改動
如果有 P0 問題，輸出 BLOCKED: [問題描述]
否則輸出 OK
只輸出這一行，其他什麼都不要說
"
```

---

[→ 第 12 章：常見錯誤與修正](./12-mistakes-and-fixes_zht.md)
