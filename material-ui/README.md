# material-demo

Angular Material UI 示範集。用四個獨立 demo 展示常見 Material 元件的用法：datepicker 的日期區間驗證、icon 與 slider、以及按鈕的兩種示範。全部為 standalone 匯入（已移除舊的 `material-module.ts`），zoneless / Vitest。

## 示範重點 / Highlights
- **Datepicker + 日期驗證** — `min`/`max` 限制可選日期，並用 `provideNativeDateAdapter()` 提供 `DateAdapter`（`src/app/datepicker/datepicker-min-max-example.ts`）。
- **Icon 與 Slider** — `MatIconModule` 顯示 icon、`MatSliderModule` 滑桿綁定初始值（`src/app/icons-and-slider/`）。
- **Icon 字型** — `src/index.html` 載入 Google Fonts 的 Material Icons；顯示 ligatures 需要網路。真實字型載入與四個 icon 名稱已由 Electron browser test 驗證，執行方式見 [`testing/README.md`](../testing/README.md)。
- **Button overview / types** — `MatButtonModule` 的基本按鈕與 raised/stroked/flat/fab/icon 等 varieties（`src/app/button-overview/`、`src/app/button-types/`）。
- **全域主題** — `src/styles.css` 匯入 Material prebuilt theme（azure-blue）；`app.config.ts` 提供 `provideAnimationsAsync()`。

## 路由 / Routes
- `/datepicker` — Datepicker 搭配 min/max 驗證
- `/icons-and-slider` — Icon 顏色與基本 slider
- `/button-overview` — Material 按鈕 overview 變體
- `/button-types` — Material 按鈕 varieties

## 執行 / Run
```bash
npm ci
npm start      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
npm run build # production build
npm test      # Vitest（27 tests）
npm run watch # development build watch mode
```
