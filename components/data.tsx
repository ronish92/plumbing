'use client'

import { useState } from 'react'
import { SidebarPanel, SidebarData } from './renderer'

// 1. Central array representing all your dynamic structural entries
const SERVICES_DATA: SidebarData[] = [
  {
    imageSrc: "/images/blockage.png",
    imageAlt: "Hot Water System Blockage View",
    title: "We will get to the bottom of your Blockage",
    subtitle: "Do you have that one bathroom that always smells vaguely like a sewer even after it’s been scrubbed or that one outlet takes an age to drain?",
    listItems: [
      "It's a mystery. Sometimes it's a build of matters like oils, hair or food scraps, sometimes it's poor pipe configuration or a split causing soil to seep in.",
      "People often swear Soap Water, soda with vinegar or plungers works best but they aren't always effective.",
      "Avoiding drain blockages is important to your wallet and your health in the long term. Enlist the services of our professionals."
    ]
  },
  {
    imageSrc: "/images/hotwater.png",
    imageAlt: "Hot water leak repairs",
    title: "Hot Water System Maintenance",
    subtitle: "No hot water running in the morning? We diagnose electrical, gas, or pipe scaling failures swiftly.",
    listItems: [
      "Testing heating elements and thermostat parameters safely.",
      "Flushing storage drums to prevent rust scale compound build-ups.",
      "Immediate emergency valve switch-outs whenever leaks arise."
    ]
  }
]

export default function ServicesGrid() {
  // Track which item is currently clicked/active
  const [activePanelData, setActivePanelData] = useState<SidebarData | null>(null)

  return (
    <div className="p-8">
      {/* Cards/Images Layout UI Grid Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SERVICES_DATA.map((service, index) => (
          <div 
            key={index} 
            onClick={() => setActivePanelData(service)} // Opens panel with clicked data
            className="border p-4 rounded-xl cursor-pointer hover:shadow-lg transition"
          >
            <img src={service.imageSrc} alt={service.imageAlt} className="w-16 h-16 object-cover" />
            <h3 className="font-bold mt-2">{service.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{service.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Single Sidebar instance monitoring active hook state structure declarations */}
      <SidebarPanel 
        isOpen={!!activePanelData}
        onClose={() => setActivePanelData(null)}
        data={activePanelData}
      />
    </div>
  )
}
