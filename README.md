# Portfolio of Yoelvys Pérez Cabrera

A high-impact personal portfolio built with Astro to showcase frontend skills, projects, and experience.

## Overview

This project is a personal Frontend Developer portfolio designed to present professional work, technical expertise, and career highlights in a clear, recruiter-friendly format. It includes curated content such as featured projects, professional experience, core skills, and a direct contact section, all optimized for fast performance and accessibility.

## Preview

![Portfolio Preview](https://yoelvyspc93.github.io/portfolio-astro/preview.webp)

## Features

- Fast performance with Astro and static-first rendering
- Responsive design for desktop, tablet, and mobile
- SEO-friendly metadata and semantic HTML
- Projects showcase with rich descriptions and links
- Accessibility best practices and keyboard-friendly UI
- Smooth motion and interactive visuals where appropriate

## Sections Included

- **About:** concise professional summary and positioning
- **Projects:** selected work with roles, stacks, and outcomes
- **Experience:** timeline of roles, responsibilities, and impact
- **Skills:** core frontend technologies and tools
- **Contact:** direct links for outreach and collaboration

## Tech Stack

- **Astro:** static-first framework for fast, SEO-focused sites
- **TypeScript:** type-safe JavaScript for maintainable UI logic
- **Tailwind CSS:** utility-first styling for consistent design systems
- **GSAP:** animation toolkit for smooth UI motion
- **Matter.js:** physics-based interactions for advanced visuals

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
git clone https://github.com/yoelvyspc93/portfolio-astro.git
cd portfolio-astro
yarn install
```

### Run the Development Server

```bash
yarn dev
```

Open `http://localhost:4321` in your browser.

## Available Scripts

- `yarn dev`: Start the local development server
- `yarn build`: Build the production site into `dist/`
- `yarn preview`: Preview the production build locally

## Customization Guide

- **Update personal data**: Edit content in `src/content/` or directly in section components.
- **Add new projects**: Extend the projects data source and update the projects section.
- **Modify text content**: Edit the relevant section component under `src/components/sections/`.
- **Change styles or theme**: Update Tailwind utilities or global styles in `src/styles/`.

## SEO & Performance

This portfolio follows modern SEO and performance practices:

- Astro outputs minimal, static HTML by default for fast load times.
- Semantic HTML improves accessibility and search engine parsing.
- Asset optimization and scoped CSS reduce payload size.

## Author / Contact

- **Author**: Yoelvys Perez Cabrera
- **GitHub**: https://github.com/yoelvyspc93
- **LinkedIn**: https://www.linkedin.com/in/yoelvys-perez-cabrera
- **Email**: yoelvyspc93@gamil.com
