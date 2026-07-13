# MG FESTA Project Guide

Read this file before changing the project.

## Project

MG FESTA is a Next.js and TypeScript landing page that recreates a Figma mobile profile layout as a centered website experience.

Source design:

- Figma file key: `wXD5W6weHr7TjprMUjaXtX`
- Figma frame: `Google Pixel 2 XL - 1`
- Figma node: `3:2`
- Canvas size: `411x823`

## Rules

- Keep source code in English.
- Keep visible brand text as `MG FESTA`.
- Do not add comments unless they explain a non-obvious technical constraint.
- Prefer small typed data structures over repeated markup.
- Keep the mobile frame pixel-faithful to the Figma source.
- Keep Figma assets local under `public/assets/figma`.
- Do not reference temporary Figma MCP asset URLs from production code.
- Preserve SEO metadata in `src/app/layout.tsx`.

## Commands

- `npm run dev`
- `npm run lint`
- `npm run build`

## Styling

Tailwind CSS is the styling system. Use exact arbitrary values when matching the Figma frame. Keep responsive behavior simple: the 411px frame is centered on larger screens instead of stretched.
