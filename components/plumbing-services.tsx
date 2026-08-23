'use client'

import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarData } from './renderer'
import { useState } from 'react'
import { SidebarPanel} from './renderer'


  const SERVICES_DETAILS: Record<string, SidebarData> = {
  "1": {
    imageSrc: "/images/hot.jpg",
    imageAlt: "Hot Water Installation details",
    title: "Hot Water",
    subtitle: "Do you have issues with your hot water unit or need an upgrade?",
    listItems: [
      "Complete diagnostic evaluations for gas and electrical models.",
      "Emergency hot water pressure valve replacements.",
      "Professional guidance on energy-efficient system upgrades."
    ]
  },
  "2": {
    imageSrc: "/images/leakage.jpg",
    imageAlt: "Fix all your Leakages",
    title: "Water Leakage",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "It's a mystery. Sometimes it's a build of matters like oils, hair or food scraps, sometimes it's poor pipe configuration or a split causing soil to seep in.",
      "People often swear Soap Water, soda with vinegar or plungers works best but they aren't always effective.",
      "Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals."
    ]
  }
}

export default function PlumbingServices() {



    const [activeService, setActiveService] = useState<SidebarData | null>(null)
      const handleCardClick = (id: string) => {
    const data = SERVICES_DETAILS[id]
    if (data) {
      setActiveService(data)
    }
  }

  return (
    <Section className="pt-20 lg:pt-20 pb-10 bg-linear-to-b from-body to-body-light">
       <Heading as="h2" textAlign="text-center">Plumbing Services</Heading>
      <Grid className='mt-10'>
        <Card2
          id="1"
          title="Hot Water"
          image="/images/hot.jpg"
          href="/hot-water"
          alt="Hot Water Installation"
          onClick={() => handleCardClick("1")}
        />
        <Card2
          id="2"
          title="Water Leakage"
          image="/images/leakage.jpg"
          href="/water-leakage"
          alt="Fix all your Leakages"
          onClick={() => handleCardClick("2")}
        />
        {/* <Card2
          id="3"
          title=" Clear Blockages"
          image="/images/blockage.png"
          href="/blockage"
          alt="See the transformation process"
        />
        <Card2
          id="4"
          title="Burst Pipes"
          image="/images/burst.jpg"
          href="/burst-pipe"
          alt=" Our pipe experts"
        />
        <Card2
          id="5"
          title="Gas fitting"
          image="/images/gaspipe.png"
          href="/gas-pipes"
          alt="Call our Gas Fitters"
        />
        <Card2
          id="6"
          title="Toilet Repairs"
          image="/images/toilet.jpg"
          href="/toilet-repairs"
          alt="Toilet repairs"
        /> */}
      </Grid>
      <SidebarPanel 
        isOpen={!!activeService}
        onClose={() => setActiveService(null)}
        data={activeService}
      />
    </Section>
  )
}
