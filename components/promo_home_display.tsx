'use client'

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Tag, Copy, Check, Clock, Sparkles } from 'lucide-react';

const perks = [
  'Valid for first-time customers',
  'Applies to any service over $100',
  'No expiration on emergency calls',
];

export default function PromoCoupon() {
  const section = useScrollAnimation();
  const [copied, setCopied] = useState(false);

  const code = 'ARIANA@20';

  const copyCode = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative bg-background section-padding overflow-hidden mb-10">
      <div className="relative container-max">
        <div
          ref={section.ref}
          className={`relative mx-auto max-w-7xl ${
            section.isVisible ? 'is-visible' : ''
          } animate-on-scroll-scale`}
        >
          {/* Coupon card */}
          <div className="relative rounded-3xl bg-navy-900 overflow-hidden shadow-2xl shadow-navy-900/30">
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://static.vecteezy.com/system/resources/thumbnails/081/713/084/small_2x/plumber-with-tool-belt-on-street-photo.jpg')`,
              }}
            />
            <div className="absolute inset-0 bg-linear-to-r from-navy-900/95 via-navy-900/85 to-navy-900/70" />
            <div className="absolute inset-0 bg-orange-900/50 mix-blend-multiply" />

            {/* Decorative */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-accent-500/15 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.05]" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
              backgroundSize: '28px 28px',
            }} />

            {/* Perforated edges */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12 items-center">
              {/* Left - Offer */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent-500/20 text-white text-xs font-semibold mb-5">
                
                  LIMITED TIME OFFER
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl md:text-7xl font-display font-bold text-white leading-none">
                    20%
                  </span>
                  <span className="text-2xl font-bold text-white">OFF</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Your First Service
                </h3>
                <p className="text-white text-sm leading-relaxed mb-6 max-w-xs">
                  New customer? Save 20% on your first booking — plumbing,
                  electrical, repairs, and more.
                </p>

                {/* Perks */}
                <ul className="space-y-2">
                  {perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-2 text-white text-xs">
                      <Check className="w-4 h-4 text-white shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right - Code */}
              <div className="md:border-l md:border-dashed md:border-white md:pl-8">
                <div className="flex items-center gap-2 text-white text-sm mb-4">
                  <Tag className="w-4 h-4" />
                  Use code at checkout
                </div>

                {/* Code box */}
                <button
                  onClick={copyCode}
                  className="group w-full flex items-center justify-between gap-3 px-5 py-4 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/30 hover:border-accent-400 hover:bg-white/15 transition-all duration-300"
                >
                  <span className="text-2xl md:text-3xl font-display font-bold tracking-[0.15em] text-white">
                    {code}
                  </span>
                  <span className="flex items-center gap-1.5 text-accent-300 text-sm font-semibold">
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 transition-transform group-hover:scale-110" />
                        Copy
                      </>
                    )}
                  </span>
                </button>

                {/* Expiry */}
                <div className="flex items-center gap-2 mt-4 text-white text-xs">
                  <Clock className="w-4 h-4 text-white" />
                  Expires Dec 31, 2026
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="group mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent-500 text-white font-semibold rounded-xl hover:bg-accent-600 transition-all duration-300 shadow-lg shadow-accent-500/25 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5"
                >
                  Claim Offer
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
