# Final refinement report

Completed locally on 2026-09-22. Existing typography, dark palette, spacing, cards, and page structure were retained. No deployment, commit, or push was performed.

## 1. Positioning and content

- Kept **Software Engineer | Backend & AI** and the existing homepage headline.
- Changed the code card to **Cloud-native applications** and aligned its accessible description.
- About now emphasizes reliable backend/cloud-native systems, building product capabilities, and integrating assisted development throughout the lifecycle.
- NGSOFT retains **Sep 2025 – Sep 2026** and its existing achievements; the tag is now **AI-assisted development**.
- Contact CTAs use **Let’s talk engineering.**, with recruitment copy covering backend, distributed systems, cloud-native applications, and applied AI.
- The original resume PDF is unchanged, verified by SHA-256. Web resume content and professional history remain separate from the new experimentation section.

## 2–4. AI Engineering and experience boundaries

Five main areas: products; hands-on systems learning; software engineering workflows; development tools; engineering principles.

The new substantial learning section includes:

- RAG flow: ingestion, parsing, chunking/overlap, embeddings, vector storage, retrieval, context construction, LLM interaction, grounded responses.
- Semantic/vector and keyword/lexical retrieval; hybrid search when meaning and exact terms both matter; metadata/filtering.
- Document/chunk relationships, neighboring chunks, larger document context, and relevance/context tradeoffs.
- Tool-using agents, defined actions, task decomposition, sub-agents/multi-agent patterns, orchestration, boundaries, and validation.
- System/task instructions, structured prompts, repository/application context, and context management.
- LLM integration with structured inputs/outputs and reliability, latency, cost, and quality considerations.

These are explicitly presented as independent hands-on learning and experimentation based on the owner's supplied experience. They are not assigned to NGSOFT or asserted as Possbo architecture. NGSOFT's AI-related professional work remains instruction/context files and assisted development. Possbo's product capabilities remain content generation, insights, and workflows. Specific tools remain Claude Code, Codex, and GitHub Copilot. No unverified framework or model-provider names were introduced.

## 5–8. Possbo and projects

Possbo remains the primary featured project, followed by Family Cart, Shared Task Manager, and 24-bit Assembler. Public **Private source** wording was removed; the label is **Personal Project**, with no repository link.

The existing three captioned, zoomable WebP screenshots remain:

1. Dashboard: campaign activity, publishing status, calendar.
2. Campaign/content creation: editor, channel previews, assisted writing.
3. Statistics/reporting: campaign insights interface.

These are real, publicly served product assets, approximately 140 KiB combined. No authentication was bypassed, and no screenshots were fabricated.

Earlier authorized local source inspection verified React/JavaScript, Node.js/Express, Prisma/PostgreSQL, a separate background worker, persisted publishing jobs, transactional claims, leases, and retries. Public product material and the owner's description support the product capabilities. Only high-level descriptions appear publicly; private code and local source paths are not published or linked.

Intentionally omitted: model providers, RAG architecture inside Possbo, unverified AI APIs/frameworks, production infrastructure, adoption metrics, performance claims, and invented professional AI systems experience. Detailed provenance remains in `CONTENT_REVIEW.md`.

## 9–10. Localization and RTL

English remains the default. Shared components use centralized English/Hebrew resources, with 382 matching message keys and authored Hebrew translations. New learning content, contact messages, and CTAs are localized. Locale persists across navigation and reloads. Document `lang`, `dir`, titles, descriptions, and Open Graph locale follow the language.

Existing logical spacing, RTL layout, directional arrows, form alignment, and isolated technical/code content remain. Code stays LTR. Translation validation now also scans literal UI messages, preventing accidental English fallback from missing keys.

## 11–13. Contact delivery and configuration

The React form now asynchronously posts to `/api/contact`. A Node endpoint calls Resend's email API. Vite development/preview middleware and an included production Node server use the same handler. Secrets stay server-side. The visitor's email becomes Reply-To; the recipient is configured on the server.

Success stays inline and resets the form only after provider acceptance. Errors and network failures preserve input for retry. Pending submissions disable the fields and button; unchanged retries reuse an idempotency key. There is no mailto submission, redirect, or separate success page. The direct Email link remains available.

Validation, origin checks, a honeypot, request-size limits, timeouts, and a basic in-memory rate limiter are implemented. See `EMAIL_SETUP.md` for limitations behind proxies and multi-instance hosting.

Required server configuration:

- `RESEND_API_KEY`: sending API key.
- `CONTACT_FROM_EMAIL`: verified sender address.
- `CONTACT_ALLOWED_ORIGIN`: exact site origin.
- `CONTACT_TO_EMAIL`: optional; default `dvir.hahampour@gmail.com`.
- `PORT` / `HOST`: optional host bindings.

Configure locally in ignored `.env.local`, or in a future Node host's server secrets/environment settings. `.env.example` contains placeholders only. Build with `npm run build`, then run `npm start`. The bundled server expects root-path hosting; static-only hosting cannot execute the API.

No live email was sent: credentials and a verified sender were unavailable. Provider acceptance/failure was tested with mocks, and the unconfigured real local endpoint correctly returns an error instead of claiming success.

## 14. Validation results

- `npm run build`: passed.
- `npm run lint`: passed, including new Node server code.
- `npm run test:content`: passed; translations, four projects, three optimized images, dates, original PDF checksum, and async form checks.
- `npm run test:server`: 7 tests passed, covering acceptance, fixed recipient, Reply-To, Unicode, retry identity, missing configuration, provider failures, invalid input, origin/method/content restrictions, body limits, and rate limiting.
- Browser review: 96 route/language/viewport combinations across 12 routes, English/Hebrew, and widths 1440/768/390/320. No horizontal overflow, empty headings, unsafe external targets, detected untranslated resource strings, or JavaScript errors.
- Additional browser checks: success/error/network retry without navigation in both languages, disabled pending state, reset/preserve behavior, localized success, metadata, language/theme persistence, code LTR, gallery loading/zoom/Escape, PDF download/MIME, legacy redirect, and server file boundaries.
- Visual review: English/Hebrew AI Engineering, Hebrew contact desktop/mobile, and retained homepage/project layout.
- GitHub profile and three project URLs returned 200. WhatsApp resolved to its valid send page. Possbo returned 200; its dashboard requires sign-in. LinkedIn returned its automated-access restriction (999); the configured profile URL is preserved, but profile availability needs a manual browser check. Email address/link verified structurally, not by sending email.

## 15. Remaining manual steps

1. Verify a Resend sender domain, configure the server variables, restart, and send one real test message to confirm inbox delivery and Reply-To. Exact instructions are in `EMAIL_SETUP.md`.
2. Open the LinkedIn profile manually to confirm availability.
3. No screenshots are required. Optional future additions: a dedicated scheduling/calendar screen and an AI generation/insights result using non-sensitive sample content.

Deployment remains a separate, unperformed action.
