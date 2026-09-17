import { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products, hotItems } from '../data/mockData';

// 把 products 和 hotItems 合并成统一的搜索结果结构
interface SearchResult {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  source: 'product' | 'hotItem';
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // 点击搜索框外部关闭
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // 实时搜索
  const results = useMemo<SearchResult[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const list: SearchResult[] = [];
    const seen = new Set<string>();

    // 搜全部商品
    products.forEach((p) => {
      if (seen.has(p.name)) return;
      const haystack = `${p.name} ${p.description} ${p.collection} ${p.category === 'women' ? '女装' : '配饰'}`.toLowerCase();
      if (haystack.includes(q)) {
        list.push({ id: p.id, name: p.name, price: p.price, imageUrl: p.imageUrl, source: 'product' });
        seen.add(p.name);
      }
    });

    // 搜爆款
    hotItems.forEach((h) => {
      if (seen.has(h.name)) return;
      const haystack = `${h.name} ${h.description} ${h.features.join(' ')}`.toLowerCase();
      if (haystack.includes(q)) {
        list.push({ id: h.id, name: h.name, price: h.price, imageUrl: h.imageUrl, source: 'hotItem' });
        seen.add(h.name);
      }
    });

    return list.slice(0, 8); // 最多显示 8 条
  }, [query]);

  return (
    <div className="relative" ref={containerRef}>
      {/* 搜索图标按钮 */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white/80 hover:text-bobby-gold transition-colors"
        aria-label="搜索"
      >
        <Search className="w-5 h-5" />
      </button>

      {/* 展开的搜索框 + 结果 */}
      {open && (
        <div className="absolute right-0 top-full mt-3 w-[320px] sm:w-[400px] bg-bobby-black/98 backdrop-blur-md border border-white/10 shadow-2xl">
          <div className="flex items-center border-b border-white/10 px-4">
            <Search className="w-4 h-4 text-bobby-gold shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜索商品名称、系列..."
              className="flex-1 bg-transparent px-3 py-3 text-white text-sm placeholder-white/40 focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-white/40 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 搜索结果 */}
          <div className="max-h-[400px] overflow-y-auto">
            {query.trim() === '' ? (
              <p className="px-4 py-6 text-center text-white/40 text-sm">
                输入关键词搜索商品
              </p>
            ) : results.length === 0 ? (
              <p className="px-4 py-6 text-center text-white/40 text-sm">
                没有找到「{query}」相关商品
              </p>
            ) : (
              <ul>
                {results.map((item) => (
                  <li key={`${item.source}-${item.id}`}>
                    <Link
                      to="/collections"
                      onClick={() => {
                        setOpen(false);
                        setQuery('');
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{item.name}</p>
                        <p className="text-bobby-gold text-sm">¥{item.price}</p>
                      </div>
                      {item.source === 'hotItem' && (
                        <span className="text-[10px] bg-bobby-gold/20 text-bobby-gold px-2 py-0.5 rounded">
                          爆款
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
