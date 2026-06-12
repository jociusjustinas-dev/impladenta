# Impladenta

React + Tailwind front-end odontologijos klinikai. Paruošta vėlesnei WordPress (headless CMS) integracijai.

## Paleidimas

```bash
npm install
npm run dev
```

Atidarykite [http://localhost:5173](http://localhost:5173)

## WordPress prijungimas (vėliau)

1. Nukopijuokite `.env.example` į `.env`
2. Nustatykite WordPress svetainės URL:

```env
VITE_WP_API_URL=https://jusu-wordpress.lt
```

3. WordPress pusėje įjunkite REST API ir CORS (jei front-end kitame domene)
4. Turinį gaukite per `src/lib/wp-api.ts` funkcijas

## Dizaino sistema (Baseframe™)

Šaltinis: [baseframe-template.webflow.io](https://baseframe-template.webflow.io/)

- `src/styles/baseframe/tokens.css` — spalvos, tipografija, spacing, radius
- `src/styles/baseframe/typography.css` — `.bf-h1`, `.bf-body-2`, `.bf-label-1` ir kt.
- `src/styles/baseframe/components.css` — `.bf-btn`, `.bf-container`, `.bf-card`
- `src/styles/baseframe/webflow-shared.reference.css` — pilnas originalus Webflow CSS (reference)
- `src/data/design-tokens.ts` — tokenai TypeScript komponentams

**Šriftas:** Parkinsans — antraštės 600, tekstas/label/mygtukai 400

**Pagrindinės spalvos:** `#eee9e1` (fonas), `#27241f` (tekstas), `#fed007` (akcentas)

## Struktūra

- `src/components/` — UI komponentai
- `src/data/fallback.ts` — statinis turinys kol neprijungtas WP
- `src/lib/wp-api.ts` — WordPress REST API klientas
- `src/types/wp.ts` — WordPress duomenų tipai

## Komandos

| Komanda | Aprašymas |
|---------|-----------|
| `npm run dev` | Dev serveris |
| `npm run build` | Produkcinis build |
| `npm run preview` | Peržiūrėti build |
