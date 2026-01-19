# Frontend Portfolio (Astro)

A high-performance personal portfolio for frontend developers, built with Astro and optimized for recruiters, tech leads, and fellow developers.

## Overview

This project is a personal frontend developer portfolio focused on presenting professional experience, featured projects, and technical skills in a clean and accessible format. The site is designed to be fast, SEO-friendly, and easy to customize, making it suitable for showcasing your profile to hiring teams and collaborators.

## Preview

![Portfolio Preview](./public/preview.png)

## Features

- Fast performance with Astro’s static-first architecture
- Responsive design for mobile, tablet, and desktop
- SEO-friendly metadata and semantic HTML
- Projects showcase with clear call-to-action links
- Accessibility best practices baked in
- Modular sections for easy content updates

## Sections Included

- **About**: Professional summary, role focus, and personal value proposition
- **Projects**: Selected work with descriptions, tech stack, and links
- **Experience**: Career timeline and responsibilities
- **Skills**: Core frontend competencies and tooling
- **Contact**: Direct ways to reach you

## Tech Stack

- **Astro**: Static-first framework for fast, modern websites
- **TypeScript**: Safer, maintainable code with static typing support
- **Tailwind CSS**: Utility-first styling for consistent UI and rapid iteration
- **GSAP**: Optional motion effects for polished interactions
- **Matter.js**: Optional physics-based visuals and creative effects

## Project Structure

```text
/
├── public/            # Static assets (images, icons, preview)
├── src/
│   ├── components/    # Reusable UI components
│   ├── layouts/       # Base layouts and page shells
│   ├── content/       # Portfolio content (projects, experience, etc.)
│   ├── pages/         # Route-based pages
│   └── styles/        # Global styles and Tailwind entry
├── astro.config.mjs   # Astro configuration
├── package.json       # Scripts and dependencies
└── tsconfig.json      # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)

### Installation

```bash
git clone <your-repo-url>
cd portfolio-astro
npm install
```

### Run the Development Server

```bash
npm run dev
```

Open `http://localhost:4321` in your browser.

## Available Scripts

- `npm run dev`: Start the local development server
- `npm run build`: Build the production site into `dist/`
- `npm run preview`: Preview the production build locally

## Customization Guide

- **Update personal data**: Edit content in `src/content/` or directly in section components.
- **Add new projects**: Extend the projects data source and update the projects section.
- **Modify text content**: Edit the relevant section component under `src/components/sections/`.
- **Change styles or theme**: Update Tailwind utilities or global styles in `src/styles/`.

## SEO & Performance

Astro ships minimal JavaScript by default and prioritizes static rendering, which results in fast page loads and high Lighthouse scores. Combine this with semantic HTML, descriptive metadata, and optimized assets to deliver a portfolio that ranks well and provides a strong user experience.

## Deployment

### GitHub Pages

1. Build the site:

```bash
npm run build
```

2. Deploy the `dist/` output directory to GitHub Pages.

Common approaches include:
- Using GitHub Actions to deploy `dist/` on every push
- Manually uploading `dist/` to the `gh-pages` branch

## Contributing

This project is open to contributions. If you want to improve or adapt it:

1. Open an issue to discuss changes or report bugs.
2. Fork the repository and create a feature branch.
3. Submit a pull request with a clear description of the update.

## License

No license file is included in this repository. If you plan to distribute or reuse the code publicly, add a LICENSE file (for example, MIT) to clarify usage rights.

## Author / Contact

- **Author**: Your Name
- **GitHub**: https://github.com/your-handle
- **LinkedIn**: https://www.linkedin.com/in/your-handle
- **Email**: you@example.com
