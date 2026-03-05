# 附錄：快速參考

> 你需要的一切：指令、快捷鍵、旗標和模板。
> 遇到問題先來這裡找。

---

## A. 啟動指令

```bash
# 基本啟動
claude                              # 互動模式
claude -p "你的問題"                 # 單一問題
claude -c / --continue              # 繼續上次 session
claude --resume                     # 恢復特定歷史 session

# 目錄控制
claude --add-dir /path/to/dir       # 加入額外可存取的目錄

# 權限控制
claude --dangerously-skip-permissions  # 自動批准所有操作（謹慎使用）

# 模型選擇
claude --model claude-opus-4-6      # 使用 Opus（最強但較慢）
claude --model claude-haiku-4-5     # 使用 Haiku（最快但能力較弱）

# 輸出控制
claude -p "問題" --output-format json         # JSON 輸出
claude -p "問題" --output-format stream-json  # 串流 JSON 輸出
```

---

## B. 互動模式快捷鍵

| 快捷鍵 | 功能 |
|-------|------|
| `Ctrl+C` | 取消目前操作（不離開） |
| `Ctrl+D` | 離開 Claude Code |
| `↑` / `↓` | 瀏覽指令歷史 |
| `Escape` 兩次 | 清空目前輸入 |
| `Shift+Enter` | 多行輸入 |

---

## C. Slash 指令

| 指令 | 功能 |
|-----|------|
| `/help` | 顯示說明 |
| `/clear` | 清空對話歷史 |
| `/compact` | 壓縮對話歷史，釋放 context 空間 |
| `/status` | 查看目前狀態（模型、context 使用量等） |
| `/cost` | 查看目前 session 的費用 |
| `/model` | 切換模型 |
| `/vim` | 切換 Vim 快捷鍵模式 |
| `/doctor` | 診斷 Claude Code 設定問題 |
| `/bug` | 回報 bug |

---

## D. 環境變數

```bash
# API 設定
ANTHROPIC_API_KEY=sk-ant-xxx          # API Key（通常透過 OAuth 自動設定）
ANTHROPIC_BASE_URL=https://...        # 自訂 API 端點

# 行為控制
CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096   # 控制輸出長度
DISABLE_AUTOUPDATER=1                # 停用自動更新

# Proxy
HTTPS_PROXY=http://127.0.0.1:7890
HTTP_PROXY=http://127.0.0.1:7890
NO_PROXY=localhost,127.0.0.1
```

---

## E. 設定檔案參考

| 檔案 | 位置 | 用途 |
|-----|------|-----|
| `CLAUDE.md` | 專案根目錄 | 專案層級規則和背景 |
| `CLAUDE.md` | 子目錄 | 模組層級規則 |
| `~/.claude/CLAUDE.md` | 全域 | 個人偏好和全域規則 |
| `~/.claude.json` | 全域 | Claude Code 設定（含 MCP 設定） |
| `.claude/settings.json` | 專案 | 專案層級設定（含 Hooks） |
| `~/.claude/settings.json` | 全域 | 全域設定 |
| `~/.claude/commands/` | 全域 | 自訂 slash 指令（全域） |
| `.claude/commands/` | 專案 | 自訂 slash 指令（專案層級） |

---

## F. CLAUDE.md 範本

```markdown
# [專案名稱] 開發指引

## 專案概述
[一句話描述]

## 技術棧
- 語言：[Swift 5.9 / TypeScript / Python 等]
- 框架：[SwiftUI / React / Django 等]
- 最低版本：[iOS 16 / Node 18 / Python 3.11 等]

## 架構
[簡述架構模式：MVVM / Clean Architecture / MVC 等]

## 目錄結構
[關鍵目錄的說明]

## 程式碼規範
- [規則 1]
- [規則 2]
- [規則 3]

## 絕對不能修改的檔案/目錄
- [檔名]：[原因]

## 常用指令
```bash
# 跑測試
[指令]

# 建置
[指令]

# Lint
[指令]
```

## 已知問題 / 特殊情況
- [問題描述]：[說明或 workaround]

## 相關文件
- [連結或描述]
```

---

## G. 常用提示詞範本

### 程式碼分析

```
讀 [檔名]，告訴我：
1. 這個 [class/function/module] 負責什麼？
2. 設計上有什麼值得注意的地方？
3. 有什麼潛在問題或可以改善的地方？
```

