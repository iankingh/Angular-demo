# angular-httpclient

HttpClient 示範。展示 Angular 22 的 HTTP 服務分層：把 API URL 集中、用服務封裝 CRUD、元件只注入服務而不直接碰 `HttpClient`，並以 `HttpTestingController` 做單元測試（不需真實後端）。standalone / zoneless / Vitest。

## 示範重點 / Highlights
- **API URL 集中** — `API_BASE_URL` / `UPLOAD_BASE_URL` 統一於 `src/app/api-urls.ts`，服務引用常數而非硬編碼。
- **服務分層** — `RestApiService`（Employee CRUD）、`ConfigService`（取得 config）、`UploadService`（圖片上傳）各司其職；元件注入服務、不直接 inject `HttpClient`（`src/app/services/`）。
- **共用 RxJS operator** — `withRetry()` 封裝 `retry + catchError`，避免每個方法重複；`handleError` 為箭頭函式屬性以保 `this` 綁定（`src/app/services/rest-api.service.ts`）。
- **訂閱生命週期** — 頁面訂閱皆用 `takeUntilDestroyed()` 並 `implements OnInit`；`employee-edit` 以顯式 null 檢查取代 `id!` 非空斷言。
- **測試** — `HttpTestingController` 模擬回應，驗證方法、URL、body（`src/app/services/*.spec.ts`）。

## 路由 / Pages
- `/employees-list` — 員工列表（含刪除）
- `/create-employee` — 新增員工
- `/employee-edit/:id` — 編輯員工
- `/config` — 取得 demo config
- `/uploadimage` — 圖片上傳（base64）

## 後端 / Backend
員工/config 走 `http://localhost:3000`（JSON-server），上傳走 `http://localhost:8080`。本機需自行啟動 JSON-server 才能跑通真實流程；單元測試已 mock，不需後端。

## 執行 / Run
```bash
npm install
ng serve      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
ng build      # production build
ng test       # Vitest，必須全綠（23 tests）
```
