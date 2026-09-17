import { useState } from 'react';
import CategoryNav from '../components/CategoryNav';
import ProductCard from '../components/ProductCard';
import CustomFieldsDisplay from '../components/CustomFieldsDisplay';
import { products } from '../data/mockData';
import type { Product } from '../data/mockData';

type Category = 'women' | 'accessories';

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('women');

  const filteredProducts: Product[] = products.filter(
    (product) => product.category === activeCategory
  );

  const categoryNames = {
    women: '女装系列',
    accessories: '配饰系列',
  };

  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
            Collections
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white">
            产品系列
          </h1>
          <p className="text-white/60 mt-6 max-w-2xl mx-auto">
            探索我们精心设计的时尚单品，每一件都彰显独特风格与品质
          </p>
        </div>

        <div className="flex justify-center mb-16">
          <CategoryNav
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className="mb-8">
          <h2 className="font-display text-2xl text-white">
            {categoryNames[activeCategory]}
          </h2>
          <p className="text-white/50 text-sm mt-2">
            共 {filteredProducts.length} 件商品
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/50">暂无商品</p>
          </div>
        )}

        <CustomFieldsDisplay section="products" />
      </div>
    </main>
  );
}