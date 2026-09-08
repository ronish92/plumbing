"use client"

import { motion, useScroll, useTransform, useSpring, type Variants } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

import Search from "./search"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.8,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}



const CAROUSEL_IMAGES = [
  { src: "/images/home.jpeg", alt: "SR Plumbing Services - Main" },
  { src: "/images/home2.png", alt: "SR Plumbing Services - Emergency" },
  { src: "/images/home3.avif", alt: "SR Plumbing Services - Commercial" },
  { src: "/images/home4.png", alt: "SR Plumbing Services - building" },
]



export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const rawY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useSpring(rawY, springConfig)

  const rawTextX1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const textX1 = useSpring(rawTextX1, springConfig)

  const rawTextX2 = useTransform(scrollYProgress, [0, 1], [0, 100])
  const textX2 = useSpring(rawTextX2, springConfig)

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white noise-overlay"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-white via-[#AFFF00]/5 to-white" />

      <motion.div
        className="absolute top-20 left-10 w-24 h-24 rounded-full bg-[#AFFF00]/20 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-32 h-32 rounded-full bg-[#AFFF00]/10 blur-3xl"
        animate={{
          x: [0, -40, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative z-10 mx-auto w-full max-w-350 px-6 md:px-12 lg:px-16 pt-24 ">
        <div className="grid lg:grid-cols-[1fr_0.9fr] gap-0 items-center">

          {/* Text Content */}
          <div className="space-y-5">
            <div className="space-y-1 overflow-hidden">
              <motion.h1
                style={{ x: textX1 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                  className="inline-block"
                >
                  SMART HOME
                </motion.span>
              </motion.h1>
              <motion.h1
                style={{ x: textX2 }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-[#121212] leading-[0.9]"
              >
                <motion.span
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                  className="inline-block text-orange-400"
                >
                  SERVICES
                </motion.span>
              </motion.h1>
              <p className="text-lg md:text-xl  text-[#121212]/60 tracking-tight pt-2 max-w-2xl">
                We are a licensed, insured home services company offering reliable repairs, installations, and maintenance. Zero stress. Courteous professionals. Clean service that stands apart.
              </p>
            </div>

            <Search/>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative flex justify-end ml-5 w-full max-w-[600px]"
            style={{ 
              maskImage: 'radial-gradient(circle, black 60%, transparent 100%)', 
              WebkitMaskImage: 'radial-gradient(circle, black 60%, transparent 100%)' 
            }}
          >
             <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              plugins={[
                Autoplay({
                  delay: 4000,
                  stopOnInteraction: false,
                }),
              ]}
              className="w-full"
            >
              <CarouselContent>
                {CAROUSEL_IMAGES.map((image, index) => (
                  <CarouselItem key={index} className="basis-full">
                    <div className="flex items-center justify-center">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={600}
                        height={500}
                        className="relative z-10 drop-shadow-2xl object-cover rounded-lg"
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