'use client'

import { useRef, useEffect, useState } from 'react'
import clsx from 'clsx'
import xMarkIcon from '@iconify/icons-lucide/x-square'
import { Icon } from '@/components/ui/icon'
import { Columns, Column } from '@/components/ui/columns'
import { Image } from '@/components/ui/image'
import { Heading } from '@/components/ui/heading'
import { Paragraph } from '@/components/ui/paragraph'
import { List, Li } from '@/components/ui/list'


export interface SidebarData {
  id: number
  imageSrc: string
  imageAlt: string
  title: string
  subtitle: string
  listItems: string[]
}

interface SidebarPanelProps {
  isOpen: boolean
  onClose: () => void
  data: SidebarData | null
}

export function SidebarPanel({ isOpen, onClose, data }: SidebarPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Sync animation state smoothly when opened/closed
  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true))
      document.body.style.overflow = 'hidden' // Lock body scroll
    } else {
      setIsVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  // Close panel on pressing Escape key
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !data) return null

  return (
    <>
      {/* Backdrop blur layer */}
      <div
        className={clsx(
          'fixed inset-0 z-50 bg-black/40 backdrop-blur-md transition-opacity duration-300',
          isVisible ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-over Main Container */}
      <div
        className={clsx(
          'fixed inset-y-0 right-0 z-50 flex flex-col w-full bg-white/90 shadow-2xl',
          'max-w-[90%] md:max-w-[70%] lg:max-w-[55%] xl:max-w-140',
          'transition-transform duration-300 ease-out',
          isVisible ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div ref={panelRef} className="h-full flex flex-col overflow-y-auto scrollbar-hide">
          
          {/* Header Bar */}
          <div className="sticky top-0 z-10 bg-body/95 backdrop-blur-sm border-b border-body-dark">
            <div className="flex items-center justify-between px-4 md:px-8 py-4">
              <h2 className="text-lg font-semibold text-contrast truncate">
                {data.title}
              </h2>
              <button
                type="button"
                className="rounded-full h-10 w-10 flex items-center justify-center cursor-pointer hover:bg-body-light transition-colors shrink-0"
                onClick={onClose}
                aria-label="Close details"
              >
                <Icon icon={xMarkIcon} className="h-5 w-5 text-contrast-light" />
              </button>
            </div>
          </div>

          {/* Dynamic Inner Content Layout */}
          {/* Dynamic Inner Content */}
<div className="px-4 md:px-8 py-8 md:py-10">
  <div className="mx-auto max-w-2xl">


    {/* Image */}
    <div className="flex justify-center">
      
      <Image
        src={data.imageSrc}
        alt={data.imageAlt}
        className="w-full max-w-45 rounded-xl object-cover"
        size="large"
        width={250}
        height={250}
      />
    </div>

    {/* Title + Subtitle */}
    <div className="mt-6 text-center">
      

      <Paragraph className="mx-auto mt-3 max-w-xl">
        {data.subtitle}
      </Paragraph>
    </div>

    {/* List */}
    <div className="mt-8 border-t border-gray-100 pt-6">
      <List className="space-y-3">
        {data.listItems.map((item, idx) => (
          <Li key={idx}>
            {item}
          </Li>
        ))}
      </List>
    </div>

  </div>
</div>
          
        </div>
      </div>
    </>
  )
}
