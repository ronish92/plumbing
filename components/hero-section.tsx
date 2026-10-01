"use client"

import { motion, type Variants } from "framer-motion"
import * as React from "react"

import Search from "./search"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

const textVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

 

const CAROUSEL_IMAGES = [
  {
    src: "/images/home.jpeg",
    alt: "SR Plumbing Services - Main",
  },
  {
    src: "/images/home2.png",
    alt: "SR Plumbing Services - Emergency",
  },
  {
    src: "/images/home3.avif",
    alt: "SR Plumbing Services - Commercial",
  },
  {
    src: "/images/home4.png",
    alt: "SR Plumbing Services - Building",
  },
]

export function HeroSection() {
  const autoplayPlugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  )
  return (
    <section
      id="hero"
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white noise-overlay"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-[#AFFF00]/5 to-white" />

      <div className="relative z-10 mx-auto w-full max-w-350 px-6 pt-24 md:px-12 lg:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr] lg:gap-0">

          {/* Text Content */}
          <div className="space-y-5">
            <div className="space-y-1 overflow-hidden">
              <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="text-5xl font-black tracking-tighter text-[#121212] leading-[0.9] md:text-7xl"
              >
                SMART HOME
              </motion.h1>

              <motion.h1
                variants={textVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.1 }}
                className="text-6xl font-black tracking-tighter text-orange-400 leading-[0.9] md:text-7xl"
              >
                SERVICES
              </motion.h1>

              <p className="max-w-2xl pt-2 text-lg tracking-tight text-[#121212]/60 md:text-xl">
                We are a licensed, insured home services company offering
                reliable repairs, installations, and maintenance. Zero stress.
                Courteous professionals. Clean service that stands apart.
              </p>
            </div>

            <Search />
          </div>

          {/* Carousel */}
          <div
  className="relative ml-0 flex h-[400px] w-full max-w-[600px] items-center justify-end lg:ml-5 lg:h-full"
  style={{
    maskImage: "radial-gradient(circle, black 60%, transparent 100%)",
    WebkitMaskImage: "radial-gradient(circle, black 60%, transparent 100%)",
  }}
>
  <Carousel
    opts={{ align: "center", loop: true, axis: "y" }}
    plugins={[autoplayPlugin.current as any]}
    className="h-[400px] w-full"
  >
    <CarouselContent className="h-full">
      {CAROUSEL_IMAGES.map((image, index) => (
        <CarouselItem
          key={index}
          className="flex h-full basis-full items-center justify-center"
        >
          <div className="relative h-full w-full">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
    height={400}
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-contain drop-shadow-2xl"
              priority={index === 0}
            />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>
</div>
        </div>
      </div>
    </section>
  )
}