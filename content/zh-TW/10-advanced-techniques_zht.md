# 第 10 章：進階技巧——進入前 1%

---

## TL;DR

> 這章是分水嶺：前面的技巧讓你用好 Claude Code。
> 這些技巧讓你超越 99% 的使用者。
> 自訂指令、Hooks、MCP、平行任務——每一個都會改變你的工作方式。

---

## 進階技巧一：自訂 Slash 指令

Slash 指令是你最個人化的生產力工具。

### 什麼是自訂指令

在 `~/.claude/commands/` 或 `.claude/commands/`（專案層級）建立 Markdown 檔案，就能在 Claude Code 裡用 `/指令名稱` 呼叫。

### 建立你的第一個指令

```bash
mkdir -p ~/.claude/commands
```

**`~/.claude/commands/review.md`**

```markdown
對目前 git diff --staged 的內容做 Code Review：

1. 執行 git diff --staged 看改動
2. 檢查以下問題（按嚴重程度分級）：
   - P0（一定要修）：安全漏洞、資料遺失風險、明顯 bug
   - P1（應該修）：效能問題、遺漏的錯誤處理
   - P2（可選）：程式碼風格、可讀性
3. 以清單格式輸出，每項包含：檔名、行號、問題描述、建議修法
4. 最後給出是否可以 merge 的建議

要簡潔，不要說「做得不錯」這類正面回饋。
```

使用方式：

```bash
claude
/review
```

---

### 更多實用的自訂指令

**`~/.claude/commands/explain.md`**：

```markdown
用最清楚的方式解釋 $ARGUMENTS：

1. 先用 1-2 句話說這段程式碼**做什麼**（給非技術讀者看的）
2. 再解釋它**怎麼做到**（給開發者看的）
3. 指出值得注意的技術細節或潛在問題
4. 如果有更簡潔的寫法，簡單提一下
```

使用方式：`/explain the fetchUserData method`

---

**`.claude/commands/test-gen.md`**（專案層級）：

```markdown
為 $ARGUMENTS 生成單元測試：

1. 先讀檔案/函數
2. 找出所有需要測試的情境：
   - 正常路徑
   - 邊界條件
   - 錯誤情況
3. 用 XCTest + Swift Testing 生成測試程式碼（專案標準）
4. Mock 策略：參考 Tests/MockObjects/ 裡現有的 Mock
5. 測試檔放到對應的 Tests/ 目錄

測試函數命名：test_[方法名]_[情境]_[預期結果]
```

使用方式：`/test-gen Sources/Features/Cart/CartViewModel.swift`

---

**`~/.claude/commands/standup.md`**：

```markdown
根據今天的 git 活動，準備站會素材：

1. 執行 git log --since="yesterday" --author="$(git config user.name)" --oneline
2. 執行 git diff HEAD~5..HEAD --stat（看改動範圍）
3. 整理：
   - 昨天完成了什麼（簡潔，1-3 項）
   - 今天計畫做什麼（根據未完成的工作）
   - 有什麼阻礙（如果 git 歷史顯示某個任務反覆修改）

輸出格式：適合直接複製貼到 Slack 的文字
```

---

## 進階技巧二：Hooks——讓 Claude Code 回應你的操作

Hooks 是 Claude Code 的事件系統，讓你在特定操作前後執行自訂邏輯。

### Hooks 的觸發時機

```
PreToolUse:  工具被呼叫之前
PostToolUse: 工具被呼叫之後
Notification: 收到通知時
Stop:         任務結束時
```

### 設定 Hooks

在 `~/.claude/settings.json`：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && swift build 2>&1 | head -20"
          }
        ]
      }
    ]
  }
}
```

這個 hook 的效果：**每次 Claude 寫完檔案，自動執行 swift build 檢查能不能編譯。**

---

### 實用的 Hook 範例

**寫檔後自動格式化：**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "swiftformat $CLAUDE_TOOL_RESULT_FILE_PATH 2>/dev/null || true"
          }
        ]
      }
    ]
  }
}
```

**程式碼改動後自動測試：**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_DIR && xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16' 2>&1 | tail -20"
          }
        ]
      }
    ]
  }
}
```

**任務完成時通知：**

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude Code 完成了任務\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

---

## 進階技巧三：MCP（Model Context Protocol）

MCP 是 Claude Code 的擴充系統，讓你接入自訂的資料來源和工具。

### MCP 能做什麼

- 連接公司內部 Wiki 或文件
- 連接資料庫，讓 Claude 直接查詢
- 連接 Jira、Linear 等專案管理工具
- 連接 Figma，讓 Claude 理解設計稿
- 連接監控系統，讓 Claude 分析線上問題

### 設定 MCP

在 `~/.claude.json`：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/you/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    }
  }
}
```

