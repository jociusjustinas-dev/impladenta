import { Bone, ChevronDown, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react'
import {
  clinicLocations,
  headerCta,
  mainNavItems,
  routes,
  servicesMegaMenu,
  servicesMegaMenuHub,
} from '../../data/navigation'
import { siteConfig } from '../../data/fallback'
import { useAnimatedDropdown } from '../../hooks/useAnimatedDropdown'
import { BfCtaButton } from '../ui/BfCtaButton'
import { BfIcon } from '../ui/BfIcon'

function NavLink({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <a href={href} onClick={onClick} className="bf-nav-link bf-body-3 whitespace-nowrap">
      {label}
    </a>
  )
}

function HeaderCta({ className = '', onClick }: { className?: string; onClick?: () => void }) {
  return (
    <BfCtaButton
      href={headerCta.href}
      label={headerCta.label}
      variant="accent"
      onClick={onClick}
      className={`text-tone-strong ${className}`}
    />
  )
}

function HeaderCtaWithFomo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { isOpen, isVisible, open, close, panelClass } = useAnimatedDropdown(400)

  useEffect(() => {
    if (!isVisible) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isVisible, close])

  const handleCtaClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!isOpen) {
      event.preventDefault()
      open()
    }
  }

  return (
    <div ref={wrapRef} className="relative overflow-visible">
      <BfCtaButton
        href={headerCta.href}
        label={headerCta.label}
        variant="accent"
        className="text-tone-strong"
        onClick={handleCtaClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
      />

      {isVisible && (
        <div
          className={`bf-nav-cta-fomo ${panelClass}`}
          role="tooltip"
          aria-hidden={!isOpen}
        >
          <div className="bf-nav-cta-fomo__inner">
            <div className="bf-nav-cta-fomo__bubble">
              <p className="bf-nav-cta-fomo__text m-0 text-tone-strong">{headerCta.fomo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HeaderPhoneDropdown() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const { isOpen, isVisible, open, close, scheduleClose, panelClass } = useAnimatedDropdown(450)

  useEffect(() => {
    if (!isVisible) return

    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) {
        close()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [isVisible, close])

  const isDesktop = () => window.matchMedia('(min-width: 992px)').matches

  return (
    <div
      ref={wrapRef}
      className="relative flex items-center self-stretch"
      onMouseEnter={() => {
        if (isDesktop()) open()
      }}
      onMouseLeave={() => {
        if (isDesktop()) scheduleClose()
      }}
    >
      <button
        type="button"
        onClick={() => {
          if (!isDesktop()) {
            if (isOpen) close()
            else open()
          }
        }}
        className="bf-nav-phone"
        aria-label="Klinikų telefonai"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="bf-nav-phone__icon">
          <BfIcon icon={Phone} size="phone" />
        </span>
      </button>

      {isVisible && (
        <div className={`bf-nav-dropdown-small ${panelClass}`}>
          <div className="bf-nav-dropdown-small__panel flex min-w-[14.5rem] flex-col gap-1 p-2">
            {clinicLocations.map((loc) => (
              <a
                key={loc.id}
                href={`tel:${loc.phoneTel}`}
                onClick={() => close()}
                className="bf-nav-dropdown-item flex flex-col gap-0.5 rounded-bf-sm px-3 py-2 text-tone-strong no-underline transition-colors"
              >
                <span className="bf-label-1">{loc.name}</span>
                <span className="bf-body-3">{loc.phone}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function ServiceMegaMenuItem({
  item,
  showIcon = false,
  onNavigate,
}: {
  item: (typeof servicesMegaMenu)[number]['items'][number]
  showIcon?: boolean
  onNavigate?: () => void
}) {
  return (
    <a
      href={item.href}
      onClick={onNavigate}
      className={`bf-nav-dropdown-item relative flex overflow-hidden rounded-bf-sm p-2 text-tone-strong no-underline transition-colors duration-300 ${
        showIcon ? 'items-center gap-4' : 'items-start gap-0'
      }`}
    >
      {showIcon && (
        <div className="relative z-[2] flex flex-none items-center justify-center rounded-bf-sm bg-lift p-3 text-tone-medium">
          <div className="flex h-6 w-6 items-center justify-center">
            <BfIcon icon={Bone} size="sm" />
          </div>
        </div>
      )}
      <div className="relative z-[2] flex flex-col items-start justify-center">
        <div
          className={`bf-body-3 ${item.flagship || item.hub ? 'font-medium' : ''} ${item.hub ? 'text-accent' : 'text-tone-strong'}`}
        >
          {item.label}
        </div>
        <div className="bf-body-3 text-tone-subtle">{item.desc}</div>
      </div>
    </a>
  )
}

function ServicesMegaMenuPanel({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="bf-nav-mega-menu">
      <div className="bf-nav-mega-menu__inner flex w-full flex-row items-stretch justify-between gap-6 p-6">
        {servicesMegaMenu.map((col, colIdx) => (
          <div key={col.label} className="flex min-w-0 flex-1 flex-col gap-4 self-start">
            <div className="flex w-full flex-col gap-4">
              <div className="bf-nav-mega-menu__heading text-tone-strong">{col.label}</div>
              <div className="h-px w-full bg-border-subtle" />
            </div>
            <div className="flex flex-col gap-1">
              {col.items.map((item) => (
                <ServiceMegaMenuItem
                  key={item.href}
                  item={item}
                  showIcon={colIdx === 0}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>
        ))}

        <a
          href={servicesMegaMenuHub.href}
          onClick={onNavigate}
          className="bf-nav-mega-menu__hub relative flex w-[min(15rem,22vw)] flex-none flex-col items-start justify-end overflow-hidden rounded-bf-md p-5 text-ink no-underline"
          style={{
            backgroundImage: `url(${servicesMegaMenuHub.image})`,
            backgroundSize: 'cover',
            backgroundPosition: '100% 35%',
          }}
        >
          <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-ink-dark via-[var(--bf-color-dark-64)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[var(--bf-color-dark-32)] to-transparent backdrop-blur-[5px]" />
          <div className="relative z-[2] flex flex-col items-start gap-3">
            <div className="bf-h6 text-ink">{servicesMegaMenuHub.title}</div>
            <p className="bf-body-3 m-0 text-[var(--bf-color-light-88)]">{servicesMegaMenuHub.desc}</p>
            <BfCtaButton
              as="span"
              label={servicesMegaMenuHub.cta}
              variant="ghost-on-dark"
              className="relative"
            />
          </div>
        </a>
      </div>
    </div>
  )
}

function MobileAccordionToggle({ open }: { open: boolean }) {
  return (
    <span className="flex items-center justify-center p-2">
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="absolute h-[0.094rem] w-[90%] bg-tone-strong" />
        {!open && <span className="absolute h-[90%] w-[0.094rem] bg-tone-strong" />}
      </span>
    </span>
  )
}

function ServicesMobileAccordion({ onNavigate }: { onNavigate?: () => void }) {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  const toggleCategory = (label: string) => {
    setOpenCategory((prev) => (prev === label ? null : label))
  }

  return (
    <div className="flex flex-col gap-4 pb-2 pt-2">
      {servicesMegaMenu.map((col, colIdx) => {
        const isOpen = openCategory === col.label

        return (
          <div key={col.label} className="flex flex-col gap-2">
            <button
              type="button"
              className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent py-0 text-left text-tone-strong"
              onClick={() => toggleCategory(col.label)}
            >
              <span className="bf-label-1">{col.label}</span>
              <MobileAccordionToggle open={isOpen} />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                isOpen ? 'max-h-[32rem]' : 'max-h-0'
              }`}
            >
              <div className="flex flex-col gap-1 pb-1">
                {col.items.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={onNavigate}
                    className="bf-nav-dropdown-item rounded-bf-sm p-2 text-tone-strong no-underline transition-colors"
                  >
                    <div className={`flex ${colIdx === 0 ? 'items-center gap-3' : 'flex-col items-start'}`}>
                      {colIdx === 0 && (
                        <div className="flex flex-none items-center justify-center rounded-bf-sm bg-lift p-2 text-tone-medium">
                          <span className="flex h-4 w-4 items-center justify-center">
                            <BfIcon icon={Bone} size="xs" />
                          </span>
                        </div>
                      )}
                      <div className="flex flex-col items-start">
                        <span
                          className={`bf-body-3 ${item.flagship ? 'font-medium' : ''}`}
                        >
                          {item.label}
                        </span>
                        <span className="bf-body-3 text-tone-subtle">{item.desc}</span>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        )
      })}

      <a
        href={servicesMegaMenuHub.href}
        onClick={onNavigate}
        className="bf-nav-services-mobile-all"
      >
        {servicesMegaMenuHub.cta}
      </a>
    </div>
  )
}

function NavDropdownTrigger({ label, open }: { label: string; open: boolean }) {
  return (
    <div
      className={`bf-nav-link bf-nav-link--trigger bf-body-3 whitespace-nowrap ${open ? 'is-open' : ''}`}
      aria-expanded={open}
    >
      {label}
      <span className={`bf-nav-chevron ml-1 ${open ? 'is-open' : ''}`}>
        <BfIcon icon={ChevronDown} size="chevron" />
      </span>
    </div>
  )
}

export function NavigationBarSection() {
  const navShellRef = useRef<HTMLDivElement>(null)
  const servicesMenu = useAnimatedDropdown(350)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)

  useEffect(() => {
    const node = navShellRef.current
    if (!node) return

    const syncNavHeight = () => {
      const height = Math.ceil(node.getBoundingClientRect().height)
      document.documentElement.style.setProperty('--bf-nav-total', `${height}px`)
      document.documentElement.style.setProperty(
        '--bf-hero-height',
        `calc(100vh - ${height}px - var(--bf-hero-gap) - var(--bf-shell-padding))`,
      )
    }

    syncNavHeight()
    const observer = new ResizeObserver(syncNavHeight)
    observer.observe(node)
    window.addEventListener('resize', syncNavHeight)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', syncNavHeight)
    }
  }, [mobileOpen])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const closeMobile = () => setMobileOpen(false)

  return (
    <div
      ref={navShellRef}
      className="bf-nav-fixed fixed inset-x-0 top-0 z-[999] flex items-center justify-center max-[991px]:block"
    >
      <div className="bf-shell-px z-[2] w-full bg-transparent">
        <div className="bf-nav-shell mx-auto w-full">
          <div className="bf-nav-bar relative flex w-full items-center justify-between overflow-visible rounded-bf-sm bg-lift-2">
            <a
              href={routes.home}
              className="bf-nav-logo-wrap relative z-[2] shrink-0"
            >
              <span className="bf-nav-logo font-semibold tracking-tight text-tone-strong">
                {siteConfig.name}
              </span>
            </a>

            <nav className="bf-nav-menu relative z-[2] min-w-0 max-[991px]:hidden">
              <div className="bf-nav-menu-inner flex items-center">
                <div
                  className="relative shrink-0"
                  onMouseEnter={servicesMenu.open}
                  onMouseLeave={() => servicesMenu.scheduleClose()}
                >
                  <NavDropdownTrigger label="Paslaugos" open={servicesMenu.isOpen} />
                </div>

                {mainNavItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </div>
            </nav>

            <div className="bf-nav-actions relative z-[2] flex min-w-0 flex-1 items-center justify-end gap-2.5 self-stretch overflow-visible max-[767px]:gap-2">
              <HeaderPhoneDropdown />

              <div className="max-[991px]:hidden">
                <HeaderCtaWithFomo />
              </div>

              <div className="bf-nav-cta-mobile min-w-0">
                <HeaderCta className="bf-nav-cta-mobile__btn text-tone-strong" />
              </div>

              <button
                type="button"
                className="bf-nav-mobile-toggle backdrop-blur-sm"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label={mobileOpen ? 'Uždaryti meniu' : 'Atidaryti meniu'}
                aria-expanded={mobileOpen}
                aria-controls="bf-nav-mobile-panel"
              >
                <span className="flex h-4 w-4 items-center justify-center">
                  {mobileOpen ? <BfIcon icon={X} size="menu" /> : <BfIcon icon={Menu} size="menu" />}
                </span>
              </button>
            </div>
          </div>

          {servicesMenu.isVisible && (
            <div
              className={`bf-nav-mega-menu-wrap max-[991px]:hidden ${servicesMenu.panelClass}`}
              onMouseEnter={servicesMenu.open}
              onMouseLeave={() => servicesMenu.scheduleClose()}
            >
              <ServicesMegaMenuPanel />
            </div>
          )}
        </div>

        <div
          id="bf-nav-mobile-panel"
          className={`bf-nav-mobile-panel ${mobileOpen ? 'is-open' : ''}`}
          aria-hidden={!mobileOpen}
        >
          <div className="mx-auto w-full max-w-[var(--bf-container-lg)]">
            <div className="bf-nav-mobile-panel__scroll flex w-full flex-col overflow-y-auto rounded-b-bf-md bg-lift-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
                <div className="flex flex-col gap-4 px-5 py-4">
                  <HeaderCta className="w-full justify-center" onClick={closeMobile} />

                  <div className="h-px w-full bg-[var(--bf-color-dark-8)]" />

                  <button
                    type="button"
                    className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent py-0 text-left text-tone-strong"
                    onClick={() => setMobileServicesOpen((prev) => !prev)}
                  >
                    <span className="bf-h5">Paslaugos</span>
                    <span className="flex items-center justify-center p-2">
                      <span className="relative flex h-4 w-4 items-center justify-center">
                        <span className="absolute h-[0.094rem] w-[90%] bg-tone-strong" />
                        {!mobileServicesOpen && (
                          <span className="absolute h-[90%] w-[0.094rem] bg-tone-strong" />
                        )}
                      </span>
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileServicesOpen ? 'max-h-[48rem]' : 'max-h-0'
                    }`}
                  >
                    <ServicesMobileAccordion onNavigate={closeMobile} />
                  </div>

                  <div className="h-px w-full bg-[var(--bf-color-dark-8)]" />

                  {mainNavItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      className="bf-nav-link--mobile bf-h5"
                    >
                      {item.label}
                    </a>
                  ))}

                  <div className="mt-2 h-px w-full bg-[var(--bf-color-dark-8)]" />

                  <div className="flex flex-col gap-3 pt-2">
                    {clinicLocations.map((loc) => (
                      <a
                        key={loc.id}
                        href={`tel:${loc.phoneTel}`}
                        className="flex flex-col gap-0.5 rounded-bf-sm bg-lift p-3 text-tone-strong no-underline"
                      >
                        <span className="bf-label-1">{loc.name}</span>
                        <span className="bf-body-3">{loc.phone}</span>
                        <span className="bf-body-3 text-tone-subtle">{loc.address}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBarSection
