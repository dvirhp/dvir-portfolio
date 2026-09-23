# Dvir Haham Pour — Portfolio

React + TypeScript + Vite portfolio with React Router. No new application dependencies.

## Local development

```sh
npm install
npm run dev
```

Use the local URL printed by Vite.

```sh
npm run build
npm run lint
npm run test:content
npm run test:server
npm run preview
```

## Content

- `src/data/projects.ts`: curated projects, featured status, optional GitHub/live URLs, highlights, preview metadata, and flexible case-study sections. New entries automatically render cards and details.
- `src/data/portfolio.ts`: contact links, technology groups, and experience.
- `src/data/resume.ts`: concise web resume based on the supplied CV, with the owner’s corrected NGSOFT employment period (Dec 2025 — Aug 2026).
- `src/pages/AIEngineering.tsx`: practical workflow, tools, agent context, principles, and Possbo cross-link.
- `src/data/aiEngineering.ts`: hands-on AI systems learning content.
- `server/contact.mjs`: shared validated server-side Resend email handler.
- `api/contact.js`: Vercel serverless entry point.
- `vercel.json`: Vite deployment and SPA routing configuration.
- `EMAIL_SETUP.md`: exact email configuration and hosting instructions.
- `CONTENT_REVIEW.md`: all 14 public repositories reviewed, selection rationale, and source limitations.

## Resume PDF

The original PDF remains unchanged even though the web employment dates have been corrected. The real supplied PDF is at `public/Dvir_Haham_Pour_Resume.pdf`, unchanged. Vite copies it into the build. View actions open a new tab and download actions use the HTML `download` attribute. Asset URLs use Vite's base path, including under a static-site subdirectory.

## Contact

The contact form sends asynchronously through a same-origin Node endpoint and Resend. It stays on the page, resets after provider acceptance, and preserves inputs on failure. Credentials stay server-side. See [EMAIL_SETUP.md](EMAIL_SETUP.md) for required variables, verified sender setup, spam controls, and the remaining real-delivery check.

WhatsApp uses `https://wa.me/972509507992` with an encoded professional greeting. No phone number is repeated as plain text across the site.

## Routes

`/`, `/about`, `/projects`, `/projects/:slug`, `/experience`, `/ai-engineering`, `/resume`, `/contact`, plus 404 handling.

Project slugs: `possbo`, `family-cart`, `shared-task-manager`, `24-bit-assembler`.
Old `/projects/ai-development-workflow` and `/projects/distributed-backend-systems` URLs redirect to their dedicated subject pages.

## Hosting

Vercel serves the unchanged Vite build from `dist` and runs `api/contact.js` as a serverless Node function. `vercel.json` provides the React Router deep-link fallback while excluding API and file paths. Vercel does not execute `server/start.mjs` or `npm start`.

Use the Vite preset, `npm run build`, `dist`, and Node.js 22.x. Configure `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, and the required `CONTACT_ALLOWED_ORIGIN` in Vercel's Production environment settings. No `PORT` or `HOST` is required. See [EMAIL_SETUP.md](EMAIL_SETUP.md) for the exact origin format, sender verification, and preview-deployment behavior. Nothing has been deployed.

`npm start` remains an optional standalone local server, separate from Vercel deployment.

## English / Hebrew

Use the EN / עב control in the header. English is the initial default; the selected language persists across reloads and routes. `src/i18n/en.ts` and `src/i18n/he.ts` are centralized resources with matching English phrase keys. Add both entries when adding copy. Components consume `useI18n()` instead of duplicating page markup. Language changes also update document `lang`, `dir`, page title, description, and Open Graph locale. Source code remains LTR, and layout spacing follows the document direction.

## Possbo product images

The gallery uses three real, publicly served WebP screenshots in `public/images/possbo/` (about 140 KiB total). `gallery` and `preview` in the Possbo project data control the product tour and homepage image. Captions and alt text are translated. The gallery supports keyboard-accessible enlargement and Escape to close. See `CONTENT_REVIEW.md` for provenance and verified source information.
