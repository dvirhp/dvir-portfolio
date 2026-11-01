# Portfolio content review

Reviewed on 2026-09-22 using the public GitHub repository list, available READMEs, and source files for the shortlisted applications. The initial public-repository review used public sources. A later authorized refinement inspected local Possbo source at a high level; no credentials or private code were published. This is a portfolio selection review, not a security audit or a claim that these projects were executed.

## Selected

- **Possbo**: featured personal project, based on the owner's supplied description and publicly served HTML. Browser inspection of the dashboard redirected to the public login screen; no authenticated pages were accessed. Live URL: https://possbo-api.onrender.com/dashboard?tab=overview. No GitHub button: source is private. The refinement pass found a local Possbo workspace. Package manifests, the Prisma schema, worker entry point, and publication scheduler verified React, JavaScript, Node.js/Express, PostgreSQL/Prisma, background publishing, transactional job claims, leases, and retries. The portfolio contains only a high-level description; no private source code was copied or linked. Model providers, production infrastructure, scale, and performance metrics are not claimed.
- **cart-app / Family Cart**: https://github.com/dvirhp/cart-app. Reviewed API and client manifests, `requireFamilyRole.js`, `Cart.js`, `receiptParserAi.js`, and `productSync.js`. Demonstrates membership permissions, shared/personal cart modeling, receipt normalization and fallback attempts, and product ingestion. React Native and MongoDB appear only in this verified project stack, not as additions to the general resume skills.
- **ng-task-manager / Shared Task Manager**: https://github.com/dvirhp/ng-task-manager. Reviewed README, repository structure, `todoList.service.ts`, and `auth.service.ts`. Includes ownership/shared-access checks and refresh-token handling in an Angular/Express application. The README's frontend deployment redirects to Vercel authentication, so no public Live Demo button is shown.
- **24bit-assembler-c**: https://github.com/dvirhp/24bit-assembler-c. Reviewed README and `assembler.c`; macro processing, two passes, symbol outputs, and memory cleanup are visible in code. Credit includes collaborator Yarin Lemel. Did not repeat the README's claim that globals are avoided, since the code uses them.

## Reviewed and excluded from the main project grid

| Repository                    | Review                                       | Reason                                                                                                                                                               |
| ----------------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| eventping                     | Metadata, tree, Prisma schema, guest service | Concrete NestJS backend with RSVP tokens; public tree currently contains backend code only despite its full-stack description. Selected fuller applications instead. |
| password-security-experiment  | README                                       | Staged academic authentication experiment; useful specialist work, but narrower than the selected product projects.                                                  |
| azure-guides                  | README                                       | Useful technical documentation rather than an application case study.                                                                                                |
| UserData                      | README                                       | API aggregation and extensible interfaces, but a smaller practical assignment.                                                                                       |
| react-node-task-manager       | README                                       | Basic CRUD home assignment with in-memory storage; overlaps the stronger shared task manager.                                                                        |
| Bulls-and-Cows                | README                                       | Small educational game.                                                                                                                                              |
| Complex-Number-Calculator-    | README                                       | Smaller C exercise; assembler better demonstrates systems engineering depth.                                                                                         |
| Game-of-Life-JavaFX-          | README                                       | Small educational simulation.                                                                                                                                        |
| Java-Animal-Hierarchy-Project | README                                       | Foundational OOP exercise.                                                                                                                                           |
| Time-Difference-Calculator    | README                                       | Small utility; less useful than assembler for the curated selection.                                                                                                 |
| dvirhp                        | README                                       | Profile content, not a software project.                                                                                                                             |

The previous distributed-backend case study and AI-workflow project are represented by Experience and AI Engineering instead of padding the project grid. Their old URLs redirect to those pages.

## CV source

The supplied PDF was copied byte-for-byte to `public/Dvir_Haham_Pour_Resume.pdf`.
SHA-256: `0830044AD09424DA1DD508E493F388E324A0E189BD35F671C1516460F030ED61`.
`src/data/resume.ts` summarizes the supplied PDF, with the owner’s explicit date correction to **Sep 2025 – Sep 2026**. Home, Experience, and Resume use the corrected period; the original PDF remains byte-for-byte unchanged. The brief public military-service entry is taken from the CV and contains no additional detail.

## Public screenshot provenance

Downloaded without authentication from the live application's public landing assets:

- `/landing/possbo-dashboard-real.webp` → `public/images/possbo/dashboard.webp` (62,368 bytes).
- `/landing/possbo-create-real.webp` → `public/images/possbo/create.webp` (40,800 bytes).
- `/landing/possbo-stats-real.webp` → `public/images/possbo/stats.webp` (39,998 bytes).

All returned HTTP 200 and were visually inspected. These are existing real product captures, already WebP-optimized; they are not newly fabricated screens. The source assets already obscure the profile name. Captions treat displayed figures as interface examples, not adoption or performance claims. No authenticated session or private customer data was accessed. The campaign editor is also shown in the homepage featured project.

The requested 3–5 image gallery has three usable images, so no manual screenshots are required. Optional additions: a dedicated scheduling/calendar screen and an AI generation/insights result with non-sensitive sample content.

## Localization and refinement validation

English is the default. English and manually authored Hebrew resources live in `src/i18n/en.ts` and `src/i18n/he.ts`, keyed by English source phrases. Shared components use the locale context; there are no duplicated page trees or browser translation calls. The provider persists the language; document language/direction and SEO metadata update on changes. CSS uses logical spacing, code and product visuals retain LTR, and technical tags use bidi isolation.

`npm run test:content` checks resource coverage for projects, curated-project invariants, the real PDF checksum, dates, screenshot formats/sizes, and asynchronous contact submission. Browser review covered 96 page/language/viewport combinations at 1440, 768, 390, and 320 pixels, plus gallery zoom/Escape, image loading, RTL/code direction, language/theme persistence, metadata, the PDF download, inline contact success/error behavior, and WhatsApp.
