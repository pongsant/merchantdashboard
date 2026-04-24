# Push Merchant Dashboard Prototype

High-fidelity frontend prototype for the merchant dashboard scope:

- Multi-page dashboard experience (distinct UI per function)
- Hamburger menu with animated drawer navigation
- Top-right Account + Settings icon actions
- Popup detail animation on every key card/list item
- "Open full page" detail block for deeper data handoff
- High-density number-driven UI with mock data
- Applicants page with 3D-style card treatment
- Locations page with interactive map-style pins and detail popups

## Run locally

Open `index.html` directly, or run a local server:

```bash
python3 -m http.server 8080
```

Then browse to `http://localhost:8080`.

## Files

- `index.html` - app shell and modal structure
- `styles.css` - complete visual system and page-level layouts
- `data.js` - mock business data for all modules
- `app.js` - rendering logic, navigation, popups, and interactions

## Team handoff flow

1. Keep UI structure in `app.js`.
2. Replace mock records in `data.js` with real backend responses.
3. Keep detail shape compatible with modal renderer (`openModal` + `renderFullDetail`).
