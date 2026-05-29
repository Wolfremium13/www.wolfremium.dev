# www.wolfremium.dev

Personal portfolio website for **Kevin Hierro Carrasco** (aka Wolfremium) — a Full Stack Developer. Built with [Astro](https://astro.build) and designed with a JetBrains IDE aesthetic.

🌐 **Live site:** [wolfremium.dev](https://wolfremium.dev)

---

## ✨ Features

- **Bilingual support** — fully translated in English (`/`) and Spanish (`/es`)
- **Hero section** — introduction with name, role, and call-to-action links
- **About / IDE section** — profile and education displayed in a faux JetBrains IDE window with syntax highlighting and tab switching
- **Skills grid** — visual overview of technologies and tools
- **Experience timeline** — interactive filterable vertical timeline of work experience by role category (Full Stack, Data, Web/Backend)
- **Certifications** — list of professional certifications
- **CV downloads** — PDF résumés available in English and Spanish
- **Sitemap** — auto-generated via `@astrojs/sitemap`

---

## 🚀 Project Structure

```text
/
├── docs/                        # CV source files (Markdown + HTML + JSON)
├── public/                      # Static assets (favicon, PDFs, robots.txt)
├── scripts/                     # Utility scripts (e.g. favicon generation)
├── src/
│   ├── components/              # Astro UI components
│   │   ├── AboutIDE.astro       # IDE-style about + experience section
│   │   ├── Certifications.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Navigation.astro
│   │   └── SkillsGrid.astro
│   ├── i18n/
│   │   └── translations.ts      # All UI strings for en/es
│   ├── layouts/
│   │   └── Layout.astro         # Base HTML layout
│   ├── pages/
│   │   ├── index.astro          # English page
│   │   └── es/index.astro       # Spanish page
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       └── cvParser.ts          # Parses CV Markdown into structured data
└── package.json
```

---

## 🧞 Commands

All commands are run from the root of the project:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build production site to `./dist/`           |
| `npm run preview` | Preview the production build locally         |

---

## 🛠️ Tech Stack

- **[Astro](https://astro.build)** — static site framework
- **TypeScript** — type-safe components and utilities
- **CSS** (vanilla, with custom properties) — no CSS framework
- **Inter & JetBrains Mono** — variable fonts via `@fontsource-variable`
- **sharp** — image processing (favicon generation)

---

## 📝 CV

The CV is authored in Markdown (`docs/`) and parsed at build time into structured data used by the components. Pre-rendered PDFs are served from `public/`.
