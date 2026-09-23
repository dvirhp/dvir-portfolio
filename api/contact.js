import { createContactHandler } from "../server/contact.mjs";

// Vercel invokes this Node function per request. No HTTP listener is started.
// Keep one handler per warm instance so its best-effort rate limiter can persist.
export default createContactHandler({
  env: { ...process.env, NODE_ENV: "production" },
  vercel: true,
});
