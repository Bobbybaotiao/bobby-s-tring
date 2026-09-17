import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CustomFieldsDisplay from '../components/CustomFieldsDisplay';
import { products, categories } from '../data/mockData';

export default function CollectionsPage() {
  // 当前选中的大类 id；null = 大类总览页
  const [activeId, setActiveId] = useState<string | null>(null);

  // 切换视图时回到页面顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeId]);

  const activeCategory = categories.find((c) => c.id === activeId) || null;
  const activeProducts = activeCategory
    ? products.filter((p) => p.categoryId === activeCategory.id)
    : [];

  // 商品里引用了但大类列表里没有的（例如大类被删了），归到「未分类」
  const knownIds = new Set(categories.map((c) => c.id));
  const uncategorized = products.filter((p) => !knownIds.has(p.categoryId));

  const countOf = (id: string) => products.filter((p) => p.categoryId === id).length;

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
            欧蜜儿专注品质女装，点击下方分类查看具体款式
          </p>
        </div>

        {activeCategory ? (
          /* ---------- 某个大类下的款式列表 ---------- */
          <div>
            <button
              onClick={() => setActiveId(null)}
              className="inline-flex items-center gap-2 text-white/60 hover:text-bobby-gold transition-colors text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              返回全部分类
            </button>

            <div className="mb-10">
              <h2 className="font-display text-3xl md:text-4xl text-white">
                {activeCategory.name}
              </h2>
              {activeCategory.description && (
                <p className="text-white/50 text-sm mt-3">
                  {activeCategory.description}
                </p>
              )}
              <p className="text-white/40 text-xs mt-2">
                共 {activeProducts.length} 件款式
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {activeProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/50">该分类暂无款式，新品正在准备中</p>
              </div>
            )}
          </div>
        ) : (
          /* ---------- 大类总览：可点击的分类卡片 ---------- */
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveId(category.id)}
                  className="group relative text-left bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bobby-black/90 via-bobby-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-display text-2xl text-white mb-2 group-hover:text-bobby-gold transition-colors">
                        {category.name}
                      </h3>
                      {category.description && (
                        <p className="text-white/60 text-sm line-clamp-2 mb-3">
                          {category.description}
                        </p>
                      )}
                      <span className="inline-flex items-center gap-2 text-bobby-gold text-xs uppercase tracking-widest">
                        {countOf(category.id)} 件款式
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* 未分类商品（大类被删除时商品不会丢，会显示在这里） */}
            {uncategorized.length > 0 && (
              <div className="mt-20">
                <h2 className="font-display text-2xl text-white mb-8">其他款式</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {uncategorized.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {categories.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/50">暂无分类，请在后台添加商品大类</p>
              </div>
            )}
          </div>
        )}

        <CustomFieldsDisplay section="products" />
      </div>
    </main>
  );
}
