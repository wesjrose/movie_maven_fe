# Movie Maven Frontend

React client for the [Movie Maven backend](../movie_maven_be). The backend
catalog API lives at `http://localhost:8001` (`GET /movies` and the TMDB
ingest endpoints). This repo is the UI.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [React Router 7](https://reactrouter.com/start/data/installation) in **Data Mode** (`createBrowserRouter`)

React Router is the routing library: widely used, [documented by route pattern](https://reactrouter.com/start/data/routing), and the same APIs scale from a SPA into loaders/actions when the catalog is wired up.

## Run locally

Requires Node 20+.

```bash
npm install
npm run dev
```

The app is at [http://localhost:5173](http://localhost:5173). Vite proxies `/api/*` to `BE_URL` (see `vite.config.ts`), so a future `fetch('/api/movies')` hits the Go server without CORS setup.

`BE_URL` is set in `.env` (defaults to `http://localhost:8001`, committed). Override it per machine in `.env.local` if your backend runs elsewhere.

| Command         | Purpose                    |
|-----------------|----------------------------|
| `npm run dev`   | Dev server with HMR        |
| `npm run build` | Typecheck and production bundle |
| `npm run preview` | Serve the production build |
| `npm run lint`  | Oxlint                     |
| `npm run fetch-openapi` | Fetch `${BE_URL}/openapi.yaml` and save it to `api/openapi.yaml` |

## Routing

Routes are declared in one file: [`src/router/router.tsx`](src/router/router.tsx). That file is commented with the patterns in use and a short “add a page” checklist.

| URL                 | Page                  | Notes                                      |
|---------------------|-----------------------|--------------------------------------------|
| `/`                 | `HomePage`            | Index route under the app layout           |
| `/movies`           | `MoviesPage`          | Catalog list (placeholder)                 |
| `/movies/:movieId`  | `MovieDetailPage`     | Dynamic segment; `useParams().movieId`     |
| anything else       | `NotFoundPage`        | Splat `*` inside the layout                |

URL helpers live in [`src/router/paths.ts`](src/router/paths.ts). Use those in `<Link>` / `<NavLink>` instead of raw strings.

**Add a page**

1. Create a component in `src/pages/`.
2. Add a helper in `src/router/paths.ts`.
3. Register it in the `children` array in `src/router/router.tsx`.
4. Add a `<NavLink>` in `AppLayout` only if it belongs in the header.

Useful docs:

- [Configuring routes](https://reactrouter.com/start/data/routing)
- [Navigating (`Link`, `NavLink`, `useNavigate`)](https://reactrouter.com/start/data/navigating)
- [Loaders and `useLoaderData`](https://reactrouter.com/start/data/data-loading)
