import type { LucideIcon, LucideProps } from 'lucide-react'

const sizeMap = {
  xs: 12,
  sm: 16,
  md: 24,
  menu: 16,
  phone: 18,
  chevron: 12,
  cta: 16,
} as const

export type BfIconSize = keyof typeof sizeMap

type BfIconProps = Omit<LucideProps, 'size' | 'ref'> & {
  icon: LucideIcon
  size?: BfIconSize | number
}

export function BfIcon({
  icon: Icon,
  size = 'sm',
  strokeWidth = 1.5,
  className,
  ...props
}: BfIconProps) {
  const px = typeof size === 'number' ? size : sizeMap[size]

  return (
    <Icon
      size={px}
      strokeWidth={strokeWidth}
      className={className}
      aria-hidden={props['aria-label'] ? undefined : true}
      {...props}
    />
  )
}

export default BfIcon