### Bug 修復

```
我遇到這個問題：
[錯誤訊息]

重現情境：
[步驟]

相關程式碼在 [檔名]。

先分析根本原因——等我確認後再修復。
```

### 功能實作

```
我需要實作 [功能描述]。

限制：
- [限制 1]
- [限制 2]

參考：看 [類似的現有功能檔案]，按類似的模式實作。

先給我設計方案，確認後再寫程式碼。
```

### 重構

```
重構 [檔名] 裡的 [函數/class]。

問題：[目前的問題]
目標：[重構目標]
限制：[不能改變的東西]

分步驟實作——每步完成後專案還能執行。
```

### Code Review

```
Review 這段程式碼，重點關注：
1. [關注點 1]
2. [關注點 2]
3. [關注點 3]

以清單格式輸出，按嚴重程度排序。
不要正面回饋——只說問題。
```

---

## H. iOS 開發常用指令

```bash
# 跑單元測試
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16'

# 跑特定測試
xcodebuild test \
  -scheme [SchemeName] \
  -destination 'platform=iOS Simulator,name=iPhone 16' \
  -only-testing:[TestTarget]/[TestClass]/[testMethod]

# 清理建置
xcodebuild clean -scheme [SchemeName]

# Archive
xcodebuild archive \
  -scheme [SchemeName] \
  -archivePath ./build/[SchemeName].xcarchive

# SwiftLint
swiftlint lint --reporter json

# SwiftFormat
swiftformat . --config .swiftformat

# 生成 Xcode 專案（使用 Swift Package Manager 時）
swift package generate-xcodeproj

# 更新依賴
swift package update

# 修復 SPM 快取問題
rm -rf ~/Library/Caches/org.swift.swiftpm
```

---

## I. 除錯快速參考

### 常見 Crash 類型和分析方向

| Crash 類型 | 常見原因 | 調查方向 |
|-----------|---------|---------|
| `EXC_BAD_ACCESS` | 懸空指標、過度 release | 檢查 weak/unowned 引用、多執行緒存取 |
| `SIGABRT` | Assert 失敗、force-unwrap nil | 看 crash 位置的 force unwrap |
| `EXC_CRASH (SIGKILL)` | 記憶體超限 | 看 Instruments Memory，找大型分配 |
| `com.apple.main-thread-checker` | 非主執行緒 UI 操作 | 檢查 DispatchQueue.main 的使用 |
| `NSInvalidArgumentException` | 傳入非法參數 | 檢查 nil 輸入、錯誤的物件類型 |

### Instruments 快速指南

| 情境 | 使用這個 Instrument |
|-----|-------------------|
| 啟動時間慢 | App Launch |
| 執行時 CPU 高 | Time Profiler |
| 記憶體持續增長 | Leaks + Allocations |
| 滑動掉幀 | Core Animation |
| 電池消耗高 | Energy Log |
| 網路問題 | Network |

---

## J. 疑難排解

**問題：Claude Code 沒有回應**
```bash
# 確認網路
curl -I https://api.anthropic.com

# 確認認證
claude auth status

# 重新認證
claude auth login
```

**問題：Context 太長導致回應緩慢**
```
/compact
```
或 `Ctrl+C` 後開新 session。

**問題：Claude 的輸出被截斷**
```
> 繼續
```
或：
```
> 你之前的輸出被截斷了，從 [最後的內容] 繼續
```

**問題：Claude 一直給同樣的錯誤答案**
```
> 換個角度來看這個問題。
> 忘掉之前的分析，從 [不同的起點] 重新開始
```

**問題：CLAUDE.md 沒有生效**
- 確認檔案在正確的目錄（專案根目錄，或 `~/.claude/`）
- 確認檔名完全是 `CLAUDE.md`（大小寫敏感）
- 用 `/status` 確認 Claude Code 載入了哪些設定檔

---

## K. 學習資源

- [Claude Code 官方文件](https://docs.anthropic.com/claude-code)
- [Anthropic 提示詞庫](https://docs.anthropic.com/claude/prompt-library)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)

---

*本書基於 Claude Code（claude-sonnet-4-6），截至 2026 年 3 月*
*部分功能和指令可能隨版本更新而改變，最新資訊請參考官方文件*
