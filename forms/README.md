# forms-demo

表單示範集。用三個漸進的 demo 展示 Angular 22 表單的三種玩法：樣板驅動、`ControlValueAccessor` 自訂控制項、Material 表單控制項的停用狀態。全部為 standalone / zoneless 元件，Vitest 單元測試。

## 示範重點 / Highlights
- **樣板驅動表單** — `FormsModule` + `NgForm`、`[(ngModel)]` 雙向綁定、`submitted` signal 追蹤提交狀態、`required` 驗證與錯誤訊息顯示（`src/app/hero-form/hero-form.ts`、`src/app/hero.ts`）。
- **自訂表單控制項** — 實作 `ControlValueAccessor` 並以 `NG_VALUE_ACCESSOR`（`forwardRef`）註冊，讓原生 `<select>` 可用 `[(ngModel)]`；`setDisabledState` 同步停用狀態（`src/app/custom-select.ts`，使用方式見 `src/app/custom-select-demo/`）。
- **Material 表單控制項** — `FormControl` 切換停用 `mat-select` 與原生 `select`，示範 disabled option 與表單連動（`src/app/select-disabled.ts`）。
- **路由殼層** — `loadComponent` lazy 載入各 demo，`''` 重導到第一個（`src/app/app.routes.ts`）。

## 路由 / Routes
- `/hero-form` — 樣板驅動 Hero 表單（官方教學）
- `/custom-select` — 自訂 select（`ControlValueAccessor` + `[(ngModel)]`）
- `/select-disabled` — Material select 搭配 disabled 狀態

## 執行 / Run
```bash
npm install
ng serve      # http://localhost:4200
```

## 建置與測試 / Build & test
```bash
ng build      # production build
ng test       # Vitest，必須全綠（31 tests）
```
