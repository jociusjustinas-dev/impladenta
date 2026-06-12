export const siteConfig = {
  name: 'Impladenta',
  tagline: 'Profesionali dantų implantacija ir estetinė odontologija',
  phone: '+370 600 00000',
  email: 'info@impladenta.lt',
  address: 'Vilnius, Lietuva',
}

export const services = [
  {
    title: 'Dantų implantacija',
    description:
      'Modernūs implantai su garantija. Individualus gydymo planas ir skaitmeninis planavimas.',
  },
  {
    title: 'Estetinė odontologija',
    description:
      'Hollywood šypsena, laminatės ir balinimas — natūralus ir ilgalaikis rezultatas.',
  },
  {
    title: 'Chirurginė odontologija',
    description:
      'Sinuso pakėlimas, kaulo augmentacija ir kitos procedūros vienoje klinikoje.',
  },
  {
    title: 'Konsultacijos',
    description:
      'Nemokama pirminė konsultacija ir 3D diagnostika prieš gydymo plano sudarymą.',
  },
]

/** Home trust strip — vėliau galima pakeisti į stats (pacientai, implantai per metus ir pan.) */
export type TrustBarIcon = 'locations' | 'services' | 'same-day' | 'financing'

export type TrustBarItem = {
  title: string
  description: string
  icon: TrustBarIcon
}

export const trustBarItems: TrustBarItem[] = [
  {
    title: 'Klinikos Kaune ir Raseiniuose',
    description: 'Du miestai — viena komanda ir standartai',
    icon: 'locations',
  },
  {
    title: 'Visos odontologijos paslaugos vienoje vietoje',
    description: 'Nuo konsultacijos iki implantacijos ir protezavimo',
    icon: 'services',
  },
  {
    title: 'Laikini dantys per 1 dieną',
    description: '3D spausdinimas čia pat, klinikoje',
    icon: 'same-day',
  },
  {
    title: 'Atidėtas mokėjimas ir finansavimas',
    description: 'Lankstūs mokėjimo planai gydymui',
    icon: 'financing',
  },
]

export type ServicesBentoCardVariant = 'featured-dark' | 'light' | 'hub'

export type ServicesBentoCard = {
  id: string
  title: string
  description?: string
  href: string
  variant: ServicesBentoCardVariant
  image: string
  imagePosition?: string
}

export const servicesBentoContent = {
  label: 'Paslaugos',
  headline: 'Nuo higienos iki visų dantų',
  headlineLine2: 'atkūrimo per 3 valandas',
  subheadline:
    'Visų sričių specialistai dirba po vienu stogu — nereikės važinėti per tris klinikas.',
  ctaLabel: 'Plačiau',
  rows: [
    [
      {
        id: 'implantacija',
        title: 'Implantacija',
        description: 'Su laikinais dantimis išeini tą pačią dieną — spausdiname juos patys.',
        href: '/paslaugos/implantacija',
        variant: 'featured-dark',
        image: '/images/hero.jpg',
        imagePosition: '52% 40%',
      },
      {
        id: 'protezavimas',
        title: 'Protezavimas',
        description: 'Skaitmeninis planavimas, tikslus rezultatas, natūrali išvaizda.',
        href: '/paslaugos/protezavimas',
        variant: 'featured-dark',
        image: '/images/team-doctor-conversation.png',
        imagePosition: '42% 28%',
      },
    ],
    [
      {
        id: 'atkūrimas-1h',
        title: 'Atkūrimas per 1 valandą',
        description: 'Nuo konsultacijos iki laikinų dantų — viena valanda, viena klinika.',
        href: '/paslaugos/atkurimas-per-1-valanda',
        variant: 'featured-dark',
        image: '/images/team-portrait.png',
        imagePosition: '50% 22%',
      },
      {
        id: 'tiesinimas',
        title: 'Tiesinimas',
        description: 'Skaidrus planas ir vizitai, kurie derinami su tavo grafiku.',
        href: '/paslaugos/dantu-tiesinimas',
        variant: 'featured-dark',
        image: '/images/before-after-assistance.png',
        imagePosition: '50% 35%',
      },
    ],
    [
      {
        id: 'balinimas',
        title: 'Balinimas',
        description: 'Šviesesnė šypsena be dirbtinio efekto — parinksim saugų variantą tau.',
        href: '/paslaugos/dantu-balinimas',
        variant: 'featured-dark',
        image: '/images/before-after-professional.png',
        imagePosition: '55% 30%',
      },
      {
        id: 'visos-paslaugos',
        title: 'Visos paslaugos',
        description: 'Nuo higienos iki pilno atkūrimo — visas katalogas vienoje vietoje.',
        href: '/paslaugos',
        variant: 'hub',
        image: '/images/before-after-discussion.png',
        imagePosition: '50% 28%',
      },
    ],
  ] as ServicesBentoCard[][],
}

