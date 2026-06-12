import {
  clinicLocations,
  footerAtmintines,
  footerCtaPanel,
  footerLegal,
  footerMenuLinks,
  footerSocial,
  routes,
} from '../data/navigation'
import { siteConfig } from '../data/fallback'
import { BfCtaButton } from './ui/BfCtaButton'

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      className="bf-body-3 text-tone-subtle no-underline transition-colors hover:text-tone-strong"
    >
      {label}
    </a>
  )
}

export function Footer() {
  const { title, description, cta } = footerCtaPanel

  return (
    <footer className="bf-site-footer">
      <div className="bf-container bf-site-footer__shell">
        <div className="bf-site-footer__layout">
          <div className="bf-site-footer__grid">
            <div className="flex flex-col gap-6">
              <a
                href={routes.home}
                className="text-lg font-semibold tracking-tight text-tone-strong no-underline"
              >
                {siteConfig.name}
              </a>

              {clinicLocations.map((loc) => (
                <div key={loc.id} className="flex flex-col gap-1">
                  <p className="bf-label-1 text-tone-strong">{loc.name}</p>
                  <p className="bf-body-3 text-tone-subtle">{loc.address}</p>
                  <a
                    href={`tel:${loc.phoneTel}`}
                    className="bf-body-3 text-tone-strong no-underline transition-colors hover:text-accent"
                  >
                    {loc.phone}
                  </a>
                  <p className="bf-body-3 text-tone-faint">{loc.hours}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <p className="bf-label-1 text-tone-strong">Meniu</p>
              <nav className="flex flex-col gap-2">
                {footerMenuLinks.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <p className="bf-label-1 text-tone-strong">Atmintinės</p>
              <nav className="flex flex-col gap-2">
                {footerAtmintines.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </nav>
            </div>

            <div className="flex flex-col gap-4">
              <p className="bf-label-1 text-tone-strong">Sekite mus</p>
              <nav className="flex flex-col gap-2">
                {footerSocial.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bf-body-3 text-tone-subtle no-underline transition-colors hover:text-tone-strong"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>

          <aside className="bf-site-footer__cta-panel">
            <div className="bf-site-footer__cta-panel-inner">
              <div className="bf-site-footer__cta-panel-copy">
                <h3 className="bf-site-footer__cta-panel-title m-0 text-accent">{title}</h3>
                <p className="bf-body-3 m-0 text-ink-light">{description}</p>
              </div>

              <BfCtaButton
                href={cta.href}
                label={cta.label}
                variant="accent"
                className="w-fit max-w-full text-tone-strong"
              />
            </div>
          </aside>
        </div>

        <div className="bf-site-footer__legal">
          <div className="bf-site-footer__legal-inner flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="bf-body-3 text-tone-faint">{footerLegal.copyright}</p>
            <div className="flex flex-wrap items-center gap-4">
              <FooterLink href={footerLegal.privacy.href} label={footerLegal.privacy.label} />
              <FooterLink href={footerLegal.cookies.href} label={footerLegal.cookies.label} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
