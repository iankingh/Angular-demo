# forms-demo

Angular 22 表單示範集 — template-driven hero form、custom select (ControlValueAccessor) 與 Material disabled select，全部為 standalone / zoneless 元件，Vitest 單元測試。

## Routes / Demos
- `/hero-form` — 樣板驅動 Hero 表單（官方教學）
- `/custom-select` — 透過 `ControlValueAccessor` + `[(ngModel)]` 的自訂 select
- `/select-disabled` — Material select 搭配 disabled 狀態
- `''` 重導到 `/hero-form`

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
