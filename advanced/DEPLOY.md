# advanced-demo (Docker deployment)

Angular 22 demo app served in a Dockerized nginx container on `0.0.0.0:4201`.

Migrated from Angular 12.1.1 to Angular 22 — standalone components, zoneless change detection by default, and Vitest for unit tests. The original behavior (a single-page demo showing the `advanced-demo app is running!` message) is preserved.

## Development server

```bash
npm start
```

Runs the dev server with `--host 0.0.0.0 --port 4201` (see `package.json`). Open <http://localhost:4201/>.

## Build

```bash
npm run build
```

Build artifacts are emitted to `dist/advanced-demo/browser/`.

## Unit tests

```bash
npm test
```

Runs Vitest via the `@angular/build:unit-test` builder.

## Docker (production)

The multi-stage `Dockerfile` builds the app with Node 22 and serves the static `dist/` output with nginx, listening on `0.0.0.0:4201` (see `nginx.conf`).

```bash
docker compose up --build
# open http://localhost:4201/
```

The `docker-compose.yml` maps host port `4201` to the container's `4201`.
