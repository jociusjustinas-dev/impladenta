export const routes = {
  home: '/',
  registracija: '/registracija',
  kainos: '/kainos',
  apie: '/apie',
  komanda: '/komanda',
  pasiulymai: '/pasiulymai',
  kontaktai: '/kontaktai',
  paslaugos: '/paslaugos',
  privatumas: '/privatumo-politika',
  slapukai: '/slapuku-politika',
} as const

export type LocationId = 'kaunas' | 'raseiniai'

export interface ClinicLocation {
  id: LocationId
  name: string
  address: string
  phone: string
  phoneTel: string
  hours: string
}

export const clinicLocations: ClinicLocation[] = [
  {
    id: 'kaunas',
    name: 'Kaunas',
    address: 'Laisvės al. 00, Kaunas',
    phone: '+370 37 000 000',
    phoneTel: '+37037000000',
    hours: 'Pr–Pn 8:00–20:00, Š 9:00–15:00',
  },
  {
    id: 'raseiniai',
    name: 'Raseiniai',
    address: 'Vilniaus g. 00, Raseiniai',
    phone: '+370 428 00 000',
    phoneTel: '+37042800000',
    hours: 'Pr–Pn 8:00–18:00',
  },
]

export const defaultLocationId: LocationId = 'kaunas'

export interface ServiceNavItem {
  label: string
  desc: string
  href: string
  flagship?: boolean
  hub?: boolean
}

export interface ServiceMegaMenuColumn {
  label: string
  items: ServiceNavItem[]
}

export const servicesMegaMenu: ServiceMegaMenuColumn[] = [
  {
    label: 'Implantacija ir atkūrimas',
    items: [
      {
        label: 'Implantacija',
        desc: 'Skaitmeninis planavimas, 3D spausdinimas klinikoje',
        href: '/paslaugos/implantacija',
        flagship: true,
      },
      {
        label: 'Protezavimas',
        desc: 'Tvarūs protezai ir estetika vienoje klinikoje',
        href: '/paslaugos/protezavimas',
        flagship: true,
      },
      {
        label: 'Atkūrimas per 1 valandą',
        desc: 'Greitas atkūrimas — viena procedūra',
        href: '/paslaugos/atkurimas-per-1-valanda',
      },
      {
        label: 'Atkūrimas per 3 valandas',
        desc: 'Implantacija ir laikini dantys tą pačią dieną',
        href: '/paslaugos/atkurimas-per-3-valandas',
      },
    ],
  },
  {
    label: 'Gydymas ir estetika',
    items: [
      {
        label: 'Dantų gydymas',
        desc: 'Konservatyvus gydymas be skausmo',
        href: '/paslaugos/dantu-gydymas',
      },
      {
        label: 'Šaknų kanalų gydymas',
        desc: 'Endodontinis gydymas su mikroskopu',
        href: '/paslaugos/saknu-kanalu-gydymas',
      },
      {
        label: 'Periodontologinis gydymas',
        desc: 'Dantenų ligų gydymas ir profilaktika',
        href: '/paslaugos/periodontologinis-gydymas',
      },
      {
        label: 'Estetinis plombavimas',
        desc: 'Natūrali šypsena be kompromisų',
        href: '/paslaugos/estetinis-plombavimas',
      },
      {
        label: 'Dantų balinimas',
        desc: 'Šviesesnė šypsena saugiai ir efektyviai',
        href: '/paslaugos/dantu-balinimas',
      },
    ],
  },
  {
    label: 'Chirurgija ir priežiūra',
    items: [
      {
        label: 'Dantų tiesinimas',
        desc: 'Skaidrios kapos (aligneriai)',
        href: '/paslaugos/dantu-tiesinimas',
      },
      {
        label: 'Burnos chirurgija',
        desc: 'Sinuso pakėlimas, šalinimas, augmentacija',
        href: '/paslaugos/burnos-chirurgija',
      },
      {
        label: 'Dantų šalinimas',
        desc: 'Saugiai ir be skausmo, taip pat protiniai dantys',
        href: '/paslaugos/dantu-salinimas',
      },
      {
        label: 'Vaikų odontologija',
        desc: 'Švelni priežiūra mažiesiems',
        href: '/paslaugos/vaiku-odontologija',
      },
      {
        label: 'Burnos higiena',
        desc: 'Profesionalus valymas ir prevencija',
        href: '/paslaugos/burnos-higiena',
      },
    ],
  },
]

export const servicesDropdown: ServiceNavItem[] = servicesMegaMenu.flatMap((col) => col.items)

export const servicesMegaMenuHub = {
  title: 'Nerandi savo paslaugos?',
  desc: 'Nuo implantacijos iki vaikų odontologijos — visas katalogas vienoje vietoje.',
  cta: 'Visos paslaugos',
  href: routes.paslaugos,
  image: '/images/team-portrait.png',
} as const

export const mainNavItems = [
  { label: 'Kainos ir finansavimas', href: routes.kainos },
  { label: 'Apie kliniką', href: routes.apie },
  { label: 'Komanda', href: routes.komanda },
  { label: 'Pasiūlymai', href: routes.pasiulymai },
  { label: 'Kontaktai', href: routes.kontaktai },
] as const

export const headerCta = {
  label: 'Registruotis vizitui',
  href: routes.registracija,
  fomo: 'Šią savaitę liko keli laikai — registruokitės dabar',
} as const

export const footerCtaPanel = {
  title: 'Pasiruošę pradėti?',
  description: 'Pasirinkite kliniką ir laiką.',
  cta: headerCta,
} as const

export const footerMenuLinks = [
  { label: 'Paslaugos', href: routes.paslaugos },
  { label: 'Komanda', href: routes.komanda },
  { label: 'Kainos ir finansavimas', href: routes.kainos },
  { label: 'Pasiūlymai', href: routes.pasiulymai },
  { label: 'Apie kliniką', href: routes.apie },
  { label: 'Kontaktai', href: routes.kontaktai },
] as const

export const footerAtmintines = [
  { label: 'Po implantacijos', href: '/atmintines/po-implantacijos' },
  { label: 'Po danties šalinimo', href: '/atmintines/po-danties-salinimo' },
  { label: 'Po chirurgijos', href: '/atmintines/po-chirurgijos' },
  { label: 'Burnos higiena', href: '/atmintines/burnos-higiena' },
] as const

export const footerSocial = [
  { label: 'Facebook', href: 'https://facebook.com/impladenta' },
  { label: 'Instagram', href: 'https://instagram.com/impladenta' },
] as const

export const footerLegal = {
  copyright: '© 2026 Odontologijos klinika Impladenta',
  privacy: { label: 'Privatumo politika', href: routes.privatumas },
  cookies: { label: 'Slapukų politika', href: routes.slapukai },
} as const
