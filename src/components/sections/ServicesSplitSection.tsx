import { ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  servicesBentoContent,
  servicesSplitContent,
  type ServicesBentoCard,
  type ServicesBentoCardVariant,
} from '../../data/fallback'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { BfIcon } from '../ui/BfIcon'

const entranceClass = (visible: boolean) =>
  `transition-all duration-700 ease-out ${
    visible ? 'translate-y-0 opacity-100' : 'translate-y-[50px] opacity-0'
  }`

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, visible }
}

function CardCta({ variant }: { variant: ServicesBentoCardVariant }) {
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

function SplitServiceCard({
  card,
  onImageRef,
}: {
  card: ServicesBentoCard
  onImageRef?: (element: HTMLImageElement | null) => void
}) {
  const isHub = card.variant === 'hub'

  return (
    <article
      id={card.id}
      className={`bf-bento-card bf-services-split__card scroll-mt-[calc(var(--bf-nav-total)+1.5rem)] ${
        isHub ? 'bf-services-split__card--hub' : 'bf-bento-card--featured'
      }`}
    >
      <a href={card.href} className="bf-bento-card__link group">
        {!isHub ? (
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
        ) : null}

        <div
          className={`bf-bento-card__content ${isHub ? 'bf-services-split__card-content--hub' : 'bf-bento-card__content--featured'}`}
        >
          <div className="bf-bento-card__copy">
            <h3
              className={`bf-bento-card__title m-0 ${isHub ? 'bf-h5 text-accent' : 'bf-h4 text-ink'}`}
            >
              {card.title}
            </h3>
            {card.description && (
              <p className="bf-bento-card__desc bf-body-3 m-0 text-ink/90">{card.description}</p>
            )}
          </div>
          <CardCta variant={card.variant} />
        </div>
      </a>
    </article>
  )
}

const navigableCards = (cards: ServicesBentoCard[]) =>
  cards.filter((card) => card.variant !== 'hub')

function CarouselNavButton({
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
      className="bf-services-split__nav-btn"
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

export function ServicesSplitSection() {
  const { label, headline, headlineLine2, subheadline, cta, cards } = servicesSplitContent
  const navCards = useMemo(() => navigableCards(cards), [cards])
  const [activeId, setActiveId] = useState(navCards[0]?.id ?? '')
  const [activeSlide, setActiveSlide] = useState(0)

  const labelBlock = useInView()
  const headingBlock = useInView()
  const paragraphBlock = useInView()
  const linkListBlock = useInView()
  const ctaBlock = useInView()

  const parallaxRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    const onScroll = () => {
      parallaxRefs.current.forEach((image) => {
        if (!image?.parentElement) return

        const rect = image.parentElement.getBoundingClientRect()
        const progress = -rect.top / window.innerHeight
        image.style.transform = `translate3d(0, ${progress * 40}px, 0)`
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

  useEffect(() => {
    const nodes = navCards
      .map((card) => document.getElementById(card.id))
      .filter((node): node is HTMLElement => node !== null)

    if (nodes.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: '-35% 0px -45% 0px',
        threshold: [0.15, 0.35, 0.55],
      },
    )

    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [navCards])

  const scrollToCard = (id: string) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const goPrevSlide = () => setActiveSlide((current) => Math.max(0, current - 1))
  const goNextSlide = () => setActiveSlide((current) => Math.min(cards.length - 1, current + 1))

  const mobileTrackStyle = {
    '--bf-services-split-index': activeSlide,
  } as CSSProperties

  return (
    <section className="bf-services-split bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <div className="bf-services-split__layout">
            <aside className="bf-services-split__aside">
              <div className="bf-services-split__aside-inner">
                <div
                  ref={labelBlock.ref}
                  className={`bf-section-intro bf-services-split__intro ${entranceClass(labelBlock.visible)}`}
                >
                  <BfSectionLabel tone="light">{label}</BfSectionLabel>

                  <div ref={headingBlock.ref} className={entranceClass(headingBlock.visible)} style={{ transitionDelay: '100ms' }}>
                    <h2 className="bf-section-headline mt-0 text-tone-strong">
                      {headline} {headlineLine2}
                    </h2>
                  </div>

                  <div
                    ref={paragraphBlock.ref}
                    className={entranceClass(paragraphBlock.visible)}
                    style={{ transitionDelay: '200ms' }}
                  >
                    <p className="bf-body-3 m-0 text-tone-subtle">{subheadline}</p>
                  </div>

                  <nav
                    ref={linkListBlock.ref}
                    className={`bf-services-split__nav ${entranceClass(linkListBlock.visible)}`}
                    style={{ transitionDelay: '300ms' }}
                    aria-label="Paslaugų sąrašas"
                  >
                    {navCards.map((card) => (
                      <button
                        key={card.id}
                        type="button"
                        onClick={() => scrollToCard(card.id)}
                        className={`bf-services-split__nav-link ${activeId === card.id ? 'is-active' : ''}`}
                      >
                        <span className="bf-services-split__nav-link-inner">
                          <span className="bf-services-split__nav-dot" aria-hidden />
                          <span className="bf-label-1">{card.title}</span>
                        </span>
                      </button>
                    ))}
                  </nav>
                </div>

                <div
                  ref={ctaBlock.ref}
                  className={`bf-services-split__aside-cta ${entranceClass(ctaBlock.visible)}`}
                  style={{ transitionDelay: '400ms' }}
                >
                  <BfCtaButton href={cta.href} label={cta.label} variant="accent" className="text-tone-strong" />
                </div>
              </div>
            </aside>

            <div className="bf-services-split__cards">
              {cards.map((card, index) => (
                <SplitServiceCard
                  key={card.id}
                  card={card}
                  onImageRef={(element) => {
                    parallaxRefs.current[index] = element
                  }}
                />
              ))}
            </div>

            <div className="bf-services-split__mobile-carousel">
              <div className="bf-services-split__mobile-viewport">
                <div className="bf-services-split__mobile-track" style={mobileTrackStyle}>
                  {cards.map((card, index) => (
                    <div key={card.id} className="bf-services-split__mobile-slide">
                      <SplitServiceCard
                        card={card}
                        onImageRef={(element) => {
                          parallaxRefs.current[index] = element
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="bf-services-split__mobile-footer">
                <div className="bf-services-split__mobile-controls">
                  <CarouselNavButton
                    direction="prev"
                    disabled={activeSlide === 0}
                    onClick={goPrevSlide}
                  />
                  <CarouselNavButton
                    direction="next"
                    disabled={activeSlide >= cards.length - 1}
                    onClick={goNextSlide}
                  />
                </div>

                <BfCtaButton
                  href={cta.href}
                  label={cta.label}
                  variant="accent"
                  className="bf-services-split__mobile-cta text-tone-strong"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSplitSection
