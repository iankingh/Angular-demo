# Angular 22 現代化遷移指南（MIGRATION-GUIDE）

本指南記錄把舊版（Angular 5–12）子專案遷移到 **Angular 22（standalone、zoneless 預設、Vitest）** 的標準步驟。最初的 pilot 現已整併至 `advanced/`；遷移時曾驗證 build + test 全綠。

> **後續更新**：原 16 個子專案已合併為「每個分類一個 Angular 專案」（`forms/`、`routing/`、`material-ui/`、`http/`、`advanced/`、`features/`、`testing/` 各自為一個專案）。各 demo 以 lazy route 形式整合進同一 app。現況結構與測試數見根 [`README.md`](../README.md)。下方步驟仍為遷移當時的歷史記錄。

## 0. 環境
- Node：**必須 v22.22+ / v24.15+ / v26+**（系統 `node -v` 為 v26.5.0 即可；舊 nvm 的 v20 不可用於 Angular 22）。
- Angular CLI 22 全域：`npm install -g @angular/cli@22`。
- 驗證：`ng version` 顯示 Angular CLI 22.x。

## 1. Scaffold 新專案（取代舊目錄）
在對應分類目錄下，先移除舊專案資料夾，再 scaffold：

```bash
# 假設在 <category>/ 目錄下，舊專案名為 <name>
rm -rf <name>
ng new <name> --zoneless --routing --style=css --ssr=false \
  --test-runner=vitest --skip-git --package-manager=npm --defaults
```

關鍵旗標：
- `--zoneless`：Angular 22 zoneless 為預設；`app.config.ts` 不需 `provideZonelessChangeDetection()`，也不會安裝 `zone.js`。
- `--test-runner=vitest`：自動用 `@angular/build:unit-test` builder + Vitest 4 + jsdom。
- `--standalone` 預設為 true，無需 NgModule。

> Angular 22 的 scaffold 命名慣例**已移除 `.component` 副檔名**：根元件為 `app.ts` / `App`。本專案統一慣例：component 檔名去 `.component`、class 名為單字（`HeroForm`、`ReactiveForm`）；validator 函式保留 `.validator.ts`；directive 保留 `.directive.ts` 以避免與 validator 函式混淆。

## 2. 遷移原始碼（standalone port，非 ng update）
跨 6 版 `ng update` 不切實際，採「移植邏輯」：

1. `app.routes.ts`：用 `loadComponent` 函式式 lazy 載入，取代 `RouterModule.forChild` + NgModule。
2. 元件：`standalone: true`（22 預設）、`imports: [...]` 直接列出所需 pipe / directive / 模組；移除 `declarations` 與 NgModule。
3. 表單：reactive 用 typed `FormBuilder.group`；template-driven 仍用 `FormsModule` + `[(ngModel)]`。
4. Material 專案：`npm install @angular/material@22 @angular/cdk@22`，改用 standalone 匯入元件，**移除 `material-module.ts`**（4 個近重複檔一併消除）。
5. 移除 HammerJS（Material 19+ 已不依賴）：觸控手勢改用原生 Pointer Events / 自訂 directive。

### 常見 API 對照（舊 → 新）
| 舊（Angular ≤12） | 新（Angular 22） |
|---|---|
| `AppModule` + `bootstrapModule` | `bootstrapApplication(App, appConfig)`（`main.ts` 已由 scaffold 產生） |
| `NgModule` `declarations/imports/providers` | standalone component `imports:` / `providers:` |
| `RouterModule.forRoot/forChild` | `provideRouter(routes)` / `loadComponent` |
| `enableProdMode` + `environment` | 已淘汰，移除；`ng build` 預設 production |
| `material-module.ts` 匯總 | standalone 直接 `imports: [MatButtonModule, ...]` |
| `*ngIf` / `*ngFor` | 仍可用 `NgIf`/`NgFor`；或改 `@if`/`@for` 控制流程語法 |
| `?.errors?.required`（strictTemplates） | `errors?.['required']`（noPropertyAccessFromIndexSignature） |
| Karma/Jasmine `ng test` | Vitest `ng test`（同一指令，builder 已切換） |

## 3. 測試（Vitest + `@angular/build:unit-test`）
- spec 用 **vitest globals**（`describe`/`it`/`expect` 無需 import；`tsconfig.spec.json` 已設 `types: ["vitest/globals"]`）。
- zoneless 測試慣例：元件渲染後用 `await fixture.whenStable()` 取代依賴 zone 的自動 detectChanges。
- 元件需 router 時，在 `TestBed` providers 加 `provideRouter(routes)`（或 `RouterTestingHarness`）。
- 純邏輯（validator 函式）直接單元測試，不需 TestBed。

## 4. 驗證（每個子專案收尾前必跑）
```bash
ng build   # 必須無錯
ng test    # 必須全綠
```
兩者皆過才標記 todo 為 done。

## 5. 命名清理（clean-code）
- 修正拼字：`angular-selec2` → `angular-select2`；`qr-code-scaner` → `qr-code-scanner`。
- 簡化過長目錄：`dct-110008-stopwatch-starter-qbcxwi` → `stopwatch`。
- 目錄改名後同步更新 `app.routes.ts` 路徑與 README 表格。
- 移除未使用匯入、死碼、註解掉的舊程式碼。

## 6. 每子專案 commit 格式
```
refactor(<category>): upgrade <name> to Angular 22 (standalone, zoneless, Vitest)

- scaffold <name> with ng new --zoneless --test-runner=vitest
- port <原邏輯> to standalone components / loadComponent routes
- <clean-code 修正，如改名/移除 material-module/移除 HammerJS>
- add Vitest unit tests (<n> tests)

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```
