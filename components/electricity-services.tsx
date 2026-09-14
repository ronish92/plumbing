'use client'

import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarPanel} from './renderer'
import { SidebarData } from './renderer'
import { useState } from 'react'
import { motion } from "framer-motion"

//  & { href: string; cardImage: string }

  const SERVICES_DETAILS: (SidebarData)[] = [
  {
    id: 1,
    imageSrc: "/images/e1.jpg",
    imageAlt: "Hot Water Installation details",
    title: "Electrical Setup & Rewiring",
    subtitle: "Do you have issues with your hot water unit or need an upgrade?",
    listItems: [
      "Whether it is a new electrical setup or replacing it, our men know what’s right and will offer you the best possible solution.",
      "Whether you need an emergency repair or you are upgrading your home looking for new line installations, we can help.",
      "Professional guidance on energy-efficient system upgrades."
    ]
  },
  { id: 2,
    imageSrc: "/images/e3.jpeg",
    imageAlt: "Fix all your Leakages",
    title: "Let there be light",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "We are known for the best in town for light decorative services that go hassle free with our trained professionals at work.",
      "We provide decorative light fitting services customized to your needs for your house, restaurant, bars and other business.",
      "Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals."
    ]
  },
    {
      id: 3,
    imageSrc: "/images/e5.jpg",
    imageAlt: "Fix all your Leakages",
    title: "Safety Inspection",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "You can trust us for a review from a professional to ensure that your electrical circuits and equipment are not overloaded and poised for a potential problem.",
      "We provide decorative light fitting services customized to your needs for your house, restaurant, bars and other business.",
      "Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals."
    ]
  },
   {
    id: 4,
    imageSrc: "/images/e4.jpg",
    imageAlt: "Fix all your Leakages",
    title: "Electrical Fittings",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "From small motors to industrial-grade units, we have the expertise to install and maintain them, ensuring smooth operations.",
      "Ensure uninterrupted power supply to keep your essential appliances running during power outages with our expert inverter fitting services.",
      "We specialize in the installation and maintenance of air conditioning units, guaranteeing optimal performance and energy efficiency."
    ]
  }

  ];

export default function ElectricityServices() {
  const [activeService, setActiveService] = useState<typeof SERVICES_DETAILS[number] | null>(null)
  const [isPaused, setIsPaused] = useState(false)


  const duplicatedServices = [...SERVICES_DETAILS, ...SERVICES_DETAILS]

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light overflow-hidden">
      <Heading as="h2" textAlign="text-center">Electricity Services</Heading>
      
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