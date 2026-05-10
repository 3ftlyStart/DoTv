import { PARTNERS } from '../constants';

export default function Partners() {
  return (
    <section className="py-20 border-y border-white/5 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-center text-sm font-medium text-white/40 mb-12 uppercase tracking-[0.2em]">
          All your favorites in one place
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0">
          {PARTNERS.map((partner) => (
            <img
              key={partner.id}
              src={partner.logo}
              alt={partner.name}
              className="h-8 md:h-10 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
