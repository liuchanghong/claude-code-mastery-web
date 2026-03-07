# 第 5 章：Git 工作流整合

---

Claude Code 能理解 Git 歷史、寫 commit 訊息、做 code review。把它整合進你的 Git 工作流，是最自然的加倍效率方法之一。

---

## Claude Code 的 Git 能力

Claude Code 可以直接執行 Git 指令、理解 diff 和歷史記錄，也就是說它能：

- 分析 Git 歷史，了解一個功能是怎麼演進的
- 寫有意義的 commit 訊息
- 在你 commit 之前做 pre-commit review
- 分析 PR diff，給出 code review 意見
- 幫你解決 merge conflict
- 生成 changelog

---

## Commit 訊息的正確寫法

**不要這樣：**

```
git commit -m "fix bugs and update ui"
```

這個 commit 訊息五年後看完全不知道發生了什麼。

**改用 Claude Code：**

```bash
# 先 stage 你的改動
git add -p  # 或 git add 指定檔案

# 然後讓 Claude 寫訊息
claude
> 我做了一些修改（執行 git diff --staged 可以看到）
> 幫我寫一個符合 Conventional Commits 格式的 commit 訊息
> 包含：類型（fix/feat/refactor 等）、scope、簡潔的描述
> 如果改動複雜，加一個 body 解釋「為什麼」
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

## Pre-Commit Code Review（最被忽視的工作流）

每次 commit 前，讓 Claude 快速檢查一遍：

```bash
claude
> 執行 git diff --staged 看看我 staged 的改動
> 給我一個快速 review，重點關注：
> 1. 明顯的 bug 或遺漏的邊界條件
> 2. 殘留的 debug code（print、TODO、FIXME）
> 3. 應該做成常數但被寫死的值
> 只列重要問題，跳過優化建議
```

養成這個習慣，可以在 PR review 之前就抓出 70% 的問題。

---

## 理解 Git 歷史：程式碼考古

```bash
# 情境：搞清楚某個神秘函數為什麼存在
claude
> 執行 git log -p --follow -- Sources/Network/RetryPolicy.swift
> 分析這個檔案的修改歷史，告訴我：
> 1. 這個檔案經歷過哪些重大改動
> 2. 最近一次重大改動是要解決什麼問題
> 3. 目前的實作是否有殘留原始設計的 workaround
```

```bash
# 情境：找出 bug 是誰、什麼時候引入的
claude
> 用 git log 找出 UserSessionManager.swift 在最近 3 個月的改動
> 我們從 2026 年 2 月初開始出現 session 逾時的問題
> 分析哪個 commit 最可能引入了這個問題
```

---

## 處理 Merge Conflict

Merge conflict 是開發裡最令人沮喪的事情之一。

**情境：一個複雜的衝突**

```bash
# 遇到衝突的時候
claude
> git merge 時在 PaymentViewController.swift 遇到衝突
> 執行 cat PaymentViewController.swift 看衝突內容
>
> 背景：
> - main 分支的改動：重構了 UI 佈局，從 frame-based 改成 Auto Layout
> - 我的分支的改動：加入了 Apple Pay 支援
>
> 幫我解決衝突，保留兩邊的改動，並確保邏輯正確
```

**Claude 會：**
1. 讀衝突檔案
2. 理解兩邊的意圖
3. 給出合併後的解法（而不是只選一邊）
4. 解釋為什麼這樣合併

---

## 生成 PR 描述

```bash
claude
> 執行 git log main..HEAD --oneline 看這個分支的所有 commit
> 然後執行 git diff main...HEAD --stat 看改動概覽
>
> 幫我寫一個 GitHub PR Description：
> - 包含：目的、改動摘要、測試建議
> - 提到已知的限制或後續工作
```

寫好的 PR 描述，會讓你的 reviewer 很感謝你。

---

## 生成 Changelog

```bash
claude
> 我要發布新版本 v2.3.0
> 執行 git log v2.2.0..HEAD --oneline 看這個版本的所有改動
>
> 生成一個使用者友善的 Changelog：
> - 分類：新功能、Bug 修復、效能改善、破壞性更新
> - 用非技術人員也能看懂的語言描述
```

---

## 回顧與比較

### 了解兩個版本之間的差異

```bash
claude
> git diff v2.0.0 v2.1.0 -- Sources/Core/ 的結果是什麼？
> 告訴我 Core 模組在這兩個版本之間發生了哪些架構層面的改變
```

### 找出 regression 的來源

```bash
claude
> 用 git bisect 策略幫我找出引入這個問題的 commit
>
> 問題：使用者登出再重新登入後，頭像不會更新
>
> 我知道：
> - v2.0.0 沒有這個問題
> - v2.1.0 有
> - 中間有 23 個 commit
>
> 告訴我怎麼用 git bisect 找出來，以及每一步怎麼判斷 good/bad
```

---

## 分支管理策略建議

```bash
claude
> 看一下我目前的 git 狀態：git branch -a 和 git log --oneline --all --graph
>
> 我的專案用 GitHub Flow，但發現幾個問題：
> 1. 長時間的 feature branch 和 main 衝突嚴重
> 2. 緊急 hotfix 和 feature 開發混在一起
>
> 給我改善分支策略的建議，不要過度複雜化
```

---

## Git Hooks 自動化

把 Claude Code 整合進 Git Hooks：

```bash
# 在 .git/hooks/prepare-commit-msg 加入 AI 協助
#!/bin/bash
# 如果 commit 訊息是空的，讓 Claude 建議一個
if [ -z "$(grep -v '^#' $1)" ]; then
    echo "# Claude Code 建議的訊息（可以編輯）：" > /tmp/claude_suggestion
    claude -p "根據 git diff --staged 的內容，建議一個簡潔的 commit 訊息" >> /tmp/claude_suggestion
    cat /tmp/claude_suggestion >> $1
fi
```

---

## 實戰 Git + Claude 組合技

```bash
# 一鍵 review 並 commit
claude
> 1. 先執行 git status 看看我改了什麼
> 2. 執行 git diff 看具體改動
> 3. 做個簡短的 code review
> 4. 如果沒有重大問題，幫我 stage 所有改動並寫好 commit 訊息
> 5. 等我確認訊息後再 commit

# 快速理解別人的 PR
claude
> 執行 git fetch origin && git diff origin/main origin/feature/payment-v2
> 給我一個 5 分鐘能看完的 code review 摘要

# 清理過期分支
claude
> 列出所有已經 merge 進 main 的分支
> 建議哪些可以刪除
```

---

把這些操作養成習慣，git 歷史會越來越清晰，協作也會順暢很多。從 pre-commit review 開始——它能在問題進入 codebase 之前就幫你發現它們。

---

[→ 第 6 章：除錯的藝術](./06-debugging_zht.md)
