import { ArrowRight, Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { teamTeaserContent, type TeamTeaserSlide } from '../../data/fallback'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { BfIcon } from '../ui/BfIcon'

const entranceClass = (visible: boolean) =>
  `transition-all duration-700 ease-out ${
    visible ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-[50px] opacity-0 blur-[12px]'
  }`

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
      className="bf-team-teaser__nav-btn"
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Ankstesnis gydytojas' : 'Kitas gydytojas'}
    >
      <BfIcon
        icon={ArrowRight}
        size="md"
        className={direction === 'prev' ? 'rotate-180' : ''}
      />
    </button>
  )
}

function TeamSlideCopy({ slide }: { slide: TeamTeaserSlide }) {
  return (
    <>
      <div className="bf-team-teaser__card-tag">
        <span className="bf-label-1 text-ink">{slide.tag}</span>
      </div>
      <div className="bf-team-teaser__card-copy">
        <p className="bf-team-teaser__card-name m-0">{slide.name}</p>
        <p className="bf-body-3 m-0 text-[var(--bf-color-light-64)]">{slide.role}</p>
      </div>
    </>
  )
}

function TeamVideoSlide({ slide, isActive }: { slide: TeamTeaserSlide; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!isActive || isPaused) {
      video.pause()
      return
    }

    void video.play().catch(() => {
      setIsPaused(true)
    })
  }, [isActive, isPaused])

  const togglePlay = () => {
    setIsPaused((current) => !current)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    const nextMuted = !video.muted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <article className="bf-team-teaser__card bf-team-teaser__card--video">
      <video
        ref={videoRef}
        src={slide.video}
        className="bf-team-teaser__card-image"
        loop
        muted
        playsInline
        preload="metadata"
        aria-label={slide.name}
      />
      <div className="bf-team-teaser__card-scrim" aria-hidden />
      <div className="bf-team-teaser__card-controls" aria-label="Vaizdo įrašo valdymas">
        <button
          type="button"
          className="bf-team-teaser__media-btn"
          onClick={togglePlay}
          aria-label={isPaused ? 'Leisti vaizdo įrašą' : 'Pristabdyti vaizdo įrašą'}
          aria-pressed={!isPaused}
        >
          <BfIcon icon={isPaused ? Play : Pause} size="sm" />
        </button>
        <button
          type="button"
          className="bf-team-teaser__media-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Įjungti garsą' : 'Išjungti garsą'}
          aria-pressed={!isMuted}
        >
          <BfIcon icon={isMuted ? VolumeX : Volume2} size="sm" />
        </button>
      </div>
      <div className="bf-team-teaser__card-content">
        <TeamSlideCopy slide={slide} />
      </div>
    </article>
  )
}

function TeamSlideCard({ slide, isActive }: { slide: TeamTeaserSlide; isActive: boolean }) {
  if (slide.video) {
    return <TeamVideoSlide slide={slide} isActive={isActive} />
  }

  return (
    <article className="bf-team-teaser__card">
      <img
        src={slide.image}
        alt=""
        loading="lazy"
        className="bf-team-teaser__card-image"
        style={slide.imagePosition ? { objectPosition: slide.imagePosition } : undefined}
      />
      <div className="bf-team-teaser__card-scrim" aria-hidden />
      <div className="bf-team-teaser__card-content">
        <TeamSlideCopy slide={slide} />
      </div>
    </article>
  )
}

const LOOP_COPIES = 3

