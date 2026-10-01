"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

export type MenuState = "full" | "collapsed" | "hidden"

interface SidebarContextValue {
  menuState: MenuState
  toggleMenuState: () => void
  isHovered: boolean
  setIsHovered: (h: boolean) => void
  isMobile: boolean
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (o: boolean) => void
}

const SidebarContext = createContext<SidebarContextValue | null>(null)

const LG_BREAKPOINT = 1024

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [menuState, setMenuState] = useState<MenuState>("full")
  const [previousDesktopState, setPreviousDesktopState] = useState<MenuState>("full")
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMenuState = useCallback(() => {
    setMenuState((prev) => {
      if (prev === "full") return "collapsed"
      if (prev === "collapsed") return "hidden"
      return "full"
    })
  }, [])

  // Responsive: track mobile, preserve desktop state when crossing the breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < LG_BREAKPOINT
      setIsMobile(mobile)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle desktop <-> mobile state transitions
  useEffect(() => {
    if (isMobile) {
      // Save desktop state, hide the sidebar on mobile
      setMenuState((prev) => {
        if (prev !== "hidden") {
          setPreviousDesktopState(prev)
          return "hidden"
        }
        return prev
      })
    } else {
      // Restore previous desktop state
      setMenuState((prev) => {
        if (prev === "hidden" && previousDesktopState !== "hidden") {
          return previousDesktopState
        }
        return prev
      })
    }
  }, [isMobile]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SidebarContext.Provider
      value={{
        menuState,
        toggleMenuState,
        isHovered,
        setIsHovered,
        isMobile,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const ctx = useContext(SidebarContext)
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider")
  return ctx
}