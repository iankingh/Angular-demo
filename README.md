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

All sub-projects run **Angular 22**, standalone components, zoneless change detection, and **Vitest** unit tests (via `@angular/build:unit-test`). Run any of them with `ng serve`; verify with `ng build` + `ng test`.

| Category | Project | Tests | Description |
|----------|---------|-------|-------------|
| advanced | `angular-advanced` | 17 | Feature forms: template-driven + reactive with custom validators (pilot) |
| advanced | `angular-container` | 4 | Dockerized app served on `0.0.0.0:4201` (nginx) |
| forms | `angular-hero-form` | 16 | Template-driven Hero form (official tutorial) |
| forms | `angular-select` | 7 | Custom select via `ControlValueAccessor` + `[(ngModel)]` |
| forms | `angular-select2` | 9 | Material select with disabled states |
| http | `angular-httpclient` | 21 | HttpClient CRUD against a JSON-server backend (mocked in tests) |
| material-ui | `angular-material-ui` | 13 | Material datepicker (min/max) + slider/icons |
| material-ui | `angular-material-ui2` | 10 | Material button-overview variants |
| material-ui | `angular-material-ui3` | 9 | Material button-types (HammerJS removed) |
| routing | `angular-routing-breadcrumbs` | 12 | Breadcrumb navigation built from `ActivatedRouteSnapshot` |
| routing | `angular-routing-loading` | 10 | Lazy loading + delay resolver + loading spinner |
| testing | `angular-e2e-lab` | 5 (+3 E2E) | App + Cypress 15 E2E (`npm run e2e`) |
| features | `angular-bs-demo` | 23 | Bootstrap 5 + data-binding demos |
| features | `angular-images-up` | 9 | Image upload + `FileReader` preview |
| features | `qr-code-scan` | 12 | QR code scanner (`@zxing/browser`); `scaner`→`scanner` fixed |
| features | `stopwatch` | 14 | Signal-based stopwatch (start/pause/reset/lap) |

**Total: 191 Vitest unit tests + 3 Cypress E2E tests, all green across 16 sub-projects.**

### 重命名記錄 / Renames (clean-code)
- `angular-selec2` → `angular-select2` (fix typo)
- `dct-110008-stopwatch-starter-qbcxwi` → `stopwatch`
- `angular-routing-breadcrumbs-1dkwck` → `angular-routing-breadcrumbs`
- `qr-code-scaner` component → `qr-code-scanner` (fix typo)

## 快速開始 / Getting Started

### Prerequisites
- Node.js 22+ (Angular 22 requires Node ≥ 22.22 / 24.15 / 26)
- Angular CLI 22 (per-project local; or `npm install -g @angular/cli@22`)

### Run a project
```bash
cd forms/angular-hero-form   # pick any project above
npm install
ng serve                     # http://localhost:4200
```

### Verify (build + unit tests)
```bash
ng build   # production build, must pass
ng test    # Vitest, must be all green
```

### E2E (testing/angular-e2e-lab only)
```bash
cd testing/angular-e2e-lab
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
- Migration recipe documented in [`MIGRATION-GUIDE.md`](./MIGRATION-GUIDE.md).

## CI
`.github/workflows/ci.yml` runs `ng build` + `ng test` for every sub-project on push/PR.
