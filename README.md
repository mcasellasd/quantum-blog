# quantum-blog

A working journal at the seam between quantum information, machine learning, and legal practice.

**Live site:** https://mcasellasd.github.io/quantum-blog/

## What this is

A static site with four sections:

- **Blog** — long-form essays on quantum, AI, and legal doctrine
- **Lab** — small, opinionated tools that test the arguments in the blog
- **Research** — published papers, working drafts, talks
- **About** — bio, CV, contact

No build step. Open `index.html` in a browser. Hash-based routing (`#/blog`, `#/lab/...`, etc.) so it deploys cleanly to GitHub Pages.

## Files

```
index.html          ← home (entry)
blog.html           ← blog section entry
lab.html            ← lab section entry
research.html       ← research section entry
about.html          ← about section entry

styles.css          ← tokens + all layout
data.jsx            ← all content (posts, projects, papers, talks)
app.jsx             ← router + Tweaks panel
shared.jsx          ← Header, Footer, brand mark
home.jsx            ← landing page
blog.jsx            ← blog index + article view
lab.jsx             ← lab index + project detail
research.jsx        ← publications, drafts, talks
about.jsx           ← bio + CV + contact
tweaks-panel.jsx    ← in-design tweak controls
```

Each entry HTML loads the same single-page app and tells it which section to open first. Article and project detail pages are still hash-routed under their parent section (e.g. `blog.html#/blog/grover-discovery`).

## Editing content

All site content lives in **`data.jsx`** under `window.SITE`:

- Add a blog post → push to `SITE.posts`
- Add a lab project → push to `SITE.projects`
- Add a publication → push to `SITE.papers` (or `workingPapers`)
- Add a talk → push to `SITE.talks`

The featured article body lives in `blog.jsx` for now (one fully written essay); shorter posts can stay as title + dek in `data.jsx`.

## Local dev

```
python3 -m http.server 8000
# open http://localhost:8000
```

Babel transpiles JSX in the browser, so no `npm install` needed.

## Deploying to GitHub Pages

1. Push to `main`.
2. In repo settings → Pages → Source: **Deploy from a branch** → `main` / `/ (root)`.
3. Wait ~30 seconds, then visit `https://mcasellasd.github.io/quantum-blog/`.

The `.nojekyll` file is included so GitHub doesn't run Jekyll preprocessing.

## License

MIT for code · CC-BY 4.0 for prose.