export const servicesSplitCards = servicesBentoContent.rows.flat()

export const servicesSplitContent = {
  label: 'Visos paslaugos',
  headline: servicesBentoContent.headline,
  headlineLine2: servicesBentoContent.headlineLine2,
  subheadline: servicesBentoContent.subheadline,
  cta: {
    label: 'Registruotis vizitui',
    href: '/registracija',
  },
  cards: servicesSplitCards,
}

export type WhyImpladentaIcon = 'same-day' | 'financing' | 'people' | 'comfort'

export type WhyImpladentaBlockVariant = 'light' | 'dark'

export type WhyImpladentaBlock = {
  title: string
  description: string
  icon: WhyImpladentaIcon
  variant?: WhyImpladentaBlockVariant
}

export const whyImpladentaContent = {
  label: 'Kodėl Impladenta',
  headline: 'Čia ne poliklinika.',
  subheadline: 'Eilės, talonėliai, laukimas koridoriuje? Ne pas mus.',
  blocks: [
    {
      title: 'Dantys tą pačią dieną.',
      description:
        '3D spausdintuvas — mūsų, ne laboratorijos. Todėl laikinus dantis gaunate iškart po implantacijos, o ne po savaitės.',
      icon: 'same-day',
    },
    {
      title: 'Lankstu su pinigais.',
      description:
        'Atidėtas mokėjimas, finansavimas, draudimas — surandame variantą, kuris tinka jums, o ne atvirkščiai.',
      icon: 'financing',
    },
    {
      title: 'Žmonės, ne numeriai eilėje.',
      description:
        'Gydymo planas pagal jus, ne pagal gaires. Klausimai? Klauskite, kiek norite.',
      icon: 'people',
      variant: 'dark',
    },
  ] satisfies WhyImpladentaBlock[],
  mediaBlock: {
    title: 'Laukimas, kuris nekankina.',
    description:
      'Kol gaminami dantys — privatus kambarys, televizorius. O fone groja ne „relax" fortepijonas, o normali muzika.',
    icon: 'comfort',
  } satisfies WhyImpladentaBlock,
  phoneImage:
    'https://byqsupply-components.netlify.app/baseframe/images/phone-widget_1phone-widget.avif',
  mediaImage: '/images/hero-consultation.png',
  cta: {
    label: 'Susipažinkite su klinika',
    href: '/apie',
  },
}

export type VisitProcessStep = {
  number: string
  title: string
  body: string
  image: string
  imagePosition?: string
}

