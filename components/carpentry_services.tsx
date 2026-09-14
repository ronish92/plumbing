'use client'
import { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarData, SidebarPanel } from './renderer'
import { motion } from "framer-motion"

const SERVICES_DETAILS: (SidebarData & { href: string; cardImage: string })[] = [
  {
    id: 1,
    title: "Furniture Repair & Alignment",
    subtitle: "Fix squeaky hinges, broken drawers, and sagging sofas instantly",
    cardImage: "/images/f1.jpeg",
    imageSrc: "/images/furniture-fix.jpg",
    imageAlt: "On-site furniture repair services",
    href: "/furniture-repair",
    listItems: [
      "Our mobile carpenters from services like Carpenter Adda bring the workshop directly to your doorstep in Dadhikot.",
      "Quick adjustments for misaligned wardrobe doors, broken hydraulic hinges, and unstable bed frames.",
      "Specialized repairs for office chairs and structural sofa restoration right inside your living room."
    ]
  },
  {
    id: 2,
    title: "Modular Kitchen & Wardrobes",
    subtitle: "Premium custom woodwork tailored perfectly to your space",
    cardImage: "/images/f2.jpg",
    imageSrc: "/images/woodwork-design.jpg",
    imageAlt: "Custom modular kitchen installation",
    href: "/modular-kitchen-wardrobes",
    listItems: [
      "Expert design and installation using top-quality A-grade plywood and premium waterproof laminates.",
      "Full customization options matching the professional finishing standards of Keshar And Son’s Furniture.",
      "Maximize your storage with sleek, modern layouts built precisely to your room's measurements."
    ]
  },
  {
    id: 3,
    title: "Emergency Handyman Carpentry",
    subtitle: "Fast response for urgent household wooden fixture fixes",
    cardImage: "/images/f3.jpg",
    imageSrc: "/images/quick-fix.jpg",
    imageAlt: "Emergency property carpentry maintenance",
    href: "/emergency-handyman",
    listItems: [
      "Reliable emergency response from local platforms like Quick Fix for immediate property maintenance.",
      "Prompt handling of jammed main doors, broken window frames, latch replacements, and lock installations.",
      "Neat, punctual, and safe execution by verified multi-service technicians covering the entire valley."
    ]
  },
  {
    id: 4,
    title: "Local Workshop Crafting",
    subtitle: "Convenient custom wood building right in your neighborhood",
    cardImage: "/images/f4.png",
    imageSrc: "/images/thimi-carpentry.jpg",
    imageAlt: "Traditional and modern carpentry fabrication",
    href: "/local-workshop-crafting",
    listItems: [
      "Access nearby carpentry expertise close to the Thimi-Biruwa area for rapid project turnarounds.",
      "Traditional and modern furniture fabrication using highly durable local and imported timber.",
      "Cost-effective solution where large items are crafted in-shop and delivered completely assembled to your home."
    ]
  }
];


export default function CarpentryServices() {
  const [activeService, setActiveService] = useState<typeof SERVICES_DETAILS[number] | null>(null)
  const [isPaused, setIsPaused] = useState(false)


  const duplicatedServices = [...SERVICES_DETAILS, ...SERVICES_DETAILS]

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light overflow-hidden">
      <Heading as="h2" textAlign="text-center">Carpentry Services</Heading>
      
      {/* Outer track wrapper */}
      <div className="relative mt-10 w-full overflow-hidden flex mask-image:[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
        
        <motion.div
          className="flex gap-6 pr-6 min-w-max flex-nowrap"
          animate={isPaused ? "paused" : "animate"}
          variants={{
            animate: {
              x: [0, "-50%"],
              transition: {
                ease: "linear",
                duration: 40, 
                repeat: Infinity,
              }
            },
            paused: {} 
          }}
          // Reliable state handlers for cross-platform hovering
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {duplicatedServices.map((service, index) => (
            <div key={`${service.id}-${index}`} className="w-75 sm:w-87.5 shrink-0">
              <Card2
                id={String(service.id)}
                title={service.title}
                image={service.cardImage}
                alt={service.imageAlt}
                href={service.href}
                onClick={() => setActiveService(service)}
              />
            </div>
          ))}
        </motion.div>

      </div>

      <SidebarPanel isOpen={!!activeService} onClose={() => setActiveService(null)} data={activeService} />
    </Section>
  )
}