# Sky Genesis Enterprise

[![Node](https://img.shields.io/badge/Node-%5E24.4.0-339933?logo=node.js&logoColor=white)](https://nodejs.org)
[![pnpm](https://img.shields.io/badge/pnpm-12.18.0-F69220?logo=pnpm&logoColor=white)](https://pnpm.io)
[![TypeScript](https://img.shields.io/badge/TypeScript-7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)

> An independent technology group building software, platforms and infrastructure — and operating them where that is useful.

**Sky Genesis Enterprise** is a technology group. Its work spans cloud infrastructure, developer tooling, identity and security, productivity software, digital communities and specialised financial platforms. Those are independent projects, not labels applied to a single product. This repository is the group's product surface: the public website, the API host, the shared deployment engine and the React component library, in one pnpm workspace with a Docker Compose stack for the runtime.

**Perfect for:** contributors working across the website and the control plane, teams that need the deployment engine as a library, operators who run the stack, and readers who want to understand what the group actually ships from the code.

## Contents

- [Sky Genesis Enterprise](#sky-genesis-enterprise)
  - [Contents](#contents)
  - [Why this repository matters](#why-this-repository-matters)
  - [What you can do](#what-you-can-do)
  - [Quick start](#quick-start)
    - [Requirements](#requirements)
    - [Install](#install)
    - [Run the website](#run-the-website)
    - [Run the API](#run-the-api)
    - [Run the full stack with Docker](#run-the-full-stack-with-docker)
  - [How the workspace is built](#how-the-workspace-is-built)
    - [Applications](#applications)
    - [Packages](#packages)
    - [Request flow](#request-flow)
    - [Data and runtime](#data-and-runtime)
  - [Development](#development)
    - [Repository commands](#repository-commands)
    - [Make targets](#make-targets)
    - [Quality gates](#quality-gates)
  - [FAQ](#faq)
  - [Related resources](#related-resources)
  - [Contributing](#contributing)
  - [Security](#security)
  - [License](#license)
  - [Note](#note)

## Why this repository matters

🎯 **One workspace, one toolchain** — the website, API, engine and components share the same React, TypeScript and build versions, so a change to a shared package is visible to every application immediately.

🧱 **Deployment engine as a package** — `@company/server` holds the services, Drizzle schema, Docker and Traefik integration, setup routines and backups. The applications mount it instead of duplicating deployment logic.

🔐 **Sessions stay first-party** — the website rewrites `/api/*` to the internal API, so Better Auth cookies are issued on the origin the browser actually visits, and the client never holds database or Redis credentials.

🐳 **One runtime, three products** — `self`, `cloud` and `console` run the same image and the same Compose topology; the environment only changes runtime behaviour.

📝 **Content separated from components** — every homepage section reads from `apps/company/lib/content`, so editorial changes never touch layout code.

## What you can do

- Run the public website and the API on the host, or the whole stack with Docker.
- Change any homepage section from one content module.
- Reuse the deployment services — applications, compose stacks, projects, servers, domains and backups — from `@company/server`.
- Generate an OpenAPI document from the tRPC router with `@company/trpc-openapi`.
- Build, document and query components through `@company/react` and its registry.
- Operate a deployment: migrations, backups, restores, health checks and tagged images.

## Quick start

### Requirements

- **Node.js** `^24.4.0` (`package.json` engines)
- **pnpm** `12.x` — declared as `packageManager`; run `corepack enable`
- **PostgreSQL** 14 or higher and **Redis** 7, or **Docker** for both
- **Make** — optional, for the Docker and operations targets
- **Docker Buildx** — only for local image builds

### Install

```bash
git clone https://github.com/skygenesisenterprise/company.git
cd company
pnpm install
```

### Run the website

```bash
pnpm web:dev
```

The site is served at <http://localhost:3000>. It renders from `apps/company/lib/content` and needs no database.

```bash
pnpm web:build   # production build
```

### Run the API

```bash
pnpm --filter @company/api dev
```

The API listens on <http://localhost:4000>. It expects `DATABASE_URL`, `REDIS_URL` and `BETTER_AUTH_SECRET`; it refuses to boot with a missing, short or well-known secret.

### Run the full stack with Docker

```bash
make docker-env      # creates .env with generated POSTGRES_PASSWORD, REDIS_PASSWORD and BETTER_AUTH_SECRET
make docker-up self  # build and start the self-hosted stack
```

| Service | Port | Notes |
| --- | --- | --- |
| Website (`client`) | `3000`, `80` | Also reachable at `http://dash.company.localhost`; port 80 is configurable through `COMPANY_DASH_PORT` |
| API (`api`) | `4000` | tRPC, OpenAPI, auth and WebSocket connections |
| PostgreSQL | — | Reachable only on `company-internal` |
| Redis | — | Reachable only on `company-internal` |

```bash
make docker-logs              # follow the logs (SERVICE=api for one service)
make docker-down              # stop the stack, volumes preserved
```

If you prefer to write the environment by hand, copy `.env.example` to `.env` and set `POSTGRES_PASSWORD`, `REDIS_PASSWORD` and `BETTER_AUTH_SECRET`.

## How the workspace is built

### Applications

| Application | Package | Role |
| --- | --- | --- |
| `apps/company` | `@company/website` | The public website: Next.js 16 App Router, Tailwind CSS v4, the `@company/react` token bridge, content in `lib/content` and catalogue queries in `lib/domain`. The public theme is light-only. |
| `apps/api` | `@company/api` | The HTTP host: Hono on Node 24, tRPC and OpenAPI routes, Better Auth sessions, Redis-backed queues and Inngest functions. |

### Packages

| Package | Description |
| --- | --- |
| `packages/server` | The deployment engine: application, compose, project, domain, server, database and backup services; Drizzle schema and cached connection; Docker, Swarm and Traefik setup; Nixpacks, Buildpacks, Railpack, Dockerfile, static and compose builders; monitoring, traffic and gateway error pages. |
| `packages/trpc-openapi` | Generates an OpenAPI document from a tRPC router and serves it through the API. |
| `packages/node/packages/react` | Accessible components on semantic tokens, with an Astro documentation site, a Figma plugin, a screenshot worker and a CLI that exposes the component registry. |

### Request flow

The browser calls the website origin. Next.js rewrites `/api/*` to `API_INTERNAL_URL` (the `api` service on the internal network), so session cookies remain first-party and the website needs no backend credentials of its own. WebSocket connections cannot be proxied by a rewrite: they connect to the published API port using `NEXT_PUBLIC_API_URL`, which is baked into the browser bundle at build time.

Inside the stack the API owns both dependency connections, applies migrations once at startup (`COMPANY_RUN_MIGRATIONS=1` by default) and closes them on `SIGTERM`.

### Data and runtime

- **PostgreSQL** stores the control-plane data: organisations, projects, environments, services, deployments, servers, domains and audit events.
- **Redis** carries the cache, the BullMQ queues and coordination between workers.
- **Migrations** run at API startup or as a one-off with `make migrate`; scaling the API horizontally means running that once and setting `COMPANY_RUN_MIGRATIONS=0`.
- **Secrets** come from environment variables or Docker secret files (`*_FILE` variants); sensitive values are redacted from logs.
- **Backups** are written with `make backup` and restored with `make restore FILE=backups/company-<date>.sql`.

## Development

### Repository commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install the workspace |
| `pnpm web:dev` | Start the website on port 3000 |
| `pnpm web:build` | Production build of the website |
| `pnpm --filter @company/api dev` | Start the API on port 4000 with watch mode |
| `pnpm --filter @company/server build` | Build the server engine |
| `pnpm --filter @company/react dev` | Start the component documentation site |
| `pnpm --filter @company/website test` | Run the website test suite |
| `pnpm typecheck` | Type-check every workspace package |
| `pnpm lint` | Lint the workspace through Biome |
| `pnpm format-and-lint:fix` | Apply the automatic lint and format fixes |
| `pnpm changeset` | Record a changeset for a published package |

### Make targets

| Target | What it does |
| --- | --- |
| `make help` | List every target and the selected product |
| `make deps` | `pnpm install --frozen-lockfile` |
| `make docker-env` | Create `.env` with generated secrets |
| `make docker-up self` | Build and start the self-hosted stack (also `cloud`, `console`) |
| `make docker-dev self` | Run the same stack with hot reload |
| `make docker-down` | Stop the selected product, keeping volumes |
| `make docker-logs` | Follow the logs (`SERVICE=api` for one service) |
| `make docker-ps` | Show the status of the selected product |
| `make migrate` | Apply the database migrations once |
| `make backup` / `make restore` | Dump or restore the database |
| `make doctor` | Check Docker, configuration, product and volumes |
| `make image-build self` | Build the local image with `v<version>`, `latest` and `sha-<sha>` tags |
| `make clean` | Remove build artefacts and the saved product |

### Quality gates

- **Types** — `pnpm typecheck` runs `tsc --noEmit` through every package.
- **Lint and format** — Biome, with `lint-staged` and `commitlint` on commit.
- **Tests** — Vitest for the website, Jest for the OpenAPI package and the Node test runner for scripts, depending on the package.
- **Releases** — Changesets version the published packages; the applications are private.

## FAQ

### Do I need Docker to work on the website?

No. `pnpm web:dev` renders the site from local content. Docker is needed for the API, PostgreSQL, Redis and the full stack.

### Why is the public site light-only?

The root layout pins `data-zenth-mode="light"` and `color-scheme: light`, so the public site resolves the light values of the design system's `light-dark()` tokens regardless of the visitor's OS preference. The dark tokens remain in the design system, unused by the public site.

### Where does the homepage content live?

In `apps/company/lib/content/ecosystem.ts` and `apps/company/lib/content/home.ts`. The homepage component tree reads from those modules; no section copy is hard-coded in a component.

### Which Node and pnpm versions should I use?

Node `^24.4.0` and pnpm 12, both declared in the root `package.json`. `corepack enable` installs the pinned package manager.

### Are the packages published?

`@company/server`, `@company/trpc-openapi` and `@company/react` are versioned with Changesets; the applications under `apps/` are private.

## Related resources

- Website application: [`apps/company`](apps/company)
- API application: [`apps/api`](apps/api)
- Server engine: [`packages/server/README.md`](packages/server/README.md)
- Component library: [`packages/node/README.md`](packages/node/README.md)
- Agent guidance: [`AGENTS.md`](AGENTS.md)
- Repository: [github.com/skygenesisenterprise/company](https://github.com/skygenesisenterprise/company)

## Contributing

Contributions and suggestions are welcome. Read [`Governance.md`](Governance.md) and [`CODE_OF_CONDUCT.md`](CODE_OF_CONDUCT.md) before participating. Do not push directly to `main`; every change goes through a pull request with a green typecheck and the tests of the packages it touches. Follow Conventional Commits and add a changeset for user-facing changes to a published package.

## Security

Do not report security vulnerabilities in public issues. Follow the private reporting instructions in [`SECURITY.md`](SECURITY.md). Never commit secrets; provide credentials through environment variables or the `*_FILE` variants backed by Docker secrets.

## License

Apache License 2.0 — see [`LICENSE`](LICENSE). Individual packages may declare their own licence in their `package.json`; `@company/trpc-openapi` and `@company/react` are published under MIT.

## Note

Sky Genesis Enterprise is an independent technology group. Links to external services are provided for convenience and do not imply endorsement.
