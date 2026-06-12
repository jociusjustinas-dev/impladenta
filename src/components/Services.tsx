import { services } from '../data/fallback'

export function Services() {
  return (
    <section id="paslaugos" className="bf-section border-t border-border-subtle bg-lift/40">
      <div className="bf-container">
        <div className="max-w-2xl">
          <p className="bf-label-1 text-tone-medium">Paslaugos</p>
          <h2 className="mt-4">Mūsų paslaugos</h2>
          <p className="bf-body-1 mt-4 text-tone-subtle">
            Turinį galėsite valdyti per WordPress — kol kas rodomi statiniai
            duomenys.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="bf-card p-6 transition hover:border-border-medium"
            >
              <h3 className="bf-h5">{service.title}</h3>
              <p className="bf-body-2 mt-3 text-tone-subtle">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
