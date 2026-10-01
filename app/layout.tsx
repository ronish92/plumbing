import type React from "react"
import type { Metadata, Viewport } from "next"
import { Toaster } from "@/components/ui/toaster" 

import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"
import QueryProvider from "@/components/query-provider"



export const metadata: Metadata = {
  title: "Smart House Solutions | Dream Big, Full Solutions",
  description: "Home Experts at your door.",
  keywords: ["plumbing", "expert", "solutions", "reliable", "leaks", "construction", "painting", "electricity", "lighting" ],
    generator: 'evocode.projects'
}

export const viewport: Viewport = {
  themeColor: "#AFFF00",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <QueryProvider>
        <ClickSpark
          sparkColor="#ffc800"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          
          <LenisProvider>{children}</LenisProvider>
          <Toaster/>
        </ClickSpark>
        </QueryProvider>

      </body>
    </html>
  )
}
