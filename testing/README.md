# angular-e2e-lab

E2E 實驗室。用一個最小的 app（welcome 頁）示範 Cypress 端對端測試的設定與執行流程；單元測試用 Vitest。standalone / zoneless。

## 示範重點 / Highlights
- **Cypress 設定** — `cypress.config.ts` 與 `cypress/` 目錄；`npm run e2e` 會先 `ng serve` 再跑 Cypress（見 `package.json` scripts）。
- **最小可測 app** — welcome 頁提供按鈕與計數，供 E2E 與 unit 測試互動（`src/app/features/welcome/`）。
- **單元測試** — Vitest 測元件行為（`welcome.spec.ts`）。

## 單元測試 / Unit tests
```bash
npm ci
npm test      # Vitest（5 tests）
```

## E2E（Cypress）
```bash
npm run e2e   # 先 ng serve :4200 再跑 Cypress
```

2026-10-05 以 Node 22.22.3、Cypress 15.19.0、Electron 138 headless 驗證：上述 welcome 3 tests 全綠。

### 跨 demo 控制項 regression tests

另有 4 個 browser tests，使用既有 Cypress runner 檢查 `features/`、`material-ui/`、`routing/`，不改變預設 welcome suite。先在三個終端各啟動一個 app（從 repository 根目錄執行，使用支援的 Node 22.22.3+）：

```bash
cd features && npm start -- --port 4202
```

```bash
cd material-ui && npm start -- --port 4203
```

```bash
cd routing && npm start -- --port 4204
```

確認三個 server 回應後，從 `testing/` 執行：

```bash
node node_modules/typescript/bin/tsc --noEmit -p cypress/tsconfig.json
npm run cy:run -- --config-file cypress.demos.config.ts
```

2026-10-05 上述 4 tests 全綠，測試範圍：

- QR：以 `@zxing/library` 的 `QRCodeWriter` 產生的 `FLEET-QR` matrix fixture 畫在 canvas，透過真正的 `MediaStream` / `<video>` 與 ZXing 解碼；測試 Start、Try harder、裝置切換、Stop、Clear result、離頁停止 tracks，以及 mock 的 torch constraints / 權限拒絕。不存取實體攝影機，不驗證硬體 torch。
- Material：四個正確的 icon ligatures 與實際載入的 Material Icons 字型；此項需能連線 Google Fonts，尚非離線自包含。
- Routing：resolver 執行期間顯示 spinner，完成與同 URL 導覽後不殘留 spinner。取消／錯誤／過期導覽 ID 的處理另由 `routing/` unit tests 驗證。

測試完成後以 Ctrl-C 停止各 dev server。這些是自動化 Electron 測試，不代表其他瀏覽器或實體攝影機已人工驗收。

## 開發伺服器 / Dev server
```bash
npm start     # http://localhost:4200
```

## 建置 / Build
```bash
npm run build
npm run watch # development build watch mode
```
