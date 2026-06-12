import { useEffect, useRef, useState } from 'react'
import { finalCtaContent } from '../../data/fallback'
import { Footer } from '../Footer'
import { BfCtaButton } from '../ui/BfCtaButton'
import { entranceClass } from '../../lib/entrance'
import { BfSectionLabel } from '../ui/BfSectionLabel'

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

export function CtaSection() {
  const { label, headlineLines, subheadline, cta, image } = finalCtaContent
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = sectionRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bf-final-cta" aria-labelledby="final-cta-heading">
      <div className="bf-final-cta__media" aria-hidden>
        <img
          src={image.src}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          alt=""
          className="bf-final-cta__image"
          style={image.position ? { objectPosition: image.position } : undefined}
        />

        <div className="bf-final-cta__overlay-dark" />

        <div className="bf-final-cta__blur-stack">
          <div className="bf-final-cta__blur-rotate">
            {BLUR_LAYERS.map((layer) => (
              <div
                key={layer.blur}
                className="bf-final-cta__blur-layer"
                style={{
                  backdropFilter: `blur(${layer.blur})`,
                  WebkitBackdropFilter: `blur(${layer.blur})`,
                  WebkitMaskImage: layer.mask,
                  maskImage: layer.mask,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="bf-shell-px bf-final-cta__frame">
        <div className="bf-final-cta__shell">
          <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
            <div className={`bf-final-cta__content ${entranceClass(visible, true)}`}>
              <BfSectionLabel tone="on-dark">{label}</BfSectionLabel>

              <h2 id="final-cta-heading" className="bf-section-headline bf-final-cta__headline m-0 text-ink">
                {headlineLines.map((line) => (
                  <span key={line} className="bf-final-cta__headline-line">
                    {line}
                  </span>
                ))}
              </h2>

              <p className="bf-final-cta__subheadline bf-body-1 m-0 text-[var(--bf-color-light-88)]">
                {subheadline}
              </p>

              <BfCtaButton
                href={cta.href}
                label={cta.label}
                variant="accent"
                className="text-tone-strong"
              />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </section>
  )
}

export default CtaSection
