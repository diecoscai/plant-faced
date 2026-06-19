import { CATEGORIES } from '@/lib/products';

const CATEGORY_LABELS: Record<string, string> = {
  Camisetas: 'T-Shirts',
  Buzos: 'Hoodies',
  Musculosas: 'Tank Tops',
};

interface FiltersProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function Filters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: FiltersProps) {
  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="
          flex-1 min-w-[250px]
          px-3 py-[0.8rem]
          border border-[#ddd] rounded-lg
          text-base
        "
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        aria-label="Filter by category"
        className="
          flex-1 min-w-[250px]
          px-3 py-[0.8rem]
          border border-[#ddd] rounded-lg
          text-base
          bg-white
        "
      >
        <option value="all">All categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {CATEGORY_LABELS[cat] ?? cat}
          </option>
        ))}
      </select>
    </div>
  );
}
