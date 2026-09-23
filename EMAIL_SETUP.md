# Email delivery setup

The contact form posts JSON to the same-origin `/api/contact` endpoint. The Node handler sends a plain-text message through Resend's HTTPS API, with the visitor's address as `reply_to` and a server-configured recipient. Provider acceptance triggers inline success and a form reset; errors preserve the form for retry. No mail app, redirect, or separate success page is involved. The direct Email link is still available.

## Required configuration

1. Create a Resend account and verify a sender domain you control. See [domain verification](https://resend.com/docs/dashboard/domains/introduction).
2. Create a sending API key. Follow the [send-email API documentation](https://resend.com/docs/api-reference/emails/send-email).
3. Locally, copy `.env.example` to `.env.local` in the project root and fill the values below. On a future Node hosting service, use its **server environment / secrets settings** instead. Never use `VITE_` prefixes or put secrets in client source.

| Variable | Value |
| --- | --- |
| `RESEND_API_KEY` | Your Resend sending API key (secret). |
| `CONTACT_FROM_EMAIL` | Bare sender address on the verified domain, e.g. `portfolio@your-domain.example`. |
| `CONTACT_TO_EMAIL` | Recipient; defaults to `dvir.hahampour@gmail.com`. |
| `CONTACT_ALLOWED_ORIGIN` | Exact browser origin, including scheme and port, without a trailing slash. For `npm start` locally: `http://127.0.0.1:3000`. For development, use Vite's printed origin. Production must use the final HTTPS origin. |
| `PORT` | Node listening port; default `3000`. |
| `HOST` | Bind address; default `127.0.0.1`. Use `0.0.0.0` if required by the host/container. |

Restart after changing environment values. Node 22.16+ is supported.

```sh
npm run build
npm start
```

For development, `npm run dev` provides the same endpoint through Vite middleware. Unconfigured local development accepts matching localhost origins only. Production always requires `CONTACT_ALLOWED_ORIGIN`.

## Hosting and verification

The included Node server serves the built site, assets, PDF, client-side routes, and contact API. Use a Node-capable host with HTTPS; a static-only deployment such as GitHub Pages cannot execute this endpoint. Nothing has been deployed. The supplied server expects the application at the domain root.

After configuring credentials, send one real message through the UI, confirm it appears in the recipient inbox, and reply to confirm Reply-To. API success means Resend accepted the message; inbox arrival still depends on provider delivery and domain configuration. No live email was sent during implementation because credentials were unavailable.

## Validation and abuse controls

Server-side validation, plain-text email, fixed recipient, origin checking, a hidden honeypot, a 16 KiB request limit, timeouts, and five attempts per socket IP per 15 minutes. API secrets and provider errors are never returned to the browser. Retry of unchanged content uses the same Resend idempotency key to reduce duplicate messages after uncertain responses. Inputs are disabled during submission and retained on failure.

The in-memory limiter is appropriate for a small single-process portfolio: it resets on restart and is not shared between replicas. Forwarded IP headers are intentionally not trusted; behind a reverse proxy, requests may share its quota. Configure trusted edge rate limiting for a public deployment rather than trusting arbitrary visitor-supplied headers. This is basic spam resistance, not bot-proof authentication.

`npm run test:server` exercises provider behavior using mocks only; it sends no email.
