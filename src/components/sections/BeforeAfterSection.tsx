import { ArrowRight, Play, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  beforeAfterContent,
  type BeforeAfterStat,
  type BeforeAfterTransformation,
} from '../../data/fallback'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfIcon } from '../ui/BfIcon'
import { entranceClass } from '../../lib/entrance'
import { BfSectionLabel } from '../ui/BfSectionLabel'

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

function SliderNavButton({
  direction,
  onClick,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="bf-before-after__nav-btn"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Ankstesnė transformacija' : 'Kita transformacija'}
    >
      <BfIcon
        icon={ArrowRight}
        size="md"
        className={direction === 'prev' ? 'rotate-180' : ''}
      />
    </button>
  )
}

function SplitPane({ photo }: { photo: BeforeAfterTransformation['before'] }) {
  return (
    <figure className="bf-before-after__split-pane">
      <img
        src={photo.src}
        alt=""
        loading="lazy"
        className="bf-before-after__split-image"
        style={photo.position ? { objectPosition: photo.position } : undefined}
      />
      <figcaption className="bf-label-1">{photo.label}</figcaption>
    </figure>
  )
}

function QuoteCard({ quote }: { quote: BeforeAfterTransformation['quote'] }) {
  return (
    <article className="bf-before-after__quote-card">
      <p className="bf-body-1 m-0 text-tone-strong">{quote.text}</p>
      <div className="bf-before-after__quote-author">
        <div className="bf-before-after__quote-avatar">
          <img
            src={quote.avatar}
            alt=""
            loading="lazy"
            className="bf-before-after__quote-avatar-image"
          />
        </div>
        <div className="bf-before-after__quote-meta">
          <p className="bf-body-3 m-0 text-tone-strong">{quote.author}</p>
          <p className="bf-label-1 m-0 text-tone-subtle">{quote.role}</p>
        </div>
      </div>
    </article>
  )
}

