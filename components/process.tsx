'use client'

import { useScrollAnimation } from '../hooks/use-scroll-animation';
import { PhoneCall, Search, Wrench, Shield, Puzzle, ThumbsUp } from 'lucide-react';
import { Heading } from './ui/heading';

const steps = [
  {
    icon: PhoneCall,
    step: '01',
    title: 'Call or Book Online',
    description: 'Reach us by phone or fill out our form. We respond within 1 hour during business hours.',
  },
  {
    icon: Shield,
    step: '02', 
    title: 'Confirm Order',
    description: 'Our experts will call you to verify details within an hour or so.',
  },
  {
    icon: Search,
    step: '03', 
    title: 'Diagnosis & Quote',
    description: 'Our technician inspects the issue and provides a transparent, upfront quote before any work begins.',
  },
  {
    icon: Puzzle,
    step: '04', 
    title: 'Expert Repair',
    description: 'Skilled professionals resolve your issues with care and meticulous attention to detail.',
  },
  {
    icon: ThumbsUp,
    step: '05', // Fixed: Was duplicate '04'
    title: 'Quality Guaranteed',
    description: 'We clean up after ourselves and back all work with our satisfaction guarantee and warranty.',
  },
];

export default function Process() {
  const heading = useScrollAnimation();
  const grid = useScrollAnimation();

  return (
    <section className="relative bg-white section-padding max-w-7xl mx-auto mt-10 mb-40 px-4">
      {/* Top linear border decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-navy-100 to-transparent" />
      
      <div className="relative container-max">
        {/* Heading Area */}
        <div 
          ref={heading.ref} 
          className={`text-center max-w-2xl mx-auto mb-16 animate-on-scroll ${
            heading.isVisible ? 'is-visible' : ''
          }`}
        >
    
    <Heading as="h3" textAlign="text-center">
            How We Work
          </Heading>
          <Heading as="h2" textAlign="text-center" className="text-4xl md:text-5xl font-display font-bold text-navy-900">
            Simple <span className="text-primary-600">5-Step</span> Process
          </Heading>
        </div>

        {/* Steps Grid */}
        <div 
          ref={grid.ref} 
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-5 ${
            grid.isVisible ? 'is-visible' : ''
          }`}
        >
          {steps.map((step, i) => (
            <ProcessStep key={step.step} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const card = useScrollAnimation(0.1);
  const IconComponent = step.icon;

  return (
    <div 
      ref={card.ref} 
      style={{ animationDelay: `${index * 100}ms` }} // Safe way to execute staggers without breaking Tailwind JIT
      className={`relative text-center group animate-on-scroll ${
        card.isVisible ? 'is-visible' : ''
      }`}
    >
      {/* Connector lines (Hidden on last item, only shows on large screens) */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute top-12 left-[70%] w-[60%] h-px border-t-2 border-dashed border-navy-200 z-0" />
      )}

      {/* Icon Frame */}
      <div className="relative mx-auto w-24 h-24 mb-6 z-10">
        <div className="absolute inset-0 rounded-2xl bg-primary-50 group-hover:bg-primary-100 transition-colors duration-300 rotate-3 group-hover:rotate-6" />
        <div className="relative w-full h-full rounded-2xl bg-white border border-navy-100 group-hover:border-primary-200 group-hover:shadow-lg group-hover:shadow-primary-500/5 transition-all duration-300 flex items-center justify-center">
          <IconComponent className="w-10 h-10 text-primary-600" />
        </div>
        
        {/* Step Badge */}
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-orange-500 text-white text-xs font-bold flex items-center justify-center shadow-md select-none">
          {step.step}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-navy-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
        {step.title}
      </h3>
      <p className="text-navy-500 text-sm leading-relaxed max-w-xs mx-auto">
        {step.description}
      </p>
    </div>
  );
}
