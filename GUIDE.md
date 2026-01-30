# Portfolio (Astro 5 + Tailwind v4 + GSAP) — Guía Técnica del Repositorio

## Tabla de contenidos
- [1. Resumen del proyecto](#1-resumen-del-proyecto)
- [2. Quick start](#2-quick-start)
- [3. Stack y tooling](#3-stack-y-tooling)
- [4. Estructura del repo](#4-estructura-del-repo)
- [5. Convenciones y estándares](#5-convenciones-y-estándares)
- [6. Routing y páginas (Astro)](#6-routing-y-páginas-astro)
- [7. Arquitectura UI y componentes](#7-arquitectura-ui-y-componentes)
- [8. Estilos (Tailwind v4 + CSS)](#8-estilos-tailwind-v4--css)
- [9. Animaciones (GSAP + Matter.js)](#9-animaciones-gsap--matterjs)
- [10. Datos y contenido (Content Collections)](#10-datos-y-contenido-content-collections)
- [11. SEO / AEO (Schema + metadata)](#11-seo--aeo-schema--metadata)
- [12. Accesibilidad (a11y)](#12-accesibilidad-a11y)
- [13. Performance](#13-performance)
- [14. Calidad, testing y CI/CD](#14-calidad-testing-y-cicd)
- [15. Build y deploy](#15-build-y-deploy)
- [16. Troubleshooting](#16-troubleshooting)
- [17. Roadmap recomendado](#17-roadmap-recomendado)

---

## 1. Resumen del proyecto
**Qué es:** Portfolio personal para reclutadores/clientes con enfoque en **rendimiento**, **SEO/AEO**, **accesibilidad** y **animaciones sutiles**.

**Qué contiene:**
- Home (`src/pages/index.astro`) compuesta por secciones (`src/components/sections/home/*`).
- UI base reutilizable (`src/components/ui/*`) + componentes compartidos (`src/components/shared/*`).
- Contenido tipado con **Astro Content Collections** (`src/content/*`).
- Animaciones con **GSAP** y una sección con **Matter.js** (física).

**Principios de diseño técnico:**
- Máxima cantidad de UI estática (Astro) + JS cliente solo donde aporte valor real.
- Tokens y estilos globales controlados (Tailwind v4 + `@theme`).
- Limpieza estricta de listeners/animaciones y soporte para `prefers-reduced-motion`.
- Deploy consistente en GitHub Pages con `site/base` y `trailingSlash`.

---

## 2. Quick start

### Requisitos
- Node.js: recomendado **18+** (ideal: fijarlo con `.nvmrc` o `volta` para evitar drift).
- Package manager: **Yarn** (hay `yarn.lock`).

### Instalar
```bash
yarn install
```

### Dev
```bash
yarn dev
```
Abrir: `http://localhost:4321`

### Build
```bash
yarn build
```

### Preview del build
```bash
yarn preview
```

---

## 3. Stack y tooling

### Core
- **Astro 5** (SSG por defecto si no se configura adapter SSR)
- **Tailwind CSS v4** con `@tailwindcss/vite` (sin `tailwind.config.*`)
- **TypeScript** (strict) con alias desde `tsconfig.json`

### UI / Motion
- **GSAP** para animaciones
- **Matter.js** para físicas (skills)

### Astro features usados
- **Content Collections** (`src/content/config.ts`)
- **astro:assets** (optimización de imágenes donde aplica)
- **astro:transitions** (`ClientRouter`) si se habilita navegación suave

### Scripts (package.json)
- `dev` → `astro dev`
- `build` → `astro build`
- `preview` → `astro preview`
- `astro` → CLI passthrough

---

## 4. Estructura del repo

```
.
├── public/
│   ├── images/
│   ├── fonts/
│   ├── preview/
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── layouts/
│   │   ├── sections/
│   │   │   └── home/
│   │   ├── shared/
│   │   └── ui/
│   ├── content/
│   │   ├── projects/
│   │   ├── experience/
│   │   └── config.ts
│   ├── pages/
│   └── styles/
│       ├── global.css
│       ├── base.css
│       ├── theme.css
│       ├── components.css
│       └── font.css
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── .github/workflows/deploy.yml
```

**Regla rápida:**
- `pages/` = rutas
- `components/sections/` = secciones completas
- `components/ui/` = piezas atómicas
- `components/shared/` = reutilizables no-atómicos (cards, schemas, decorativos)
- `content/` = contenido tipado (markdown)
- `styles/` = capas globales + tokens

---

## 5. Convenciones y estándares

### Imports (alias)
Usar alias de `tsconfig.json` para evitar rutas relativas largas:
- `@/ui/*`, `@/shared/*`, `@/layouts/*`, `@/sections/*`, etc.

### Naming
- Componentes: `PascalCase.astro`
- Archivos de contenido: `kebab-case.md`
- IDs de contenido: estables (no cambian aunque cambie el título)

### Props y API de componentes
- Props en Astro: definir en frontmatter con defaults claros.
- Evitar props “bandera” ambiguas; preferir `variant: 'a' | 'b' | 'c'`.
- Clases: preferir Tailwind; usar `components.css` solo para patrones repetidos.

### Semántica HTML
- Cada sección debe ser `section` con `aria-labelledby`.
- Un único `h1` por página.
- `main` con `id="main-content"` (para skip-link).

### Convención para links externos
- Externo: `target="_blank" rel="noopener noreferrer"`
- Preferir detección simple:
  - `^https?://` = web externa
  - `mailto:` = email

### Git (recomendado)
- Branch: `feature/<scope>-<short>`, `fix/<scope>-<short>`
- Commits: estilo Conventional Commits (ideal para changelog y releases)
  - `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`, `docs: ...`

---

## 6. Routing y páginas (Astro)

### Rutas actuales
- `/` → `src/pages/index.astro`

### Patrón para nueva página
1) Crear `src/pages/<slug>.astro`  
2) Envolver con layout:
```astro
---
import Layout from '@/layouts/Layout.astro'
---
<Layout title="..." description="...">
  <main id="main-content">
    ...
  </main>
</Layout>
```

### Rutas dinámicas
Si se agregan páginas de detalle (ej: proyectos):
- `src/pages/projects/[slug].astro` con `getStaticPaths()` + `getCollection('projects')`

---

## 7. Arquitectura UI y componentes

### Enfoque
- Componentes `.astro` como default.
- JS cliente solo en:
  - animaciones (GSAP)
  - interacción real (ej. físicas con Matter)
- Evitar `client:*` si no es estrictamente necesario (menos JS, mejor performance).

### Layout principal
`src/components/layouts/Layout.astro`:
- `head` centralizado
- import global de estilos (`src/styles/global.css`)
- skip link + estructura base

### Dónde poner qué
- Botones, badges, tags, inputs: `ui/`
- Cards, schemas JSON-LD, decoraciones: `shared/`
- Secciones completas (About/Projects/Experience/Skills/Contact): `sections/home/`

---

## 8. Estilos (Tailwind v4 + CSS)

### Carga global
`src/styles/global.css` actúa como entry:
- importa `tailwindcss`
- importa capas propias: `base.css`, `theme.css`, `components.css`, `font.css`

### Tokens (Tailwind v4 `@theme`)
En `src/styles/theme.css`:
- colores (OKLCH recomendado)
- fuentes (`--font-*`)
- tamaños tipográficos (`--text-*`)
- sombras, radios, etc.

**Regla de oro:**  
Tokens → `theme.css`  
Patrones repetidos → `components.css` (`@layer components`)  
Caso único → Tailwind inline en el componente

### Clase utilitaria repetible (ejemplo)
`src/styles/components.css`:
```css
@layer components {
  .card-surface {
    @apply rounded-2xl bg-white/70 backdrop-blur-xl shadow-lg;
  }
}
```

### Texturas / backgrounds
- Assets en `public/`
- Para fondos repetibles: usar clases tipo `.bg-texture` en `components.css` con `background-repeat`

### Dark mode (si lo agregas)
- Definir estrategia: `class` (recomendado) o `media`
- Tokens: definir variables para `:root` y `.dark`

---

## 9. Animaciones (GSAP + Matter.js)

### Reglas de animación (obligatorias)
- Respetar `prefers-reduced-motion`
- Limpieza en navegación/teardown:
  - matar timelines/ScrollTriggers
  - remover listeners
  - detener runners/engines (Matter)

### Dónde vive el JS
- Preferir `<script>` dentro del `.astro` del componente que lo usa
- Evitar “scripts globales” salvo analítica o setup de bajo costo

### Performance animaciones
- Evitar animar propiedades costosas (layout): preferir transform/opacity
- Si hay físicas: actualizar posiciones en `requestAnimationFrame`
- No ejecutar si la sección no está visible (ScrollTrigger o IntersectionObserver)

---

## 10. Datos y contenido (Content Collections)

### Colecciones
Definidas en `src/content/config.ts` (Zod schemas):
- `projects`
- `experience`

### Añadir un proyecto
1) Crear `src/content/projects/<slug>.md`
2) Respetar schema (id, title, imageUrl, techStack, urls, etc.)
3) Renderizado: `getCollection('projects')` en la sección correspondiente

### Reglas para contenido
- `id` estable y único
- Imágenes:
  - preferir `.webp`
  - ubicarlas en `public/images/...`
- No meter HTML complejo en Markdown si no es necesario (mejor componentes Astro)

---

## 11. SEO / AEO (Schema + metadata)

### Head centralizado
En `Layout.astro`:
- `title`, `description`
- `og:image`
- `viewport`
- favicon

**Recomendado añadir:**
- canonical
- twitter cards
- `og:type`, `og:url`
- alternates (si luego haces i18n)

### JSON-LD
Existe `src/components/shared/JsonLdSchema.astro`.

**Convención recomendada:**
- Home: `Person` + `WebSite` + `Organization` (si aplica)
- Projects index: `CollectionPage`
- Project detail: `CreativeWork` / `SoftwareApplication` (según encaje)
- Breadcrumbs: `BreadcrumbList` en páginas internas

### Robots + Sitemap
- `public/robots.txt`
- `public/sitemap.xml`

> Si luego automatizas sitemap, considera generar dinámico con build step (en vez de mantenerlo manual).

---

## 12. Accesibilidad (a11y)

### Lo mínimo por PR
- [ ] `main` presente y skip-link funcional
- [ ] `h1` único + jerarquía correcta de headings
- [ ] Botones reales para acciones (no `div role="button"` salvo necesidad extrema)
- [ ] `aria-label` solo cuando no hay label visible
- [ ] `alt` descriptivo en imágenes informativas (decorativas: `alt=""`)
- [ ] Focus visible en elementos interactivos
- [ ] Navegación con teclado completa (Tab/Shift+Tab/Enter/Escape donde aplique)
- [ ] Contraste suficiente (texto vs fondo)

### Motion a11y
- `prefers-reduced-motion` debe desactivar loops intensos y físicas.

---

## 13. Performance

### Objetivos recomendados (budget)
- JS total inicial: lo mínimo (evitar librerías extra)
- Imágenes: siempre comprimidas y dimensionadas
- Fonts: `font-display: swap`
- Evitar reflow:
  - animar transforms
  - no medir DOM en loops sin throttling

### Base path (GitHub Pages)
Si hay `base` en prod (repo en subpath), **cualquier asset hardcodeado** debe respetarlo.

**Recomendación fuerte:** centralizar el prefijo de assets.
- O usar rutas relativas cuando sea posible
- O crear helper tipo `withBase(path)` para construir URLs (si lo necesitas)

---

## 14. Calidad, testing y CI/CD

### Estado actual
- TypeScript strict (buena base)
- Deploy workflow para GitHub Pages (`.github/workflows/deploy.yml`)
- No se ve un setup completo de ESLint/Prettier/tests (recomendado añadir)

### Recomendación mínima
- ESLint + Prettier + scripts
- CI:
  - `yarn build`
  - `yarn lint`
- (Opcional) Playwright para smoke tests

### Checklist antes de merge
- [ ] `yarn build` local
- [ ] Sin warnings críticos
- [ ] Sin accesibilidad rota (tab/focus)
- [ ] No assets rotos en prod por `base`

---

## 15. Build y deploy

### Config Astro
`astro.config.mjs` típicamente controla:
- `site` y `base` (GitHub Pages)
- `trailingSlash: 'always'`
- Vite plugin Tailwind

### Output
- `dist/` luego de `yarn build`

### Deploy (GitHub Pages)
- Workflow construye y publica `dist/`
- Revisar Node version del workflow vs local (ideal: alinear)

---

## 16. Troubleshooting

### 1) Assets rotos en GitHub Pages
**Síntoma:** imágenes no cargan en producción, pero sí en dev.  
**Causa típica:** falta de `base` en rutas absolutas.  
**Solución:** asegurar que rutas respeten `base` o usar estrategia centralizada.

### 2) Tailwind “no aplica”
**Checklist:**
- `global.css` importado en `Layout.astro`
- `@tailwindcss/vite` activo en `astro.config.mjs`
- clases válidas (Tailwind v4 cambia algunos hábitos vs v3)

### 3) Animaciones consumen CPU / se duplican
**Causas típicas:**
- no se mata el timeline
- listeners duplicados tras navegación
- runners de Matter activos en background  
**Solución:** cleanup estricto en `astro:before-swap` / `pagehide`.

### 4) Content Collections falla
**Síntoma:** error de schema o no renderiza contenido.  
**Solución:** validar frontmatter vs `src/content/config.ts`.

### 5) Sección Skills no arranca
- validar que el script corre cuando la sección existe
- validar ScrollTrigger/observer (si aplica)
- revisar `prefers-reduced-motion` (puede estar desactivando)

---

## 17. Roadmap recomendado

### Fase 1 (calidad base)
- Añadir ESLint + Prettier + scripts (`lint`, `format`)
- Añadir `.nvmrc` o Volta para fijar Node
- Añadir `.env.example` + guía de env vars

### Fase 2 (SEO/AEO serio)
- Canonical + Twitter cards + `og:url`
- JSON-LD completo por tipo de página
- Sitemap generado (no manual) si agregas rutas dinámicas
- `llms.txt` (si vas full AEO)

### Fase 3 (contenido escalable)
- Rutas dinámicas para proyectos `/projects/[slug]`
- Índice de proyectos con filtros (preferir prebuild)
- Estrategia consistente para imágenes

### Fase 4 (tests)
- Playwright: smoke tests (home carga, navegación a projects, no 404 en assets)
- Budget performance (Lighthouse en CI opcional)
