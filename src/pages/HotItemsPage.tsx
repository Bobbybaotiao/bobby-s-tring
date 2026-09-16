import { useState } from 'react';
import { Flame, ShoppingBag, Heart, Share2, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HotItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  badge: string;
  features: string[];
  soldCount: number;
  rating: number;
}

const hotItems: HotItem[] = [
  {
    id: '1',
    name: '经典风衣外套',
    description: '精选优质面料，剪裁利落，经典风衣版型，适合多种场合穿着。细节考究，彰显品质生活。',
    price: 450,
    originalPrice: 680,
    imageUrl: '/clothes/item1.jpg',
    badge: '人气爆款',
    features: ['优质面料', '经典版型', '多色可选', '四季可穿'],
    soldCount: 1280,
    rating: 4.9,
  },
  {
    id: '2',
    name: '优雅针织衫',
    description: '柔软舒适的针织面料，简约设计风格，修饰身形，百搭单品，轻松搭配各种造型。',
    price: 500,
    originalPrice: 750,
    imageUrl: '/clothes/item2.jpg',
    badge: '热销TOP1',
    features: ['柔软亲肤', '修身剪裁', '百搭单品', '透气舒适'],
    soldCount: 2156,
    rating: 4.8,
  },
  {
    id: '3',
    name: '时尚休闲套装',
    description: '一套搞定日常穿搭，面料挺括有型，休闲与时尚的完美结合，街头潮流必备之选。',
    price: 550,
    originalPrice: 820,
    imageUrl: '/clothes/item3.jpg',
    badge: '限量发售',
    features: ['套装组合', '挺括有型', '潮流设计', '舒适自在'],
    soldCount: 893,
    rating: 4.7,
  },
];

export default function HotItemsPage() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const toggleLike = (id: string) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const addToCart = (id: string) => {
    setAddedItems((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 2000);
  };

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Flame className="w-5 h-5 text-bobby-gold" />
            <p className="text-bobby-gold text-sm uppercase tracking-[0.3em]">
              Hot Items
            </p>
            <Flame className="w-5 h-5 text-bobby-gold" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6">
            当季爆款
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            精选本季最受欢迎的单品，每一件都是时尚与品质的完美结合，限时特惠，不容错过
          </p>
        </div>

        {/* 爆款商品展示 */}
        <div className="space-y-12">
          {hotItems.map((item, index) => (
            <div
              key={item.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-12 items-center bg-white/5 border border-white/10 hover:border-bobby-gold/20 transition-all duration-500 p-6 lg:p-10`}
            >
              {/* 商品图片 */}
              <div className="w-full lg:w-1/2 relative group">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-bobby-gold text-bobby-black px-4 py-2 text-xs uppercase tracking-widest font-medium">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* 商品信息 */}
              <div className="w-full lg:w-1/2">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-bobby-gold text-sm">{'★'.repeat(Math.floor(item.rating))}</span>
                  <span className="text-white/50 text-sm">{item.rating}分</span>
                  <span className="text-white/30">|</span>
                  <span className="text-white/50 text-sm">已售 {item.soldCount}+件</span>
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                  {item.name}
                </h2>

                <p className="text-white/60 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* 特点标签 */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {item.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1 border border-white/20 text-white/70 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* 价格区域 */}
                <div className="flex items-end gap-4 mb-8">
                  <span className="font-display text-4xl text-bobby-gold">
                    ¥{item.price}
                  </span>
                  <span className="text-white/40 text-lg line-through mb-1">
                    ¥{item.originalPrice}
                  </span>
                  <span className="bg-bobby-wine/20 text-bobby-gold px-3 py-1 text-sm mb-1">
                    省¥{item.originalPrice - item.price}
                  </span>
                </div>

                {/* 操作按钮 */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => addToCart(item.id)}
                    disabled={addedItems.has(item.id)}
                    className={`flex items-center justify-center gap-2 px-8 py-4 text-sm uppercase tracking-widest transition-all duration-300 ${
                      addedItems.has(item.id)
                        ? 'bg-bobby-green text-white cursor-default'
                        : 'bg-bobby-gold text-bobby-black hover:bg-bobby-gold/90'
                    }`}
                  >
                    {addedItems.has(item.id) ? (
                      <>
                        <Check className="w-5 h-5" />
                        已加入购物车
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-5 h-5" />
                        立即购买
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => toggleLike(item.id)}
                    className={`flex items-center justify-center gap-2 px-6 py-4 border text-sm uppercase tracking-widest transition-all duration-300 ${
                      likedItems.has(item.id)
                        ? 'border-bobby-wine text-bobby-wine bg-bobby-wine/10'
                        : 'border-white/20 text-white/70 hover:border-bobby-gold hover:text-bobby-gold'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedItems.has(item.id) ? 'fill-current' : ''}`}
                    />
                    {likedItems.has(item.id) ? '已收藏' : '收藏'}
                  </button>
                  <button className="flex items-center justify-center gap-2 px-6 py-4 border border-white/20 text-white/70 hover:border-bobby-gold hover:text-bobby-gold text-sm uppercase tracking-widest transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                    分享
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部引导 */}
        <div className="mt-20 text-center border-t border-white/10 pt-16">
          <p className="text-white/60 mb-6">更多精彩单品等您探索</p>
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-bobby-gold text-sm uppercase tracking-widest border-b border-bobby-gold pb-2 hover:pb-4 transition-all duration-300"
          >
            查看全部产品系列
          </Link>
        </div>
      </div>
    </main>
  );
}