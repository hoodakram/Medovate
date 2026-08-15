// Vercel CommonJS serverless wrapper — tailored for this repo.
// This directly imports the Express app exported from the repo root `server.js`.
// Ensure `server.js` uses `module.exports = app` (CommonJS).

const serverless = require('serverless-http');

// Adjust this path only if your server file moves.
const app = require('../server');

module.exports = serverless(app);
