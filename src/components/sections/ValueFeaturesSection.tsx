import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import {
  servicesBentoContent,
  type ServicesBentoCard,
  type ServicesBentoCardVariant,
} from '../../data/fallback'
import { entranceClass } from '../../lib/entrance'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { BfIcon } from '../ui/BfIcon'

const slides = servicesBentoContent.rows.flat()

function SlideCta({ variant }: { variant: ServicesBentoCardVariant }) {
  const { ctaLabel } = servicesBentoContent

  if (variant === 'hub') {
    return (
      <BfCtaButton
        as="span"
        label={ctaLabel}
        variant="accent"
        icon="left-only"
        className="pointer-events-none text-tone-strong"
      />
    )
  }

  return (
    <BfCtaButton
      as="span"
      label={ctaLabel}
      variant="ghost-on-dark"
      icon="left-only"
      className="pointer-events-none"
    />
  )
}

function ServiceSlide({
  card,
  onImageRef,
}: {
  card: ServicesBentoCard
  onImageRef?: (element: HTMLImageElement | null) => void
}) {
  const isHub = card.variant === 'hub'

  return (
    <article className="bf-bento-card bf-bento-card--featured bf-value-features__slide-card">
      <div className="bf-bento-card__media">
        <img
          ref={onImageRef}
          src={card.image}
          alt=""
          loading="lazy"
          className="bf-bento-card__image"
          style={card.imagePosition ? { objectPosition: card.imagePosition } : undefined}
        />
        <div className="bf-bento-card__scrim" aria-hidden />
      </div>

      <div className="bf-bento-card__content bf-bento-card__content--featured">
        <div className="bf-bento-card__copy">
          <h3 className={`bf-bento-card__title bf-h4 m-0 ${isHub ? 'text-accent' : 'text-ink'}`}>
            {card.title}
          </h3>
          {card.description && (
            <p className="bf-bento-card__desc bf-body-3 m-0 text-ink/90">{card.description}</p>
          )}
        </div>
        <SlideCta variant={card.variant} />
      </div>
    </article>
  )
}

function SliderNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: 'prev' | 'next'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className="bf-value-features__nav-btn"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'prev' ? 'Ankstesnė paslauga' : 'Kita paslauga'}
    >
      <BfIcon
        icon={ArrowRight}
        size="md"
        className={direction === 'prev' ? 'rotate-180' : ''}
      />
    </button>
  )
}

export function ValueFeaturesSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [labelVisible, setLabelVisible] = useState(false)
  const [headingVisible, setHeadingVisible] = useState(false)
  const [sliderVisible, setSliderVisible] = useState(false)

  const labelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const parallaxRefs = useRef<(HTMLImageElement | null)[]>([])

  const { label, headline, headlineLine2, subheadline } = servicesBentoContent
  const totalSlides = slides.length

  useEffect(() => {
    const nodes = [
      { ref: labelRef, setter: setLabelVisible, delay: 0 },
      { ref: headingRef, setter: setHeadingVisible, delay: 100 },
      { ref: sliderRef, setter: setSliderVisible, delay: 200 },
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
    const onScroll = () => {
      parallaxRefs.current.forEach((image) => {
        if (!image?.parentElement) return

        const rect = image.parentElement.getBoundingClientRect()
        const progress = -rect.top / window.innerHeight
        image.style.transform = `translate3d(0, ${progress * 32}px, 0)`
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const goPrev = () => setActiveSlide((current) => Math.max(0, current - 1))
  const goNext = () => setActiveSlide((current) => Math.min(totalSlides - 1, current + 1))

  const trackStyle = {
    '--bf-value-features-index': activeSlide,
  } as CSSProperties

  return (
    <section className="bf-value-features bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <div
            ref={headingRef}
            className="bf-section-intro bf-value-features__header mb-16 max-w-[48rem] max-[767px]:mb-10"
          >
            <div ref={labelRef}>
              <div className={entranceClass(labelVisible)}>
                <BfSectionLabel tone="light">{label}</BfSectionLabel>
              </div>
            </div>

            <h2
              className={`bf-section-headline bf-value-features__headline mt-0 text-tone-strong ${entranceClass(headingVisible)}`}
              style={{ transitionDelay: '100ms' }}
            >
              {headline}
              <br />
              {headlineLine2}
            </h2>

            <p
              className={`bf-body-2 m-0 text-tone-subtle ${entranceClass(headingVisible)}`}
              style={{ transitionDelay: '150ms' }}
            >
              {subheadline}
            </p>
          </div>

        </div>
      </div>

      <div
        ref={sliderRef}
        className={`bf-value-features__slider-block ${entranceClass(sliderVisible)}`}
        style={{ transitionDelay: '200ms' }}
      >
        <div className="bf-value-features__viewport">
          <div className="bf-value-features__track" style={trackStyle}>
            {slides.map((card, index) => (
              <div key={card.id} className="bf-value-features__slide">
                <a href={card.href} className="bf-bento-card__link group block h-full">
                  <ServiceSlide
                    card={card}
                    onImageRef={(element) => {
                      parallaxRefs.current[index] = element
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div className="bf-value-features__controls">
          <SliderNavButton direction="prev" disabled={activeSlide === 0} onClick={goPrev} />
          <SliderNavButton
            direction="next"
            disabled={activeSlide >= totalSlides - 1}
            onClick={goNext}
          />
        </div>
      </div>
    </section>
  )
}

export default ValueFeaturesSection
