import { Navigation } from "@/components/navigation"

import { Footer } from "@/components/footer"

import Team from "@/components/meet-the-team"
import ServiceDetails from "@/components/service-description"


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <ServiceDetails />
      <Team />
     
      <Footer />
    </main>
  )
}
