import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

import WaterLeakage from "@/components/water-leakage"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <WaterLeakage/>     
      <Footer />
     
    </main>
  )
}
