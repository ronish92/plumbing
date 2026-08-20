import React from 'react'
import { clsx } from 'clsx'
import { Image } from './image'

interface Profile1Props {
  /** Image source URL for the testimonial author */
  img: string
  /** Name or citation for the testimonial author */
  cite: string
  /** Testimonial content - should be Paragraph components */
  children: React.ReactNode
  /** Custom aspect ratio classes for the image (default: "aspect-[3/4]") */
  aspect?: string
  /** Custom rounded classes for the image (default: "rounded-t-full") */
  rounded?: string
}

export function Profile1({
  img,
  cite,
  children,
  aspect = 'aspect-[3/4]',
  rounded = 'rounded-t-full',
}: Profile1Props) {
  return (
 
    <div className="relative w-full max-w-sm mx-auto pt-12">
      
      {/* 1. Profile Image Container (Overlaps the top boundary) */}
      <div className="relative z-10 w-[80%] mx-auto left-0 right-0">
        <div className={clsx('relative w-full', aspect, rounded)}>
          <Image
            src={img}
            alt={cite}
            fill
            sizes="(max-w-768px) 100vw, 384px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* 2. Content Info Card (Sits behind the lower half of the image) */}
      <div className="relative z-0 -mt-24 border border-gray-600 bg-white px-6 pb-10 pt-32 text-center flex flex-col items-center justify-center">
        <div className="w-full max-w-xs space-y-3 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>

    </div>
  );
}
