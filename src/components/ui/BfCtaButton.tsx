import { ArrowRight } from 'lucide-react'
import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { BfIcon } from './BfIcon'

export type BfCtaVariant = 'accent' | 'primary' | 'secondary' | 'ghost' | 'ghost-on-dark'

type BfCtaButtonProps = {
  label: string
  variant?: BfCtaVariant
  icon?: 'both' | 'left-only' | 'none'
  as?: 'a' | 'span'
  className?: string
  children?: ReactNode
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>

export function BfCtaButton({
  label,
  variant = 'accent',
  icon,
  as = 'a',
  className = '',
  children,
  ...rest
}: BfCtaButtonProps) {
  const Tag = as
  const isGhost = variant === 'ghost' || variant === 'ghost-on-dark'
  const resolvedIcon = icon ?? (isGhost ? 'left-only' : 'both')
  const showLeft = resolvedIcon !== 'none'
  const showRight = resolvedIcon === 'both'

  const arrow = <BfIcon icon={ArrowRight} size="cta" className="h-full w-full" />

  return (
    <Tag
      className={`bf-cta bf-cta--${variant} bf-button-1 shrink-0 whitespace-nowrap no-underline ${className}`.trim()}
      {...(as === 'a' ? rest : {})}
    >
      <span className="bf-cta__inner">
        {showLeft && (
          <span className="bf-cta__icon-wrap bf-cta__icon-wrap--left">
            <span className="bf-cta__icon bf-cta__icon--left">{arrow}</span>
          </span>
        )}

        <span className="bf-cta__text-mask">
          <span className="bf-cta__text">{label}</span>
        </span>

        {showRight && (
          <span className="bf-cta__icon-wrap bf-cta__icon-wrap--right">
            <span className="bf-cta__icon bf-cta__icon--right">{arrow}</span>
          </span>
        )}
      </span>

      <span className="bf-cta__bg" aria-hidden="true" />
      {children}
    </Tag>
  )
}

export default BfCtaButton
