# advanced-demo

Angular 22 進階示範 — 樣板驅動 + 響應式 Hero 表單（含自訂欄位與跨欄位驗證器）。standalone / zoneless / Vitest。Docker 部署見 [`DEPLOY.md`](./DEPLOY.md)。

## Routes / Demos
- `/forms/template-driven-form` — 樣板驅動表單
- `/forms/reactive-form` — 響應式表單
- `''` 重導到 `/forms/template-driven-form`

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
