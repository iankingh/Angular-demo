# features-demo

Angular 22 功能展示集 — Bootstrap 5 資料綁定 demo、圖片上傳、QR code 掃描、Signal stopwatch。standalone / zoneless / Vitest。

## Routes / Demos
- `/home` — 首頁
- `/data-binding-interpolation` — 內插綁定
- `/data-binding-property-binding` — 屬性綁定
- `/data-binding-event-binding` — 事件綁定
- `/data-binding-two-way-binding` — 雙向綁定
- `/parent-child` — 父子元件通訊
- `/image-upload` — 圖片上傳 + FileReader 預覽
- `/qr-code-scanner` — QR code 掃描（`@zxing/browser`）
- `/stopwatch` — Signal 計時碼表
- `''` 重導到 `/home`

## Run
```bash
npm install
ng serve   # http://localhost:4200
```

## Build & test
```bash
ng build
ng test    # Vitest, must be all green
```
