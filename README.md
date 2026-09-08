# Qrati Connect — Lit Example

[![Qrati Connect — embeddable event photo galleries](public/qrati-connect-og.png)](https://qrati.com/connect)

Use the native web-component API to add live event photo galleries to Lit applications, including guest uploads, lightbox viewing, emoji reactions, and contest leaderboards. [Explore Qrati Connect](https://qrati.com/connect) or [view the live Lit example](https://qrati.com/connect/lit-example).

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
pnpm install
cp .env.example .env   # optional — sensible defaults are baked in
pnpm dev
```

## Other integration methods

- **React component** — `import { QratiConnect }` (see the React/Next/Preact examples).
- **Embed (no-code)** — single `<script>` tag with `data-*` attributes (see the Vanilla JS / Marko / Ember examples).

Docs: <https://www.npmjs.com/package/@qratilabs/qrati-connect>
