# Beshoy & Doris — Cinematic Wedding Invitation

A cinematic, highly interactive, scroll-driven digital wedding invitation for Beshoy & Doris.

## Event Details
- **Date:** 14 November 2026
- **Time:** 5:00 PM
- **Ceremony:** Church of Archangel Michael, Sheraton
- **Reception:** La Pensée, Gardenia

## Tech Stack
- **Framework:** React + Vite
- **Animations:** GSAP (ScrollTrigger)
- **Smooth Scrolling:** Lenis
- **Styling:** Vanilla CSS (mobile-first, responsive)

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
```

## Production Build

```bash
# Build for production
npm run build
```
The production files will be output to the `dist/` directory.

## Project Architecture
- `src/components/`: Cinematic sections (Preloader, Opening, Names, Ceremony, Reception, Date, Countdown, PhotoStory, FinalFrame)
- `src/config/eventConfig.js`: Centralized event data (names, dates, locations, photos)
- `src/hooks/useLenis.js`: GSAP-integrated smooth scroll setup
- `src/styles/`: Global CSS and typography design system
- `src/utils/calendar.js`: Client-side `.ics` generator for "Add to Calendar"

## Asset Replacement Instructions
- **Couple Photos**: Add new photos to `src/assets/couple/`. Then, register them in the `couplePhotos` array within `src/config/eventConfig.js`. The `PhotoStory` component will automatically adapt its layout mode based on the number of photos provided.
- **Church & Reception Photos**: Replace the CSS placeholders by adding real photos to `src/assets/church/` and `src/assets/reception/`, then updating the respective components (`CeremonyScene.jsx` and `ReceptionScene.jsx`).
- **Metadata**: Update `public/og-image.jpg` and `public/favicon.svg` for social sharing.

## Deployment
This project is optimized for deployment on Cloudflare Pages.
Connect this repository to Cloudflare Pages and use `npm run build` as the build command with `dist` as the output directory.