export function TeamTeaserSection() {
  const { label, headline, subheadline, cta, slides } = teamTeaserContent
  const slideCount = slides.length
  const loopedSlides = Array.from({ length: LOOP_COPIES }, () => slides).flat()
  const [activeSlide, setActiveSlide] = useState(() => slideCount + Math.floor(slideCount / 2))
  const [headerVisible, setHeaderVisible] = useState(false)
  const [sliderVisible, setSliderVisible] = useState(false)
  const [trackTransition, setTrackTransition] = useState(true)

  const headerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isLoopAdjustingRef = useRef(false)
  const activeSlideRef = useRef(activeSlide)
  const [trackOffset, setTrackOffset] = useState(0)

  activeSlideRef.current = activeSlide

  const syncTrackOffset = () => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    const slideNodes = track.querySelectorAll<HTMLElement>('.bf-team-teaser__slide')
    if (!slideNodes.length || activeSlide < 0 || activeSlide >= slideNodes.length) return

    const gap = Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || '0')
    let activeCenter = 0

    for (let index = 0; index < activeSlide; index += 1) {
      activeCenter += slideNodes[index].offsetWidth + gap
    }

    activeCenter += slideNodes[activeSlide].offsetWidth / 2
    setTrackOffset(viewport.clientWidth / 2 - activeCenter)
  }

  useEffect(() => {
    const viewport = viewportRef.current
    const track = trackRef.current
    if (!viewport || !track) return

    syncTrackOffset()

    const observer = new ResizeObserver(syncTrackOffset)
    observer.observe(viewport)
    track.querySelectorAll<HTMLElement>('.bf-team-teaser__slide').forEach((slide) => {
      observer.observe(slide)
    })

    return () => observer.disconnect()
  }, [activeSlide, slideCount])

  const normalizeLoopIndex = () => {
    if (isLoopAdjustingRef.current) return

    const current = activeSlideRef.current
    if (current >= slideCount && current < slideCount * 2) return

    isLoopAdjustingRef.current = true
    setTrackTransition(false)

    const normalized =
      current < slideCount ? current + slideCount : current - slideCount

    setActiveSlide(normalized)

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setTrackTransition(true)
        isLoopAdjustingRef.current = false
      })
    })
  }

  useEffect(() => {
    const nodes = [
      { ref: headerRef, setter: setHeaderVisible, delay: 0 },
      { ref: sliderRef, setter: setSliderVisible, delay: 150 },
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

  const goPrev = () => {
    if (isLoopAdjustingRef.current) return
    setTrackTransition(true)
    setActiveSlide((current) => current - 1)
  }

  const goNext = () => {
    if (isLoopAdjustingRef.current) return
    setTrackTransition(true)
    setActiveSlide((current) => current + 1)
  }

  const trackStyle = {
    transform: `translateX(${trackOffset}px)`,
  } as CSSProperties

  return (
    <section className="bf-team-teaser bf-section bf-section-dark">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <header
            ref={headerRef}
            className={`bf-team-teaser__header ${entranceClass(headerVisible)}`}
          >
            <BfSectionLabel tone="on-dark">{label}</BfSectionLabel>
            <div className="bf-team-teaser__header-row">
              <div className="bf-team-teaser__intro">
                <h2 className="bf-section-headline m-0 text-ink">{headline}</h2>
                <p className="bf-body-2 m-0 text-[var(--bf-color-light-64)]">{subheadline}</p>
              </div>
              <BfCtaButton
                href={cta.href}
                label={cta.label}
                variant="accent"
                className="shrink-0 text-tone-strong"
              />
            </div>
          </header>
        </div>
      </div>

      <div
        ref={sliderRef}
        className={`bf-team-teaser__slider ${entranceClass(sliderVisible)}`}
        style={{ transitionDelay: '100ms' }}
      >
        <div ref={viewportRef} className="bf-team-teaser__viewport">
          <div
            ref={trackRef}
            className={`bf-team-teaser__track ${trackTransition ? '' : 'bf-team-teaser__track--instant'}`}
            style={trackStyle}
            onTransitionEnd={(event) => {
              if (event.target !== event.currentTarget || event.propertyName !== 'transform') return
              normalizeLoopIndex()
            }}
          >
            {loopedSlides.map((slide, index) => (
              <div
                key={`${slide.video ?? slide.name}-${index}`}
                className={`bf-team-teaser__slide ${slide.video ? 'bf-team-teaser__slide--video' : ''} ${
                  index === activeSlide ? 'is-active' : ''
                }`}
              >
                <TeamSlideCard slide={slide} isActive={index === activeSlide} />
              </div>
            ))}
          </div>
        </div>

        <div className="bf-team-teaser__slider-nav">
          <SliderNavButton direction="prev" onClick={goPrev} />
          <SliderNavButton direction="next" onClick={goNext} />
        </div>
      </div>
    </section>
  )
}

export default TeamTeaserSection
