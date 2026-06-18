import { CATEGORIES } from '@/lib/products';

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
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
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
        aria-label="Filtrar por categoría"
        className="
          flex-1 min-w-[250px]
          px-3 py-[0.8rem]
          border border-[#ddd] rounded-lg
          text-base
          bg-white
        "
      >
        <option value="all">Todas las categorías</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
