# Tanmay Kashyap — Portfolio

A single-page portfolio built with Vite (vanilla HTML/CSS/JS, no framework),
deployed to GitHub Pages via GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
Output lands in `dist/`.

## Deploy to GitHub Pages — checklist

1. **Create the repo.** Push this project to a GitHub repo (any name — just
   remember it, you need it in step 2).

2. **Set the base path.** Open `vite.config.js` and set `base` to match your
   repo name exactly, e.g. `base: '/My-Repo-Name/'`. It currently defaults to
   `/portfolio/`. If you're deploying to a `username.github.io` root repo or a
   custom domain, use `base: '/'` instead.

3. **Enable Pages via Actions.** In the repo: **Settings → Pages → Build and
   deployment → Source → GitHub Actions**. (Not "Deploy from a branch" — the
   included workflow pushes a build artifact directly.)

4. **Push to `main`.** The workflow at `.github/workflows/deploy.yml` builds
   and deploys automatically on every push to `main`. Check the **Actions**
   tab — it should go green in about a minute, and the Pages URL appears in
   that run's summary.

## Editing content

All copy lives directly in `index.html` — there's no CMS or data file layer,
matching the "no frameworks, no trackers" spirit of a hand-built single page.
Section styling is in `src/style.css`, tokenized at the top of the file
(`:root` block) if you want to adjust the palette or type scale later.
