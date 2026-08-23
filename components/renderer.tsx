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

// Define the exact data shape your sidebar needs to receive
export interface SidebarData {
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
          'max-w-[86%] md:max-w-[77%] lg:max-w-[67%] xl:max-w-[700px]',
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
          <div className="px-4 md:px-8 py-10">
            <Columns gap="gap-6 lg:gap-10">
              <Column>

             
                <Image
                  src={data.imageSrc}
                  alt={data.imageAlt}
                  className="w-full object-cover rounded-lg"
                  size="large"
                  width={180}
                  height={180}
                />

                 <Heading as="h3">{data.title}</Heading>
                   <Paragraph className="mt-4">{data.subtitle}</Paragraph>
              </Column>
              <Column>
                <List className="mt-6">
                  {data.listItems.map((item, idx) => (
                    <Li key={idx}>{item}</Li>
                  ))}
                </List>
              </Column>
            </Columns>
          </div>
          
        </div>
      </div>
    </>
  )
}
