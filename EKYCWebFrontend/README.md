# EKYCWebFrontend UI

This frontend implements a responsive, accessible layout with a persistent left side navigation (navy blue / white theme).

## Features

- Side navigation shell (`SideNavLayout`) with:
  - Brand area, primary nav links (Dashboard, Register, Login, Bank Details) and external API Docs
  - Active link highlighting with `aria-current="page"`
  - Keyboard accessibility and visible focus ring
  - Skip-to-content link
  - Mobile header with hamburger toggle and collapsible sidebar
- Standardized forms and spacing with CSS variables and utility classes
- Existing business logic and API calls preserved

## Getting Started

Environment:
- Set `REACT_APP_API_BASE` in a `.env` file (see `.env.example`). If not set, the app defaults to `http://localhost:3001` and shows a warning banner.

Run:
- `npm start` for development
- `npm test` for tests
- `npm run build` for production

## Theming

Theme variables live in `src/theme.css`:
- `--color-navy: #0B1F3A`
- `--color-white: #ffffff`
- `--color-accent: #E87A41`
- spacing, radius, and focus ring tokens

Use classes:
- `.btn-primary` for prominent actions
- `.form-section`, `.form-grid`, `.label-base`, `.input-base`, `.help-text` for consistent forms

## Accessibility

- `<nav aria-label="Primary">` in the side nav
- Skip link `.skip-to-content` to jump to `#main-content`
- Focus styles with `--focus-ring`
- Mobile menu toggle uses `aria-expanded` and is keyboard-operable

## Routes

- `/` Dashboard placeholder
- `/register` Registration
- `/login` Login
- `/bank` Bank Details
- `/docs` (external docs)
