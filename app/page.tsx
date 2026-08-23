import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"
import PlumbingServices from "@/components/plumbing-services"
import Content from "@/components/contact-form"

import FAQ from "@/components/faq"
import WhyUs from "@/components/timings"
import Application from "@/components/join-us"
import Testimonial from "@/components/testimonials"
import PopularServices from "@/components/popular services"
import TickerBanner from "@/components/ticker_banner"
// import ElectricityServices from "@/components/electricity-services"
import Category from "@/components/category"
import PromoCoupon from "@/components/promo_home_display"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      <TickerBanner />
      <PromoCoupon/>
      <Category/>
      <PlumbingServices /> 
    
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
