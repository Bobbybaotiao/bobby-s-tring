import Timeline from '../components/Timeline';

export default function StoryPage() {
  return (
    <main className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
            Our Story
          </p>
          <h1 className="font-display text-4xl md:text-6xl text-white mb-6">
            品牌故事
          </h1>
          <p className="text-white/60 max-w-2xl mx-auto leading-relaxed">
            Bobby Fashion 的旅程始于2015年，源于对时尚的热爱与追求。
            我们相信，真正的时尚是一种生活态度，是对美的不懈追求。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          <div className="text-center p-8 border border-white/10">
            <p className="font-display text-5xl text-bobby-gold mb-4">01</p>
            <h3 className="font-display text-xl text-white mb-4">设计理念</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              融合东方美学与西方设计，创造独特的时尚风格
            </p>
          </div>
          <div className="text-center p-8 border border-white/10">
            <p className="font-display text-5xl text-bobby-gold mb-4">02</p>
            <h3 className="font-display text-xl text-white mb-4">品质承诺</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              精选顶级面料，精湛工艺，只为呈现最完美的品质
            </p>
          </div>
          <div className="text-center p-8 border border-white/10">
            <p className="font-display text-5xl text-bobby-gold mb-4">03</p>
            <h3 className="font-display text-xl text-white mb-4">全球视野</h3>
            <p className="text-white/60 text-sm leading-relaxed">
              立足中国，面向世界，打造国际化时尚品牌
            </p>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="font-display text-3xl text-white mb-12 text-center">
            发展历程
          </h2>
          <Timeline />
        </div>

        <div className="relative">
          <div className="aspect-[21/9] relative overflow-hidden">
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fashion%20runway%20show%20elegant%20models%20professional%20lighting%20luxury%20brand&image_size=landscape_16_9"
              alt="Fashion Show"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bobby-black/80 via-transparent to-bobby-black/80" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
                Future Vision
              </p>
              <h2 className="font-display text-4xl md:text-5xl text-white mb-6">
                展望未来
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                我们将继续创新，引领时尚潮流，为全球消费者带来更多惊喜
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}