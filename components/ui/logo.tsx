import { Image } from '@/components/ui/image'

interface LogoProps {
  className?: string
  width?: number
  height?: number
 // dark?: boolean
}

export function Logo({
  className = '',
  width =50,
  height =50,
 // dark = false,
}: LogoProps) {
  return (
    <Image
      rounded="rounded-none"
      src={'/images/logo.png'}
      size="medium"
      alt="Logo"
      height={height}
      width={width}
      className={className}
    />
  )
}
