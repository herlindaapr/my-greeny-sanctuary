# Greeny Sanctuary 

Greeny Sanctuary is a Nuxt 4 + Tailwind CSS web app for **garden journaling**.  
It lets you log daily observations about your plants, attach photos, and review past entries in a calm, glassmorphism-themed UI.

## Features

- **Hero landing experience**
  - Soft, atmospheric background with plant imagery.
  - Intro text inviting users to start their first garden entry.

- **Guided CTA section**
  - Glassmorphism CTA card explaining *why* to journal your gardening activities.
  - Primary **“Write”** button that opens the journal composer.

- **Journal composer modal (`JournalModal`)**
  - Write **title**, **date**, **content**, and optionally attach a **photo**.
  - Date input is clamped so you can only choose **today or past dates** (no future journals).
  - Instant local persistence via `useJournals` so entries show up immediately in the UI.
  - Optional backend sync to **Strapi** via `createStrapiJournal` (safe no-op if backend is not configured).

- **Local journals store (`useJournals`)**
  - Central composable for managing entries:
    - `addJournal` – add new entry.
    - `updateJournal` – edit an existing entry.
    - `deleteJournal` – remove an entry.
  - State is scoped through Nuxt `useState`, so it’s shared across components.

- **Blog-style journal list (`JournalCard`)**
  - Separate glassmorphism card that lists entries in a **blog-like layout**.
  - Shows up to **3 cards per page** with simple **pagination** (Prev / Next).
  - Each card:
    - Optional thumbnail if a photo was attached.
    - Title, date, and multi-line content preview.
  - “Add new entry” button that re-opens the journal composer.

- **Journal details modal (`JournalDetailsModal`)**
  - Opens when you click on a journal card.
  - Shows **full content**, **date**, and **current photo**.
  - Allows:
    - **Edit**: title, date (still clamped to today/past), content.
    - **Photo management**:
      - Initially shows the **current image in a large preview**.
      - A **bin icon** on the top-right lets you remove/replace the photo.
      - After clicking the bin, a “Choose file” input appears with a **small preview** of the new image.
      - Saving after clearing keeps the entry **without a photo**.
    - **Delete entry** with confirmation.
    - **Go back** button to close without saving.

- **Custom scroll area (`ScrollArea`)**
  - Reusable component that wraps content in a styled scrollable region.
  - Uses custom scrollbar styling to match the dark/glass aesthetic.

- **Strapi integration helper (`utils/strapi.ts`)**
  - `createStrapiJournal(payload)` posts journal data to a Strapi backend.
  - Base URL comes from `STRAPI_BASE_URL`:
    - Looked up via `globalThis.process?.env?.STRAPI_BASE_URL`.
    - Falls back to `http://localhost:1337/api` if not defined.
  - Errors are caught and logged, but don’t break the UI.

## Tech stack

- **Framework**: [Nuxt 4](https://nuxt.com/)
- **Language**: TypeScript
- **UI library**: Vue 3 (`<script setup>`)
- **Styling**: Tailwind CSS 4
- **Scrolling / UX**: Custom scroll area inspired by [shadcn/ui](https://ui.shadcn.com/) scrollbars
- **Backend (optional)**: Strapi (for journal persistence)

## Getting started

### 1. Install dependencies

```bash
npm install
```

Or with your preferred package manager:

```bash
pnpm install
yarn install
bun install
```

### 2. Run the development server

```bash
npm run dev
```

This starts Nuxt at `http://localhost:3000`.

### 3. Build for production

```bash
npm run build
```

Then preview the production build locally:

```bash
npm run preview
```

## Optional: connect to Strapi

If you have a Strapi backend and want to persist journals there:

1. **Create a Strapi collection type** (e.g. `journal`) that can store:
   - `title` (string)
   - `content` (rich text or text)
   - `date` (date/time)
   - `createdAt` (date/time)
   - `photoDataUrl` (text or JSON field to store base64 images, or adapt to your own media handling)

2. **Expose an API endpoint** at something like:

```text
POST /api/journals
```

3. **Configure the base URL**:

Set `STRAPI_BASE_URL` in your environment so the helper can find it:

```bash
export STRAPI_BASE_URL="https://your-strapi-domain.com/api"
```

In production, configure this env variable via your hosting provider’s env settings.

If `STRAPI_BASE_URL` is not set or Strapi is not reachable, `createStrapiJournal` will fail silently (logging a console warning) and the app will continue working with local journals only.

## Key files overview

- **`app/app.vue`** – Nuxt shell that renders layouts and pages.
- **`app/components/Hero.vue`** – Landing “Let Your Garden Tell Its Story” hero section.
- **`app/components/CTApage.vue`** – Background CTA section, wraps `JournalCard`, `JournalModal`, and `JournalDetailsModal`.
- **`app/components/JournalModal.vue`** – Modal to create a new journal entry (with optional photo).
- **`app/components/JournalCard.vue`** – Blog-style journal list with pagination, click to open details.
- **`app/components/JournalDetailsModal.vue`** – Detail view + edit/delete for a single entry, with image management and shadcn-style scroll area.
- **`app/components/ScrollArea.vue`** – Custom scroll area component with styled scrollbar.
- **`composables/useJournals.ts`** – Journal state composable (`addJournal`, `updateJournal`, `deleteJournal`).
- **`utils/strapi.ts`** – Helper for sending journal payloads to Strapi.

## Development notes

- Frontend journal state is entirely local to the browser via Nuxt state; Strapi is **optional** and non-blocking.
- Future improvements you might add:
  - Persist journals to `localStorage` or a database.
  - Authentication and per-user journals.
  - Tagging / filtering for entries (mood, plant, room, etc.).
  - Better photo storage (upload to Strapi media library or an external storage provider).
