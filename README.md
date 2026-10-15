# Scholarship Compass — Smart Scholarship Eligibility Checker

Completed browser-based India scholarship checker with a detailed illustrated beginner guide.

## Run

Requires Node.js for the preview and tests; no npm packages are required.

```text
node server.cjs
```

Open http://localhost:4173 (or http://127.0.0.1:4173). Stop the server with Ctrl+C.

## Verify

```text
node tests.cjs
node --check dist/app.js
```

41 rule tests cover thresholds, exclusions, unknown conditions, family eligibility, education routes and India-time deadline expiry.

## Read the detailed notes

Open the local `personal-guide.html` for your own learning. This guide is excluded from the deployed assets and source synchronization. Includes four diagrams, file-by-file explanations, worked example, source references, local setup, testing and maintenance. Print / Save as PDF uses your browser's print facility. Download notes provides an HTML copy.

## Features

- Three-step adaptive questionnaire and explained pass/fail/review checks
- Six national routes: Pragati, Saksham, Swanath, CSSS, NMMSS, National PG scholarship
- Search, type/study/status filters, comparison up to three routes
- Saved scholarship IDs, document preparation checklists and optional remembered profile
- Text report export with all six outcomes, reasons, answers and source links
- Responsive layouts, keyboard focus, labelled controls and native dialog interactions

## Scope and sources

Sources checked 14 October 2026. Catalogue facts and deadlines do not refresh automatically. Official URLs are recorded in `dist/engine.js` and `personal-guide.html`.

Results are preliminary screening, not official eligibility or award decisions. Most renewal, state, private and institution schemes are outside coverage. CSSS currently lists renewal only on NSP: screened fresh-entry academic rules always include an availability-review condition. Other financial aid triggers review of the 2026–27 combination announcement against individual scheme rules.

Eligibility runs in-browser without a profile backend. Profile is persisted only when opted in on submission. Shortlist IDs and checklist ticks are stored in localStorage. Clear local data removes this application's stored values, but downloaded reports remain separate files. Hosting, Google Fonts and external official sites still make network requests.

## Editing and hosting

Edit `dist/engine.js` for catalogue and decision logic; `dist/app.js` for interface behaviour; `dist/style.css` for visual design. Add meaningful boundary tests and update the guide when rules change. Upload `dist` contents to a static host. The registered Sites checkout also has `.openai/hosting.json`; portable source downloads omit Site identity, history and credentials.

## Final project package

The personal learning guide is outside dist and is not served by the included preview server. Publish only the dist folder. This ZIP excludes credentials, Git history, hosting identity, old archives and student profile data.
