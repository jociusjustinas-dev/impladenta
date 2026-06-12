export type BfSectionLabelTone = 'light' | 'dark' | 'on-dark'

type BfSectionLabelProps = {
  children: string
  tone?: BfSectionLabelTone
  className?: string
}

export function BfSectionLabel({
  children,
  tone = 'light',
  className = '',
}: BfSectionLabelProps) {
  return (
    <div className={`bf-section-label bf-section-label--${tone} ${className}`.trim()}>
      <span className="bf-section-label__dot" aria-hidden />
      <span className="bf-label-1">{children}</span>
    </div>
  )
}

export default BfSectionLabel
