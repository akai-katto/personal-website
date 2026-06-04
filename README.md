# Tyler 'Owl Dev' Szeto — Terminal Resume

Interactive terminal-themed resume site built with Vite + React.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (use `npm run dev -- --base /` for root base locally if assets fail to load).

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

1. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main` — the [deploy workflow](.github/workflows/deploy.yml) builds and publishes automatically.

Live site: `https://<username>.github.io/personal-website/`

## Usage

- **Run** — types out each section (output persists).
- **Yellow** — minimize to title bar.
- **Red** — close window (refresh to restore).
- **Green** — focus mode (dim background, enlarge window).

Resume content lives in [`src/data/resume.ts`](src/data/resume.ts); LaTeX source in [`resume.tex`](resume.tex).
