# advanced-demo

進階示範。以 Hero 表單同時展示樣板驅動與響應式兩種表單實作，並搭配自訂欄位驗證器與跨欄位驗證器；另外提供 Docker + nginx 部署範例（見 `DEPLOY.md`）。standalone / zoneless / Vitest。

## 示範重點 / Highlights
- **樣板驅動表單** — `FormsModule` + `ngForm`，搭配自訂驗證指令 `appHeroValidate` / `appCrossFieldValidate`（`src/app/feature/hero-form/template-driven-form/`、`validators/`）。
- **響應式表單** — typed `FormBuilder.group`，欄位驗證用 `Validators` + 自訂 `heroNameValidator`，群組驗證用 `crossFieldValidator`（`src/app/feature/hero-form/reactive-form/`）。
- **驗證器復用** — 驗證邏輯寫成 `ValidatorFn`，指令與 reactive 表單共用同一份函式（`src/app/feature/hero-form/validators/`）。
- **巢狀路由** — `/forms` 為父路由，子路由切換兩種表單（`src/app/app.routes.ts`）。
- **Docker 部署** — 多階段 `Dockerfile` 以 Node 22 build、nginx serve，細節見 [`DEPLOY.md`](./DEPLOY.md)。

## 路由 / Routes
- `/forms/template-driven-form` — 樣板驅動表單
- `/forms/reactive-form` — 響應式表單

## 執行 / Run
```bash
npm ci
npm start      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
npm run build # production build
npm test      # Vitest（17 tests）
npm run watch # development build watch mode
```
