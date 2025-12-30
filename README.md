# Travel List

A tiny React app to track what you need to pack.

## What it does
- Add items with a quantity
- Mark items as packed (crosses them out)
- Sort by added order, description, or packed status
- Clear the whole list with a confirmation
- See live stats for packed vs total

## Running locally
1) Install deps: `npm install`
2) Start dev server: `npm start` (opens `http://localhost:3000`)
3) Run tests: `npm test`
4) Build for production: `npm run build`

## Deploy
Build with `npm run build` and host the `build/` folder on any static host. A `deploy` script is set up for GitHub Pages (`npm run deploy`) once `gh-pages` is configured.

## Tech
- React (Create React App)
- Styles in `src/index.css`
- Main app logic in `src/App.js`
