import { timelineEvents } from '../data/mockData';

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block" />

      {timelineEvents.map((event, index) => (
        <div
          key={event.year}
          className={`relative flex flex-col md:flex-row items-center gap-8 mb-16 ${
            index % 2 === 0 ? 'md:flex-row-reverse' : ''
          }`}
        >
          <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
            <p className="font-display text-5xl text-bobby-gold mb-4">{event.year}</p>
            <h3 className="font-display text-2xl text-white mb-4">{event.title}</h3>
            <p className="text-white/60 leading-relaxed">{event.description}</p>
          </div>

          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 hidden md:block">
            <div className="w-6 h-6 rounded-full border-2 border-bobby-gold bg-bobby-black" />
          </div>

          <div className="w-full md:w-1/2" />
        </div>
      ))}
    </div>
  );
}