# KeyZen

A keyboard typing test built with [Next.js](https://nextjs.org). Practice in time, word count, quote, or zen modes with optional on-screen keyboard, sound, and live WPM.

**Repository:** [github.com/shivabhattacharjee/KeyZen](https://github.com/shivabhattacharjee/KeyZen)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `pnpm dev`     | Dev server (Turbopack)   |
| `pnpm build`   | Production build         |
| `pnpm start`   | Run production server    |
| `pnpm lint`    | ESLint                   |
| `pnpm typecheck` | TypeScript check       |
| `pnpm format`  | Prettier (TS/TSX)        |

`postinstall` copies quote data into `data/quotes.json` for the quote mode.

## Stack

Next.js App Router, React, Tailwind CSS, shadcn-style UI (Radix, cmdk), Motion, Recharts.
