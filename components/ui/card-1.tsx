// app/components/ui/card-1.tsx
import Link from 'next/link'
import { Heading } from '@/components/ui/heading'
import { Image } from '@/components/ui/image'

export interface CardLinkData {
  id: string
  title: string
  image: string
  href: string
  alt: string
  width?: number | undefined
  height?: number | undefined
  size?: 'small' | 'medium' | 'large' | 'full'
}

interface Card1Props {
  id?: string
  title: string
  image: string
  href: string
  alt: string
  width?: number
  height?: number
  size?: 'small' | 'medium' | 'large' | 'full'
  external?: boolean
}

export function Card1({
  id,
  title,
  image,
  href,
  alt,
  width,
  height,
  size = 'large',
  external = false,
}: Card1Props) {
  return (
    <Link
      key={id}
      href={href}
      className="group relative focus:outline-none"
      aria-label={`Navigate to ${title}`}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      prefetch={true}
      scroll={true}
    >
      {/* Card Container */}
      <div className="relative h-100 rounded-lg shadow-lg">
        {/* Background Image - using fill */}
        <Image
          src={image}
          alt={alt}
          fill  // ← Add this
          className="object-cover rounded-lg"  // ← rounded goes here instead
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Vertical Text Label - Rotated 90 degrees */}
        <Heading
          as="h3"
          color="text-body2-contrast"
          className="absolute flex items-center -rotate-90 h-14 right-20 xl:right-24 -top-10 transform origin-top-right bg-[#AFFF00] px-12 whitespace-nowrap shadow-lg  `text-[1.4rem]!` z-10"
        >
          {title}
        </Heading>
      </div>
    </Link>
  )
}