import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"


import Blockage from "@/components/blockage"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Blockage/>     
      <Footer />
     
    </main>
  )
}
