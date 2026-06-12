import { siteConfig } from '../data/fallback'

const navItems = [
  { label: 'Paslaugos', href: '#paslaugos' },
  { label: 'Apie mus', href: '#apie' },
  { label: 'Kontaktai', href: '#kontaktai' },
]

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-ink/90 backdrop-blur-md">
      <div className="bf-container flex items-center justify-between py-4">
        <a href="#" className="font-serif text-xl font-normal tracking-tight text-tone-strong">
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="bf-body-3 font-medium text-tone-subtle transition hover:text-tone-strong"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
          className="bf-btn bf-btn--primary bf-button-2"
        >
          Skambinti
        </a>
      </div>
    </header>
  )
}
