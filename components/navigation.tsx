"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useLenis } from "lenis/react"
import { Menu, X } from "lucide-react"
import { Logo } from '@/components/ui/logo'



export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  const navLinks = [
    { label: "Home", href: "/" },

    { label: "Packages", href: "/packages" },
    { label: "About-Us", href: "/about-us" },
    { label: "Careers", href: "/careers" },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-orange-400/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Logo
        
          width={80}
          height={50}
        />

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className={`group relative text-sm font-medium tracking-wide transition-colors ${scrolled
                    ? "text-white/80 hover:text-black"
                    : "text-[#121212]/80 hover:text-orange-500"
                  }`}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
className={`hidden md:block text-[#121212] px-6 py-2.5 rounded-full font-bold text-sm tracking-wide relative overflow-hidden ${
  scrolled 
    ? "bg-white backdrop-blur-md border-b border-bg-orange-400  hover:bg-lime" 
    : "bg-orange-400 hover:bg-lime"
}`}

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        > 
          <Link className="relative z-10"
            href={"/login"}
          >Sign in</Link>
        </motion.button>

        <motion.button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {mobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className={scrolled ? "text-white" : "text-[#121212]"} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden bg-coconut backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((item, i) => (
                <motion.button
                  key={item.label}
                  
                  className="block w-full text-left text-black hover:text-[#AFFF00] text-lg font-medium py-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >

                    <Link
                href={item.href}
                className={`group relative text-sm font-medium tracking-wide transition-colors ${scrolled
                    ? "text-white/80 hover:text-[#AFFF00]"
                    : "text-[#121212]/80 hover:text-[#121212]"
                  }`}
              ></Link>
                  {item.label}
                </motion.button>
              ))}
              <motion.button
                className="w-full bg-[#AFFF00] text-[#121212] px-6 py-3 rounded-full font-bold text-sm tracking-wide mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Get 25% Off
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
