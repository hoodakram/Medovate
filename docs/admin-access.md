# Admin Access Guide

1. Ensure the admin exists

   - Run the seeder (uses `ADMIN_USERNAME` / `ADMIN_PASSWORD` from your env):

```bash
  node utils/seeder.js
```

2. Set required environment variables (locally and in Vercel):

- `MONGODB_URI`
- `JWT_SECRET`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

3. Obtain a JWT (login)

- POST to `/api/auth/login` with JSON body:

```json
{ "username": "<ADMIN_USERNAME>", "password": "<ADMIN_PASSWORD>" }
```

- Example curl (local):

```bash
curl -X POST "http://localhost:5000/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"secret"}'
```

Response contains a token (example):

```json
{ "token": "<JWT>" }
```

4. Call protected endpoints with the JWT

- Example curl using the token:

```bash
curl "http://localhost:5000/api/admin/dashboard" \
  -H "Authorization: Bearer <JWT>" \
  -H "Content-Type: application/json"
```

5. Postman

- Import `docs/admin_postman_collection.json` into Postman. It includes `Login` and `Get Admin Dashboard` requests and variables `baseUrl`, `admin_username`, `admin_password`, `jwt`.

Notes:

- Replace `http://localhost:5000` with your deployed base URL.
- Keep `JWT_SECRET` secure and rotate if compromised.

Environment example (.env):

```
MONGODB_URI=mongodb://localhost:27017/medovate
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secret
```

Deploying API on Vercel (serverless)

- Add a serverless wrapper under `api/` so Vercel deploys your Express app as functions. Two samples are included:
  - `api/index.js` — CommonJS wrapper
  - `api/index.mjs` — ESM wrapper

- Steps:
  1. Ensure your Express `app` is exported from a file near the repo root (e.g., `server.js`, `app.js`, or `index.js`).
  2. If necessary, edit `api/index.js` or `api/index.mjs` to point to your server file path.
  3. Install `serverless-http` in your project:

```bash
npm install serverless-http
```

  4. Add required environment variables in the Vercel dashboard.
  5. Deploy — your API will be available under `/api/*` on Vercel.

If you'd like, I can create the exact wrapper pointing to a specific server file if you tell me its path in this repo.
