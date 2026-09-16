import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { name: '首页', path: '/' },
  { name: '当季爆款', path: '/hot-items' },
  { name: '产品系列', path: '/collections' },
  { name: '品牌故事', path: '/story' },
  { name: '联系我们', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-bobby-black/95 backdrop-blur-md py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="font-display text-2xl md:text-3xl text-gradient-gold tracking-wider">
            BOBBY
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm uppercase tracking-widest transition-all duration-300 hover:text-bobby-gold ${
                location.pathname === item.path
                  ? 'text-bobby-gold'
                  : 'text-white/80'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-white/80 hover:text-bobby-gold transition-colors">
            <ShoppingBag className="w-6 h-6" />
          </button>
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-bobby-black/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col py-6 px-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`py-4 text-sm uppercase tracking-widest border-b border-white/10 transition-colors ${
                location.pathname === item.path
                  ? 'text-bobby-gold'
                  : 'text-white/80 hover:text-bobby-gold'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}