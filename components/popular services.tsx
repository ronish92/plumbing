'use client'

import { useRef } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/section'
import { services, type Service } from '@/data/service';

import { useRouter } from 'next/navigation'; 


export default function PopularServices() {
  const heading = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.min(el.clientWidth * 0.75, 360);
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

 
      const router = useRouter();

const handleCardClick = (slug: string) => {
  router.push(`/services/${slug}`);
};


  return (
    <Section className="relative mt-10 mb-45 bg-white section-padding overflow-hidden">
      <div className="relative container-max">
        {/* Heading + controls */}
        <div
          ref={heading.ref}
          className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${
            heading.isVisible ? 'is-visible' : ''
          } animate-on-scroll`}
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-navy-900">
              Popular Services
            </h2>
          </div>
          
        </div>
          <div className="relative group/carousel">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute -left-5 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-navy-200 bg-white flex items-center justify-center text-navy-600 shadow-md hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

        {/* Scrollable row */}
        <div
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service, i) => (
            <PopularCard
             key={service.title} 
             service={service}
              index={i} 
              onClick={() =>handleCardClick(service.slug)} />
          ))}
        </div>
         <button
            onClick={() => scroll('right')}
            className="absolute -right-2 top-1/3 -translate-y-1/2 z-10 w-10 h-10 rounded-full border border-navy-200 bg-white items-center justify-center text-navy-600 shadow-md hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        </div>

        {/* Mobile hint */}
        <div className="md:hidden flex items-center justify-center gap-2 mt-2 text-navy-400 text-sm">
          <ChevronLeft className="w-4 h-4" />
          Swipe to browse
          <ChevronRight className="w-4 h-4" />
        </div>

    
    </Section>
  );
}



function PopularCard({
  service,
  index,
  onClick
}: {
  service: Service;
  index: number;
  onClick: () => void;
}) {
  const card = useScrollAnimation(0.1);

  return (
    <a

      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      ref={card.ref as any}
      className={`group shrink-0 w-65 md:w-70 snap-start block ${
        card.isVisible ? 'is-visible' : ''
      } animate-on-scroll-scale`}
      style={{ transitionDelay: `${(index % 4) * 0.08}s` }}
    >
      <div className="h-full flex flex-col">
        {/* Image */}
        <div className="overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-48 object-cover rounded-xl transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <div className="px-1.5 pt-3 flex flex-col flex-1">
          {/* Title */}
          <h3
            title={service.title}
            className="font-semibold text-navy-900 text-[15px] line-clamp-1 break-all"
          >
            {service.title}
          </h3>

          {/* Provider + rating */}
          <div className="flex items-center justify-between gap-2 text-xs mb-1 mt-1">
            <span className="text-navy-500 capitalize line-clamp-1 break-all group-hover:text-primary-600 transition-colors">
              {service.provider}
            </span>
            <div className="flex items-center gap-1 whitespace-nowrap text-sm">
              <Star className="w-4 h-4 -mt-0.5 text-yellow-300 fill-yellow-300" />
              <span>
                <span className="font-semibold text-navy-900">{service.rating.toFixed(1)}</span>{' '}
                <span className="text-navy-400">({service.reviews})</span>
              </span>
            </div>
          </div>

          {/* Price */}
          <p className="text-lime font-semibold mb-2">{service.price}</p>

          {/* Description */}
          <p className="line-clamp-2 text-sm text-navy-500 leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
    </a>
  );
}
