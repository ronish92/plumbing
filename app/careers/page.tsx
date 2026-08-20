import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Application from "@/components/join-us"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <Application />
      <Footer />
    </main>
  )
}
