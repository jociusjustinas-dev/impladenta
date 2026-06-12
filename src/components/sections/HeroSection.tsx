import { useEffect, useRef, useState } from 'react'
import { BfCtaButton } from '../ui/BfCtaButton'
import { heroContent, testimonialsContent } from '../../data/fallback'
import { entranceClass } from '../../lib/entrance'
import { BfGoogleRatingRow } from '../ui/BfGoogleRatingRow'

const HERO_IMAGE_SRC = '/images/hero.jpg'

const PARALLAX_FACTOR = 10

const BLUR_LAYERS = [
  { blur: '96px', mask: 'linear-gradient(#000 0% 10%, #0000 30%)' },
  { blur: '50.5px', mask: 'linear-gradient(#0000 0%, #000 10% 20%, #0000 40%)' },
  { blur: '26.6px', mask: 'linear-gradient(#0000 0%, #000 20% 30%, #0000 50%)' },
  { blur: '14px', mask: 'linear-gradient(#0000 10%, #000 30% 40%, #0000 60%)' },
  { blur: '7.4px', mask: 'linear-gradient(#0000 20%, #000 40% 50%, #0000 70%)' },
  { blur: '3.9px', mask: 'linear-gradient(#0000 30%, #000 50% 60%, #0000 80%)' },
  { blur: '2px', mask: 'linear-gradient(#0000 40%, #000 60% 70%, #0000 90%)' },
  { blur: '1.1px', mask: 'linear-gradient(#0000 50%, #000 70% 80%, #0000 100%)' },
  { blur: '0.6px', mask: 'linear-gradient(#0000 60%, #000 80% 90%, #0000 100%)' },
  { blur: '0.3px', mask: 'linear-gradient(#0000 70%, #000 90%, #0000 100%)' },
]

function HeroCtaButton({ href, label }: { href: string; label: string }) {
  return <BfCtaButton href={href} label={label} variant="accent" className="text-tone-strong" />
}

function HeroGhostButton({ href, label }: { href: string; label: string }) {
  return <BfCtaButton href={href} label={label} variant="ghost" />
}

