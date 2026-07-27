# angular-e2e-lab

Angular 22 E2E 實驗室 — 最小 app（welcome 頁）搭配 Cypress 15 端對端測試。standalone / zoneless；unit 用 Vitest，E2E 用 Cypress。

## Unit tests
```bash
npm install
ng test    # Vitest, must be all green
```

## E2E (Cypress)
```bash
npm run e2e    # 先 ng serve :4200 再跑 Cypress
```

## Dev server
```bash
ng serve   # http://localhost:4200
```

## Build
```bash
ng build
```
