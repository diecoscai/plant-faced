# Plant Faced Design Sync — Notes

## Known preview limitations

- **Hero background image**: Uses absolute path `/assets/images/hero-banner.webp` — broken in preview (needs a running dev server). Worked around with a green gradient wrapper in `.design-sync/previews/Hero.tsx`. The gradient accurately shows the brand green (#3D8D7A) but not the hero photo.

- **Header logo**: Uses `/assets/images/logo.webp` — shows "Plant Faced Logo" alt text in preview. No fix needed for design system use; the agent will see the correct layout and nav.

- **Urbanist font**: Defined in `tailwind.config.ts` as `fontFamily.urbanist` but has no `@font-face` in the project (no Google Fonts link). Set `runtimeFontPrefixes: ["Urbanist"]` to suppress `[FONT_MISSING]` warnings. Falls back to `serif`.

- **CartSidebar starts closed**: Component reads `isOpen` from CartContext (default false). Preview uses `useEffect` to call `openCart()` after mount. Set `overrides.CartSidebar: { cardMode: "single", viewport: "420x620" }` to contain its fixed positioning.

- **CartSidebar fixed positioning**: `position: fixed` means the sidebar would escape its preview card. Fixed with `transform: 'translateZ(0)'` on the wrapper — creates a new stacking context in Chromium, confining the fixed element. Set in `.design-sync/previews/CartSidebar.tsx`.

## Build quirks

- `build:lib` order matters: vite first (clears dist/lib), then tailwind CSS, then tsc. Vite's `emptyOutDir: true` would wipe tsc output if tsc ran first.

- `componentSrcMap` is required — auto-detection returned 0 PascalCase symbols from the IIFE. This is because `[DTS] parsed 0 .d.ts files from /home/dieco/dev/projects/plant-faced/types` (the wrong types dir). The map overrides detection with explicit source paths.

## Product data

Product images come from Teemill (external CDN). They load correctly in preview via absolute URLs.

`ProductCard` renders only `product.price`, not `product.salePrice` — the component has no sale price display. This is by design in the current component, not a preview issue.
