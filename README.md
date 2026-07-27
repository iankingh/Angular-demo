# Angular Demo Collection

Angular 學習範例集 / A collection of Angular demos organized by topic — forms, routing, Material UI, HTTP, testing, and more.

## 專案結構 / Structure

```
Angular-demo/
├── forms/        # 表單 Forms
├── routing/      # 路由 Routing
├── material-ui/  # Angular Material UI
├── http/         # HTTP 通訊 HTTP client
├── testing/      # 測試 Testing (Cypress)
├── advanced/     # 進階架構 Advanced / DevOps
└── features/     # 功能展示 Feature showcases
```

## 子專案 / Projects

| Category | Project | Angular | Description |
|----------|---------|---------|-------------|
| forms | `angular-hero-form` | 10.1.6 | Template-driven forms（官方教學） |
| forms | `angular-select` | 5.2.8 | Custom select with `ngModel` two-way binding |
| forms | `angular-selec2` | 11.0.0 | Material select with disabled states |
| routing | `angular-routing-breadcrumbs-1dkwck` | 7.2.5 | Breadcrumb navigation with routing |
| routing | `angular-routing-loading` | 7.2.5 | Lazy loading with delay resolver & spinner |
| material-ui | `angular-material-ui` | 12.2.0 | Material Design components |
| material-ui | `angular-material-ui2` | 11.0.0 | Material Design components（Angular 11） |
| material-ui | `angular-material-ui3` | 8.2.8 | Material Design components（Angular 8 + HammerJS） |
| http | `angular-httpclient` | 10.0.4 | HttpClient service with JSON server backend |
| testing | `angular-e2e-lab` | 12.0.4 | E2E testing with Cypress |
| advanced | `angular-advanced` | 12.0.4 | Feature modules & lazy loading architecture |
| advanced | `angular-container` | 12.1.1 | Dockerized Angular app（serves on `0.0.0.0:4201`） |
| features | `angular-bs-demo` | 10.0.4 | Bootstrap integration |
| features | `angular-images-up` | 10.0.9 | Image upload functionality |
| features | `qr-code-scan` | 11.2.9 | QR code scanner component |
| features | `dct-110008-stopwatch-starter-qbcxwi` | 11.0.8 | Stopwatch timer application |

> Angular 版本取自各子專案 `package.json` 中 `@angular/core` 的宣告值。
> Versions are read from each sub-project's `@angular/core` declaration.

## 快速開始 / Getting Started

### Prerequisites

- Node.js 12+
- Angular CLI：`npm install -g @angular/cli`

### Run a project

```bash
cd forms/angular-hero-form   # pick any project above
npm install
ng serve                     # http://localhost:4200
```
