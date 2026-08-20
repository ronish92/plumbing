// app/components/ui/section.tsx
import React from 'react'
import Image from 'next/image'
import { clsx } from 'clsx'
import { Container } from '@/components/ui/container'

interface SectionProps {
  children: React.ReactNode
  className?: string
  innerAlign?: 'wide' | 'content' | 'none' | 'full' | 'navbar'
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  overlayColor?: string
  id?: string
}

export function Section({
  children,
  className,
  innerAlign,
  imageSrc,
  imageAlt,
  imageClassName,
  overlayColor,
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx('relative [&>*>*>*:last-child]:mb-0', className)}
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt || ''}
            fill
            className={clsx(
              'object-cover object-center',
              imageClassName
            )}
            priority={false}
          />
          <div
            className={clsx(
              'absolute inset-0 -z-[1]',
              overlayColor || 'bg-overlay/30'
            )}
          />
        </>
      )}
      <Container {...(innerAlign && { align: innerAlign })}>
        {children}
      </Container>
    </section>
  )
}