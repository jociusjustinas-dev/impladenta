import { Clock, CreditCard, MapPin, Sparkles, type LucideIcon } from 'lucide-react'
import { trustBarItems, type TrustBarIcon } from '../../data/fallback'
import { BfIcon } from '../ui/BfIcon'

const trustIcons: Record<TrustBarIcon, LucideIcon> = {
  locations: MapPin,
  services: Sparkles,
  'same-day': Clock,
  financing: CreditCard,
}

function TrustBarCard({ title, icon }: (typeof trustBarItems)[number]) {
  return (
    <li className="bf-trust-bar__card">
      <div className="bf-trust-bar__icon" aria-hidden>
        <BfIcon icon={trustIcons[icon]} size={20} className="text-tone-strong" />
      </div>
      <p className="bf-trust-bar__title m-0 text-tone-strong">{title}</p>
    </li>
  )
}

function TrustBarGroup({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="bf-trust-bar__group" aria-hidden={duplicate || undefined}>
      {trustBarItems.map((item) => (
        <TrustBarCard key={`${duplicate ? 'dup-' : ''}${item.icon}`} {...item} />
      ))}
    </ul>
  )
}

export function TrustBarSection() {
  return (
    <section className="bf-trust-bar" aria-label="Klinikos privalumai">
      <div className="bf-trust-bar__viewport">
        <div className="bf-trust-bar__track">
          <TrustBarGroup />
          <TrustBarGroup duplicate />
        </div>
      </div>
    </section>
  )
}

export default TrustBarSection
