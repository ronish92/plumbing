'use client'

import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarData } from './renderer'
import { useState } from 'react'
import { SidebarPanel } from './renderer'
import { motion } from "framer-motion"


const SERVICES_DETAILS: (SidebarData)[] = [
  {
    id: 1,
    imageSrc: "/images/hot.jpg",
    imageAlt: "Hot Water Installation details",
    title: "Hot Water",
    subtitle: "Have you ever had to take a cold shower? It's not fun for the rest of us",
    listItems: [
      "Repairing a water heater typically entails replacing broken or old-fashioned parts of the appliance like heating element, thermostat, pressure relief valve, amongst others.",
      "Remember to turn off the unit's power before beginning any repairs when performing water heater maintenance.",
      "Proper installation with our experts will ensure that your water heater runs efficiently, so you won’t waste money on unnecessarily high energy bills."
    ]
  },
  {
    id: 2,
    imageSrc: "/images/blockage.png",
    imageAlt: "Fix all your Leakages",
    title: "Blockage",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "It's a mystery. Sometimes it's a build of matters like oils, hair or food scraps, sometimes it's poor pipe configuration or a split causing soil to seep in.",
      "People often swear Soap Water, soda with vinegar or plungers works best but they aren't always effective.",
      "Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals."
    ]
  },
  {
    id: 3,
    imageSrc: "/images/burst.jpg",
    imageAlt: "Fix all your Leakages",
    title: "Burst Pipe",
    subtitle: "A burst pipe doesn't always announce itself with a flood in your living room.",
    listItems: [
      "The main culprits are freezing temperatures, excessive water pressure, and the natural aging of your plumbing system.",
      "If you’re dealing with a minor leak or a small split in a pipe, using putty, repair tape or tying it with rubber can be a lifesaver but these are just first-aids.",
      "While that can-do spirit is admirable, do it yourself can accidentally make a bad situation much worse. Call a professional."
    ]
  },

  {
    id: 4,
    imageSrc: "/images/toilet.jpg",
    imageAlt: "toilet",
    title: "Toilet Repairs",
    subtitle: "Don't let a faulty toilet ruin your day.",
    listItems: [
      "Our verified and experienced plumbers diagnose the issue and restore your toilet to full functionality quickly and safely for you home or your business.",
      "Same-day service is available in most areas for urgent plumbing problems to ensure your conveinvce, safety and health.",
    "We also handle complete bathroom plumbing, from pipelining to fresh installations of new water-saving dual-flush commode systems"
    ]
  },

  {
    id: 5,
    imageSrc: "/images/gaspipe.png",
    imageAlt: "gaspipe",
    title: "Gas Fitting",
    subtitle: "Certified LPG fitting. Powering your home and commercial kitchen.",
    listItems: [
      "Your infrastructure requires absolute precision. We handle everything from seamless dual-cylinder changeover systems to continuous-flow hot water setups, keeping your operations uninterrupted and your household comfortable.",
      "We maximize efficiency by optimizing your cylinder regulators, gas pipes, and appliance connections for steady gas pressure.",
    "Every project concludes with rigorous pressure testing to guarantee total safety."
    ]
  },

  {
    id: 5,
    imageSrc: "/images/leakage.jpg",
    imageAlt: "leakage",
    title: "Water Leakage",
    subtitle: " Your building might be telling you it's time for waterproofing. Know the signs and call for Solutions.",
    listItems: [
      "Waterproofing at the right time helps prevent water leakage from the walls and protects the building’s structure and integrity.",
      "Common causes of leaking pipes include corrosion, joint failure, pressure fluctuations, and physical damage.",
    "A leaking pipe can be repaired using methods such as external sealing, clamps, or internal isolation, depending on the size and location of the leak. We'll find the effective solution for you."
    ]
  }

]

export default function PlumbingServices() {
  const [activeService, setActiveService] = useState<typeof SERVICES_DETAILS[number] | null>(null)
  const [isPaused, setIsPaused] = useState(false)


  const duplicatedServices = [...SERVICES_DETAILS, ...SERVICES_DETAILS]

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light overflow-hidden">
      <Heading as="h2" textAlign="text-center">Plumbing Services</Heading>
      
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
                image={service.imageSrc}
                alt={service.imageAlt}
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