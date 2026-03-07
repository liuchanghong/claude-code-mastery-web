# 第 4 章：程式碼操作精通

---

Claude Code 可以讀任何檔案、寫任何檔案、在整個 repo 裡搜尋。大多數人只用到「幫我修這段 code」。這章是剩下的 80%。

---

## 檔案操作全貌

```
讀取操作：
  - 讀單一檔案
  - 同時讀多個檔案並分析
  - 在整個 repo 裡依關鍵字搜尋
  - 找特定模式（regex）
  - 讀目錄結構

寫入操作：
  - 修改現有檔案的特定幾行
  - 建立新檔案
  - 批次修改多個檔案
  - 重新命名/移動檔案（透過指令）

分析操作：
  - 分析檔案間的依賴關係
  - 找出某個方法的所有使用位置
  - 分析程式碼複雜度和品質
```

---

## 讓 Claude 自己探索（而不是你指揮每一步）

**沒效率的做法：**

```
> 讀 AppDelegate.swift，然後讀 SceneDelegate.swift，再讀 MainViewController.swift
```

**有效率的做法：**

```
> 從入口檔案開始，自己探索這個專案的啟動流程，告訴我：
> 1. App 啟動的完整路徑
> 2. 第一個 ViewController 是什麼，怎麼被建立的
```

差別在哪裡：你給的是**目標**，讓它自己決定**路徑**。這才是用 Agent 的正確方式。

---

## 精準指定修改位置

不要讓 Claude 猜你要改哪裡，說清楚。

### 用函數名稱

```
> 修改 NetworkManager.swift 裡的 request() 函數：
> 加入 timeout 處理，30 秒逾時
```

### 用行號

```
> UserViewController.swift 的第 124-156 行是 setupUI() 函數
> 把裡面硬碼的顏色值換成 UIColor.systemBackground 等系統顏色
```

### 用模式

```
> 找出所有還在用 @escaping closure completion handler 的方法
> 把它們轉成 async/await 寫法（Swift 5.5+）
```

---

## 多檔案協同修改

這是 Claude Code 最能展現價值的地方。

### 情境：重新命名 Class

```
> 我想把 UserManager 重新命名成 UserService
> 需要：
> 1. 重新命名 class 定義的檔案
> 2. 更新所有引用到這個 class 的檔案
> 3. 更新相關的測試檔案
>
> 先告訴我涉及多少個檔案，讓我確認後再動手
```

Claude 會：
1. 用 Grep 搜尋所有 `UserManager` 的引用
2. 列出所有需要改動的檔案
3. 等你確認
4. 逐一修改

**這個任務手動要 30 分鐘。Claude 30 秒搞定。**

---

### 情境：統一錯誤處理模式

```
> 這個專案有些地方用 try-catch，有些用 Result<>，
> 還有些地方直接 return nil。
>
> 我決定統一改成 Result<Success, AppError>。
>
> 1. 先幫我找出所有不一致的地方
> 2. 給我一個遷移計畫
> 3. 從最核心的 NetworkLayer 開始
```

---

## 程式碼搜尋的威力

### 找出所有潛在問題

```
> 搜尋整個專案所有的 force unwrap (!)
> 排除測試檔案
> 按檔案分組，並評估每個是否危險
```

```
> 找出所有可能在主執行緒發送網路請求的地方
> 這些 code 可能造成 UI 卡頓
```

```
> 找出所有超過 200 行的檔案
> 這些檔案可能需要拆分
```

### 理解依賴關係

```
> 找出所有依賴 UserDefaults 的程式碼
> 我想把 UserDefaults 換成加密儲存
> 先讓我了解影響範圍
```

---

## 批量程式碼生成

### 生成測試

```
> 為 UserService.swift 裡每個 public 方法生成單元測試
> 測試檔放到 Tests/UserServiceTests.swift
> 使用 XCTest，遵循 Given-When-Then 模式
> 網路請求用 mock
```

### 生成文件

```
> 為 APIClient.swift 所有 public API 生成 Swift DocComments
> 風格：Apple 官方文件風格
> 包含參數說明、回傳值、可能的 throw
```

### 生成樣板

```
> 我需要一個新的 ViewModel：ProductViewModel
> 按照 UserViewModel.swift 的模式
> 資料模型是 Product（參考 Models/Product.swift）
> 需要：列表載入、搜尋篩選、單一商品詳情
```

---

## 讀程式碼的進階用法

### 理解複雜邏輯

```
> 讀 PaymentProcessor.swift，這段程式碼邏輯複雜
> 用文字流程圖（用縮排表示層次）描述整個處理流程
> 重點標出邊界條件的處理
```

### 找出「為什麼」

```
> 這段程式碼（第[範圍]行）看起來很奇怪，有很多 workaround
> 幫我理解：這些特殊處理為什麼存在？
> 可能是什麼歷史原因或 iOS 版本相容性問題？
```

### 評估風險

```
> 我打算修改 DatabaseManager.swift 裡的 migrate() 函數
> 先幫我分析：改這個函數可能影響到什麼？
> 有哪些潛在風險？
```

---

## 實戰：一個真實檔案的完整重構流程

```
# 第一步：了解現狀
> 讀 LegacyUserController.swift，告訴我這個檔案有什麼問題

# 第二步：制定計畫
> 給我一個重構計畫，把這個 MVC 的「肥 Controller」拆成 MVVM，
> 要求：
> - 不改變任何 UI 行為
> - 可以分多個 commit 完成，每個 commit 都是可執行狀態

# 第三步：執行第一步
> 開始執行步驟一：把資料處理邏輯抽出來放到 UserViewModel

# 第四步：驗證
> 檢查修改後的程式碼，有沒有遺漏的情況？

# 第五步：繼續
> 好，繼續步驟二
```

這個**計畫 → 執行 → 驗證 → 繼續**的循環，是處理複雜重構的標準模式。

---

## 檔案操作的邊界

Claude Code **能做但要小心**：

- 刪除檔案（會先確認）
- 修改設定檔（.plist、.xcconfig 等）
- 修改 Package.swift 的依賴

Claude Code **不會主動做**：

- Push 到遠端（你要自己執行 git push）
- 提交到 App Store
- 任何不可逆的雲端操作

---

[→ 第 5 章：Git 工作流整合](./05-git-workflow_zht.md)
