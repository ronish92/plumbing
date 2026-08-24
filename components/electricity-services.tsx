'use client'

import { Section } from '@/components/ui/section'
import { Grid } from '@/components/ui/grid'
import { Card2 } from '@/components/ui/card-2'
import { Heading } from '@/components/ui/heading'
import { SidebarPanel} from './renderer'
import { SidebarData } from './renderer'
import { useState } from 'react'


  const SERVICES_DETAILS: Record<string, SidebarData> = {
  "1": {
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
  "2": {
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
    "3": {
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
   "4": {
    imageSrc: "/images/leakage.jpg",
    imageAlt: "Fix all your Leakages",
    title: "Electrical Fittings",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "From small motors to industrial-grade units, we have the expertise to install and maintain them, ensuring smooth operations.",
      "Ensure uninterrupted power supply to keep your essential appliances running during power outages with our expert inverter fitting services.",
      "We specialize in the installation and maintenance of air conditioning units, guaranteeing optimal performance and energy efficiency."
    ]
  }
}

export default function ElectricityServices() {

      const [activeService, setActiveService] = useState<SidebarData | null>(null)
          const handleCardClick = (id: string) => {
        const data = SERVICES_DETAILS[id]
        if (data) {
          setActiveService(data)
        }
      }
    
  return (
    <Section className="pt-10 lg:pt-10 pb-10 bg-linear-to-b from-body to-body-light">
       <Heading as="h2" textAlign="text-center">Electricity Services</Heading>
      <Grid className='mt-10' >
        <Card2
          id="1"
          title="Electrical Setup & Rewiring"
          image="/images/e1.jpg"
          href="/hot-water"
          alt="Hot Water Installation"
          onClick={() => handleCardClick("1")}
        />
        <Card2
          id="2"
          title="Electrical Repairing & Installing"
          image="/images/e2.jpg"
          href="/water-leakage"
          alt="Fix all your Leakages"
          onClick={() => handleCardClick("3")}
        />
        <Card2
          id="3"
          title="Lighting Fitting"
          image="/images/e3.jpeg"
          href="/blockage"
          alt="See the transformation process"
          onClick={() => handleCardClick("2")}
        />
        <Card2
          id="4"
          title="Electrical Fittings"
          image="/images/e4.jpg"
          href="/burst-pipe"
          alt=" Our pipe experts"
          onClick={() => handleCardClick("4")}
        />
        {/* <Card2
          id="5"
          title="Electrical Safety Inspection"
          image="/images/e5.jpg"
          href="/gas-pipes"
          alt="Call our Gas Fitters"
        />
        <Card2
          id="6"
          title="Panel Fitting/Repairing"
          image="/images/e6.jpg"
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
