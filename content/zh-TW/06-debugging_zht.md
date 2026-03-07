# 第 6 章：除錯的藝術

---

除錯是開發裡最耗時的部分。Claude Code 能把你找問題的時間大幅壓縮，但前提是給它正確的資訊——而不是讓它猜。

---

## 除錯的第一原則：資訊完整性

Claude 除錯失敗最常見的原因：**資訊不完整**。

給 Claude 除錯時，你需要提供的資訊清單：

```
必須提供：
  [ ] 完整的錯誤訊息 / crash log
  [ ] 錯誤發生的確切情境（重現步驟）
  [ ] 相關的程式碼檔案

強烈建議：
  [ ] 你已經試過的方法
  [ ] 這個問題什麼時候開始出現
  [ ] iOS 版本 / 裝置型號（iOS 開發者）

有的話提供：
  [ ] 涉及的網路請求和回應
  [ ] 相關的 log
  [ ] Instruments 或其他工具收集的資料
```

---

## 除錯情境一：App Crash

### 給 Claude 的標準格式

```
> 我的 App 在這個情境下 crash：
> [重現步驟]
> 1. 打開個人資料頁面
> 2. 點擊「編輯頭像」
> 3. 從相簿選一張照片
> 4. Crash
>
> Crash Log：
> [貼上完整的 crash log，包含 thread stacks]
>
> 相關程式碼是 ProfileViewController.swift 裡的 handleImagePick() 函數
>
> 幫我分析 crash 原因，先不要改程式碼，告訴我你的判斷
```

### 讀取 Crash Log

```
> 這是一個 EXC_BAD_ACCESS 的 crash：
> [貼上 crash log]
>
> 幫我解讀：
> 1. Crash 發生在哪一行程式碼
> 2. 這是什麼類型的記憶體問題
> 3. 當時的 call stack 是什麼情況
> 4. 最可能的原因是什麼
```

---

## 除錯情境二：UI 不符合預期

### SwiftUI 佈局問題

```
> 我的 SwiftUI View 在 iPad 上佈局有問題，iPhone 上看起來正常
> 截圖是這樣的：[附截圖]
> 相關程式碼在 ProductGridView.swift
>
> 問題：Grid 在 iPad 上每行只顯示 2 個，但我預期是 4 個
>
> 幫我找出原因並修復
```

### UIKit Auto Layout 問題

```
> 有一個 constraint 在 runtime 出現警告：
> [貼上警告]
>
> 這個警告在 UserProfileHeaderView.swift 裡
> 讀這個檔案，告訴我哪個 constraint 有衝突，怎麼修
```

---

## 除錯情境三：效能問題

### 讓 Claude 分析瓶頸

```
> 我的列表在滑動時有明顯卡頓
> 用 Instruments Time Profiler，發現 UICollectionViewCell 的 configure()
> 方法佔了 34% 的 CPU 時間
>
> 相關程式碼：[貼上 configure() 的程式碼]
>
> 分析原因，給我優化選項，要求：
> - 保持程式碼整潔
> - 估計每個優化的改善幅度
```

### 記憶體問題

```
> Instruments 顯示每次進入 DetailViewController 再離開，
> 記憶體會增加約 2MB 且不釋放
>
> 相關程式碼：DetailViewController.swift 和 DetailViewModel.swift
>
> 幫我找記憶體洩漏，重點關注：
> - closure 裡的 self 引用
> - delegate 的 weak/strong
> - NotificationCenter 的監聽有沒有被移除
```

---

## 除錯情境四：網路問題

```
> API 請求在某些情況下會失敗
>
> 網路請求程式碼在 APIClient.swift
> 錯誤：NSURLError -1001（逾時）
>
> 規律：
> - 第一次打開 App：正常
> - 進入背景再回來：第一個請求一定逾時
> - 後續的請求：恢復正常
>
> 這個規律讓我懷疑是 URLSession socket 重用的問題
> 幫我驗證這個假設並提供解法
```

---

## 除錯情境五：執行緒問題

這類問題最難定位。Claude 可以幫你系統性地分析。

```
> 我有一個間歇性的 data race，很難重現
> 症狀：列表資料偶爾顯示亂掉，或有重複/缺少的項目
>
> 資料層程式碼：DataStore.swift
> UI 更新程式碼：HomeViewController.swift
>
> 幫我：
> 1. 找出所有可能的執行緒安全隱患
> 2. 分析我的資料流，標出哪些存取需要保護
> 3. 建議最合適的並發保護方案
>    （考慮 Swift actor 或 DispatchQueue）
```

---

## 除錯工具箱

### 工具一：讓 Claude 寫診斷程式碼

```
> 在 syncUserData() 方法裡加入詳細的 logging，
> 記錄每個步驟的執行時間和結果
> 格式：[時間戳] [步驟名稱] [結果/耗時]
> 這樣我才能快速定位哪一步出了問題
```

### 工具二：讓 Claude 寫重現測試

```
> 我有一個 bug：使用者名稱包含特殊字元時搜尋會 crash
> 寫一個 XCTest 單元測試來重現這個 bug
> 測試要先失敗（驗證 bug 存在），修復後再通過
```

### 工具三：假設驅動的除錯

```
> 我對這個 crash 有三個假設：
> A. UIImagePickerController delegate 在 dismiss 時 crash
> B. 圖片太大，造成記憶體溢出
> C. UI 更新在非主執行緒進行
>
> 幫我分析：
> 1. 每個假設的可能性有多高？
> 2. 怎麼快速驗證每個假設？
> 3. 應該先驗證哪個（最快排除的）？
```

---

## 當 Claude 找不到 Bug

這是會發生的。以下是脫困策略：

### 策略一：擴大 Context

```
> 你之前的分析沒有找到問題。我給你更多背景：
> [貼上更多相關程式碼]
> 這段程式碼和前面的連接是這樣的：[解釋]
> 重新分析
```

### 策略二：換個角度

```
> 換個方法：不要找「bug 在哪裡」
> 幫我完整追蹤這段程式碼的執行路徑
> 從使用者點擊按鈕到最終結果出現，每一步發生什麼
> 我自己來判斷哪裡可能有問題
```

### 策略三：讓 Claude 承認它的限制

```
> 你對這個分析有多大把握？
> 哪些地方你沒有足夠的資訊可以判斷？
```

Claude 會告訴你它不確定的地方，這比一個錯誤的答案更有價值。

---

## iOS 特定除錯快速參考

| 問題類型 | 給 Claude 的關鍵資訊 |
|---------|-------------------|
| EXC_BAD_ACCESS | 完整 crash log + 可疑的指標/記憶體操作程式碼 |
| Main Thread Checker | 警告訊息 + 相關的 UI 更新程式碼 |
| 記憶體洩漏 | Instruments 截圖/資料 + 相關 class 程式碼 |
| UIKit Constraint 警告 | 完整警告文字 + 相關 View 的佈局程式碼 |
| Keychain 問題 | 錯誤碼 + 呼叫程式碼 + entitlements 設定描述 |
| 推播通知收不到 | 描述註冊流程 + server 設定 + 憑證狀況 |

---

[→ 第 7 章：CLAUDE.md 秘密](./07-claude-md-mastery_zht.md)
