import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/mockData';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
              New Arrivals
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white">
              当季新品
            </h2>
          </div>
          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-bobby-gold hover:text-bobby-gold transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 flex items-center justify-center border border-white/20 text-white hover:border-bobby-gold hover:text-bobby-gold transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.slice(0, 6).map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-72 snap-center"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}