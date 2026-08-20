import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import HotWater from "@/components/hot-water"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HotWater/>     
      <Footer />
     
    </main>
  )
}
