import { siteConfig } from '../data/fallback'

export function Contact() {
  return (
    <section id="kontaktai" className="bf-section--sm">
      <div className="bf-container">
        <div className="rounded-bf-lg bg-ink-dark px-8 py-12 text-ink md:px-12">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="bf-label-1 text-tone-faint">Kontaktai</p>
              <h2 className="mt-4 text-ink">Susisiekite</h2>
              <p className="bf-body-1 mt-4 text-tone-faint">
                Užsiregistruokite konsultacijai — atsakysime per 24 val.
              </p>
            </div>

            <div className="bf-body-2 space-y-4 text-ink/80">
              <p>
                <span className="font-medium text-ink">Telefonas:</span>{' '}
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="hover:underline">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <span className="font-medium text-ink">El. paštas:</span>{' '}
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </p>
              <p>
                <span className="font-medium text-ink">Adresas:</span>{' '}
                {siteConfig.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
