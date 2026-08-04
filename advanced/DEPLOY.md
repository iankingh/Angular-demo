# advanced-demo (Docker deployment)

Angular 22 demo app served in a Dockerized nginx container on `0.0.0.0:4201`.

The container builds and serves the `advanced-demo` app (the Hero form demo described in [`README.md`](./README.md)) as a static SPA. Production build uses Angular 22, standalone components, zoneless change detection, and Vitest for unit tests.

## Development server

```bash
npm start
```

Runs Angular's development server on its default address, <http://localhost:4200/>.

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
