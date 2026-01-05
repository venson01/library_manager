# Library Manager (TypeScript)

A simple library management REST API built with TypeScript. It provides basic features for managing authors, books, users, authentication, and borrowing records.

## Features

- User registration and authentication
- CRUD for authors and books
- Borrow/return workflow for books
- Centralized error and response handling

## Tech stack

- Node.js + TypeScript
- Express
- Project organized with controllers, services, models, routes, and middlewares

## Project structure (key files)

- [src/app.ts](src/app.ts) — application entry
- [src/config/db.ts](src/config/db.ts) — database configuration
- [src/controller](src/controller) — controllers for API endpoints
- [src/routes](src/routes) — route definitions: [auth.route.ts](src/routes/auth.route.ts), [author.route.ts](src/routes/author.route.ts), [book.route.ts](src/routes/book.route.ts), [borrow.route.ts](src/routes/borrow.route.ts)
- [src/services](src/services) — business logic
- [src/models](src/models) — data models
- [src/middlewares](src/middlewares) — auth, error & response handlers

## Prerequisites

- Node.js (>= 14)
- npm or yarn

## Setup

1. Install dependencies

```bash
npm install
```

2. Create environment variables (example)

```envA
DB_HOST=localhost
PORT=5005
DB_NAME=Library_manager_ts
DB_USER=vensonlala_db_user
DB_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
```

Place them as appropriate (e.g., a `.env` file) so `src/config/db.ts` and auth middleware can read them.

## Run

- Development (observed):

```bash
npm run start:dev
```

- Production (typical):

```bash
npm run build
npm start
```

(Adjust commands if your `package.json` uses different script names.)

## API Endpoints (overview)

- `POST /api/auth` — register user
- `POST /api/auth/login` — login returns JWT
- `GET /api/authors` — list authors
- `POST /api/authors` — create author
- `GET /api/books` — list books
- `POST /api/books` — create book
- `POST /api/borrow` — borrow a book
- `POST /api/borrow/return` — return a book

See route definitions in [src/routes](src/routes) for exact paths and payloads.

## Tests

If tests exist, run:

```bash
npm test
```

## Contributing

- Follow existing code patterns: controllers → services → models
- Run linting/formatting if configured before opening PRs

## License

Specify a license in `package.json` or add a `LICENSE` file.

---

