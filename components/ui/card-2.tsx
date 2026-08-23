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

interface Card2Props {
  id?: string
  title: string
  image: string
  href?: string
  alt: string
  width?: number
  height?: number
  size?: 'small' | 'medium' | 'large' | 'full'
  external?: boolean
  onClick: () => void
}

export function Card2({
  id,
  title,
  image,
  alt,
  width,
  height,
  size = 'large',
  external = false,
  onClick
}: Card2Props) {
  return (
    <div
      key={id}
      onClick={onClick}
      role='button'
      tabIndex={0}
      className="group relative focus:outline-none"
      aria-label={`Navigate to ${title}`}
        onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick?.()
        }
      }}
   
     
  
    >

      <div className="relative h-60 rounded-lg shadow-lg">
     
        <Image
          src={image}
          alt={alt}
          fill  // ← Add this
          className="object-cover rounded-lg"  
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

   
      <div className="absolute bottom-0 left-0 right-0 z-10">
    <Heading
      as="h3"
      color="text-body2-contrast"
      className="w-full bg-orange-400 px-3 py-2 text-center text-[0.9rem]! font-medium text-black leading-tight"
    >
      {title}
    </Heading>
  </div>
      </div>
    </div>
  )
}