### 實用的 MCP Server

| MCP Server | 功能 | 使用場景 |
|-----------|------|---------|
| `@modelcontextprotocol/server-filesystem` | 檔案系統存取 | 擴大檔案存取範圍 |
| `@modelcontextprotocol/server-github` | GitHub 操作 | Issue、PR 管理 |
| `@modelcontextprotocol/server-postgres` | 資料庫查詢 | 後端開發、資料分析 |
| `@modelcontextprotocol/server-brave-search` | 網路搜尋 | 技術研究 |

---

## 進階技巧四：平行工作（子 Agent）

最被低估的進階技巧：**同時處理多個獨立任務**。

### 什麼時候用平行

當任務之間互相獨立時：

```bash
# 不要這樣（串行）：
claude
> 分析模組 A 的問題（等 Claude 完成）
> 分析模組 B 的問題（等 Claude 完成）
> 分析模組 C 的問題

# 改成這樣（平行）：
claude
> 我需要同時做三件事，請平行處理：
>
> 任務 1：分析 Sources/Features/Home/ 的程式碼品質
> 任務 2：為 Sources/Core/Network/ 生成單元測試
> 任務 3：檢查 Sources/Features/Cart/ 所有的 TODO 注解
>
> 這三個任務互相獨立，可以同時進行
```

---

## 進階技巧五：Context 管理的藝術

當 session 很長時，context window 會被舊內容填滿。

### 什麼時候需要管理

- 對話超過 30 輪
- Claude 開始「忘記」之前討論過的事
- 回答變得模糊不精確

### 管理策略

**策略一：/compact 指令**

```bash
/compact
```

把對話歷史壓縮成摘要，釋放 context 空間。

**策略二：新 session + 摘要交接**

```bash
# 在目前 session 結束前
claude
> 幫我整理我們討論過的重點，我要用在新的 session 裡

# 開新 session
claude
> 背景：[貼上上面的摘要]
> 繼續之前的工作，現在要做 [下一步]
```

**策略三：把狀態存到檔案**

```bash
claude
> 把目前任務的狀態存到 PROGRESS.md：
> - 已經完成什麼
> - 目前的決策和選定的方案
> - 接下來要做什麼
> - 需要注意的特殊情況
```

---

## 進階技巧六：建立提示詞庫

建立你自己的提示詞庫，把有效的指令存起來重複使用。

```bash
mkdir -p ~/.claude/prompts

# 建立通用的 Swift 程式碼 review 提示詞
cat > ~/.claude/prompts/swift-review.md << 'EOF'
Review 這段 Swift 程式碼，重點關注：
1. 記憶體管理（ARC、retain cycle）
2. 執行緒安全（主執行緒 UI 更新、data race）
3. 錯誤處理（try-catch、Result、optional 處理）
4. 效能（不必要的計算、過度的記憶體分配）
5. Swift 慣用模式（使用現代 Swift 功能）

輸出格式：按嚴重程度排序的問題清單
EOF
```

在 CLAUDE.md 引用這些提示詞，或建立對應的 slash 指令。

---

## 進階技巧七：CI/CD 整合

把 Claude Code 整合進你的自動化流程：

```bash
# 在 CI 腳本裡使用 Claude Code
# .github/workflows/pr-review.yml

- name: Claude Code Review
  run: |
    claude -p "
      Review 這個 PR 的程式碼改動（git diff origin/main HEAD）
      如果找到 P0 問題，輸出 REVIEW_FAILED 加上問題描述
      否則輸出 REVIEW_PASSED
      只輸出這一行，其他什麼都不要說
    " > review_result.txt
    cat review_result.txt
    if grep -q "REVIEW_FAILED" review_result.txt; then
      exit 1
    fi
```

---

## 本章小結：進階技巧金字塔

```
                    /\
                   /  \
                  / MCP  \        ← 連接外部系統，打破 Claude 的邊界
                 /________\
                /          \
               /   Hooks    \     ← 自動化事件回應，減少手動步驟
              /______________\
             /                \
            /  自訂 Slash 指令  \ ← 個人化工作流，複雜任務一個指令搞定
           /____________________\
          /                      \
         /    Context 管理         \ ← 維持長 session 的品質
        /________________________\
       /                          \
      /        平行任務              \ ← 同時做多件事，效率倍增
     /____________________________\
```

每往上一層需要更多設定，但帶來的效率提升是指數級的。

---

[→ 第 11 章：工作流與自動化](./11-workflows-and-automation_zht.md)
