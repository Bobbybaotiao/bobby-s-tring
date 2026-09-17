import { MapPin, Clock, Phone, MessageCircle } from 'lucide-react';
import { stores, siteConfig } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function GlobalMarket() {
  const store = stores[0];

  return (
    <section className="py-24 bg-bobby-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
            Our Store
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            门店地址
          </h2>
          <p className="text-white/60 mt-6 max-w-2xl mx-auto">
            {siteConfig.storeIntro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-white/10">
          {/* 左侧：装饰地图区域 */}
          <div className="relative min-h-[360px] bg-white/5 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 400">
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#d4af37" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M50,100 Q150,80 250,120 T500,110"
                stroke="#d4af37"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M80,200 Q200,180 320,210 T550,200"
                stroke="#d4af37"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
              />
              <path
                d="M60,300 Q180,280 300,310 T540,290"
                stroke="#d4af37"
                strokeWidth="0.5"
                fill="none"
                opacity="0.3"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-bobby-gold border-2 border-bobby-gold animate-ping absolute" />
                <MapPin className="w-16 h-16 text-bobby-gold" />
              </div>
            </div>
          </div>

          {/* 右侧：门店信息 */}
          <div className="p-10 lg:p-14 flex flex-col justify-center">
            <h3 className="font-display text-2xl md:text-3xl text-white mb-6">
              {store.name}
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-bobby-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-sm mb-1">门店地址</p>
                  <p className="text-white">{store.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-bobby-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-sm mb-1">营业时间</p>
                  <p className="text-white">{siteConfig.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-5 h-5 text-bobby-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-sm mb-1">联系电话</p>
                  <a href={`tel:${siteConfig.phone}`} className="text-white hover:text-bobby-gold transition-colors">
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="w-5 h-5 text-bobby-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/50 text-sm mb-1">微信咨询</p>
                  <p className="text-white">{siteConfig.wechat}</p>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="inline-block mt-10 text-bobby-gold text-sm uppercase tracking-widest border-b border-bobby-gold pb-2 hover:pb-4 transition-all duration-300 self-start"
            >
              联系我们
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
