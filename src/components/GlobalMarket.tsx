import { useState } from 'react';
import { MapPin } from 'lucide-react';
import { stores } from '../data/mockData';

export default function GlobalMarket() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  const countries = [
    { name: '中国', cities: stores.filter(s => s.country === '中国').length, x: '50%', y: '45%' },
    { name: '韩国', cities: stores.filter(s => s.country === '韩国').length, x: '65%', y: '35%' },
    { name: '日本', cities: stores.filter(s => s.country === '日本').length, x: '72%', y: '40%' },
    { name: '阿联酋', cities: stores.filter(s => s.country === '阿联酋').length, x: '42%', y: '55%' },
    { name: '英国', cities: stores.filter(s => s.country === '英国').length, x: '28%', y: '30%' },
  ];

  return (
    <section className="py-24 bg-bobby-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
            Global Presence
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            全球销售网络
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl mx-auto">
            Bobby Fashion 的足迹遍布全球，从东方到西方，从亚洲到欧洲，
            我们致力于为世界各地的消费者带来时尚与优雅。
          </p>
        </div>

        <div className="relative aspect-[2/1] bg-white/5 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 500">
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M150,200 Q200,180 250,200 T350,190 T450,210 T550,200 T650,180 T750,200 T850,190"
              stroke="#d4af37"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M200,250 Q300,230 400,250 T600,240 T800,250"
              stroke="#d4af37"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M250,300 Q400,280 550,300 T800,290"
              stroke="#d4af37"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />
          </svg>

          {countries.map((country) => (
            <div
              key={country.name}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: country.x, top: country.y }}
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <div className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                hoveredCountry === country.name
                  ? 'bg-bobby-gold border-bobby-gold scale-150'
                  : 'bg-transparent border-bobby-gold/60 group-hover:border-bobby-gold'
              }`} />
              <div className={`absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${
                hoveredCountry === country.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-bobby-black/90 border border-bobby-gold/30 px-4 py-2 text-center">
                  <p className="text-bobby-gold text-sm font-medium">{country.name}</p>
                  <p className="text-white/60 text-xs">{country.cities} 个城市</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-12">
          {countries.map((country) => (
            <div
              key={country.name}
              className="text-center p-6 border border-white/10 hover:border-bobby-gold/30 transition-all duration-300 cursor-pointer group"
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <MapPin className={`w-6 h-6 mx-auto mb-4 transition-colors ${
                hoveredCountry === country.name ? 'text-bobby-gold' : 'text-white/40'
              }`} />
              <p className={`text-white font-medium mb-2 transition-colors ${
                hoveredCountry === country.name ? 'text-bobby-gold' : ''
              }`}>
                {country.name}
              </p>
              <p className="text-white/50 text-sm">{country.cities} 家门店</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}