# routing-demo

Angular 22 路由示範 — 麵包屑導覽（由 `ActivatedRouteSnapshot` 建構）與延遲載入 + delay resolver + loading spinner。兩個 demo 各為巢狀 feature area，含各自的子路由。standalone / zoneless / Vitest。

## Routes / Demos
- `/breadcrumbs` — 麵包屑導覽（子路由 `/breadcrumbs/page-a`、`/breadcrumbs/page-b`）
- `/loading` — 延遲載入 + `delayResolver` + loading spinner（子路由 `/loading/page-a`、`/loading/page-b`）
- `''` 重導到 `/breadcrumbs`

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
