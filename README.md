# Plant Faced - Minimalist Clothing Store

Plant Faced is a minimalist landing page for a clothing store, showcasing technical skills and attention to detail. The project includes an interactive product catalog, a functional shopping cart, and a fully responsive design.

## Main Features
- **Product Catalog**: Dynamic filtering, debounced search, and windowed pagination.
- **Shopping Cart**: Client-side cart with localStorage persistence.
- **Responsive Design**: Mobile-first, adaptable to all devices.
- **Accessibility**: Keyboard navigation and screen reader support.
- **Optimization**: WebP images, lazy loading, and CSS animations.

## Technologies Used
- **Framework**: React + Vite + TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library
- **Tools**: Git, ESLint, Prettier
- **Hosting**: TBA

## Project Structure
```
src/              Vite entrypoint, app shell, global styles
components/       React components (header, hero, catalog, cart, footer)
lib/              Cart context, product loader, catalog utilities
types/            TypeScript types (Product, CartItem)
public/           Static assets (products.json, images)
```

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/diecoscai/plant-faced.git
   cd plant-faced
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Credits
Design and development: Diego Costa.

Icons: Font Awesome.

Email: diecoscai@gmail.com

GitHub: @diecoscai
