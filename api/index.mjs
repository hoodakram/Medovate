// ESM serverless wrapper for Vercel
// Use this if your project uses ESM (`type: "module"`) and your server file is ESM.

import serverless from 'serverless-http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function loadApp() {
  const candidates = [
    path.join(__dirname, '..', 'server.mjs'),
    path.join(__dirname, '..', 'server.js'),
    path.join(__dirname, '..', 'app.mjs'),
    path.join(__dirname, '..', 'index.mjs'),
  ];

  for (const p of candidates) {
    try {
      const mod = await import(p);
      if (mod && (mod.default || mod.app)) return mod.default || mod.app;
    } catch (err) {
      // try next
    }
  }

  throw new Error('Could not locate Express app (ESM). Edit api/index.mjs to point to your server file.');
}

const app = await loadApp();
export const handler = serverless(app);
