# Angular Demo Collection

Angular 學習範例集 / A collection of Angular demos organized by topic — upgraded to **Angular 22** (standalone, zoneless, Vitest) with clean-code refactors and unit tests.

## 專案結構 / Structure

```
Angular-demo/
├── forms/        # 表單 Forms
├── routing/      # 路由 Routing
├── material-ui/  # Angular Material UI
├── http/         # HTTP 通訊 HTTP client
├── testing/      # 測試 Testing (Vitest unit + Cypress E2E)
├── advanced/     # 進階架構 Advanced / DevOps
└── features/     # 功能展示 Feature showcases
```

## 子專案 / Projects

Each top-level category folder (`forms/`, `routing/`, `material-ui/`, `http/`, `advanced/`, `features/`, `testing/`) **is itself** one Angular 22 project. All run standalone components, zoneless change detection, and **Vitest** unit tests (via `@angular/build:unit-test`), with demos exposed as routes. Run any of them with `ng serve`; verify with `ng build` + `ng test`.

| Category | Project | Tests | Description |
|----------|---------|-------|-------------|
| advanced | `advanced-demo` | 17 | Hero form (template-driven + reactive + custom validators); Dockerized via nginx (`Dockerfile`/`nginx.conf`) |
| forms | `forms-demo` | 31 | Hero form + custom select via `ControlValueAccessor` + Material select with disabled states |
| http | `angular-httpclient` | 23 | HttpClient CRUD against a JSON-server backend (mocked in tests) |
| material-ui | `material-demo` | 27 | Material datepicker (min/max) + slider/icons + button overview + button types |
| routing | `routing-demo` | 21 | Breadcrumb navigation (`ActivatedRouteSnapshot`) + lazy loading with delay resolver + loading spinner |
| testing | `angular-e2e-lab` | 5 (+3 E2E) | App + Cypress 15 E2E (`npm run e2e`) |
| features | `features-demo` | 54 | Bootstrap 5 data-binding demos + image upload + QR scanner (`@zxing/browser`) + signal stopwatch |

**Total: 178 Vitest unit tests + 3 Cypress E2E tests, all green across 7 projects.**

### 重命名記錄 / Renames (clean-code)
- `angular-selec2` → `angular-select2` (fix typo)
- `dct-110008-stopwatch-starter-qbcxwi` → `stopwatch`
- `angular-routing-breadcrumbs-1dkwck` → `angular-routing-breadcrumbs`
- `qr-code-scaner` component → `qr-code-scanner` (fix typo)

### 合併記錄 / Merge (one project per category)
- `angular-advanced` + `angular-container` → `advanced-demo` (Docker artifacts kept at project root)
- `angular-hero-form` + `angular-select` + `angular-select2` → `forms-demo`
- `angular-material-ui` + `angular-material-ui2` + `angular-material-ui3` → `material-demo`
- `angular-routing-breadcrumbs` + `angular-routing-loading` → `routing-demo`
- `angular-bs-demo` + `angular-images-up` + `qr-code-scan` + `stopwatch` → `features-demo` (added `@zxing/browser` + `@zxing/library`)

## 快速開始 / Getting Started

### Prerequisites
- Node.js 22+ (Angular 22 requires Node ≥ 22.22 / 24.15 / 26)
- Angular CLI 22 (per-project local; or `npm install -g @angular/cli@22`)

### Run a project
```bash
cd forms   # each category folder is one project; pick any above
npm install
ng serve                     # http://localhost:4200
```

### Verify (build + unit tests)
```bash
ng build   # production build, must pass
ng test    # Vitest, must be all green
```

### E2E (testing/ only)
```bash
cd testing
npm run e2e    # boots ng serve on :4200 then runs Cypress
```

## 現代化重構摘要 / Modernization notes
- All NgModules removed → **standalone** components/directives.
- **Zoneless** change detection (Angular 22 default; no `zone.js`).
- Lazy routes via `loadComponent` / functional resolvers.
- Reactive forms use typed `FormBuilder`; services use `inject()`.
- 4 near-duplicate `material-module.ts` files eliminated (standalone imports).
- HammerJS removed from `angular-material-ui3` (Material 19+ handles touch natively).
- Per-project **Vitest** unit tests with meaningful coverage (not just create-tests); HTTP services tested via `HttpTestingController`.
- Migration recipe documented in [`MIGRATION-GUIDE.md`](docs/MIGRATION-GUIDE.md).

### Clean-code pass
- RxJS 訂閱洩漏修復：`router.events` 與 HTTP 訂閱改用 `takeUntilDestroyed()`。
- `RestApiService.handleError` 的 `this` 綁定問題修正（改箭頭函式屬性）；5 處重複 `retry+catchError` 抽為共用 `withRetry()` operator。
- API base URL 集中至 `api-urls.ts`；`upload-image` 抽出 `UploadService`（component 不再直接 inject HttpClient）。
- 移除非空 `!` 斷言與多餘 `as` 斷言，改顯式 null 檢查與型別守衛。
- `stopwatch` 抽出 `time-format.ts`/`lap.model.ts`（單一職責）；`destroyRef.onDestroy` 移至建構式只註冊一次。
- 移除 scaffold 殘留死碼（未使用 `title` signal、debug-only `diagnostic` getter）。
- `custom-select` 的 `setDisabledState` 補齊參數與實作（CVA 契約）。

## CI
`.github/workflows/ci.yml` runs `ng build` + `ng test` for every sub-project on push/PR.
