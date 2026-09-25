# IELTS Tactic Cards

A small, mobile-first React app that turns my IELTS tactic guides into a deck of
swipeable, visual flashcards. Each card is one named tactic (T11, T12, ...) with a
colour-coded badge, a one-line hook, a visual mnemonic and a concrete example.
Mark cards **Known** / **Still learning**; progress is saved in your browser
(localStorage).

Currently populated: **Writing > Intro** (14 cards, T11-T44). Listening, Reading,
Speaking and Writing Body 1 / Body 2 / Conclusion are visible as "coming soon".

Built with React + Vite. No UI or gesture library: swiping uses native CSS
scroll-snap, routing is a tiny hash router (so GitHub Pages needs no 404 hacks).

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deploy to GitHub Pages (GitHub Actions)

The repo already contains `.github/workflows/deploy.yml`, which builds and
publishes the site on every push to `main`.

1. Create an **empty** repository on GitHub (no README / .gitignore), e.g. `ielts-prep-app`.
2. Push this repo to it:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. On GitHub, open the repo -> **Settings** -> **Pages**.
4. Under **Build and deployment** -> **Source**, choose **GitHub Actions**.
5. Go to the **Actions** tab. If the first "Deploy to GitHub Pages" run failed
   (because Pages wasn't enabled yet), open it and click **Re-run all jobs**, or
   use **Run workflow** to trigger it manually.
6. When it finishes, the site is live at
   `https://<your-username>.github.io/<repo-name>/`
   (the URL is also shown in the workflow run and under Settings -> Pages).

After that, every `git push` to `main` redeploys automatically.

### About the base path (`vite.config.js`)

GitHub Pages serves project sites from `/<repo-name>/`, so the built assets must
use that prefix.

- **Via the Actions workflow**: nothing to do. The workflow sets
  `BASE_PATH=/<repo-name>/` from the actual repository name.
- **Manual builds** (`npm run build` on your machine): the fallback in
  `vite.config.js` is `/ielts-prep-app/`. If your GitHub repo has a different
  name, change `REPO_NAME` in `vite.config.js`, or run
  `BASE_PATH=/my-repo/ npm run build`.
- **User/org site** (repo named `<username>.github.io`): set the base to `/`.
- `npm run dev` always uses `/`.

## Adding a new section's tactics (e.g. Writing > Body 1)

No component changes needed.

1. Copy `src/data/writing-intro-tactics.js` to `src/data/writing-body1-tactics.js`
   and replace `families` and `tactics`. The header comment in that file lists
   the available fields, family colours (`teal`, `violet`, `amber`, `rose`) and
   visual types (`morph`, `swap`, `merge`, `test`, `dial`, `blocks`, `banned`).
2. In `src/data/catalog.js`, import it and set it as that section's `deck`:
   ```js
   import writingBody1 from './writing-body1-tactics.js'
   // ...
   { id: 'body1', label: 'Body 1', subtitle: 'First argument', deck: writingBody1 },
   ```
3. To enable a whole new skill (e.g. Speaking), set `enabled: true` on it in
   `catalog.js` and give it `sections`.

Progress is stored per section (`writing/intro:T11`), so a T11 in Body 1 never
collides with Intro's T11.

## Project layout

```
src/
  data/
    catalog.js                 skills -> sections -> decks (the only place to register new decks)
    writing-intro-tactics.js   Intro tactic content
  components/
    TacticCard.jsx             the flashcard + Known toggle
    Visual.jsx                 visual mnemonic renderers (one per visual.type)
    Marked.jsx                 [[highlight]] text markup
    Chrome.jsx                 top bar, tiles, progress ring
    Icons.jsx                  inline SVG icons
  screens/
    Menus.jsx                  Home, Writing, section overview
    Deck.jsx                   swipeable deck
  lib/
    router.js                  tiny hash router
    mastery.js                 localStorage progress store
```