export const visitProcessContent = {
  label: 'Kaip vyksta vizitas',
  headline: 'Bijote? Suprantame.',
  headlineLine2: 'Todėl viskas vyksta taip.',
  steps: [
    {
      number: '01',
      title: 'Registruojatės internetu',
      body: 'Užtrunka minutę, skambinti nereikia.',
      image: '/images/team-doctor-conversation.png',
      imagePosition: '42% 28%',
    },
    {
      number: '02',
      title: 'Konsultacija ir planas',
      body: 'Gydytojas paaiškina žmoniškai: kas, kiek užtruks ir kiek kainuos. Be staigmenų sąskaitoje.',
      image: '/images/before-after-discussion.png',
      imagePosition: '50% 28%',
    },
    {
      number: '03',
      title: 'Procedūra be skausmo',
      body: 'Modernios technologijos ir sedacija, jei reikia. Dauguma pacientų sako „tai čia jau viskas?"',
      image: '/images/before-after-professional.png',
      imagePosition: '55% 30%',
    },
    {
      number: '04',
      title: 'Išeinate su rezultatu',
      body: 'O jei implantacija, tai ir su laikinais dantimis tą pačią dieną.',
      image: '/images/before-after-assistance.png',
      imagePosition: '50% 35%',
    },
  ] satisfies VisitProcessStep[],
  cta: {
    label: 'Pradėti nuo registracijos',
    href: '/registracija',
  },
}

export type TeamTeaserSlide = {
  name: string
  role: string
  tag: string
  image?: string
  video?: string
  imagePosition?: string
}

export const teamTeaserContent = {
  label: 'Komanda',
  headline: 'Gydytojai — tokie patys žmonės',
  subheadline:
    'Jokio žiūrėjimo iš aukšto. Tiesiog specialistai, kurie išmano savo darbą ir paaiškina taip, kad suprastumėte.',
  cta: {
    label: 'Susipažinkite su komanda',
    href: '/komanda',
  },
  slides: [
    {
      name: 'Marius Malinauskas',
      role: 'Gydytojas implantologas',
      tag: 'Implantacija',
      video: '/videos/marius-malinauskas.mp4',
    },
    {
      name: 'Dr. Eglė Jonaitė',
      role: 'Ortodontė',
      tag: 'Tiesinimas',
      video: '/videos/team-member-wave.mp4',
    },
    {
      name: 'Marius Malinauskas',
      role: 'Gydytojas implantologas',
      tag: 'Implantacija',
      video: '/videos/marius-malinauskas.mp4',
    },
    {
      name: 'Dr. Eglė Jonaitė',
      role: 'Ortodontė',
      tag: 'Tiesinimas',
      video: '/videos/team-member-wave.mp4',
    },
    {
      name: 'Marius Malinauskas',
      role: 'Gydytojas implantologas',
      tag: 'Implantacija',
      video: '/videos/marius-malinauskas.mp4',
    },
  ] satisfies TeamTeaserSlide[],
}

export type TestimonialReview = {
  text: string
  author: string
  image: string
  imageAlt: string
}

export const testimonialsContent = {
  label: 'Atsiliepimai',
  headline: 'Kodėl pacientai mus rekomenduoja',
  googleRating: {
    score: '4,9/5',
    heroScore: '4,9',
    reviewCount: 12,
    text: 'Nuolat aukščiausiai įvertinta Google atsiliepimuose',
    href: 'https://www.google.com/maps',
  },
  reviews: [
    {
      text: 'Implantacija tą pačią dieną — negalėjau patikėti. Atvykau be danties, išėjau su šypsena.',
      author: 'Rūta K.',
      image: '/images/team-portrait.png',
      imageAlt: 'Pacientės portretas',
    },
    {
      text: 'Pagaliau klinika, kur viską paaiškina be žargono. Jaučiausi saugiai nuo pirmos minutės.',
      author: 'Tomas V.',
      image: '/images/hero-consultation.png',
      imageAlt: 'Paciento portretas',
    },
    {
      text: 'Laikini dantys per vieną vizitą — tai ne reklama, tai tikrai taip ir buvo.',
      author: 'Eglė M.',
      image: '/images/before-after-assistance.png',
      imageAlt: 'Pacientės portretas',
    },
    {
      text: 'Finansavimas sutvarkytas per 10 minučių. Gydymas — be staigmenų sąskaitoje.',
      author: 'Andrius P.',
      image: '/images/before-after-professional.png',
      imageAlt: 'Paciento portretas',
    },
    {
      text: 'Po implantacijos niekas neatpažino, kad tai ne mano dantys. Natūralu ir gražu.',
      author: 'Indrė S.',
      image: '/images/before-after-discussion.png',
      imageAlt: 'Pacientės portretas',
    },
    {
      text: 'Bijojau odontologų 20 metų. Čia pirmą kartą išėjau be drebėjimo rankose.',
      author: 'Mantas L.',
      image: '/images/team-doctor-conversation.png',
      imageAlt: 'Paciento portretas',
    },
  ] satisfies TestimonialReview[],
  cta: {
    label: 'Skaityti atsiliepimus',
    href: 'https://www.google.com/maps',
  },
}

