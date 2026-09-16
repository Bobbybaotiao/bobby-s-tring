import { MessageCircle, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = {
  products: [
    { name: '当季爆款', path: '/hot-items' },
    { name: '女装系列', path: '/collections?category=women' },
    { name: '配饰系列', path: '/collections?category=accessories' },
  ],
  about: [
    { name: '品牌故事', path: '/story' },
    { name: '设计团队', path: '/story' },
    { name: '新闻动态', path: '/story' },
    { name: '合作伙伴', path: '/contact' },
  ],
  support: [
    { name: '门店查询', path: '/contact' },
    { name: '尺码指南', path: '#' },
    { name: '退换政策', path: '#' },
    { name: '联系客服', path: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-bobby-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <h2 className="font-display text-3xl text-gradient-gold tracking-wider mb-6">
              欧蜜儿
            </h2>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              扎根广州17年的时尚女装品牌，专注品质女装，用心服务每一位顾客。
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MessageCircle className="w-4 h-4 text-bobby-gold" />
                微信：ACY829
              </div>
              <a
                href="tel:17373353281"
                className="flex items-center gap-3 text-white/60 hover:text-bobby-gold transition-colors text-sm"
              >
                <Phone className="w-4 h-4 text-bobby-gold" />
                　17373353281
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-bobby-gold" />
                广州万佳批发市场2街
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-6">
              产品系列
            </h3>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-bobby-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-6">
              关于我们
            </h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-bobby-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm uppercase tracking-widest mb-6">
              客户服务
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/60 hover:text-bobby-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">
            2026 欧蜜儿. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-bobby-gold transition-colors text-xs">
              隐私政策
            </a>
            <a href="#" className="text-white/40 hover:text-bobby-gold transition-colors text-xs">
              使用条款
            </a>
            <a href="#" className="text-white/40 hover:text-bobby-gold transition-colors text-xs">
              Cookie设置
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
