import React from 'react'
import { clsx } from 'clsx'
import type { HTMLAttributes } from 'react'
import { generateIdFromChildren } from '@/app/tools/generate-id-from-children'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  className?: string
  /** Custom ID for the heading. If not provided, will be auto-generated from children content */
  id?: string
  /** The HTML heading tag to render (h1, h2, h3, h4, h5, h6) */
  as?: HeadingLevel
  /** The heading level to use for styling (independent of the HTML tag) */
  styleAs?: HeadingLevel
  /** Font size override */
  fontSize?: string
  /** Font weight override */
  fontWeight?: string
  /** Letter spacing override */
  letterSpacing?: string
  /** Line height override */
  lineHeight?: string
  /** Text wrap behavior */
  textWrap?: string
  /** Font family override */
  fontFamily?: string
  /** Text color override */
  color?: string | undefined
  /** Margin override */
  margin?: string
  /** Text alignment override */
  textAlign?: string
  /** Disable automatic ID generation */
  disableId?: boolean
}

export function Heading({
  children = '',
  className,
  id,
  as: Element = 'h1',
  styleAs,
  fontSize = '',
  fontWeight = '',
  letterSpacing = '',
  lineHeight = '',
  textWrap = '',
  fontFamily = '',
  color = '',
  margin = '',
  textAlign = '',
  disableId = false,
  ...props
}: HeadingProps) {
  // Define base styles for different heading levels
  const getHeadingDefaults = (level: HeadingLevel) => {
    switch (level) {
      case 'h1':
        return {
          fontSize: 'text-5xl/[1.2] sm:text-5xl/[1.2] md:text-7xl/[1.2]',
          fontWeight: 'font-medium',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-[1.2]',
          textWrap: 'text-balance',
          fontFamily: 'font-heading',
          color: 'text-accent',
          margin: 'mb-8',
        }
      case 'h2':
        return {
          fontSize: 'text-4xl sm:text-5xl md:text-6xl',
          fontWeight: 'font-bold',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-tight sm:leading-tight md:leading-tight',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-contrast',
          margin: 'mb-8',
        }
      case 'h3':
        return {
          fontSize: 'text-3xl sm:text-4xl',
          fontWeight: 'font-semibold',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-normal',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-contrast',
          margin: 'mb-8',
        }
      case 'h4':
        return {
          fontSize: 'text-xl md:text-xl',
          fontWeight: 'font-bold',
          letterSpacing: 'tracking-normal',
          lineHeight: 'leading-tight',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-slate-700',
          margin: 'mb-8',
        }
      case 'h5':
        return {
          fontSize: 'text-xl sm:text-2xl',
          fontWeight: 'font-semibold',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-tight',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-contrast',
          margin: 'mb-8',
        }
      case 'h6':
        return {
          fontSize: 'text-lg sm:text-xl',
          fontWeight: 'font-semibold',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-tight',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-contrast',
          margin: 'mb-8',
        }
      default:
        return {
          fontSize: 'text-4xl sm:text-5xl md:text-6xl',
          fontWeight: 'font-bold',
          letterSpacing: 'tracking-tight',
          lineHeight: 'leading-tight sm:leading-tight md:leading-tight',
          textWrap: '',
          fontFamily: 'font-heading',
          color: 'text-contrast',
          margin: 'mb-8',
        }
    }
  }

  // Use styleAs for visual styling, fallback to Element (as prop) if styleAs not provided
  const styleLevel = styleAs || Element
  const defaults = getHeadingDefaults(styleLevel)

  // Use user-defined values if provided, otherwise use defaults
  const finalFontSize = fontSize || defaults.fontSize
  const finalFontWeight = fontWeight || defaults.fontWeight
  const finalLetterSpacing = letterSpacing || defaults.letterSpacing
  const finalLineHeight = lineHeight || defaults.lineHeight
  const finalTextWrap = textWrap || defaults.textWrap
  const finalFontFamily = fontFamily || defaults.fontFamily
  const finalColor = color || defaults.color
  const finalMargin = margin || defaults.margin
  const finalTextAlign = textAlign

  // Generate ID from children if not provided (unless disabled)
  const headingId = disableId
    ? undefined
    : id || generateIdFromChildren(children)

  return (
    <Element
      id={headingId}
      className={clsx(
        'content-wrapper',
        // Apply final styles (user-defined or defaults)
        finalFontSize,
        finalFontWeight,
        finalLetterSpacing,
        finalLineHeight,
        finalTextWrap,
        finalFontFamily,
        finalColor,
        finalMargin,
        finalTextAlign,
        // Custom className can override or extend default styles
        className
      )}
      {...props}
    >
      {children}
    </Element>
  )
}
