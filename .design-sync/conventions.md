# Plant Faced — Design System Conventions

## Wrapping and setup

Components that read cart state (`CartButton`, `CartSidebar`, `CartFeedback`, `CartItem`, `Header`) require `CartProvider`. Components that use routing (`Header`, `Footer`, `Nav`) require a router. Use `PreviewProvider` (exported from the bundle) to wrap both in one shot:

```jsx
import { PreviewProvider, ProductCard } from 'plant-faced';

<PreviewProvider>
  <ProductCard product={product} />
</PreviewProvider>
```

`CartSidebar` is fixed-positioned and slides in from the right. To display it in a constrained area, wrap its parent in `style={{ transform: 'translateZ(0)', overflow: 'hidden' }}` — this makes `fixed` positioning relative to the wrapper.

## Styling idiom

This is a **Tailwind CSS** system. Style with utility classes; no hand-authored CSS needed. The bundle's compiled stylesheet ships all classes the components use.

**Brand color utilities** (verified in `_ds_bundle.css`):

| Token class | Hex | Used for |
|---|---|---|
| `bg-primary` / `text-primary` | `#B85C38` | Nav links, header accent, footer background, product titles, CTA buttons |
| `bg-secondary` / `text-secondary` | `#F2E4D4` | Hero CTA background (cream pill), hover/accent tints |

**Typography:**
- `font-sans` — body text (`'Segoe UI', system-ui, sans-serif`)
- `font-urbanist` — display/hero text (`Urbanist, serif` — falls back to serif if Urbanist isn't loaded)

**Layout helpers** (available in compiled CSS):
- `h-header` / `scroll-mt-header` — 100px header height constant
- `animate-fade-in-up` — hero entry animation (fadeIn + translateY)
- `animate-slide-in` — cart sidebar slide animation

For new layout glue, use standard Tailwind: `flex`, `grid`, `gap-*`, `p-*`, `rounded-xl`, `shadow-*`.

## Where the truth lives

- **Styles**: `styles.css` (imports `_ds_bundle.css` — all component Tailwind utilities are compiled there)
- **Props API**: each component's `.d.ts` file in `components/<group>/<Name>/<Name>.d.ts`
- **Usage docs**: each `components/<group>/<Name>/<Name>.prompt.md`

## Idiomatic usage

```jsx
import { PreviewProvider, ProductCard } from 'plant-faced';

const product = {
  id: 1,
  name: "Seitan's Finest - White Boxy Tee",
  urlName: 'seitans-finest-white-crop-top',
  description: '100% organic cotton tee.',
  image: 'https://example.com/tee.jpg',
  price: 28,
  salePrice: 0,
  colors: ['White'],
  colorThumbnails: { White: { type: 'color', value: '#ffffff' } },
  sizes: ['S', 'M', 'L'],
  reviews: { rating: 4.6, count: 34 },
  category: 'Camisetas',
  // ... other required Product fields
};

<PreviewProvider>
  <div className="max-w-[300px]">
    <ProductCard product={product} />
  </div>
</PreviewProvider>
```

`ProductCatalog` manages its own search, filter, and pagination state — pass the full `products` array and it handles the rest:
```jsx
<PreviewProvider>
  <ProductCatalog products={products} />
</PreviewProvider>
```
