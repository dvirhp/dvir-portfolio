# Contact email on Vercel

The Vite frontend remains a static build in `dist`. Vercel serves `api/contact.js` as a Node function at **POST /api/contact**. The function imports `server/contact.mjs`; it never imports `server/start.mjs`, creates an HTTP server, or calls `listen()`.

The existing ContactForm is unchanged: asynchronous submission, inline success/error, reset only on success, retained inputs on failure, and no navigation or mailto submission. The direct Email link remains available.

## Before clicking Deploy

1. Import the project root into Vercel. Use **Vite**, build command **npm run build**, output directory **dist**, and **Node.js 22.x**. Leave installation at the default. Do not configure `npm start` or any persistent server command.
2. In **Project Settings → Environment Variables**, configure the following for **Production**. Do not use `VITE_` prefixes and do not upload `.env.local`.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your Resend sending API key; secret, server-side only. |
| `CONTACT_FROM_EMAIL` | Bare sender email on your verified Resend domain, such as `portfolio@your-domain.com`. |
| `CONTACT_TO_EMAIL` | `dvir.hahampour@gmail.com`, or your desired inbox. |
| `CONTACT_ALLOWED_ORIGIN` | **Required in production:** the exact public browser origin, e.g. `https://your-project.vercel.app`. |

No `PORT` or `HOST` is needed on Vercel. Do not copy the localhost origin from the local environment to Vercel.

### Exact origin format

Use **scheme + hostname + optional non-default port**, without a trailing slash, path, query, or wildcard. For a Vercel production URL of `https://dvir-portfolio-example.vercel.app`, enter exactly:

```env
CONTACT_ALLOWED_ORIGIN=https://dvir-portfolio-example.vercel.app
```

This is an example, not an assumed project URL. If Vercel only confirms the URL after the first deployment, add/update this variable then **redeploy**. Until configured, the site loads but contact requests fail closed with an inline error. For a custom domain, use its exact HTTPS origin instead. Only that one origin can submit. A preview deployment has a different origin: set a Preview-scoped value for its URL and redeploy if you want email testing there; the Production origin does not automatically authorize previews.

3. Verify the sender domain in Resend. `onboarding@resend.dev` is for testing and only sends to the Resend account owner's email. Use a verified domain for the public site.
4. After deployment, submit a test message from the actual site, confirm inbox delivery and Reply-To, and refresh `/projects/possbo` and `/ai-engineering`. Also check the resume PDF. Deployment and live email sending were not performed during this migration.

## Runtime and routing

`api/contact.js` exports the shared handler at module scope. It supports Vercel's parsed JSON body as well as raw Node request streams used locally. Vercel bundles the imported server module. No Resend SDK or new runtime dependency is needed.

`vercel.json` selects Vite, gives the contact function 30 seconds (the provider request times out after 12 seconds), and rewrites extensionless frontend paths to `/index.html`. `/api` paths and file paths are excluded, so API requests, built assets, product images, and the original resume PDF retain their own handling. Unknown extensionless frontend URLs reach React Router's 404 page; missing assets/API paths are not rewritten to HTML.

The frontend still calls the relative same-origin URL `/api/contact`. API keys are only read in server code; nothing is injected into the Vite client build.

## Validation and abuse protection

Preserved: field validation, fixed recipient, plain-text email, header-injection checks, exact Origin checks, honeypot, 16 KiB body validation, provider timeouts, and retry idempotency. Errors do not expose provider messages or secrets. A successful response means provider acceptance, not a guarantee of inbox delivery.

The limiter allows five attempts per client IP per 15 minutes **per warm function instance**. On Vercel, it uses the platform's overwritten `x-forwarded-for` header; the local server does not trust forwarded headers. The in-memory counter resets on cold starts and is not shared across instances. It is best-effort spam protection, not a global quota. Stronger cross-instance limits would require edge rules or a shared store; no additional paid service was introduced.

## Local development

Copy `.env.example` to `.env.local` if needed, preserving any existing key. Set the local `CONTACT_ALLOWED_ORIGIN` to the exact origin printed by `npm run dev`. Vite middleware continues serving the same contact endpoint. With no explicit origin, local development accepts only matching localhost/127.0.0.1 origins.

`npm run build` then `npm start` remains available for optional local testing of the old standalone server; it is **not** Vercel's deployment path. Its `PORT`/`HOST` settings are local-only. Restart local processes after changing environment values.

## Validation commands

```sh
npm run build
npm run lint
npm run test:server
npm run test:content
```

Contact tests mock provider responses; they send no real email. Tests cover raw and Vercel-parsed bodies, errors, origin restrictions, IP separation, rate limiting, the exported function, and the SPA rewrite boundaries. A live Vercel deployment is still needed to verify platform routing and real delivery end-to-end.

References: [Vercel Node functions](https://vercel.com/docs/functions/runtimes/node-js), [Vite SPA routing](https://vercel.com/docs/frameworks/frontend/vite), [Vercel request headers](https://vercel.com/docs/headers/request-headers), [Resend domain setup](https://resend.com/docs/dashboard/domains/introduction).
