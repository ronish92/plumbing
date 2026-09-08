
import NextImage from 'next/image'
import { clsx } from 'clsx'

interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
  quality?: number
  caption?: string
  rounded?: string
  size?: string  // For compatibility, but we'll ignore it
}

export function Image({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality,
  caption,
  rounded = '',
  size,  // ignored, but keeps compatibility
}: ImageProps) {
  const image = (
    <NextImage
      src={src}
      alt={alt}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      fill={fill}
      sizes={sizes}
      quality={quality}
      priority={priority}
      className={clsx(
        'object-cover',
        !fill && 'h-auto',
        rounded,
        className
      )}
    />
  )

  if (caption) {
    return (
      <figure className="space-y-2">
        {image}
        <figcaption className="text-sm text-gray-500 text-center">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return image
}