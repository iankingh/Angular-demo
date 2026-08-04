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

## 開發伺服器 / Dev server
```bash
npm start     # http://localhost:4200
```

## 建置 / Build
```bash
npm run build
npm run watch # development build watch mode
```
