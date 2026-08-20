import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import GasFitting from "@/components/gas-fitting"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <GasFitting/>     
      <Footer />
     
    </main>
  )
}
