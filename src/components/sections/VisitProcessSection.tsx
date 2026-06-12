import { useEffect, useRef, useState } from 'react'
import { visitProcessContent, type VisitProcessStep } from '../../data/fallback'
import { BfCtaButton } from '../ui/BfCtaButton'
import { entranceClass } from '../../lib/entrance'
import { BfSectionLabel } from '../ui/BfSectionLabel'

const cardEntranceClass = (visible: boolean) =>
  `transition-all duration-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'}`

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

function ProcessStepCard({
  step,
  visible,
  delayMs,
  setRef,
}: {
  step: VisitProcessStep
  visible: boolean
  delayMs: number
  setRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <article
      ref={setRef}
      className={`bf-visit-process__card ${cardEntranceClass(visible)}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <img
        src={step.image}
        alt=""
        loading="lazy"
        className="bf-visit-process__card-image"
        style={step.imagePosition ? { objectPosition: step.imagePosition } : undefined}
      />
      <div className="bf-visit-process__card-overlay" aria-hidden />
      <div className="bf-visit-process__card-content">
        <div className="bf-visit-process__card-number">{step.number}</div>
        <div className="bf-visit-process__card-copy">
          <p className="bf-visit-process__card-title m-0">{step.title}</p>
          <p className="bf-body-3 m-0 text-[var(--bf-color-light-64)]">{step.body}</p>
        </div>
      </div>
    </article>
  )
}

export function VisitProcessSection() {
  const { label, headline, headlineLine2, steps, cta } = visitProcessContent
  const revealCount = 1 + steps.length
  const { visibleItems, setRef } = useRevealOnScroll(revealCount)

  const isVisible = (index: number) => visibleItems.has(index)

  return (
    <section className="bf-visit-process bf-section bf-section-dark">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <header
            ref={setRef(0)}
            className={`bf-visit-process__header ${entranceClass(isVisible(0), true)}`}
          >
            <BfSectionLabel tone="on-dark">{label}</BfSectionLabel>
            <div className="bf-visit-process__header-row">
              <h2 className="bf-section-headline bf-visit-process__headline m-0 text-ink">
                {headline}
                <br />
                {headlineLine2}
              </h2>
              <BfCtaButton
                href={cta.href}
                label={cta.label}
                variant="accent"
                className="shrink-0 text-tone-strong"
              />
            </div>
          </header>

          <div className="bf-visit-process__grid">
            {steps.map((step, index) => (
              <ProcessStepCard
                key={step.number}
                step={step}
                visible={isVisible(index + 1)}
                delayMs={index * 100}
                setRef={setRef(index + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default VisitProcessSection
