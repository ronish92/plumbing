"use client"

import type { ReactNode } from "react"
import Sidebar from "./siderbar"
import TopNav from "./top-nav"
import { SidebarProvider, useSidebar } from "@/components/sidebar-context"

interface LayoutProps {
  children: ReactNode
}

function LayoutInner({ children }: LayoutProps) {
  const { menuState, isHovered, isMobile } = useSidebar()

  const getMarginLeft = () => {
    if (isMobile) return "0"
    if (menuState === "hidden") return "0"
    if (menuState === "collapsed" && isHovered) return "16rem"
    if (menuState === "collapsed") return "4rem"
    return "16rem"
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div
        className="w-full flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0"
        style={{ marginLeft: getMarginLeft() }}
      >
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] shrink-0">
          <TopNav />
        </header>
        <main className="flex-1 overflow-auto p-3 sm:p-6 bg-white dark:bg-[#0F0F12] min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <LayoutInner>{children}</LayoutInner>
    </SidebarProvider>
  )
}