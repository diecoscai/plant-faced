# Plant Faced — Next.js Component Redesign (Contract)

This is the single source of truth for all sub-agents working on this refactor.
Read it fully before starting your assigned phase. Do not exceed your assigned scope.

## Goal
Restructure the existing **vanilla HTML/CSS/JS** static store into a
**Next.js (App Router) + TypeScript + Tailwind CSS** component-based app.
**Keep the current look and behavior** (content stays Spanish). This is an
architecture refactor, not a visual redesign.

## Locked decisions
- Framework: **Next.js App Router + TypeScript**, SSG for the catalog.
- Styling: **Tailwind CSS**. Extract current colors/fonts/spacing from `styles/*.css`
  into the Tailwind theme (`tailwind.config.ts`) so the look stays faithful.
- Cart persists in `localStorage` under the **same `"cart"` key** (existing carts survive).
- Testing: **Vitest + React Testing Library** for cart + filter/pagination logic.
- Package manager: **npm**. Lint/format: ESLint + Prettier (Next defaults).
- Drop the **"Otros"** category filter (0 products). Keep Camisetas / Buzos / Musculosas.
- Data: 86 products in `products.json`. Real fields:
  `id, name, urlName, description, image, lifestyleImage, isBundle, price,
   salePrice, colors, sizes, category, gender, ...`. There is **no `alt` field** —
  use `name` for image alt text.

## Existing behavior to preserve (parity checklist)
- Header: centered logo, nav (Inicio/Productos/Contacto), mobile hamburger
  (toggle + close on outside-click + close on Escape), cart button with live counter.
- Hero: title, discount text, "Ver Colección" CTA that smooth-scrolls to `#products`.
- Catalog: search (debounced) + category select; 10 products/page; windowed
  pagination (Anterior, 1 … N, Siguiente) with max 5 visible buttons; scrolls to
  top of products section on page change; "No se encontraron productos." empty state.
- Product card: image, title, price `$xx.xx`, scrollable description, "Agregar al carrito".
- Cart sidebar: slide-in panel, item list (image/title/price), qty −/input/+,
  remove (×), live total, checkout button disabled when empty, "✅ … agregado" toast (2s).
- Footer: contact, quick links, social icons.

## Target structure
```
app/
  layout.tsx          fonts, <meta>/OG, CartProvider, Header, Footer
  page.tsx            Hero + ProductCatalog (server; loads products)
  globals.css         Tailwind directives + any base resets
components/
  header/Header.tsx Nav.tsx CartButton.tsx
  Hero.tsx
  catalog/ProductCatalog.tsx Filters.tsx ProductGrid.tsx ProductCard.tsx Pagination.tsx
  cart/CartSidebar.tsx CartItem.tsx CartFeedback.tsx
  footer/Footer.tsx
lib/
  products.ts         load + type products, category list
  cart-context.tsx    CartProvider + useCart()
types/
  product.ts          Product, CartItem
public/
  products.json, assets/images/*
```

## useCart() contract
`items: CartItem[]`, `add(product)`, `remove(id)`, `setQty(id, n)` (min 1),
`count` (sum of quantities), `total` (sum price*qty). Persists to `localStorage["cart"]`.
`CartItem = Product & { quantity: number }`.

## Cleanups folded in (only these; no unrelated refactoring)
- Remove leftover `console.log("hola")` and debug logs.
- Replace broken `showLoading` (`computedStyleMap.display` no-op) with real loading state.
- Implement the debounced search the old markup promised but never wired up.
- Remove dead references to non-existent `product.alt`.

## Phases (each gated by a fresh-context verifier before the next starts)
- **Phase 0 — Scaffold & tooling.** Next.js+TS+Tailwind+Vitest config, design tokens
  from CSS, types, `lib/products.ts`, move data/assets to `public/`, root `layout.tsx`.
- **Phase 1 — Cart core.** `lib/cart-context.tsx` (+ localStorage) and Vitest tests.
- **Phase 2 — Presentational components (parallel).**
  2A: header/* + footer/*.  2B: catalog/* + Hero (+ filter/pagination logic tests).
- **Phase 3 — Cart UI + assembly.** cart/* components, `app/page.tsx`, wire everything,
  delete old `index.html`, `scripts/`, `styles/`. Full build + dev parity.

## Non-goals (YAGNI)
No real payments/backend, no visual redesign, no i18n framework.

## Rules for sub-agents
- Stay within your phase's file scope. Do NOT commit, push, or open PRs.
- Match existing patterns; TypeScript strict; 2-space indent, single quotes.
- Leave the repo in a building state; report what you did and any deviations.
