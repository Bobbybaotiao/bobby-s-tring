import { Link } from 'react-router-dom';
import { Flame, ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import BrandStory from '../components/BrandStory';
import FeaturedProducts from '../components/FeaturedProducts';
import GlobalMarket from '../components/GlobalMarket';

const hotItems = [
  { id: '1', name: '经典风衣外套', price: 450, image: `${import.meta.env.BASE_URL}clothes/item1.jpg`, badge: '人气爆款' },
  { id: '2', name: '优雅针织衫', price: 500, image: `${import.meta.env.BASE_URL}clothes/item2.jpg`, badge: '热销TOP1' },
  { id: '3', name: '时尚休闲套装', price: 550, image: `${import.meta.env.BASE_URL}clothes/item3.jpg`, badge: '限量发售' },
];

export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* 当季爆款入口 */}
      <section className="py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Flame className="w-5 h-5 text-bobby-gold" />
                <p className="text-bobby-gold text-sm uppercase tracking-[0.3em]">
                  Hot Items
                </p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl text-white">
                当季爆款
              </h2>
            </div>
            <Link
              to="/hot-items"
              className="inline-flex items-center gap-2 text-bobby-gold text-sm uppercase tracking-widest border-b border-bobby-gold pb-2 hover:pb-4 transition-all duration-300 mt-6 md:mt-0"
            >
              查看全部
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotItems.map((item) => (
              <Link
                key={item.id}
                to="/hot-items"
                className="group relative bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden"
              >
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-bobby-gold text-bobby-black px-3 py-1 text-xs uppercase tracking-widest font-medium">
                      {item.badge}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-bobby-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg text-white mb-2 group-hover:text-bobby-gold transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-bobby-gold font-medium">
                    ¥{item.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandStory />
      <FeaturedProducts />
      <GlobalMarket />
    </main>
  );
}