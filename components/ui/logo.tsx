import { Image } from '@/components/ui/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
 // dark?: boolean
}

export function Logo({
  className = '',
  width,
  height,
 // dark = false,
}: LogoProps) {
  return (
    <Image
      rounded="rounded-none"
      src={'/images/logo.png'}
      size="medium"
      alt="Logo"
      height={50}
      width={50}
      className={className}
    />
  )
}