function DayTimeline({
  className = '',
  horizontal = false,
}: {
  className?: string
  horizontal?: boolean
}) {
  const { timeline, timelineTitle } = heroContent

  return (
    <div className={`bf-hero-timeline-card ${className}`.trim()}>
      <p className="bf-hero-timeline-card__title bf-label-1 text-ink">{timelineTitle}</p>

      {horizontal ? (
        <div className="grid grid-cols-4 gap-3 max-[767px]:grid-cols-2">
          {timeline.map((step) => (
            <div key={step.time} className="flex flex-col gap-1">
              <span className="bf-label-1 text-accent">{step.time}</span>
              <span className="bf-body-3 text-ink">{step.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {timeline.map((step) => (
            <div key={step.time} className="flex items-start gap-3">
              <span className="bf-label-1 w-[3.25rem] shrink-0 text-accent">{step.time}</span>
              <span className="bf-body-3 text-ink">{step.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function HeroCopy({
  light = false,
  visible,
}: {
  light?: boolean
  visible: {
    h1: boolean
    p: boolean
    btn: boolean
    timeline: boolean
  }
}) {
  const textColor = light ? 'text-ink' : 'text-tone-strong'
  const subColor = light ? 'text-ink/90' : 'text-tone-subtle'

  return (
    <>
      <div className={`bf-hero-heading-group ${entranceClass(visible.h1)}`}>
        <BfGoogleRatingRow
          href={testimonialsContent.googleRating.href}
          score={testimonialsContent.googleRating.heroScore}
          reviewCount={testimonialsContent.googleRating.reviewCount}
          tone={light ? 'on-dark' : 'default'}
        />
        <h1 className={`bf-hero-headline m-0 ${textColor}`}>
          {heroContent.headline}
        </h1>
      </div>

      <p
        className={`bf-body-2 m-0 max-w-[30rem] ${subColor} ${entranceClass(visible.p)}`}
        style={{ transitionDelay: '100ms' }}
      >
        {heroContent.subheadline}
      </p>

      <div
        className={`flex flex-nowrap items-center gap-3 ${entranceClass(visible.btn)}`}
        style={{ transitionDelay: '200ms' }}
      >
        <HeroCtaButton href={heroContent.ctaHref} label={heroContent.cta} />
        <HeroGhostButton href={heroContent.secondaryCtaHref} label={heroContent.secondaryCta} />
      </div>
    </>
  )
}

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const [h1Visible, setH1Visible] = useState(false)
  const [pVisible, setPVisible] = useState(false)
  const [btnVisible, setBtnVisible] = useState(false)
  const [timelineVisible, setTimelineVisible] = useState(false)

  const visible = {
    h1: h1Visible,
    p: pVisible,
    btn: btnVisible,
    timeline: timelineVisible,
  }

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setH1Visible(true)
          setPVisible(true)
          setBtnVisible(true)
          setTimelineVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    let frame = 0

    const updateParallax = () => {
      const img = imgRef.current
      if (!img) return

      // scrollY = 0 on load → 0% shift; only moves after user scrolls
      const progress = window.scrollY / window.innerHeight
      const shift = -progress * PARALLAX_FACTOR

      img.style.transform = `translate3d(0px, ${shift}%, 0px)`
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        updateParallax()
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateParallax()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="bf-shell-px bg-ink pb-[var(--bf-shell-padding)] pt-[var(--bf-nav-total)]">
      <div className="z-[2] mx-auto w-full max-w-[var(--bf-container-lg)]">
        <div
          ref={sectionRef}
          className="bf-hero-viewport mt-[var(--bf-hero-gap)] flex w-full min-h-0 max-[991px]:max-h-none max-[991px]:min-h-0 max-[991px]:flex-col max-[991px]:gap-[var(--bf-hero-gap)] max-[767px]:flex-col"
        >
          <div className="bf-hero-mobile-copy">
            <div className="flex w-full min-w-0 max-w-[35rem] flex-col items-start justify-center gap-4">
              <HeroCopy visible={visible} />
              <div
                className={`w-full min-w-0 ${entranceClass(timelineVisible)}`}
                style={{ transitionDelay: '300ms' }}
              >
                <DayTimeline />
              </div>
            </div>
          </div>

          <div className="relative h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-bf-sm text-ink max-[991px]:min-h-[280px] max-[767px]:min-h-[240px] max-[479px]:min-h-[220px]">
            <div className="bf-hero-card-inner relative z-[5]">
              <div className="bf-hero-card-content max-w-[36rem] gap-4">
                <HeroCopy light visible={visible} />
              </div>

              <div
                className={`bf-hero-card-footer w-full ${entranceClass(timelineVisible)}`}
                style={{ transitionDelay: '300ms' }}
              >
                <DayTimeline horizontal className="w-full" />
              </div>
            </div>

            <div className="bf-hero-image-parallax z-[1]">
              <img
                ref={imgRef}
                src={HERO_IMAGE_SRC}
                width={2400}
                height={1350}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                alt="Šypsanti moteris su dantimis — Impladenta klinikos hero nuotrauka."
                className="bf-hero-image-cover is-parallax is-hero-homea"
              />
              <div
                className="absolute inset-0 z-[1] h-full w-full"
                style={{
                  backgroundImage:
                    'linear-gradient(90deg, var(--bf-color-dark-64), var(--bf-color-dark-0))',
                }}
              />
              <div className="bf-hero-blur-fade pointer-events-none absolute right-0 bottom-0 left-0 z-[1] max-h-[6rem] min-h-[6rem] w-full overflow-hidden">
                <div className="pointer-events-none z-[990] h-full w-full rotate-180 overflow-clip">
                  {BLUR_LAYERS.map((layer) => (
                    <div
                      key={layer.blur}
                      className="absolute h-full w-full"
                      style={{
                        backdropFilter: `blur(${layer.blur})`,
                        WebkitBackdropFilter: `blur(${layer.blur})`,
                        WebkitMask: layer.mask,
                        mask: layer.mask,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
