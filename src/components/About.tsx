import { isWordPressConfigured } from '../lib/wp-api'

export function About() {
  const wpReady = isWordPressConfigured()

  return (
    <section id="apie" className="bf-section">
      <div className="bf-container">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="bf-label-1 text-tone-medium">Apie</p>
            <h2 className="mt-4">Apie Impladenta</h2>
            <p className="bf-body-1 mt-4 text-tone-subtle">
              Headless architektūra: React + Baseframe™ dizainas front-end'e ir
              WordPress kaip CMS per REST API.
            </p>
            <p className="bf-body-2 mt-4 text-tone-subtle">
              Kai prijungsite WordPress, turinį redaguosite administracinėje
              panelėje — front-end automatiškai gaus atnaujinimus.
            </p>
          </div>

          <div className="bf-card p-6">
            <h3 className="bf-h6">WordPress būsena</h3>
            <div className="mt-4 flex items-center gap-3">
              <span
                className={`h-3 w-3 rounded-full ${wpReady ? 'bg-success' : 'bg-warning'}`}
              />
              <span className="bf-body-3 text-tone-subtle">
                {wpReady
                  ? 'WordPress API prijungtas'
                  : 'Nustatykite VITE_WP_API_URL .env faile'}
              </span>
            </div>
            <code className="bf-body-3 mt-4 block rounded-bf-sm bg-lift p-3 text-tone-strong">
              VITE_WP_API_URL=https://jusu-wordpress.lt
            </code>
          </div>
        </div>
      </div>
    </section>
  )
}
