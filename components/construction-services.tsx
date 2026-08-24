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
    title: "Tile/Marble Installation",
    subtitle: "Calm, clean interiors finished with care",
    cardImage: "/images/c1.jpg",
    imageSrc: "/images/hot.jpg",
    imageAlt: "Interior Painting details",
    href: "/interior-painting",
    listItems: [
      "Painting for homes, flats, rooms and offices—with protection, preparation and a clearly written scope.",
      "We inspect loose coating, cracks, uneven putty, moisture signs and previous paint before recommending preparation.",
      "Professional guidance on energy-efficient system upgrades."
    ]
  },
  {
    id: 2,
    title: "Wall Construction",
    subtitle: "Weather-ready colour that protects the building.",
    cardImage: "/images/c2.jpeg",
    imageSrc: "/images/leakage.jpg",
    imageAlt: "Exterior Painting details",
    href: "/exterior-painting",
    listItems: [
      "Exterior painting designed around wall condition, access, rain exposure, sun and the correct coating system.",
      "Good work begins with cleaning, loose-paint removal, crack assessment and a compatible primer.",
      "Avoiding drain blockages is important to your wallet and your health in the long term."
    ]
  },
    {
    id: 3,
    title: "Plaster Works",
    subtitle: "Weather-ready colour that protects the building.",
    cardImage: "/images/c3.jpg",
    imageSrc: "/images/leakage.jpg",
    imageAlt: "Exterior Painting details",
    href: "/exterior-painting",
    listItems: [
      "Exterior painting designed around wall condition, access, rain exposure, sun and the correct coating system.",
      "Good work begins with cleaning, loose-paint removal, crack assessment and a compatible primer.",
      "Avoiding drain blockages is important to your wallet and your health in the long term."
    ]
  }
]

export default function ConstructionServices() {
  const [activeService, setActiveService] = useState<SidebarData | null>(null)

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light">
      <Heading as="h2" textAlign="text-center">Construction Services</Heading>
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
