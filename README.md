# Angular Demo Collection

Angular 學習範例集。根目錄下的每個分類都是可獨立安裝、執行與測試的 Angular 22 專案；各專案採 standalone components、zoneless change detection 與 Vitest。

## 子專案 / Projects

| 目錄 | npm package | 學習範圍 | 深入說明 |
|---|---|---|---|
| `advanced/` | `advanced-demo` | 樣板驅動／響應式 Hero 表單、自訂與跨欄位驗證器、Docker + nginx | [README](advanced/README.md)、[部署](advanced/DEPLOY.md) |
| `features/` | `features-demo` | 資料綁定、父子元件通訊、圖片預覽、QR 掃描、Signal 計時碼表 | [README](features/README.md) |
| `forms/` | `forms-demo` | 樣板驅動表單、`ControlValueAccessor`、Angular Material select | [README](forms/README.md) |
| `http/` | `angular-httpclient` | HttpClient CRUD、服務分層、圖片上傳與 HTTP 單元測試 | [README](http/README.md) |
| `material-ui/` | `material-demo` | Material datepicker、icon、slider 與按鈕 | [README](material-ui/README.md) |
| `routing/` | `routing-demo` | 麵包屑、巢狀／lazy routes、resolver 與 loading 狀態 | [README](routing/README.md) |
| `testing/` | `angular-e2e-lab` | Vitest 元件測試與 Cypress E2E | [README](testing/README.md) |

## 技術棧 / Stack

- Angular `22.0.x`、Angular CLI `22.0.x`
- TypeScript `~6.0.2`、RxJS `~7.8`
- Vitest `4.x`；`testing/` 另使用 Cypress `15.x`
- Angular Material `22.x`（`forms/`、`material-ui/`）
- Bootstrap `5.3.x`（`features/`）

## 環境需求 / Prerequisites

- Node.js `^22.22.3`、`^24.15.0` 或 `>=26.0.0`（依鎖定的 Angular 22 套件 `engines`）
- npm（各子專案均包含 `package-lock.json`）
- QR 掃描示範需瀏覽器攝影機權限
- `advanced/` 的容器範例另需 Docker Compose
- `testing/` 的 E2E 需 Cypress 支援的本機瀏覽器／Electron

## 安裝與執行 / Install and run

先選擇一個子專案；根目錄本身沒有共用 `package.json`。

```bash
cd forms                 # 或上表任一目錄
npm ci
npm start                # ng serve，預設 http://localhost:4200
```

每個子專案皆提供：

```bash
npm run build            # production build
npm run watch            # development build watch mode
npm test                 # Vitest unit tests
```

只有 `testing/` 提供 Cypress 指令：

```bash
cd testing
npm run e2e              # 啟動 dev server 後以 headless Cypress 執行
npm run e2e:open         # 啟動 dev server 後開啟 Cypress UI
npm run cy:run           # 只執行 Cypress；需先自行啟動 app
npm run cy:open
```

專案未定義 lint script。

## 設定與外部服務 / Configuration

- 專案沒有 `.env` 範例或必要的秘密設定。
- `http/` 將員工與 config API 固定為 `http://localhost:3000`，上傳 API 固定為 `http://localhost:8080`；本倉庫未附後端。UI 的真實 HTTP 流程需自行提供相容服務，單元測試則使用 `HttpTestingController`，不需後端。
- `advanced/` 可執行 `docker compose up --build`，在 <http://localhost:4201> 由 nginx 提供 production build。

## 測試狀態與限制 / Status

- 目前共有 184 個 Vitest unit tests；`testing/` 另有 3 個 Cypress E2E tests。
- 遷移完成時曾全量驗證各子專案的 `npm run build` 與 `npm test`，以及 `testing/npm run e2e`；目前 Node 26.5.0 環境的 production build 可能在 `Building...` 階段以 exit 134 終止，需在 Node 22.22.3 重新全量驗證後才能更新為當前全綠狀態。
- `features/` 的 QR scanner 會受攝影機權限、瀏覽器能力與安全來源限制。
- `http/` 的 UI 不會自動啟動 API server。

Angular 現代化與舊專案合併方式見 [Migration Guide](docs/MIGRATION-GUIDE.md)。
