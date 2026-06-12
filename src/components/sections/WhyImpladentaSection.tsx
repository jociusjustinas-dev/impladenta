import { Armchair, CreditCard, Printer, Users, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  whyImpladentaContent,
  type WhyImpladentaBlock,
  type WhyImpladentaIcon,
} from '../../data/fallback'
import { entranceClass } from '../../lib/entrance'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { BfIcon } from '../ui/BfIcon'

const iconMap: Record<WhyImpladentaIcon, LucideIcon> = {
  'same-day': Printer,
  financing: CreditCard,
  people: Users,
  comfort: Armchair,
}

function useRevealOnScroll(count: number, threshold = 0.12) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(() => new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    itemRefs.current.forEach((node, index) => {
      if (!node) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]))
            observer.disconnect()
          }
        },
        { threshold },
      )

      observer.observe(node)
      observers.push(observer)
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [count, threshold])

  const setRef = (index: number) => (node: HTMLDivElement | null) => {
    itemRefs.current[index] = node
  }

  return { visibleItems, setRef }
}

function FeatureCard({
  block,
  visible,
  delayMs,
  setRef,
}: {
  block: WhyImpladentaBlock
  visible: boolean
  delayMs: number
  setRef: (node: HTMLDivElement | null) => void
}) {
  const Icon = iconMap[block.icon]
  const isDark = block.variant === 'dark'

  return (
    <div
      ref={setRef}
      className={`bf-why-bento__feature ${isDark ? 'bf-why-bento__feature--dark' : ''} ${entranceClass(visible)}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className="bf-why-bento__feature-icon" aria-hidden>
        <BfIcon icon={Icon} size="sm" />
      </div>
      <div className="bf-why-bento__feature-copy">
        <p className="bf-why-bento__feature-title m-0">{block.title}</p>
        <p className={`bf-body-3 m-0 ${isDark ? 'text-ink/80' : 'text-tone-subtle'}`}>
          {block.description}
        </p>
      </div>
    </div>
  )
}

export function WhyImpladentaSection() {
  const { label, headline, subheadline, blocks, mediaBlock, phoneImage, mediaImage, cta } =
    whyImpladentaContent
  const mediaIndex = 3 + blocks.length
  const revealCount = mediaIndex + 1
  const { visibleItems, setRef } = useRevealOnScroll(revealCount)

  const isVisible = (index: number) => visibleItems.has(index)

  return (
    <section className="bf-why-bento bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <header className="bf-why-bento__header">
            <div ref={setRef(0)} className={entranceClass(isVisible(0))}>
              <BfSectionLabel tone="light">{label}</BfSectionLabel>
            </div>

            <div
              ref={setRef(1)}
              className={`flex flex-col items-center gap-2 ${entranceClass(isVisible(1))}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h2 className="bf-section-headline m-0 text-tone-strong">{headline}</h2>
              <p className="bf-body-1 m-0 text-tone-medium">{subheadline}</p>
            </div>
          </header>

          <div className="bf-why-bento__grid">
            <div
              ref={setRef(2)}
              className={`bf-why-bento__phone ${entranceClass(isVisible(2))}`}
              style={{ transitionDelay: '150ms' }}
            >
              <img
                src={phoneImage}
                alt=""
                loading="lazy"
                className="bf-why-bento__phone-image"
              />
            </div>

            <div className="bf-why-bento__features">
              {blocks.map((block, index) => (
                <FeatureCard
                  key={block.title}
                  block={block}
                  visible={isVisible(3 + index)}
                  delayMs={100 + index * 80}
                  setRef={setRef(3 + index)}
                />
              ))}
            </div>

            <div
              ref={setRef(mediaIndex)}
              className={`bf-why-bento__media ${entranceClass(isVisible(mediaIndex))}`}
              style={{ transitionDelay: '200ms' }}
            >
              <img src={mediaImage} alt="" loading="lazy" className="bf-why-bento__media-image" />
              <div className="bf-why-bento__media-scrim" aria-hidden />
              <div className="bf-why-bento__media-content">
                <div className="bf-why-bento__media-copy">
                  <h3 className="bf-why-bento__media-title bf-h5 m-0 text-ink">
                    {mediaBlock.title}
                  </h3>
                  <p className="bf-body-3 m-0 text-ink/90">{mediaBlock.description}</p>
                </div>
                <BfCtaButton
                  href={cta.href}
                  label={cta.label}
                  variant="accent"
                  className="text-tone-strong"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyImpladentaSection
