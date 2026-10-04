# Youssef Mohamed Abdelmaksoud — Cybersecurity Analyst Portfolio

A modern, dark-first portfolio site for a Junior Cybersecurity Analyst, designed as a
**SOC dashboard meets engineer portfolio**: simulated terminal, security status panel,
operations-log experience section, network-topology skill graph, and lab case-file cards.

## 1. Project Overview

- Single-page portfolio with sections: Hero (SOC intro + simulated terminal + system
  status panel), About, Experience (SOC event logs), Skills (clusters + topology graph),
  Projects/Labs (reusable placeholder case files), Certifications, interactive Terminal,
  and Contact.
- Fully responsive (desktop / tablet / mobile), accessible (semantic HTML, keyboard
  navigation, visible focus, `prefers-reduced-motion` support), and SEO-ready
  (metadata, Open Graph, JSON-LD).

## 2. Technology Stack

- [Next.js](https://nextjs.org/) (App Router) + React
- TypeScript
- Tailwind CSS
- Framer Motion (subtle animations)
- Lucide Icons

## 3. Installation

```bash
npm install
```

## 4. Run Locally

```bash
npm run dev
```

Open http://localhost:3000.

## 5. Editing Portfolio Content

All personal content lives in **one file**: [`data/portfolio.ts`](data/portfolio.ts).
Edit there — name, title, summary, experience, skills, certifications, education,
projects, contact links, and the CV path. Components read from that file only.

## 6. Adding Projects

In `data/portfolio.ts`, edit the `projects` array. Each entry supports:

| Field          | Purpose                                    |
| -------------- | ------------------------------------------ |
| `title`        | Project name                               |
| `description`  | Short description                          |
| `status`       | `planned` \| `in-progress` \| `complete`   |
| `technologies` | Tech chips                                 |
| `architecture` | Optional architecture note                 |
| `screenshots`  | Optional image paths (e.g. `/labs/x.png`)  |
| `github`       | GitHub repo URL (shows "PENDING" if unset) |
| `details`      | Optional details-page URL                  |

Set `status: "complete"` and add real URLs/screenshots as projects are documented.

## 7. Updating Contact Links

In `data/portfolio.ts`, replace the placeholder values in `contact`
(`email`, `linkedin`, `github`). They are marked with `TODO` comments.
Remember to also update `metadataBase` in `app/layout.tsx` when you have a domain.

## 8. Replacing the CV

The Download CV button links to `public/Youssef_CV.pdf` (currently a generated
placeholder). To replace it:

1. Overwrite `public/Youssef_CV.pdf` with the real CV, **keeping the filename**, or
2. Change the path in `cvPath` inside `data/portfolio.ts`.

No rebuild is required for static assets.

## 9. Production Build

```bash
npm run build
npm run start
```

Checks you can run at any time:

```bash
npm run lint        # ESLint
npm run typecheck   # TypeScript, no emit
```

## 10. Deploying to Vercel

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → **Add New… → Project** → import the repo.
3. Vercel auto-detects Next.js — accept the defaults and deploy.
4. Optionally attach a custom domain and update `metadataBase` in `app/layout.tsx`.

## Notes

- The terminal and status panels are **simulated, frontend-only** visuals. No shell is
  executed and no live security data is displayed.
- Do not commit secrets, internal infrastructure details, or production credentials to
  this repository.
