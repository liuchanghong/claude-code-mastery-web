# 第 2 章：安裝與最重要的第一步

---

安裝只需 2 分鐘。真正重要的是裝完之後先做什麼——大多數人跳過了這一步。

---

## 安裝（快速搞定）

### 前置需求

```bash
# 確認 Node.js 版本（需要 18+）
node --version

# 沒有或版本太舊的話，用 nvm 安裝
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20
nvm use 20
```

### 安裝 Claude Code

```bash
npm install -g @anthropic-ai/claude-code
```

### 驗證安裝

```bash
claude --version
```

### 登入

```bash
claude
# 第一次執行會引導你登入 Anthropic 帳號
# 按照提示完成 OAuth 認證就好
```

**這樣就裝好了。**

---

## 第一個指令（別犯這個錯）

大部分人裝完 Claude Code 之後，第一件事是這樣：

```bash
claude
> 幫我寫一個排序演算法
```

這是在浪費它。

**更好的第一件事：**

進到你正在做的專案資料夾，然後：

```bash
cd /path/to/your/project
claude
> 幫我理解這個專案的整體架構，從入口檔案開始，給我一個概述
```

這一個指令，就能讓你感受到 Claude Code 和普通 AI 的差別。它會主動去讀檔案、探索目錄，然後給你一個真正有價值的分析。

---

## 啟動方式的選擇

### 互動模式（最常用）

```bash
claude
```

進入 REPL 環境，可以持續對話。適合大部分日常工作。

### 單次指令模式

```bash
claude -p "列出這個專案裡所有的 TODO 注解"
```

適合腳本化、一次性的任務。

### 繼續上次對話

```bash
claude --continue
# 或者
claude -c
```

繼續上一個 session，保留之前的 context。**這個很好用，記起來。**

### 恢復特定 Session

```bash
claude --resume
```

會列出你的歷史 session，讓你選擇要恢復哪一個。

---

## 重要設定：權限模式

```bash
# 預設模式（大多數情況推薦用這個）
claude

# 自動批准所有操作（信任的專案、快速迭代時用）
claude --dangerously-skip-permissions
```

> **注意：** `--dangerously-skip-permissions` 的意思是 Claude 可以不經你確認就直接修改檔案、執行指令。
> 在你熟悉這個專案之前，不要開這個模式。

---

## 第一個真正的配置：建立 CLAUDE.md

這是**最被低估的配置步驟**，沒有之一。

在你的專案根目錄建立 `CLAUDE.md`：

```bash
touch CLAUDE.md
```

然後用 Claude Code 本身幫你填它：

```bash
claude
> 分析我這個專案，幫我寫一個 CLAUDE.md 檔案，包含：
> 1. 專案概述和技術架構
> 2. 程式碼風格規範
> 3. 常用的開發指令
> 4. 需要注意的特殊規則
```

Claude Code 會讀你的 codebase，然後幫你產生一個專案記憶檔。

**這個檔案之後每次啟動 Claude Code 都會自動載入。** 所以你不需要每次都重新解釋專案背景。

---

## 全域設定：~/.claude/CLAUDE.md

除了專案層級的 `CLAUDE.md`，還可以設定全域規則：

```bash
# 建立全域設定目錄（不存在的話）
mkdir -p ~/.claude

# 設定全域 CLAUDE.md
claude
> 幫我建立 ~/.claude/CLAUDE.md，寫入我的通用程式碼偏好：
> - 我習慣函數式編程風格
> - 變數命名用 camelCase
> - 不要產生多餘的注解
> - 程式碼要簡潔，避免過度工程化
> （根據你自己的偏好調整）
```

**全域 CLAUDE.md 在所有專案裡都會生效。**

---

## 介面快捷鍵（背起來，省時間）

| 快捷鍵 | 功能 |
|-------|------|
| `Ctrl+C` | 取消目前操作 |
| `Ctrl+D` | 離開 Claude Code |
| `↑` / `↓` | 瀏覽指令歷史 |
| `Ctrl+R` | 搜尋指令歷史 |
| `/help` | 顯示說明 |
| `/clear` | 清空對話歷史 |
| `/compact` | 壓縮對話歷史，釋放 context 空間 |
| `/status` | 查看目前狀態 |

---

## 10 分鐘上手實驗

裝好之後，做這個實驗：

### 步驟 1：進入一個你熟悉的專案

```bash
cd ~/your-ios-project
claude
```

### 步驟 2：讓 Claude 分析專案

```
> 幫我分析這個專案的架構，告訴我：
> 1. 專案用了哪些設計模式
> 2. 入口在哪裡
> 3. 最核心的幾個模組是什麼
```

### 步驟 3：讓 Claude 找潛在問題

```
> 從程式碼品質的角度，告訴我這個專案裡最可能有問題的地方
```

### 步驟 4：讓它實際做個修改

```
> 找到最明顯的一個程式碼品質問題，告訴我在哪裡，然後問我要不要修
```

做完這 4 步，你就對 Claude Code 的實際能力有真實感受了。

---

## 常見安裝問題

**問題：`claude: command not found`**

```bash
# 檢查 npm 全域安裝路徑
npm config get prefix
# 確認 ~/.npm-global/bin 或類似路徑有在 PATH 裡
export PATH="$HOME/.npm-global/bin:$PATH"
```

**問題：認證失敗 / 登入有問題**

```bash
# 強制重新認證
claude auth login
```

**問題：網路逾時**

```bash
# 設定 Proxy（根據你的 Proxy 位址調整）
export HTTPS_PROXY=http://127.0.0.1:7890
claude
```

---

[→ 第 3 章：指令的藝術](./03-art-of-instructions_zht.md)
