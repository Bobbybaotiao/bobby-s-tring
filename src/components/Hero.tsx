import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { heroSlides } from '../data/mockData';
import { Link } from 'react-router-dom';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bobby-black/90 via-bobby-black/50 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-16">
        <div className="max-w-4xl">
          <p className="text-bobby-gold text-sm uppercase tracking-[0.3em] mb-4 fade-in">
            {heroSlides[currentIndex].subtitle}
          </p>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-8 slide-up">
            {heroSlides[currentIndex].title}
          </h2>
          <Link
            to="/collections"
            className="inline-flex items-center gap-3 bg-transparent border border-bobby-gold text-bobby-gold px-8 py-4 text-sm uppercase tracking-widest hover:bg-bobby-gold hover:text-bobby-black transition-all duration-300 slide-left"
          >
            探索系列
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <button
        onClick={goToPrevious}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:border-bobby-gold hover:text-bobby-gold transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:border-bobby-gold hover:text-bobby-gold transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-bobby-gold'
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}