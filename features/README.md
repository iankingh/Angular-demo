# features-demo

功能展示集。把多個獨立小 demo 合併成同一個 app，以 Bootstrap 5 導覽列串起：資料綁定的四種形式、父子元件通訊、圖片上傳預覽、QR code 掃描、Signal 計時碼表。standalone / zoneless / Vitest。

## 示範重點 / Highlights
- **資料綁定** — 內插、屬性綁定、事件綁定、雙向綁定各一個 demo（`src/app/data-binding-*/`）。
- **父子元件通訊** — 子用 signal `input.required()` / `output()`，父監聽事件計數（`src/app/parent-child/`）。
- **圖片上傳預覽** — `FileReader.readAsDataURL` 產生預覽，以 `file.type.startsWith('image/')` 驗證型別（`src/app/image-upload/`）。
- **QR code 掃描** — `@zxing/browser` 掃描；掃描邏輯封裝在 `QrScannerAdapter` 服務以便單元測試 mock（`src/app/qr-code-scanner/`）。
- **Signal 計時碼表** — start/pause/reset/lap 用 signal 狀態管理，`DestroyRef.onDestroy` 移到建構式只註冊一次；時間格式化抽到獨立檔（`src/app/stopwatch/`，`time-format.ts`、`lap.model.ts`）。
- **Bootstrap 殼層** — `src/styles.css` 匯入 bootstrap，`app.html` 為 navbar + `<router-outlet>`。

## 路由 / Routes
- `/home` — 首頁
- `/data-binding-interpolation` — 內插綁定
- `/data-binding-property-binding` — 屬性綁定
- `/data-binding-event-binding` — 事件綁定
- `/data-binding-two-way-binding` — 雙向綁定
- `/parent-child` — 父子元件通訊
- `/image-upload` — 圖片上傳 + FileReader 預覽
- `/qr-code-scanner` — QR code 掃描（`@zxing/browser`）
- `/stopwatch` — Signal 計時碼表

## 執行 / Run
```bash
npm ci
npm start      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
npm run build # production build
npm test      # Vitest（56 tests）
npm run watch # development build watch mode
```

QR 掃描需瀏覽器攝影機權限，並可能受瀏覽器能力與安全來源限制。
