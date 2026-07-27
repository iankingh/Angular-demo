# angular-httpclient

Angular 22 HttpClient 示範 — 對 JSON-server 後端的 Employee CRUD、config 取得與圖片上傳。元件注入 `RestApiService` / `ConfigService` / `UploadService`；API base URL 集中於 `api-urls.ts`。standalone / zoneless / Vitest（HTTP 以 `HttpTestingController` 模擬）。

## Routes / Pages
- `/employees-list` — 員工列表（含刪除）
- `/create-employee` — 新增員工
- `/employee-edit/:id` — 編輯員工
- `/config` — 取得 demo config
- `/uploadimage` — 圖片上傳（base64）

## Backend
員工/config 走 `http://localhost:3000`（JSON-server）；上傳走 `http://localhost:8080`。本機需自行啟動 JSON-server 才能跑通真實流程；單元測試已用 mock，不需後端。

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
