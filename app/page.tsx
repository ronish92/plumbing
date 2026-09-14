'use client'

import { useEffect } from "react";
import { InsertUserTracker } from "@/actions/tracker/user-tracker";
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"

import { SocialSection } from "@/components/social-section"
import { Footer } from "@/components/footer"
import PlumbingServices from "@/components/plumbing-services"
import Content from "@/components/contact-form"

import FAQ from "@/components/faq"
import WhyUs from "@/components/timings"

import Testimonial from "@/components/testimonials"
import PopularServices from "@/components/popular services"
import TickerBanner from "@/components/ticker_banner"

import Category from "@/components/category"
import PromoCoupon from "@/components/promo_home_display"
import ElectricityServices from "@/components/electricity-services"
import PaintingServices from "@/components/painting-services"
import Process from "@/components/process"
import ConstructionServices from "@/components/construction-services"
import PetServices from "@/components/pet_services";
import CarpentryServices from "@/components/carpentry_services";

export default function Home() {

 interface IUserTrackerRequest {
  visitorId: string
  source: string
}

   useEffect(() => {
    const key = 'visitorId';
    let visitorId = localStorage.getItem(key);

    if (!visitorId) {
      visitorId = crypto.randomUUID(); 
      localStorage.setItem(key, visitorId);
    }

    userTracker(visitorId, "localStorage");

  }, []);

  const userTracker = async (visitorId: string, source: string) => {
    const formData: IUserTrackerRequest = { visitorId: visitorId, source: source };
    const res = await InsertUserTracker(formData);
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />
      <TickerBanner />
      <PromoCoupon/>
      <Category/>
      <PlumbingServices /> 
      <ElectricityServices/>
      <PaintingServices/>
      <ConstructionServices/>
      <PetServices/>
      <CarpentryServices/>
      <PopularServices />   
      <Process/>
      < WhyUs />   
       < FAQ />  
      <SocialSection />
      <Content />  
      <Testimonial/>    
      <Footer />
      
    </main>
  )
}
