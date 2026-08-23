import React from 'react'
import { clsx } from 'clsx'

interface Card4Props {
  children: React.ReactNode
  className?: string
  rounded?: string
  bgColor?: string
  border?: string
  shadow?: string
  padding?: string
  margin?: string
}

export function Card4({
  children,
  className,
  rounded = 'rounded-xl',
  bgColor = 'bg-orange-50',
  border = 'border border-orange/30',
  shadow = 'shadow-lg',
  padding = 'p-10 md:p-10',
  margin,
}: Card4Props) {
  return (
    <div
      className={clsx(
        rounded,
        bgColor,
        border,
        shadow,
        padding,
        margin,
        className
      )}
    >
      {children}
    </div>
  )
}