function StatRow({
  stat,
  visible,
  delayMs,
  setRef,
}: {
  stat: BeforeAfterStat
  visible: boolean
  delayMs: number
  setRef: (node: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={setRef}
      className={`bf-before-after__stat ${entranceClass(visible, true)}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <p className="bf-label-1 m-0 text-tone-strong">{stat.label}</p>
      <p className="bf-before-after__stat-value m-0 text-tone-strong">
        <span>{stat.number}</span>
        {stat.suffix ? <span>{stat.suffix}</span> : null}
      </p>
    </div>
  )
}

export function BeforeAfterSection() {
  const {
    label,
    headline,
    headlineLine2,
    subheadline,
    cta,
    playLabel,
    transformations,
    ctaBanner,
    stats,
  } = beforeAfterContent

  const [activeIndex, setActiveIndex] = useState(0)
  const [hasUnlockedTransformations, setHasUnlockedTransformations] = useState(false)
  const [showCtaPopup, setShowCtaPopup] = useState(false)
  const [ctaPopupDismissed, setCtaPopupDismissed] = useState(false)
  const [headerVisible, setHeaderVisible] = useState(false)
  const [mediaVisible, setMediaVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const parallaxRef = useRef<HTMLImageElement>(null)
  const totalSlides = transformations.length
  const activeTransformation = transformations[activeIndex]

  const { visibleItems, setRef } = useRevealOnScroll(stats.length)

  useEffect(() => {
    setShowCtaPopup(false)
    setCtaPopupDismissed(false)
  }, [activeIndex])

  useEffect(() => {
    if (!hasUnlockedTransformations || ctaPopupDismissed) {
      setShowCtaPopup(false)
      return
    }

    const timer = window.setTimeout(() => {
      setShowCtaPopup(true)
    }, ctaBanner.popupDelayMs)

    return () => window.clearTimeout(timer)
  }, [hasUnlockedTransformations, ctaPopupDismissed, activeIndex, ctaBanner.popupDelayMs])

  useEffect(() => {
    const nodes = [
      { ref: headerRef, setter: setHeaderVisible, delay: 0 },
      { ref: mediaRef, setter: setMediaVisible, delay: 120 },
    ] as const

    const observers = nodes.map(({ ref, setter, delay }) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => setter(true), delay)
            observer.disconnect()
          }
        },
        { threshold: 0.12 },
      )

      if (ref.current) observer.observe(ref.current)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  useEffect(() => {
    if (hasUnlockedTransformations) return

    const onScroll = () => {
      const image = parallaxRef.current
      const parent = image?.parentElement?.parentElement
      if (!image || !parent) return

      const rect = parent.getBoundingClientRect()
      const progress = -rect.top / window.innerHeight
      image.style.transform = `translateY(${progress * 48}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => window.removeEventListener('scroll', onScroll)
  }, [activeIndex, hasUnlockedTransformations])

  const goPrev = () => {
    setActiveIndex((current) => (current === 0 ? totalSlides - 1 : current - 1))
  }

  const goNext = () => {
    setActiveIndex((current) => (current === totalSlides - 1 ? 0 : current + 1))
  }

  return (
    <section className="bf-before-after bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <header
            ref={headerRef}
            className={`bf-before-after__header ${entranceClass(headerVisible, true)}`}
          >
            <BfSectionLabel tone="light">{label}</BfSectionLabel>
            <div className="bf-before-after__header-row">
              <div className="bf-section-intro bf-before-after__intro">
                <h2 className="bf-section-headline m-0 text-tone-strong">
                  {headline}
                  <br />
                  {headlineLine2}
                </h2>
                <p className="bf-body-1 m-0 text-tone-medium">{subheadline}</p>
              </div>
              <BfCtaButton
                href={cta.href}
                label={cta.label}
                variant="accent"
                className="shrink-0 text-tone-strong"
              />
            </div>
          </header>

          <div
            ref={mediaRef}
            className={`bf-before-after__showcase ${entranceClass(mediaVisible, true)}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bf-before-after__media">
              {!hasUnlockedTransformations ? (
                <span className="bf-before-after__title-badge bf-label-1">
                  {activeTransformation.title}
                </span>
              ) : null}

              {hasUnlockedTransformations ? (
                <div className="bf-before-after__split">
                  <SplitPane photo={activeTransformation.before} />
                  <SplitPane photo={activeTransformation.after} />
                </div>
              ) : (
                <>
                  <div className="bf-before-after__media-backdrop" aria-hidden>
                    <img
                      key={activeTransformation.id}
                      ref={parallaxRef}
                      src={activeTransformation.poster.src}
                      alt=""
                      loading="lazy"
                      className="bf-before-after__media-poster"
                      style={
                        activeTransformation.poster.position
                          ? { objectPosition: activeTransformation.poster.position }
                          : undefined
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className="bf-before-after__play"
                    onClick={() => setHasUnlockedTransformations(true)}
                    aria-label={playLabel}
                  >
                    <BfIcon
                      icon={Play}
                      size="md"
                      className="bf-before-after__play-icon"
                      fill="currentColor"
                    />
                    <span className="bf-button-1">{playLabel}</span>
                  </button>
                </>
              )}

              <QuoteCard key={activeTransformation.id} quote={activeTransformation.quote} />

              {showCtaPopup ? (
                <aside
                  className="bf-before-after__cta-popup"
                  role="dialog"
                  aria-label={ctaBanner.text}
                >
                  <button
                    type="button"
                    className="bf-before-after__cta-popup-close"
                    onClick={() => setCtaPopupDismissed(true)}
                    aria-label="Uždaryti"
                  >
                    <BfIcon icon={X} size="sm" />
                  </button>
                  <p className="bf-before-after__cta-popup-text bf-body-3 m-0 text-ink">
                    {ctaBanner.text}
                  </p>
                  <BfCtaButton
                    href={ctaBanner.cta.href}
                    label={ctaBanner.cta.label}
                    variant="accent"
                    className="text-tone-strong"
                  />
                </aside>
              ) : null}
            </div>

            <div className="bf-before-after__slider-footer">
              <div className="bf-before-after__slider-controls">
                <div className="bf-before-after__slider-nav">
                  <SliderNavButton direction="prev" onClick={goPrev} />
                  <SliderNavButton direction="next" onClick={goNext} />
                </div>

                <p className="bf-label-1 m-0 text-tone-subtle" aria-live="polite">
                  {activeIndex + 1} / {totalSlides}
                </p>
              </div>
            </div>

          </div>

          <div className="bf-before-after__stats">
            {stats.map((stat, index) => (
              <StatRow
                key={stat.label}
                stat={stat}
                visible={visibleItems.has(index)}
                delayMs={index * 80}
                setRef={setRef(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BeforeAfterSection
