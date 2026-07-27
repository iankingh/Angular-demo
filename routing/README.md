# routing-demo

路由示範集。用兩個巢狀 feature area 展示 Angular 22 路由的進階技巧：從 `ActivatedRouteSnapshot` 動態建構麵包屑、以及延遲載入 + `delayResolver` + loading spinner。兩個 demo 各有自己的子路由與 `<router-outlet>`。standalone / zoneless / Vitest。

## 示範重點 / Highlights
- **麵包屑導覽** — `BreadcrumbService.build()` 從 `ActivatedRouteSnapshot.pathFromRoot` 與各路由 `data.breadcrumb` 組合出麵包屑鏈；元件訂閱 `router.events` 的 `NavigationEnd` 重建，並用 `takeUntilDestroyed()` 防止訂閱洩漏（`src/app/breadcrumb.ts`、`src/app/breadcrumbs/breadcrumbs-demo.ts`）。
- **延遲載入 + resolver** — 函式式 `ResolveFn`（`delayResolver`）模擬載入延遲，讓 lazy chunk 與 resolver 進行中顯示 spinner（`src/app/loading/delay.resolver.ts`）。
- **loading signal** — `NavigationStart`/`NavigationEnd` 事件驅動 `loading` signal，`takeUntilDestroyed()` 綁定生命週期（`src/app/loading/loading-demo.ts`）。
- **巢狀路由** — 兩個 demo 各為父路由，子頁面為 `children`（`src/app/app.routes.ts`）。

## 路由 / Routes
- `/breadcrumbs` — 麵包屑導覽（子路由 `/breadcrumbs/page-a`、`/breadcrumbs/page-b`）
- `/loading` — 延遲載入 + delay resolver + loading spinner（子路由 `/loading/page-a`、`/loading/page-b`）

## 執行 / Run
```bash
npm install
ng serve      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
ng build      # production build
ng test       # Vitest，必須全綠（21 tests）
```
