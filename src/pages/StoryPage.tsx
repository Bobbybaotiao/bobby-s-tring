import Timeline from '../components/Timeline';
import { storyPage } from '../data/mockData';

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
          {storyPage.intro.map((paragraph, index) => (
            <p key={index} className="text-white/60 max-w-2xl mx-auto leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
          {storyPage.values.map((value, index) => (
            <div key={index} className="text-center p-8 border border-white/10">
              <p className="font-display text-5xl text-bobby-gold mb-4">
                {String(index + 1).padStart(2, '0')}
              </p>
              <h3 className="font-display text-xl text-white mb-4">{value.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{value.text}</p>
            </div>
          ))}
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
              src={storyPage.futureImage}
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
                {storyPage.futureTitle}
              </h2>
              <p className="text-white/70 max-w-2xl mx-auto">
                {storyPage.futureText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
