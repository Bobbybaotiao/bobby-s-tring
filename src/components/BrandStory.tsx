import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { homeStory } from '../data/mockData';

export default function BrandStory() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative">
              <img
                src={homeStory.image}
                alt="Brand Story"
                className="w-full h-full object-cover"
              />
              <div className="absolute -bottom-8 -right-8 w-64 h-64 border border-bobby-gold/30" />
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-bobby-gold/10" />
            </div>
          </div>

          <div>
            <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4">
              {homeStory.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-white mb-8">
              {homeStory.titleLine1}
              <br />
              <span className="text-gradient-gold">{homeStory.titleLine2}</span>
            </h2>
            <div className="space-y-6 text-white/70">
              {homeStory.paragraphs.map((paragraph, index) => (
                <p key={index} className="leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-10 flex items-center gap-8">
              {homeStory.stats.map((stat, index) => (
                <Fragment key={index}>
                  {index > 0 && <div className="w-px h-12 bg-white/20" />}
                  <div>
                    <p className="font-display text-4xl text-bobby-gold">{stat.value}</p>
                    <p className="text-white/50 text-sm">{stat.label}</p>
                  </div>
                </Fragment>
              ))}
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
