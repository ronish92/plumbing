import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"




import ToiletRepairs from "@/components/toilet-repair"
import BookServiceCard from "@/components/book_service_card"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ToiletRepairs/>     
      < BookServiceCard/>
      <Footer />
     
    </main>
  )
}
