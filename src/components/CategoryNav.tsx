import { useState } from 'react';
import { Shirt, Briefcase, Watch } from 'lucide-react';

type Category = 'women' | 'men' | 'accessories';

interface CategoryNavProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories = [
  { id: 'women' as Category, name: '女装', icon: Shirt },
  { id: 'men' as Category, name: '男装', icon: Briefcase },
  { id: 'accessories' as Category, name: '配饰', icon: Watch },
];

export default function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);

  return (
    <nav className="flex flex-col md:flex-row gap-4 md:gap-8">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.id;
        const isHovered = hoveredCategory === category.id;

        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
            className={`flex flex-col md:flex-row items-center gap-2 md:gap-3 px-6 py-4 transition-all duration-300 border ${
              isActive
                ? 'border-bobby-gold bg-bobby-gold/10'
                : 'border-white/10 hover:border-white/30'
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-colors ${
                isActive || isHovered ? 'text-bobby-gold' : 'text-white/60'
              }`}
            />
            <span
              className={`text-sm uppercase tracking-widest transition-colors ${
                isActive || isHovered ? 'text-bobby-gold' : 'text-white/70'
              }`}
            >
              {category.name}
            </span>
            {isActive && (
              <span className="w-1 h-1 bg-bobby-gold rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}