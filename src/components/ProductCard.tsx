import { useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../data/mockData';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      key: `product-${product.id}-${product.name}`,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group relative bg-white/5 hover:bg-white/10 transition-all duration-500 overflow-hidden">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bobby-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <button
          onClick={handleAdd}
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 flex items-center gap-2 ${
            added ? 'bg-white text-bobby-black' : 'bg-bobby-gold text-bobby-black hover:bg-bobby-gold/90'
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              已加入购物车
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              加入购物车
            </>
          )}
        </button>
      </div>
      <div className="p-6">
        <p className="text-white/50 text-xs uppercase tracking-widest mb-2">
          {product.collection}
        </p>
        <h3 className="font-display text-lg text-white mb-2 group-hover:text-bobby-gold transition-colors">
          {product.name}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        <p className="text-bobby-gold font-medium">
          ¥{product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
