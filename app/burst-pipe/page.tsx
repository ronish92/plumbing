import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"



import BurstPipes from "@/components/burst-pipes"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <BurstPipes/>     
      <Footer />
     
    </main>
  )
}
