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
                欧蜜儿创立于2009年，源自对时尚的热爱与追求。我们相信，
                真正的时尚不仅仅是外表的华丽，更是内在气质的彰显。
              </p>
              <p className="leading-relaxed">
                17年来，我们扎根广州万佳批发市场2街，从选材到剪裁，从细节到整体，
                始终坚持高标准、严要求，只为呈现最完美的时尚体验。
              </p>
              <p className="leading-relaxed">
                欧蜜儿专注品质女装，以实在的价格和贴心的服务，
                赢得了一批又一批顾客的信赖与回头。
              </p>
            </div>
            <div className="mt-10 flex items-center gap-8">
              <div>
                <p className="font-display text-4xl text-bobby-gold">17年</p>
                <p className="text-white/50 text-sm">品牌沉淀</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-display text-4xl text-bobby-gold">10000+</p>
                <p className="text-white/50 text-sm">累计顾客</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div>
                <p className="font-display text-4xl text-bobby-gold">98%</p>
                <p className="text-white/50 text-sm">好评回头率</p>
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