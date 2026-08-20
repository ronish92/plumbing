import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"
import Services from "@/components/highlights"
import Content from "@/components/contact-form"

import FAQ from "@/components/faq"
import WhyUs from "@/components/timings"
import Application from "@/components/join-us"
import Testimonial from "@/components/testimonials"
import PopularServices from "@/components/popular services"
import TickerBanner from "@/components/ticker_banner"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      <TickerBanner />
      <Services /> 
      <PopularServices />   
      < WhyUs />   
       < FAQ />  
      <SocialSection />
      <Content />  
      <Testimonial/>    
      <Footer />
      
    </main>
  )
}