export type BeforeAfterStat = {
  label: string
  number: string
  suffix: string
}

export type BeforeAfterPhoto = {
  src: string
  position?: string
  label: string
}

export type BeforeAfterTransformation = {
  id: string
  title: string
  poster: {
    src: string
    position?: string
  }
  before: BeforeAfterPhoto
  after: BeforeAfterPhoto
  quote: {
    text: string
    author: string
    role: string
    avatar: string
  }
}

export const beforeAfterContent = {
  label: 'Rezultatai',
  headline: 'Prieš ir po —',
  headlineLine2: 'tikri pacientų atvejai',
  subheadline:
    'Skaitmeninis planavimas, 3D spausdinimas ir implantacija vienoje klinikoje — štai kaip atrodo kelias nuo problemos iki šypsenos.',
  cta: {
    label: 'Visos pacientų istorijos',
    href: '/pacientu-istorijos',
  },
  playLabel: 'Žiūrėti transformaciją',
  transformations: [
    {
      id: 'implantacija',
      title: 'Visiška implantacija — viršutinis žandikaulis',
      poster: {
        src: '/images/hero.jpg',
        position: '60% 35%',
      },
      before: {
        src: '/images/hero.jpg',
        position: '75% 30%',
        label: 'Prieš',
      },
      after: {
        src: '/images/hero.jpg',
        position: '45% 28%',
        label: 'Po',
      },
      quote: {
        text: 'Negalėjau patikėti, kad per vieną dieną galiu vėl šypsotis. Komanda viską paaiškino ramiai ir aiškiai.',
        author: 'Giedrė N.',
        role: 'Implantacijos pacientė',
        avatar: '/images/hero.jpg',
      },
    },
    {
      id: 'protezai',
      title: 'Fiksuoti protezai ant implantų',
      poster: {
        src: '/images/hero.jpg',
        position: '55% 38%',
      },
      before: {
        src: '/images/hero.jpg',
        position: '62% 40%',
        label: 'Prieš',
      },
      after: {
        src: '/images/hero.jpg',
        position: '38% 32%',
        label: 'Po',
      },
      quote: {
        text: 'Pagaliau galiu valgyti ir juoktis be gėdos. Viskas vyko greičiau, nei tikėjausi.',
        author: 'Romas K.',
        role: 'Protezavimo pacientas',
        avatar: '/images/hero.jpg',
      },
    },
    {
      id: 'estetika',
      title: 'Estetinis atstatymas ir balinimas',
      poster: {
        src: '/images/hero.jpg',
        position: '58% 30%',
      },
      before: {
        src: '/images/hero.jpg',
        position: '80% 25%',
        label: 'Prieš',
      },
      after: {
        src: '/images/hero.jpg',
        position: '50% 22%',
        label: 'Po',
      },
      quote: {
        text: 'Rezultatas natūralus — niekas nepastebi, kad dantys buvo restauruoti.',
        author: 'Aistė M.',
        role: 'Estetinio gydymo pacientė',
        avatar: '/images/hero.jpg',
      },
    },
    {
      id: 'vienos-dienos',
      title: 'Vienos dienos implantacija',
      poster: {
        src: '/images/hero.jpg',
        position: '52% 33%',
      },
      before: {
        src: '/images/hero.jpg',
        position: '70% 35%',
        label: 'Prieš',
      },
      after: {
        src: '/images/hero.jpg',
        position: '42% 30%',
        label: 'Po',
      },
      quote: {
        text: 'Atvykau be dantų, išvykau su šypsena. Viskas vienoje klinikoje, be siuntimų.',
        author: 'Vytautas P.',
        role: 'Vienos dienos implantacijos pacientas',
        avatar: '/images/hero.jpg',
      },
    },
  ] satisfies BeforeAfterTransformation[],
  ctaBanner: {
    text: 'Norite ir jūs tokios šypsenos?',
    popupDelayMs: 2500,
    cta: {
      label: 'Registruotis vizitui',
      href: '/registracija',
    },
  },
  stats: [
    {
      label: 'Atliktų implantacijų per metus',
      number: '500',
      suffix: '+',
    },
    {
      label: 'Metų patirties implantologijoje',
      number: '12',
      suffix: '+',
    },
    {
      label: 'Pacientų rekomenduoja artimiesiems',
      number: '98',
      suffix: '%',
    },
    {
      label: 'Klinikos Lietuvoje',
      number: '2',
      suffix: '',
    },
  ] satisfies BeforeAfterStat[],
}

