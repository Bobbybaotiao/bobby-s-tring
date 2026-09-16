import { Link } from 'react-router-dom';

export default function BrandStory() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative">
              <img
                src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20designer%20studio%20elegant%20minimalist%20workspace%20creative&image_size=portrait_4_3"
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-bobby-gold/30" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-bobby-gold/10" />
            </div>
          </div>

          <div>
            <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
              Our Story
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
              匠心独运
              <br />
              <span className="text-gradient-gold">引领时尚</span>
            </h2>
            <div className="space-y-6 text-white/70">
              <p className="leading-relaxed">
                Bobby Fashion 创立于2015年，源自对时尚的热爱与追求。我们相信，
                真正的时尚不仅仅是外表的华丽，更是内在气质的彰显。
              </p>
              <p className="leading-relaxed">
                每一件作品都凝聚着设计师的心血与灵感，从选材到剪裁，从细节到整体，
                我们始终坚持高标准、严要求，只为呈现最完美的时尚体验。
              </p>
              <p className="leading-relaxed">
                如今，Bobby Fashion已成为享誉全球的时尚品牌，
                销售网络覆盖中国所有城市以及韩国、西亚等地，
                为全球消费者带来精致优雅的服饰选择。
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-display text-4xl text-bobby-gold">50+</p>
                <p className="text-white/50 text-sm">全球城市</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-display text-4xl text-bobby-gold">500K+</p>
                <p className="text-white/50 text-sm">忠实顾客</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-display text-4xl text-bobby-gold">50+</p>
                <p className="text-white/50 text-sm">设计奖项</p>
              </div>
            </div>
            <Link
              to="/story"
              className="inline-block mt-10 text-bobby-gold text-sm uppercase tracking-widest border-b border-bobby-gold pb-2 hover:pb-4 transition-all duration-300"
            >
              了解更多
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}