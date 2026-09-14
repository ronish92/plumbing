'use client'
import { useState } from 'react'
import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarData, SidebarPanel } from './renderer'

const SERVICES_DETAILS: (SidebarData & { href: string; cardImage: string })[] = [
  {
    id: 1,
    title: "Vaccinations",
    subtitle: "Don’t hesitate, vaccinate. It's super important",
    cardImage: "/images/p1.jpeg",
    imageSrc: "/images/hot.jpg",
    imageAlt: "Interior Painting details",
    href: "/interior-painting",
    listItems: [
      "Protecting your pet from serious illness is an important part of their overall health. ",
      "Vaccinations help prepare your pet's immune system to recognise and respond to specific infectious diseases.",
      "We’ll help keep them up to date with the right vaccinations and support you with what they need at every stage of life."
    ]
  },
  {
    id: 2,
    title: "HealthCheck 360",
    subtitle: "Pets can't tell us when something doesn't feel right",
    cardImage: "/images/p2.jpeg",
    imageSrc: "/images/leakage.jpg",
    imageAlt: "Exterior Painting details",
    href: "/exterior-painting",
    listItems: [
      "Comprehensive health assessment tailored to your pet's life stage and lifestyle to help spot hidden conditions early.",
      "We also give you personalised advice to support your pet's health at every stage of life.",
      "Checks include a longer, more thorough nose-to-tail physical examination, urine analysis, and blood tests."
    ]
  }
]

export default function PetServices() {
  const [activeService, setActiveService] = useState<SidebarData | null>(null)

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light">
      <Heading as="h2" textAlign="text-center">Pet Services</Heading>
      <Grid className="mt-10">
        {SERVICES_DETAILS.map((service) => (
          <Card2
            key={service.id}
            id={String(service.id)}
            title={service.title}
            image={service.cardImage}
            alt={service.imageAlt}
            href={service.href}
            onClick={() => setActiveService(service)}
          />
        ))}
      </Grid>
      <SidebarPanel isOpen={!!activeService} onClose={() => setActiveService(null)} data={activeService} />
    </Section>
  )
}
