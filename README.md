# Qrati Connect — Lit Example

Embeds [Qrati Connect](https://qrati.com) into a Lit + Vite app using the
framework-agnostic **web component** integration, with a host-controlled
light/dark theme.

## Integration method: Web component

Lit renders custom elements natively, so we load the element bundle from the
CDN and drop `<qrati-connect>` into the markup:

```ts
<qrati-connect organization-id={ORGANIZATION_ID} theme={theme} router="hash" />
```

The bundle (and its styles) are loaded once on mount — see `src/qrati-app.ts`.

## Run it

```bash
bun install
cp .env.example .env   # optional — sensible defaults are baked in
bun dev
```

## Configuration

Set these in `.env` (all optional; the demo org is used as a fallback):

| Variable                 | Description                                                       |
| ------------------------ | ------------------------------------------------------------------|
| `VITE_ORGANIZATION_ID`   | Your Qrati organization ID                                        |
| `VITE_QRATI_SCRIPT_URL`  | CDN URL of the web-component bundle (`element/web.es.js`)          |

## Other integration methods

- **React component** — `import { QratiConnect }` (see the React/Next/Preact examples).
- **Embed (no-code)** — single `<script>` tag with `data-*` attributes (see the Vanilla JS / Marko / Ember examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>
