import { CalendarClock, CreditCard, ShieldCheck, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  financingTeaserContent,
  type FinancingOption,
  type FinancingOptionIcon,
} from '../../data/fallback'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfSectionLabel } from '../ui/BfSectionLabel'
import { entranceClass } from '../../lib/entrance'
import { BfIcon } from '../ui/BfIcon'

const optionIcons: Record<FinancingOptionIcon, LucideIcon> = {
  deferred: CalendarClock,
  financing: CreditCard,
  insurance: ShieldCheck,
}

function FinancingOptionRow({ label, icon }: FinancingOption) {
  const Icon = optionIcons[icon]

  return (
    <li className="bf-financing-teaser__option">
      <span className="bf-financing-teaser__option-icon" aria-hidden>
        <BfIcon icon={Icon} size="sm" />
      </span>
      <span className="bf-body-3 text-ink">{label}</span>
    </li>
  )
}

export function FinancingTeaserSection() {
  const {
    label,
    headlineBefore,
    headlineAfter,
    subheadline,
    monthlyFrom,
    options,
    reassurance,
    cta,
  } = financingTeaserContent

  const [visible, setVisible] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = panelRef.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="bf-financing-teaser bf-section">
      <div className="bf-shell-px">
        <div className="bf-container mx-auto w-full max-w-[var(--bf-container-lg)]">
          <div ref={panelRef} className={`bf-financing-teaser__panel ${entranceClass(visible, true)}`}>
            <div className="bf-financing-teaser__glow" aria-hidden />

            <div className="bf-financing-teaser__layout">
              <div className="bf-financing-teaser__copy">
                <BfSectionLabel tone="on-dark">{label}</BfSectionLabel>

                <h2 className="bf-section-headline bf-financing-teaser__headline m-0 text-ink">
                  <span>{headlineBefore}</span>
                  <span className="bf-financing-teaser__headline-mark" aria-hidden>
                    ≠
                  </span>
                  <span>{headlineAfter}</span>
                </h2>

                <p className="bf-body-2 m-0 text-[var(--bf-color-light-64)]">{subheadline}</p>
                <p className="bf-body-3 m-0 text-[var(--bf-color-light-48)]">{reassurance}</p>

                <BfCtaButton
                  href={cta.href}
                  label={cta.label}
                  variant="accent"
                  className="text-tone-strong"
                />
              </div>

              <aside className="bf-financing-teaser__aside">
                <div className="bf-financing-teaser__price-card">
                  <p className="bf-label-1 m-0 text-[var(--bf-color-light-64)]">Implantacija</p>
                  <p className="bf-financing-teaser__price m-0 text-ink">
                    <span className="bf-financing-teaser__price-prefix">{monthlyFrom.prefix}</span>
                    <span className="bf-financing-teaser__price-amount">
                      {monthlyFrom.amount}
                      {monthlyFrom.currency}
                    </span>
                    <span className="bf-financing-teaser__price-period">{monthlyFrom.period}</span>
                  </p>
                </div>

                <ul className="bf-financing-teaser__options">
                  {options.map((option) => (
                    <FinancingOptionRow key={option.label} {...option} />
                  ))}
                </ul>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FinancingTeaserSection
