import { Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { testimonialsContent, type TestimonialReview } from '../../data/fallback'
import { entranceClass } from '../../lib/entrance'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfGoogleRatingRow } from '../ui/BfGoogleRatingRow'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { BfIcon } from '../ui/BfIcon'

function TestimonialCard({ text, author, image, imageAlt }: TestimonialReview) {
  return (
    <article className="bf-testimonials__card">
      <div className="bf-testimonials__card-top">
        <div className="bf-testimonials__stars" aria-label="5 iš 5 žvaigždučių">
          {Array.from({ length: 5 }).map((_, index) => (
            <BfIcon
              key={index}
              icon={Star}
              size="sm"
              className="bf-testimonials__star"
              fill="currentColor"
            />
          ))}
        </div>
        <p className="bf-body-2 m-0 text-tone-medium">{text}</p>
      </div>
      <div className="bf-testimonials__author">
        <div className="bf-testimonials__avatar">
          <img src={image} alt={imageAlt} loading="lazy" className="bf-testimonials__avatar-image" />
        </div>
        <p className="bf-testimonials__author-name m-0">{author}</p>
      </div>
    </article>
  )
}

function MarqueeColumn({
  reviews,
  direction,
  className = '',
}: {
  reviews: TestimonialReview[]
  direction: 'down' | 'up'
  className?: string
}) {
  const sets = [0, 1, 2, 3]

  return (
    <div className={`bf-testimonials__column ${className}`.trim()}>
      <div
        className={`bf-testimonials__column-track bf-testimonials__column-track--${direction}`}
      >
        {sets.map((setIndex) => (
          <div key={setIndex} className="bf-testimonials__column-set">
            {reviews.map((review) => (
              <TestimonialCard key={`${setIndex}-${review.author}`} {...review} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { label, headline, googleRating, reviews, cta } = testimonialsContent
  const [headerVisible, setHeaderVisible] = useState(false)
  const [marqueeVisible, setMarqueeVisible] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

  const columnReviews = [
    reviews.filter((_, index) => index % 3 === 0),
    reviews.filter((_, index) => index % 3 === 1),
    reviews.filter((_, index) => index % 3 === 2),
  ]

  useEffect(() => {
    const nodes = [
      { ref: headerRef, setter: setHeaderVisible, delay: 0 },
      { ref: marqueeRef, setter: setMarqueeVisible, delay: 120 },
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

  return (
    <section className="bf-testimonials bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <header
            ref={headerRef}
            className={`bf-testimonials__header ${entranceClass(headerVisible, true)}`}
          >
            <div className="bf-section-intro bf-section-intro--center bf-testimonials__header-copy">
              <BfSectionLabel tone="light">{label}</BfSectionLabel>
              <h2 className="bf-section-headline m-0 text-tone-strong">{headline}</h2>
            </div>

            <div className="bf-testimonials__rating-tile">
              <BfGoogleRatingRow
                href={googleRating.href}
                score={googleRating.heroScore}
                reviewCount={googleRating.reviewCount}
              />
              <p className="bf-testimonials__rating-text bf-body-2 m-0 text-tone-medium">
                {googleRating.text}
              </p>
            </div>
          </header>

          <div
            ref={marqueeRef}
            className={`bf-testimonials__marquee ${entranceClass(marqueeVisible)}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="bf-testimonials__marquee-fade bf-testimonials__marquee-fade--top" aria-hidden />
            <div className="bf-testimonials__marquee-fade bf-testimonials__marquee-fade--bottom" aria-hidden />

            <div className="bf-testimonials__marquee-grid">
              <MarqueeColumn reviews={columnReviews[0]} direction="down" />
              <MarqueeColumn
                reviews={columnReviews[1]}
                direction="up"
                className="bf-testimonials__column--hide-mobile-sm"
              />
              <MarqueeColumn
                reviews={columnReviews[2]}
                direction="down"
                className="bf-testimonials__column--hide-mobile"
              />
            </div>
          </div>

          <div className={`bf-testimonials__cta ${entranceClass(marqueeVisible)}`}>
            <BfCtaButton
              href={cta.href}
              label={cta.label}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