export type FinancingOptionIcon = 'deferred' | 'financing' | 'insurance'

export type FinancingOption = {
  label: string
  icon: FinancingOptionIcon
}

export const financingTeaserContent = {
  label: 'Finansavimas',
  headlineBefore: 'Graži klinika',
  headlineAfter: 'neįkandamos kainos',
  subheadline:
    'Kainos prieinamos, o mokėti galite dalimis — atidėtas mokėjimas, finansavimas ar draudimas.',
  monthlyFrom: {
    prefix: 'nuo',
    amount: '89',
    currency: '€',
    period: '/mėn.',
  },
  options: [
    { label: 'Atidėtas mokėjimas', icon: 'deferred' },
    { label: 'Finansavimas per partnerius', icon: 'financing' },
    { label: 'Draudimo bendradarbiavimas', icon: 'insurance' },
  ] satisfies FinancingOption[],
  reassurance:
    'Skaidrios sąmatai prieš procedūrą — be staigmenų sąskaitoje ir be „premium“ kainodaros už tą patį gydymą.',
  cta: {
    label: 'Kainos ir finansavimas',
    href: '/kainos',
  },
}

export const finalCtaContent = {
  label: 'Registracija',
  headlineLines: ['„Kada nors prisiruošiu"', '— tai šiandien'],
  subheadline:
    'Registracija užtrunka minutę. Pasirinkite kliniką — Kaunas ar Raseiniai — ir laiką, kuris tinka jums.',
  cta: {
    label: 'Registruotis vizitui',
    href: '/registracija',
  },
  image: {
    src: '/images/final-cta-man-laptop.png',
    alt: 'Vyras registruojasi vizitui nešiojamuoju kompiuteriu prie lango.',
    position: '72% 30%',
  },
}

export const heroContent = {
  headline: 'Nauji dantys — tą pačią dieną. Rimtai.',
  subheadline:
    'Laikinus dantis spausdiname 3D aparatu čia pat, klinikoje. Jokio laukimo, kol laboratorija „kada nors pagamins" — atvykote, išėjote su dantimis.',
  cta: 'Registruotis vizitui',
  ctaHref: '/registracija',
  secondaryCta: 'Kiek kainuoja?',
  secondaryCtaHref: '/kainos',
  timelineTitle: 'Viena diena — visas procesas',
  timeline: [
    { time: '09:00', label: 'Atvykstate' },
    { time: '10:30', label: 'Implantacija' },
    { time: '12:00', label: '3D spausdinami dantys' },
    { time: '17:00', label: 'Išeinate su dantimis' },
  ],
}
