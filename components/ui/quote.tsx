import { clsx } from 'clsx'

export interface QuoteProps extends React.ComponentPropsWithoutRef<'blockquote'> {
  /** Variant of the quote - controls default styling */
  variant?: 'default' | 'large' | 'small'
  /** Font size override */
  fontSize?: string
  /** Text color override */
  color?: string
  /** Font family override */
  fontFamily?: string
  /** Font weight override */
  fontWeight?: string
  /** Font style override */
  fontStyle?: string
  /** Text alignment override */
  textAlign?: string
  /** Margin override */
  margin?: string
  /** Additional CSS classes */
  className?: string
}

export function Quote({
  className = '',
  variant = 'default',
  fontSize = '',
  color = '',
  fontFamily = '',
  fontWeight = '',
  fontStyle = '',
  textAlign = '',
  margin = '',
  children,
  ...props
}: QuoteProps) {
  // Define font size and font weight presets for variants - larger than paragraph
  const variantClasses = {
    default: 'text-xl/normal font-semibold',
    large: 'text-2xl/normal font-semibold sm:text-2xl/normal',
    small: 'text-lg/normal font-medium',
  }

  // Use user-defined values if provided, otherwise use defaults
  const finalFontSize = fontSize || variantClasses[variant]
  const finalColor = color || 'text-contrast-light'
  const finalFontFamily = fontFamily || 'font-heading' // no default font family
  const finalFontWeight = fontWeight || '' // no default font weight (handled by variant)
  const finalFontStyle = fontStyle || 'italic' // default to italic for quotes
  const finalTextAlign = textAlign || '' // no default text alignment
  const finalMargin = margin || 'mb-8'

  return (
    <blockquote
      className={clsx(
        finalFontSize,
        finalColor,
        finalFontFamily,
        finalFontWeight,
        finalFontStyle,
        finalTextAlign,
        finalMargin,
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  )
}
